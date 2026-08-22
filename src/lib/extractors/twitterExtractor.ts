import { VideoData, ImageData, VideoQualityOption } from '../types'
import { extractViaRapidAPI } from './rapidApiExtractor'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

export async function extractTwitter(url: string): Promise<VideoData | null> {
  // Normalize x.com → twitter.com for consistent processing
  const normalizedUrl = url.replace(/\bx\.com\b/, 'twitter.com')
  const tweetId = extractTweetId(normalizedUrl)
  if (!tweetId) return null

  // Strategy 1: FXTwitter / FixTweet API (Fast, Free & Reliable — still working in 2026)
  const fxResult = await tryFxTwitterApi(tweetId, url)
  if (fxResult) return fxResult

  // Strategy 2: Twitter Syndication CDN API
  const syndicationResult = await trySyndicationApi(tweetId, url)
  if (syndicationResult) return syndicationResult

  // Strategy 3: Direct download via d.fxtwitter.com
  const directResult = await tryDirectFxDownload(tweetId, url)
  if (directResult) return directResult

  // Strategy 4: RapidAPI universal fallback
  const rapidResult = await extractViaRapidAPI(url, 'twitter')
  if (rapidResult) return rapidResult

  return null
}

function extractTweetId(url: string): string | null {
  const match = url.match(/\/status\/(\d+)/i)
  return match && match[1] ? match[1] : null
}

