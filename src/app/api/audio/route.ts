import { NextRequest, NextResponse } from 'next/server'

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Referer: 'https://www.tiktok.com/',
}

function isAllowedAudioHost(url: string): boolean {
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

// Fallback: re-fetch from tikwm and return the music URL
async function fetchAudioViaTikwmFallback(tiktokUrl: string): Promise<Response | null> {
  try {
    const apiResp = await fetch(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}&hd=1`,
      { headers: { Referer: 'https://www.tikwm.com/' } }
    )
    const apiData = await apiResp.json()
    if (apiData?.code !== 0 || !apiData?.data) return null

    // Prefer the dedicated music MP3; fall back to the video stream
    let audioUrl: string = apiData.data.music || apiData.data.play || apiData.data.hdplay || ''
    if (!audioUrl) return null
    if (audioUrl.startsWith('/')) audioUrl = 'https://www.tikwm.com' + audioUrl
    if (!isAllowedAudioHost(audioUrl)) return null

    const audioResp = await fetch(audioUrl, { headers: FETCH_HEADERS })
    if (!audioResp.ok || isJsonContentType(audioResp)) return null
    return audioResp
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const audioUrl = searchParams.get('url')

    if (!audioUrl) {
      return NextResponse.json({ success: false, error: 'Audio URL is required' }, { status: 400 })
    }

    if (!isAllowedAudioHost(audioUrl)) {
      return NextResponse.json({ success: false, error: 'Audio source not allowed' }, { status: 403 })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    let response: Response
    try {
      response = await fetch(audioUrl, { headers: FETCH_HEADERS, signal: controller.signal })
    } finally {
      clearTimeout(timeout)
    }

    // If the primary URL failed, try to re-fetch from tikwm using it as the TikTok source
    if (!response.ok || isJsonContentType(response)) {
      const fallbackResp = await fetchAudioViaTikwmFallback(audioUrl)
      if (fallbackResp) return buildAudioResponse(fallbackResp)
      return NextResponse.json({ success: false, error: 'Failed to fetch audio' }, { status: 500 })
    }

    return buildAudioResponse(response)
  } catch (error) {
    console.error('Audio extraction error:', error instanceof Error ? error.message : 'Unknown')
    return NextResponse.json({ success: false, error: 'Failed to extract audio' }, { status: 500 })
  }
}

function buildAudioResponse(response: Response): NextResponse {
  const contentLength = response.headers.get('content-length')
  const contentType = response.headers.get('content-type') || ''
  // Use audio/mpeg for MP3 sources; keep video content-type for video-as-audio fallback
  const isVideoSource = contentType.startsWith('video/')
  const headers: Record<string, string> = {
    'Content-Type': isVideoSource ? 'video/mp4' : 'audio/mpeg',
    'Content-Disposition': 'attachment; filename="savefrominternet.com-tiktok-audio.mp3"',
    'Cache-Control': 'no-cache',
  }
  if (contentLength) headers['Content-Length'] = contentLength
  return new NextResponse(response.body, { headers })
}
