import { NextRequest, NextResponse } from 'next/server'

const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Referer: 'https://www.tiktok.com/',
  Accept: 'video/mp4,video/*;q=0.9,*/*;q=0.5',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'identity',
}

const ALLOWED_ORIGINS = [
  'https://savefrominternet.com',
  'https://www.savefrominternet.com',
  'http://localhost:3000',
]

function isAllowedVideoHost(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    if (['www.tikwm.com', 'tikwm.com', 'robotilab.online'].includes(hostname)) return true
    return (
      hostname.endsWith('.tiktok.com') ||
      hostname.endsWith('.tiktokv.com') ||
      hostname.endsWith('.tiktokcdn.com') ||
      hostname.endsWith('.tiktokcdn-eu.com') ||
      hostname.endsWith('.tiktokcdn-us.com') ||
      hostname.endsWith('.muscdn.com')
    )
  } catch {
    return false
  }
}

function isJsonContentType(response: Response): boolean {
  const ct = response.headers.get('content-type') || ''
  return ct.includes('application/json') || ct.includes('text/plain')
}

async function fetchViaTikwmFallback(tiktokUrl: string): Promise<Response | null> {
  try {
    const apiResp = await fetch(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}&hd=1`,
      { headers: { Referer: 'https://www.tikwm.com/' } }
    )
    const apiData = await apiResp.json()
    if (apiData?.code !== 0 || !apiData?.data) return null

    let dlUrl: string = apiData.data.play || apiData.data.hdplay || apiData.data.wmplay
    if (!dlUrl) return null
    if (dlUrl.startsWith('/')) dlUrl = 'https://www.tikwm.com' + dlUrl
    if (!isAllowedVideoHost(dlUrl)) return null

    const videoResp = await fetch(dlUrl, { headers: FETCH_HEADERS })
    if (!videoResp.ok || isJsonContentType(videoResp)) return null
    return videoResp
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[1]

  try {
    const { searchParams } = new URL(request.url)
    const videoUrl = searchParams.get('url')

    if (!videoUrl) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
    }

    if (!isAllowedVideoHost(videoUrl)) {
      return NextResponse.json({ error: 'Video source not allowed' }, { status: 403 })
    }

    console.log('Proxying video from host:', new URL(videoUrl).hostname)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    let response: Response
    try {
      response = await fetch(videoUrl, { headers: FETCH_HEADERS, signal: controller.signal })
    } finally {
      clearTimeout(timeout)
    }

    // If robotilab.online returns JSON (error), fall back to tikwm
    if (videoUrl.includes('robotilab.online') && (!response.ok || isJsonContentType(response))) {
      console.log('robotilab.online failed, falling back to tikwm')
      try {
        const inner = new URL(videoUrl).searchParams.get('videoUrl')
        if (inner && isAllowedVideoHost(inner)) {
          const fallbackResp = await fetchViaTikwmFallback(inner)
          if (fallbackResp) return streamVideoResponse(fallbackResp, corsOrigin)
        }
      } catch { /* fall through to error */ }
    }

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch video' }, { status: response.status })
    }

    if (isJsonContentType(response)) {
      return NextResponse.json({ error: 'Video source returned an error. Please try again.' }, { status: 502 })
    }

    return streamVideoResponse(response, corsOrigin)
  } catch (error) {
    console.error('Video proxy error:', error)
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 })
  }
}

function streamVideoResponse(response: Response, corsOrigin: string): NextResponse {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `savefrominternet.com-tiktok-video-${timestamp}.mp4`
  const contentLength = response.headers.get('content-length')

  const headers: Record<string, string> = {
    'Content-Type': 'video/mp4',
    'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Expose-Headers': 'Content-Disposition, Accept-Ranges',
  }
  if (contentLength) headers['Content-Length'] = contentLength

  return new NextResponse(response.body, { status: 200, headers })
}
