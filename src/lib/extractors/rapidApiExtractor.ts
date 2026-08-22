import { VideoData, ImageData, VideoQualityOption } from '../types'

/**
 * Universal fallback extractor using free RapidAPI "Social Media Video Downloader"
 * This serves as the last-resort fallback for all platforms.
 *
 * Supported free-tier APIs (configure via RAPIDAPI_KEY env var):
 *   1. social-media-video-downloader (primary)
 *   2. auto-download-all-in-one (secondary)
 *
 * Free tier: ~100-150 requests/day depending on the API
 */

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? ''

interface RapidAPIMedia {
  url: string
  quality?: string
  extension?: string
  type?: string
  formattedSize?: string
  videoAvailable?: boolean
  audioAvailable?: boolean
}

/**
 * Try to extract media from any supported URL using RapidAPI services.
 * Returns VideoData or null if all attempts fail.
 */
export async function extractViaRapidAPI(
  url: string,
  platform: string
): Promise<VideoData | null> {
  if (!RAPIDAPI_KEY) {
    console.warn('[RapidAPI] No RAPIDAPI_KEY configured – skipping RapidAPI fallback')
    return null
  }

  // Try dedicated Instagram API first for Instagram URLs
  if (platform === 'instagram' || url.includes('instagram.com')) {
    const igResult = await tryInstagramSpecificApi(url)
    if (igResult) return igResult
  }

  // Try primary API first, then fallback
  const result =
    (await trySocialMediaDownloader(url, platform)) ??
    (await tryAutoDownloader(url, platform))

  return result
}

/**
 * Primary: "Social Media Video Downloader" API
 * Host: social-media-video-downloader.p.rapidapi.com
 */
async function trySocialMediaDownloader(
  url: string,
  platform: string
): Promise<VideoData | null> {
  try {
    const res = await fetch(
      'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all?' +
        new URLSearchParams({ url }),
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com',
        },
        signal: AbortSignal.timeout(15000),
      }
    )

    if (!res.ok) return null
    const data = await res.json()

    if (!data?.links || data.links.length === 0) return null

    // Parse video links and image links
    const videoLinks: RapidAPIMedia[] = data.links.filter(
      (l: any) => l.url && (l.type === 'video' || l.extension === 'mp4' || l.quality)
    )

    const imageLinks = data.links.filter(
      (l: any) =>
        l.url && (l.type?.includes('image') || l.extension === 'jpg' || l.extension === 'png' || l.extension === 'webp')
    )

    if (videoLinks.length === 0 && imageLinks.length === 0) return null

    // Find best video URL (prefer HD/highest quality)
    const bestVideo =
      videoLinks.find((l) => l.quality?.toLowerCase().includes('hd')) ||
      videoLinks.find((l) => l.quality?.toLowerCase().includes('1080')) ||
      videoLinks.find((l) => l.quality?.toLowerCase().includes('720')) ||
      videoLinks[0]

    // Sort video links by resolution / bitrate descending
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
 * Secondary: "Auto Download All In One" API
 * Host: auto-download-all-in-one.p.rapidapi.com
 */
async function tryAutoDownloader(
  url: string,
  platform: string
): Promise<VideoData | null> {
  try {
    const res = await fetch(
      'https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'auto-download-all-in-one.p.rapidapi.com',
        },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(15000),
      }
    )

    if (!res.ok) return null
    const data = await res.json()

    // Parse response - structure varies
    const medias: any[] = data?.medias || []
    if (medias.length === 0 && !data?.url) return null

    if (data?.url && medias.length === 0) {
      // Simple single-URL response
      return {
        id: `rapid2_${Date.now()}`,
        title: data.title || `${capitalize(platform)} Video`,
        url,
        thumbnail: data.thumbnail || '',
        duration: 0,
        author: data.author || `${capitalize(platform)} Creator`,
        description: data.title || '',
        downloadUrl: data.url,
        platform: platform as any,
        qualities: [{ quality: 'HD MP4', url: data.url }],
      }
    }

    // Parse medias array
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

async function tryInstagramSpecificApi(url: string): Promise<VideoData | null> {
  try {
    const res = await fetch(
      'https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/index?' +
        new URLSearchParams({ url }),
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com',
        },
        signal: AbortSignal.timeout(15000),
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const mediaUrl = data.media || data.download_url || data.video_url || data.url
    if (!mediaUrl) return null

    const isVideo = String(mediaUrl).includes('.mp4') || data.type === 'video'
    const cleanMedia = String(mediaUrl).replace(/\\/g, '')

    return {
      id: `ig_rapid_${Date.now()}`,
      title: data.title || 'Instagram Reel',
      url,
      thumbnail: data.thumbnail || '',
      duration: 0,
      author: data.author || 'Instagram Creator',
      description: data.title || '',
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
    console.warn('[RapidAPI] Instagram Specific API failed:', err)
    return null
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function parseDuration(val: string | number): number {
  if (typeof val === 'number') return Math.round(val)
  // Handle "PT1M30S" ISO 8601 or "1:30" or "90" formats
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
