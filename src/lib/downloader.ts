import { VideoData, ImageData } from './types'
import { parseVideoId } from './validator'

const PRIMARY_API_KEY = process.env.TIKWM_API_KEY ?? ''

const CACHE_TTL = 30 * 60 * 1000
interface CacheEntry { data: VideoData; expiresAt: number }
const videoCache = new Map<string, CacheEntry>()

function getCached(key: string): VideoData | null {
  const entry = videoCache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) { videoCache.delete(key); return null }
  return entry.data
}

function setCached(key: string, data: VideoData): void {
  if (videoCache.size >= 500) videoCache.delete(videoCache.keys().next().value as string)
  videoCache.set(key, { data, expiresAt: Date.now() + CACHE_TTL })
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

export class Downloader {
  async downloadVideo(url: string): Promise<VideoData> {
    const videoId = parseVideoId(url)
    if (!videoId) throw new Error('Could not extract video ID from URL')

    const cached = getCached(videoId)
    if (cached) return cached

    const result = await this.tryTikwm(url) ?? await this.tryDirectScrape(url)
    if (result) {
      setCached(videoId, result)
      return result
    }

    throw new Error('All download methods failed. The video may be private or unavailable.')
  }

  private async tryTikwm(url: string): Promise<VideoData | null> {
    try {
      const res = await fetch('https://www.tikwm.com/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': UA,
          Accept: 'application/json',
          Origin: 'https://www.tikwm.com',
          Referer: 'https://www.tikwm.com/',
        },
        body: JSON.stringify({ url, count: 12, cursor: 0, web: 1, hd: 1, api_key: PRIMARY_API_KEY }),
        signal: AbortSignal.timeout(30000),
      })

      const json = await res.json()
      if (json?.code !== 0 || !json?.data) return null
      const data = json.data
      const videoId = parseVideoId(url) || 'unknown'
      const isPhotoCarousel = Array.isArray(data.images) && data.images.length > 0

      const images: ImageData[] = isPhotoCarousel
        ? data.images.map((img: string, i: number) => ({ id: `${videoId}_img_${i}`, url: img, thumbnail: img }))
        : []

      let downloadUrl: string = data.play || data.hdplay || data.wmplay || ''
      if (downloadUrl.startsWith('/')) downloadUrl = 'https://www.tikwm.com' + downloadUrl

      let cover: string = data.cover || ''
      if (cover.startsWith('/')) cover = 'https://www.tikwm.com' + cover

      let audioUrl: string | undefined = data.music || undefined
      if (audioUrl?.startsWith('/')) audioUrl = 'https://www.tikwm.com' + audioUrl

      return {
        id: videoId,
        title: data.title || 'TikTok Video',
        url,
        thumbnail: cover,
        duration: data.duration || 0,
        author: data.author?.nickname || 'Unknown',
        description: data.title || '',
        downloadUrl,
        audioUrl,
        images,
        isPhotoCarousel,
      }
    } catch {
      return null
    }
  }

  private async tryDirectScrape(url: string): Promise<VideoData | null> {
    try {
      const resolvedUrl = await this.resolveShortUrl(url)
      const res = await fetch(resolvedUrl, {
        headers: {
          'User-Agent': UA,
          Accept: 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        signal: AbortSignal.timeout(30000),
      })
      const html = await res.text()
      const videoUrlMatch = html.match(/"playAddr":"([^"]+)"/) || html.match(/"downloadAddr":"([^"]+)"/)
      if (!videoUrlMatch) return null

      const downloadUrl = videoUrlMatch[1].replace(/\\u002F/g, '/')
      const videoId = parseVideoId(url) || 'unknown'
      return {
        id: videoId, title: 'TikTok Video', url,
        thumbnail: '', duration: 0, author: 'Unknown', description: '',
        downloadUrl,
      }
    } catch {
      return null
    }
  }

  private async resolveShortUrl(url: string): Promise<string> {
    if (!url.includes('vm.tiktok.com') && !url.includes('/t/')) return url
    try {
      const res = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        headers: { 'User-Agent': UA },
        signal: AbortSignal.timeout(10000),
      })
      return res.url || url
    } catch {
      return url
    }
  }
}
