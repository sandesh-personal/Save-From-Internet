import { VideoData } from './types'
import { parseVideoId, detectPlatform } from './validator'
import { extractTikTok } from './extractors/tiktokExtractor'
import { extractFacebook } from './extractors/facebookExtractor'
import { extractInstagram } from './extractors/instagramExtractor'
import { extractTwitter } from './extractors/twitterExtractor'
import { extractViaYtDlp } from './extractors/ytdlpExtractor'
import { extractViaRapidAPI } from './extractors/rapidApiExtractor'

const CACHE_TTL = 30 * 60 * 1000
interface CacheEntry {
  data: VideoData
  expiresAt: number
}
const mediaCache = new Map<string, CacheEntry>()

function getCached(key: string): VideoData | null {
  const entry = mediaCache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    mediaCache.delete(key)
    return null
  }
  return entry.data
}

function setCached(key: string, data: VideoData): void {
  if (mediaCache.size >= 1000) {
    const firstKey = mediaCache.keys().next().value
    if (firstKey) mediaCache.delete(firstKey)
  }
  mediaCache.set(key, { data, expiresAt: Date.now() + CACHE_TTL })
}

export class Downloader {
  async downloadVideo(url: string): Promise<VideoData> {
    const trimmed = url.trim()
    const platform = detectPlatform(trimmed) || 'tiktok'
    const cacheKey = `${platform}_${parseVideoId(trimmed) || trimmed}`

    const cached = getCached(cacheKey)
    if (cached) return cached

    let result: VideoData | null = null

    // ── Dedicated Platform Handlers ──────────────────────────────────
    switch (platform) {
      case 'tiktok':
        // Primary: yt-dlp (0 API keys, direct CDN stream), Backup: TikWM API
        result = (await extractViaYtDlp(trimmed, 'tiktok')) ?? (await extractTikTok(trimmed))
        break
      case 'facebook':
        result = (await extractFacebook(trimmed)) ?? (await extractViaYtDlp(trimmed, 'facebook'))
        break
      case 'instagram': {
        const isReelOrVideo = trimmed.includes('/reel/') || trimmed.includes('/reels/') || trimmed.includes('/tv/')
        const directResult = await extractInstagram(trimmed)
        
        // If it's a Reel/Video and direct extraction didn't find an MP4 video stream:
        if (isReelOrVideo && directResult && (!directResult.downloadUrl || !directResult.downloadUrl.includes('.mp4')) && (!directResult.qualities || directResult.qualities.length === 0)) {
          result = (await extractViaYtDlp(trimmed, 'instagram')) ?? (await extractViaRapidAPI(trimmed, 'instagram')) ?? directResult
          break
        }

        // If direct extraction found only 1 image on a photo/carousel post, check RapidAPI for full multi-slide carousel
        if (directResult && directResult.images && directResult.images.length === 1 && (!directResult.downloadUrl || !directResult.downloadUrl.includes('.mp4'))) {
          const rapidCarousel = await extractViaRapidAPI(trimmed, 'instagram')
          if (rapidCarousel && rapidCarousel.images && rapidCarousel.images.length > 1) {
            result = rapidCarousel
            break
          }
        }
        result = directResult ?? (await extractViaYtDlp(trimmed, 'instagram')) ?? (await extractViaRapidAPI(trimmed, 'instagram'))
        break
      }
      case 'twitter':
        result = (await extractTwitter(trimmed)) ?? (await extractViaYtDlp(trimmed, 'twitter'))
        break
      default:
        result = await extractTikTok(trimmed)
        break
    }

    // ── Universal RapidAPI fallback for non-TikTok platforms ────────
    if (!result && platform !== 'tiktok') {
      result = (await extractViaYtDlp(trimmed, platform)) ?? (await extractViaRapidAPI(trimmed, platform))
    }

    if (result && (result.downloadUrl || (result.images && result.images.length > 0))) {
      result.platform = platform
      setCached(cacheKey, result)
      return result
    }

    throw new Error(
      `Could not process this ${platform.toUpperCase()} URL. Please verify the post is public and try again.`
    )
  }
}
