import { execFile, exec } from 'child_process'
import { promisify } from 'util'
import { VideoData, VideoQualityOption, ImageData, SupportedPlatform } from '../types'

const execFileAsync = promisify(execFile)
const execAsync = promisify(exec)

/**
 * Extract media using yt-dlp (Primary VPS / Local Engine)
 * Supports Instagram, TikTok, Facebook, Twitter/X, and 1,800+ other platforms with 0 API keys.
 */
export async function extractViaYtDlp(url: string, platform: SupportedPlatform): Promise<VideoData | null> {
  const remoteServiceUrl = process.env.YTDLP_SERVICE_URL?.replace(/\/$/, '')

  // Strategy 1: Remote yt-dlp microservice (if running on a separate VPS or sidecar)
  if (remoteServiceUrl) {
    try {
      const res = await fetch(`${remoteServiceUrl}/extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(25000),
      })
      if (res.ok) {
        const data = await res.json()
        if (data && (data.downloadUrl || data.url || (data.images && data.images.length > 0))) {
          return data
        }
      }
    } catch (err) {
      console.warn('[yt-dlp] Remote service call failed:', err instanceof Error ? err.message : err)
    }
  }

  // Strategy 2: Direct Local yt-dlp execution (VPS / Dedicated Server / Local PC)
  const commandsToTry = [
    // 1. Standalone binary
    { cmd: process.env.YTDLP_PATH || 'yt-dlp', args: ['--dump-single-json', '--no-warnings', '--no-playlist', url] },
    // 2. Python 3 module
    { cmd: 'python3', args: ['-m', 'yt_dlp', '--dump-single-json', '--no-warnings', '--no-playlist', url] },
    // 3. Standard Python module
    { cmd: process.env.PYTHON_PATH || 'python', args: ['-m', 'yt_dlp', '--dump-single-json', '--no-warnings', '--no-playlist', url] },
    // 4. Windows py launcher
    { cmd: 'py', args: ['-3', '-m', 'yt_dlp', '--dump-single-json', '--no-warnings', '--no-playlist', url] },
  ]

  for (const { cmd, args } of commandsToTry) {
    try {
      const { stdout } = await execFileAsync(cmd, args, {
        timeout: 35000,
        maxBuffer: 15 * 1024 * 1024, // 15MB JSON buffer
      })

      if (stdout && stdout.trim()) {
        const json = JSON.parse(stdout.trim())
        const parsed = parseYtDlpJson(json, url, platform)
        if (parsed) {
          console.log(`[yt-dlp] Successfully extracted ${platform} media using ${cmd}`)
          return parsed
        }
      }
    } catch (err) {
      // Continue to next command candidate
    }
  }

  return null
}

function parseYtDlpJson(json: any, originalUrl: string, platform: SupportedPlatform): VideoData | null {
  if (!json) return null

  const id = String(json.id || Date.now())
  const title = json.title || json.description?.slice(0, 100) || `${capitalize(platform)} Media`
  const thumbnail = json.thumbnail || (Array.isArray(json.thumbnails) ? json.thumbnails[json.thumbnails.length - 1]?.url : '') || ''
  const duration = Math.round(json.duration || 0)
  const author = json.uploader || json.creator || json.channel || json.uploader_id ? `@${json.uploader || json.uploader_id}` : `${capitalize(platform)} Creator`
  const description = json.description || title

  // Handle formats
  const formats: any[] = Array.isArray(json.formats) ? json.formats : []
  
  // 1. Progressive MP4s (Video + Audio combined directly from CDN)
  const progressiveMp4s = formats.filter(
    (f) =>
      f.url &&
      (f.ext === 'mp4' || f.vcodec !== 'none') &&
      f.vcodec !== 'none' &&
      f.acodec !== 'none' &&
      !f.url.includes('.m3u8')
  )

  // 2. Video streams
  const videoFormats = formats.filter(
    (f) => f.url && (f.ext === 'mp4' || f.vcodec !== 'none') && f.vcodec !== 'none'
  )

  // 3. Audio streams
  const audioFormats = formats.filter(
    (f) => f.url && (f.ext === 'm4a' || f.ext === 'mp3' || f.acodec !== 'none') && f.vcodec === 'none'
  )

  const bestHeight = (list: { height?: number }[]): number =>
    list.reduce((max, f) => Math.max(max, f.height || 0), 0)

  // Facebook (and some other sites) often only expose SD quality in the
  // combined "progressive" stream, while true HD/4K is video-only and paired
  // with a separate audio-only track. Prefer whichever pool actually has the
  // higher resolution instead of always favoring "progressive".
  const useVideoOnly = bestHeight(videoFormats) > bestHeight(progressiveMp4s)
  const qualities: VideoQualityOption[] = []
  const pool = useVideoOnly ? videoFormats : (progressiveMp4s.length > 0 ? progressiveMp4s : videoFormats)

  // Sort descending by height / resolution / bitrate
  pool.sort((a, b) => (b.height || b.tbr || 0) - (a.height || a.tbr || 0))

  for (const f of pool) {
    const res = f.format_note || (f.height ? `${f.height}p` : '') || (f.format ? f.format.split(' ')[0] : 'HD')
    const label = `${res} MP4`.trim()
    if (!qualities.some((q) => q.url === f.url)) {
      qualities.push({
        quality: label,
        url: f.url,
        resolution: f.height ? `${f.height}p` : undefined,
        needsAudioMerge: useVideoOnly,
      })
    }
  }

  // Best direct download URL
  const downloadUrl = qualities[0]?.url || json.url || (progressiveMp4s[0]?.url) || (videoFormats[0]?.url) || ''

  // Best audio URL
  const audioUrl = audioFormats[0]?.url || json.audio_url || undefined

  // Handle multi-image carousels / photo slides
  const images: ImageData[] = []
  if (Array.isArray(json.entries)) {
    json.entries.forEach((entry: any, i: number) => {
      const imgUrl = entry.url || entry.thumbnail
      if (imgUrl) {
        images.push({
          id: `${id}_${i}`,
          url: imgUrl,
          thumbnail: imgUrl,
        })
      }
    })
  }

  // If no video URL and no images, return null
  if (!downloadUrl && images.length === 0) {
    return null
  }

  return {
    id,
    title: title || description || 'Media Video',
    url: originalUrl,
    thumbnail,
    duration,
    author,
    description,
    downloadUrl,
    audioUrl,
    qualities: qualities.length > 0 ? qualities : undefined,
    images: images.length > 0 ? images : undefined,
    isPhotoCarousel: images.length > 1,
    platform,
  }
}

function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}