async function tryFxTwitterApi(tweetId: string, originalUrl: string): Promise<VideoData | null> {
  try {
    const res = await fetch(`https://api.fxtwitter.com/status/${tweetId}`, {
      headers: { 'User-Agent': 'SaveFromInternetBot/1.0', Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) return null
    const json = await res.json()
    const tweet = json?.tweet
    if (!tweet) return null

    const author = `${tweet.author?.name || 'Twitter User'} (@${tweet.author?.screen_name || 'user'})`
    const title = tweet.text || 'Twitter Video'

    // Check for video or animated GIF
    if (tweet.media?.videos && tweet.media.videos.length > 0) {
      const vid = tweet.media.videos[0]
      const downloadUrl = vid.url || ''
      const thumbnail = vid.thumbnail_url || ''

      const qualities: VideoQualityOption[] = []

      // Parse variant streams if available
      if (vid.variants && Array.isArray(vid.variants)) {
        // Filter MP4s and sort by bitrate descending
        const mp4Variants = vid.variants
          .filter((v: any) => v.content_type === 'video/mp4' && v.url)
          .sort((a: any, b: any) => (b.bitrate || 0) - (a.bitrate || 0))

        for (const variant of mp4Variants) {
          const bitrateKbps = variant.bitrate ? Math.round(variant.bitrate / 1000) : 0
          // Estimate resolution from bitrate
          let resolution = '720p'
          if (bitrateKbps > 2000) resolution = 'Best (4K / 1080p)'
          else if (bitrateKbps > 800) resolution = '1080p HD'
          else resolution = '720p HD'
          
          const label = bitrateKbps > 0 ? `MP4 ${resolution} (${bitrateKbps} kbps)` : 'MP4 Video'
          qualities.push({ quality: label, url: variant.url, resolution })
        }
      }

      // If no variants parsed, add the main download URL
      if (qualities.length === 0 && downloadUrl) {
        qualities.push({ quality: 'HD MP4 Video', url: downloadUrl })
      }

      return {
        id: tweetId,
        title,
        url: originalUrl,
        thumbnail,
        duration: Math.round(vid.duration || 0),
        author,
        description: title,
        downloadUrl: downloadUrl || qualities[0]?.url || '',
        platform: 'twitter',
        qualities,
      }
    }

    // Handle animated GIFs (Twitter converts them to MP4)
    if (tweet.media?.all && Array.isArray(tweet.media.all)) {
      const gifMedia = tweet.media.all.find((m: any) => m.type === 'gif')
      if (gifMedia?.url) {
        return {
          id: tweetId,
          title,
          url: originalUrl,
          thumbnail: gifMedia.thumbnail_url || '',
          duration: 0,
          author,
          description: title,
          downloadUrl: gifMedia.url,
          platform: 'twitter',
          qualities: [{ quality: 'Animated GIF (MP4)', url: gifMedia.url }],
        }
      }
    }

    // Check for photos
    if (tweet.media?.photos && tweet.media.photos.length > 0) {
      const images: ImageData[] = tweet.media.photos.map((p: any, i: number) => ({
        id: `${tweetId}_img_${i}`,
        url: p.url,
        thumbnail: p.url,
      }))

      return {
        id: tweetId,
        title,
        url: originalUrl,
        thumbnail: images[0]?.url || '',
        duration: 0,
        author,
        description: title,
        downloadUrl: images[0]?.url || '',
        images,
        isPhotoCarousel: images.length > 1,
        platform: 'twitter',
      }
    }
  } catch (err) {
    console.warn('[Twitter] FXTwitter API failed:', err)
  }
  return null
}

async function trySyndicationApi(tweetId: string, originalUrl: string): Promise<VideoData | null> {
  try {
    const res = await fetch(`https://cdn.syndication.twimg.com/tweet-result?id=${tweetId}&token=1`, {
      headers: { 'User-Agent': UA, Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) return null
    const tweet = await res.json()
    if (!tweet) return null

    const author = `${tweet.user?.name || 'Twitter User'} (@${tweet.user?.screen_name || 'user'})`
    const title = tweet.text || 'Twitter Video'

    const mediaDetails = tweet.mediaDetails?.[0] || tweet.video
    if (mediaDetails && (mediaDetails.type === 'video' || mediaDetails.type === 'animated_gif')) {
      const videoInfo = mediaDetails.video_info || mediaDetails
      const variants = videoInfo.variants || []

      // Filter MP4s and sort by bitrate descending
      const mp4s = variants
        .filter((v: any) => v.content_type === 'video/mp4' && v.url)
        .sort((a: any, b: any) => (b.bitrate || 0) - (a.bitrate || 0))

      if (mp4s.length > 0) {
        const bestUrl = mp4s[0].url
        const qualities: VideoQualityOption[] = mp4s.map((v: any) => {
          const bitrateKbps = v.bitrate ? Math.round(v.bitrate / 1000) : 0
          let resolution = 'SD'
          if (bitrateKbps > 2000) resolution = '1080p HD'
          else if (bitrateKbps > 800) resolution = '720p HD'
          else if (bitrateKbps > 400) resolution = '480p'
          
          const resLabel = bitrateKbps > 0 ? `MP4 ${resolution} (${bitrateKbps} kbps)` : 'Standard MP4'
          return { quality: resLabel, url: v.url, resolution }
        })

        return {
          id: tweetId,
          title,
          url: originalUrl,
          thumbnail: mediaDetails.media_url_https || '',
          duration: Math.round((videoInfo.duration_millis || 0) / 1000),
          author,
          description: title,
          downloadUrl: bestUrl,
          platform: 'twitter',
          qualities,
        }
      }
    }
  } catch (err) {
    console.warn('[Twitter] Syndication API failed:', err)
  }
  return null
}

/**
 * Strategy 3: Use d.fxtwitter.com which provides direct video file URLs.
 * This is a lightweight fallback that constructs a direct download URL.
 */
async function tryDirectFxDownload(tweetId: string, originalUrl: string): Promise<VideoData | null> {
  try {
    // d.fxtwitter.com redirects to the actual video file
    const directUrl = `https://d.fxtwitter.com/status/${tweetId}`
    const res = await fetch(directUrl, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(8000),
    })

    const finalUrl = res.url
    // If redirected to a video file URL (contains video.twimg.com or .mp4)
    if (finalUrl && (finalUrl.includes('video.twimg.com') || finalUrl.includes('.mp4'))) {
      return {
        id: tweetId,
        title: 'Twitter Video',
        url: originalUrl,
        thumbnail: '',
        duration: 0,
        author: 'Twitter Creator',
        description: 'Twitter / X Video',
        downloadUrl: finalUrl,
        platform: 'twitter',
        qualities: [{ quality: 'HD MP4 Video', url: finalUrl }],
      }
    }
  } catch (err) {
    console.warn('[Twitter] Direct FX download failed:', err)
  }
  return null
}
