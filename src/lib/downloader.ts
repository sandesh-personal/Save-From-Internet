import { VideoData } from './types'
import { parseVideoId, detectPlatform } from './validator'
import { extractTikTok } from './extractors/tiktokExtractor'
import { extractFacebook } from './extractors/facebookExtractor'
import { extractInstagram } from './extractors/instagramExtractor'
import { extractTwitter } from './extractors/twitterExtractor'
import { extractViaYtDlp } from './extractors/ytdlpExtractor'

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

    // ── Dedicated Platform Handlers (Primary: VPS yt-dlp Engine) ──────
    switch (platform) {
      case 'instagram':
        // Primary: yt-dlp (0 API keys, full 1080p MP4 reels & carousel extraction), Backup: Direct GraphQL Scraper
        result = (await extractViaYtDlp(trimmed, 'instagram')) ?? (await extractInstagram(trimmed))
        break
      case 'tiktok':
        // Primary: yt-dlp (0 API keys, direct CDN stream), Backup: TikWM API
        result = (await extractViaYtDlp(trimmed, 'tiktok')) ?? (await extractTikTok(trimmed))
        break
      case 'facebook':
        // Primary: yt-dlp (HD MP4 progressive stream), Backup: Direct Scraper
        result = (await extractViaYtDlp(trimmed, 'facebook')) ?? (await extractFacebook(trimmed))
        break
      case 'twitter':
        // Primary: yt-dlp (HD MP4 video stream), Backup: Direct Scraper
        result = (await extractViaYtDlp(trimmed, 'twitter')) ?? (await extractTwitter(trimmed))
        break
      default:
        result = (await extractViaYtDlp(trimmed, platform)) ?? (await extractTikTok(trimmed))
        break
    }

    if (!result) {
      result = await extractViaYtDlp(trimmed, platform)
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
