import { NextRequest, NextResponse } from 'next/server'
import { Downloader } from '../../../lib/downloader'
import { validateUrl } from '../../../lib/validator'

// ── Rate limiter: 12 requests / 60 s per IP ─────────────────────────────────
// Note: module-level state survives within a single serverless instance.
// For distributed rate limiting across many instances use Upstash Redis.
const RL_LIMIT = 12
const RL_WINDOW = 60_000
const rlStore = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now()
  const entry = rlStore.get(ip)
  if (!entry || now > entry.resetAt) {
    rlStore.set(ip, { count: 1, resetAt: now + RL_WINDOW })
    return { ok: true }
  }
  if (entry.count >= RL_LIMIT) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  entry.count++
  return { ok: true }
}

// ── Bot UA blocklist ─────────────────────────────────────────────────────────
const BOT_PATTERNS = /python-requests|curl\/|wget\/|scrapy|httpclient|go-http|java\/|okhttp|axios\/0\.[0-4]/i

export async function POST(request: NextRequest) {
  // Block obvious scrapers by user-agent
  const ua = request.headers.get('user-agent') ?? ''
  if (!ua || BOT_PATTERNS.test(ua)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  // Rate limit by IP
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  const rl = checkRateLimit(ip)
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    )
  }

  try {
    const { url, type = 'video' } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      )
    }

    if (!validateUrl(url)) {
      return NextResponse.json(
        { success: false, error: 'Invalid URL. Please enter a valid TikTok, Facebook, Instagram, or Twitter (X) link.' },
        { status: 400 }
      )
    }

    const downloader = new Downloader()
    const videoData = await downloader.downloadVideo(url)

    if (!videoData || (!videoData.downloadUrl && (!videoData.images || videoData.images.length === 0))) {
      return NextResponse.json(
        { success: false, error: 'Failed to extract media download URL. The post may be private or unavailable.' },
        { status: 500 }
      )
    }

    const platform = videoData.platform || 'video'

    // Route video/audio through CF Worker if configured, else fall back to local proxy
    const workerBase = process.env.PROXY_WORKER_URL?.replace(/\/$/, '')
    const audioSourceUrl = videoData.audioUrl
    const isPhoto = Boolean(videoData.images && videoData.images.length > 0 && (!videoData.downloadUrl || !videoData.downloadUrl.includes('.mp4')))
    
    const videoProxyUrl = videoData.downloadUrl && !isPhoto
      ? `/api/video?url=${encodeURIComponent(videoData.downloadUrl)}&platform=${platform}`
      : ''

    const audioProxyUrl = audioSourceUrl
      ? `/api/audio?url=${encodeURIComponent(audioSourceUrl)}&platform=${platform}`
      : undefined

    const mappedQualities = isPhoto
      ? undefined
      : videoData.qualities?.map((q) => ({
          quality: q.quality,
          url: `/api/video?url=${encodeURIComponent(q.url)}&platform=${platform}`,
        }))

    return NextResponse.json({
      success: true,
      downloadUrl: videoProxyUrl,
      audioUrl: audioProxyUrl,
      qualities: mappedQualities,
      platform,
      metadata: {
        title: videoData.title,
        author: videoData.author,
        duration: videoData.duration,
        thumbnail: videoData.thumbnail,
        platform,
        isPhotoCarousel: videoData.isPhotoCarousel,
        images:
          videoData.images?.map((img) => ({
            ...img,
            selected: true,
          })) || [],
      },
    })
  } catch (error) {
    console.error('Download error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to process media. Please try again.' },
      { status: 500 }
    )
  }
}
