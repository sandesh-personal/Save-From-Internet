import { execFile } from 'child_process'
import { promisify } from 'util'
import { VideoData, VideoQualityOption, ImageData, SupportedPlatform } from '../types'

const execFileAsync = promisify(execFile)

/**
 * Extract media using yt-dlp (local binary/module or remote microservice)
 * Supports Instagram, Facebook, Twitter, and 1,800+ other platforms with 0 API keys.
 */
export async function extractViaYtDlp(url: string, platform: SupportedPlatform): Promise<VideoData | null> {
  const remoteServiceUrl = process.env.YTDLP_SERVICE_URL?.replace(/\/$/, '')

  // Strategy 1: Remote yt-dlp microservice (for Netlify/production if configured)
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
        if (data && (data.downloadUrl || data.url)) {
          return data
        }
      }
    } catch (err) {
      console.warn('[yt-dlp] Remote service call failed, trying local fallback:', err)
    }
  }

  // Strategy 2: Local Python yt-dlp module execution
  try {
    const pythonExe = process.env.PYTHON_PATH || 'python'
    const { stdout } = await execFileAsync(
      pythonExe,
      ['-m', 'yt_dlp', '--dump-single-json', '--no-warnings', '--no-playlist', url],
      {
        timeout: 30000,
        maxBuffer: 10 * 1024 * 1024, // 10MB JSON buffer
      }
    )

    if (!stdout || !stdout.trim()) return null
    const json = JSON.parse(stdout.trim())

    return parseYtDlpJson(json, url, platform)
  } catch (err) {
    console.warn('[yt-dlp] Local extraction error:', err instanceof Error ? err.message : err)
    return null
  }
}

function parseYtDlpJson(json: any, originalUrl: string, platform: SupportedPlatform): VideoData | null {
  if (!json) return null

  const id = String(json.id || Date.now())
  const title = json.title || `${capitalize(platform)} Media`
  const thumbnail = json.thumbnail || (Array.isArray(json.thumbnails) ? json.thumbnails[json.thumbnails.length - 1]?.url : '') || ''
  const duration = Math.round(json.duration || 0)
  const author = json.uploader || json.creator || json.channel || `${capitalize(platform)} Creator`
  const description = json.description || title

  // Parse formats for progressive MP4s with audio
  const formats: any[] = Array.isArray(json.formats) ? json.formats : []
  
  // Prefer formats that have BOTH video and audio codec (progressive direct MP4s)
  const progressiveMp4s = formats.filter(
    (f) =>
      f.url &&
      (f.ext === 'mp4' || f.vcodec !== 'none') &&
      f.vcodec !== 'none' &&
      f.acodec !== 'none' &&
      !f.url.includes('.m3u8')
  )

  // Direct video formats
  const videoFormats = formats.filter(
    (f) => f.url && (f.ext === 'mp4' || f.vcodec !== 'none') && f.vcodec !== 'none'
  )

  // Audio-only formats
  const audioFormats = formats.filter(
    (f) => f.url && (f.ext === 'm4a' || f.ext === 'mp3' || f.acodec !== 'none') && f.vcodec === 'none'
  )

  const qualities: VideoQualityOption[] = []
  
  const pool = progressiveMp4s.length > 0 ? progressiveMp4s : videoFormats
  // Sort by resolution / height / bitrate descending
  pool.sort((a, b) => (b.height || b.tbr || 0) - (a.height || a.tbr || 0))

  for (const f of pool) {
    const res = f.format_note || (f.height ? `${f.height}p` : '') || (f.format ? f.format.split(' ')[0] : 'HD')
    const label = `${res} MP4`.trim()
    if (!qualities.some((q) => q.url === f.url)) {
      qualities.push({
        quality: label,
        url: f.url,
        resolution: f.height ? `${f.height}p` : undefined,
      })
    }
  }

  // Best direct download URL
  const downloadUrl = qualities[0]?.url || json.url || (progressiveMp4s[0]?.url) || (videoFormats[0]?.url) || ''

  // Best audio URL
  const audioUrl = audioFormats[0]?.url || json.audio_url || undefined

  // Handle multi-image carousels (e.g. Instagram posts or Twitter photos)
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
