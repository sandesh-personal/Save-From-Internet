import { VideoData, ImageData, VideoQualityOption } from '../types'

/**
 * Universal fallback extractor using RapidAPI services.
 * Automatically tries all popular Instagram & Social Media APIs on RapidAPI.
 */

interface RapidAPIMedia {
  url: string
  quality?: string
  extension?: string
  type?: string
  formattedSize?: string
  videoAvailable?: boolean
  audioAvailable?: boolean
}

export async function extractViaRapidAPI(
  url: string,
  platform: string
): Promise<VideoData | null> {
  const key = (process.env.RAPIDAPI_KEY || '').trim()
  if (!key) {
    console.warn('[RapidAPI] No RAPIDAPI_KEY configured in environment variables')
    return null
  }

  // If Instagram, try all popular Instagram API services first
  if (platform === 'instagram' || url.includes('instagram.com')) {
    const igResult =
      (await tryInstagramSpecificApi(url, key, 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com')) ??
      (await tryInstagramSpecificApi(url, key, 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com')) ??
      (await tryInstagramSpecificApi(url, key, 'instagram-post-download-api.p.rapidapi.com')) ??
      (await tryInstagramScraperApi2(url, key))
    if (igResult) return igResult
  }

  // Universal social media video downloaders
  const result =
    (await trySocialMediaDownloader(url, platform, key)) ??
    (await tryAutoDownloader(url, platform, key))

  return result
}

/**
 * Endpoint: instagram-downloader-download-instagram-videos-stories.p.rapidapi.com (and clones)
 */
async function tryInstagramSpecificApi(url: string, key: string, host: string): Promise<VideoData | null> {
  try {
    const res = await fetch(
      `https://${host}/index?` + new URLSearchParams({ url }),
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': key,
          'x-rapidapi-host': host,
        },
        signal: AbortSignal.timeout(15000),
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const mediaUrl = data.media || data.download_url || data.video_url || data.url || data.link
    if (!mediaUrl) return null

    const isVideo = String(mediaUrl).includes('.mp4') || data.type === 'video'
    const cleanMedia = String(mediaUrl).replace(/\\/g, '')

    return {
      id: `ig_rapid_${Date.now()}`,
      title: data.title || data.caption || 'Instagram Reel',
      url,
      thumbnail: data.thumbnail || data.picture || '',
      duration: 0,
      author: data.author || data.username || 'Instagram Creator',
      description: data.title || data.caption || '',
      downloadUrl: cleanMedia,
      qualities: isVideo
        ? [
            { quality: 'Best (4K Quality) / 1080p Full HD', url: cleanMedia, resolution: '1080p' },
            { quality: '720p HD Standard', url: cleanMedia, resolution: '720p' },
          ]
        : undefined,
      platform: 'instagram',
    }
  } catch (err) {
    console.warn(`[RapidAPI] ${host} failed:`, err instanceof Error ? err.message : err)
    return null
  }
}

/**
 * Endpoint: instagram-scraper-api2.p.rapidapi.com
 */
async function tryInstagramScraperApi2(url: string, key: string): Promise<VideoData | null> {
  try {
    const res = await fetch(
      'https://instagram-scraper-api2.p.rapidapi.com/v1/post_info?' +
        new URLSearchParams({ code_or_id_or_url: url }),
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': key,
          'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
        },
        signal: AbortSignal.timeout(15000),
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const item = data?.data || data
    if (!item) return null

    const videoUrl = item.video_url || item.video_versions?.[0]?.url
    const isVideo = item.is_video || Boolean(videoUrl)
    const caption = item.caption?.text || item.title || 'Instagram Reel'
    const author = item.user?.username ? `@${item.user.username}` : 'Instagram Creator'

    if (isVideo && videoUrl) {
      const cleanVideo = String(videoUrl).replace(/\\/g, '')
      return {
        id: `ig_scrape2_${Date.now()}`,
        title: caption,
        url,
        thumbnail: item.thumbnail_url || item.display_url || '',
        duration: item.video_duration || 0,
        author,
        description: caption,
        downloadUrl: cleanVideo,
        qualities: [
          { quality: 'Best (4K Quality) / 1080p Full HD', url: cleanVideo, resolution: '1080p' },
          { quality: '720p HD Standard', url: cleanVideo, resolution: '720p' },
        ],
        platform: 'instagram',
      }
    }
  } catch (err) {
    console.warn('[RapidAPI] instagram-scraper-api2 failed:', err instanceof Error ? err.message : err)
    return null
  }
  return null
}

/**
 * Endpoint: social-media-video-downloader.p.rapidapi.com
 */
async function trySocialMediaDownloader(
  url: string,
  platform: string,
  key: string
): Promise<VideoData | null> {
  try {
    const res = await fetch(
      'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all?' +
        new URLSearchParams({ url }),
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': key,
          'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com',
        },
        signal: AbortSignal.timeout(15000),
      }
    )

    if (!res.ok) return null
    const data = await res.json()

    if (!data?.links || data.links.length === 0) return null

    const videoLinks: RapidAPIMedia[] = data.links.filter(
      (l: any) => l.url && (l.type === 'video' || l.extension === 'mp4' || l.quality)
    )

    const imageLinks = data.links.filter(
      (l: any) =>
        l.url && (l.type?.includes('image') || l.extension === 'jpg' || l.extension === 'png' || l.extension === 'webp')
    )

    if (videoLinks.length === 0 && imageLinks.length === 0) return null

    const bestVideo =
      videoLinks.find((l) => l.quality?.toLowerCase().includes('hd')) ||
      videoLinks.find((l) => l.quality?.toLowerCase().includes('1080')) ||
      videoLinks.find((l) => l.quality?.toLowerCase().includes('720')) ||
      videoLinks[0]

    videoLinks.sort((a: any, b: any) => {
      const aRes = parseInt(String(a.quality || a.format || '').replace(/\D/g, ''), 10) || 0
      const bRes = parseInt(String(b.quality || b.format || '').replace(/\D/g, ''), 10) || 0
      return bRes - aRes
    })

    const qualities: VideoQualityOption[] = []
    if (videoLinks.length === 1) {
      qualities.push({
        quality: 'Best (4K Quality) / 1080p Full HD',
        url: videoLinks[0].url,
        resolution: '1080p',
      })
    } else if (videoLinks.length > 1) {
      videoLinks.forEach((l: any, idx: number) => {
        const rawQ = String(l.quality || l.type || '').toLowerCase()
        let label = 'Best (4K Quality) / 1080p Full HD'
        let res = '1080p'
        if (idx >= 1 || rawQ.includes('720') || rawQ.includes('sd')) {
          label = '720p HD Standard'
          res = '720p'
        }
        qualities.push({
          quality: label,
          url: l.url,
          resolution: res,
        })
      })
    }

    const images: ImageData[] = imageLinks.map((img: any, idx: number) => ({
      id: `rapid_img_${idx}`,
      url: img.url,
      thumbnail: img.url,
    }))

    const mainDownloadUrl = bestVideo?.url || images[0]?.url || ''

    return {
      id: `rapid_${Date.now()}`,
      title: data.title || `${capitalize(platform)} Post`,
      url,
      thumbnail: data.picture || data.thumbnail || images[0]?.thumbnail || '',
      duration: data.duration ? parseDuration(data.duration) : 0,
      author: data.author || data.source || `${capitalize(platform)} Creator`,
      description: data.title || '',
      downloadUrl: mainDownloadUrl,
      audioUrl: data.links.find((l: any) => l.type?.includes('audio'))?.url,
      qualities: qualities.length > 0 ? qualities : undefined,
      images: images.length > 0 ? images : undefined,
      isPhotoCarousel: images.length > 1,
      platform: platform as any,
    }
  } catch (err) {
    console.warn('[RapidAPI] Social Media Downloader failed:', err)
    return null
  }
}

/**
 * Endpoint: auto-download-all-in-one.p.rapidapi.com
 */
async function tryAutoDownloader(
  url: string,
  platform: string,
  key: string
): Promise<VideoData | null> {
  try {
    const res = await fetch(
      'https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': key,
          'x-rapidapi-host': 'auto-download-all-in-one.p.rapidapi.com',
        },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(15000),
      }
    )

    if (!res.ok) return null
    const data = await res.json()

    const medias: any[] = data?.medias || []
    if (medias.length === 0) return null

    const videoMedias = medias.filter(
      (m: any) => m.url && (m.type === 'video' || m.extension === 'mp4')
    )
    const imageMedias = medias.filter(
      (m: any) => m.url && (m.type === 'image' || m.extension === 'jpg' || m.extension === 'png')
    )
    const audioMedias = medias.filter(
      (m: any) => m.url && (m.type === 'audio' || m.extension === 'mp3')
    )

    const bestVideo = videoMedias[0] || medias[0]
    if (!bestVideo?.url) return null

    const qualities: VideoQualityOption[] = []
    if (videoMedias.length === 1) {
      qualities.push({
        quality: 'Best (4K Quality) / 1080p Full HD',
        url: videoMedias[0].url,
        resolution: '1080p',
      })
    } else {
      videoMedias.forEach((m: any, idx: number) => {
        const rawQ = String(m.quality || m.formattedSize || '').toLowerCase()
        let label = 'Best (4K Quality) / 1080p Full HD'
        let res = '1080p'
        if (idx >= 1 || rawQ.includes('720') || rawQ.includes('sd')) {
          label = '720p HD Standard'
          res = '720p'
        }
        qualities.push({
          quality: label,
          url: m.url,
          resolution: res,
        })
      })
    }

    const images: ImageData[] = imageMedias.map((img: any, idx: number) => ({
      id: `rapid2_img_${idx}`,
      url: img.url,
      thumbnail: img.url,
    }))

    return {
      id: `rapid2_${Date.now()}`,
      title: data.title || `${capitalize(platform)} Video`,
      url,
      thumbnail: data.thumbnail || data.picture || '',
      duration: data.duration ? parseDuration(data.duration) : 0,
      author: data.source || `${capitalize(platform)} Creator`,
      description: data.title || '',
      downloadUrl: bestVideo.url,
      audioUrl: audioMedias[0]?.url,
      qualities: qualities.length > 0 ? qualities : undefined,
      images: images.length > 0 ? images : undefined,
      isPhotoCarousel: images.length > 1,
      platform: platform as any,
    }
  } catch (err) {
    console.warn('[RapidAPI] Auto Download failed:', err)
    return null
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function parseDuration(val: string | number): number {
  if (typeof val === 'number') return Math.round(val)
  const isoMatch = String(val).match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (isoMatch) {
    return (
      (parseInt(isoMatch[1] || '0', 10) * 3600) +
      (parseInt(isoMatch[2] || '0', 10) * 60) +
      parseInt(isoMatch[3] || '0', 10)
    )
  }
  const colonMatch = String(val).match(/^(\d+):(\d+)$/)
  if (colonMatch) {
    return parseInt(colonMatch[1], 10) * 60 + parseInt(colonMatch[2], 10)
  }
  return parseInt(String(val), 10) || 0
}
