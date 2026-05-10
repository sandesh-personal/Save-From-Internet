export interface Env {
  TIKWM_API_KEY: string
}

const ALLOWED_ORIGINS = [
  'https://savefrominternet.com',
  'https://www.savefrominternet.com',
]

const MEDIA_FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Referer: 'https://www.tiktok.com/',
  Accept: 'video/mp4,video/*;q=0.9,*/*;q=0.5',
  'Accept-Language': 'en-US,en;q=0.5',
}

function isAllowedMediaHost(hostname: string): boolean {
  if (['www.tikwm.com', 'tikwm.com', 'robotilab.online'].includes(hostname)) return true
  return (
    hostname.endsWith('.tiktok.com') ||
    hostname.endsWith('.tiktokv.com') ||
    hostname.endsWith('.tiktokcdn.com') ||
    hostname.endsWith('.tiktokcdn-eu.com') ||
    hostname.endsWith('.tiktokcdn-us.com') ||
    hostname.endsWith('.muscdn.com')
  )
}

function isJsonResponse(response: Response): boolean {
  const ct = response.headers.get('content-type') || ''
  return ct.includes('application/json') || ct.includes('text/plain')
}

function corsOrigin(request: Request): string {
  const origin = request.headers.get('origin') || ''
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[1]
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Expose-Headers': 'Content-Disposition, Accept-Ranges',
  }
}

async function apiFallback(tiktokUrl: string, apiKey: string, wantAudio: boolean): Promise<Response | null> {
  try {
    const apiResp = await fetch(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}&hd=1&api_key=${apiKey}`,
      { headers: { Referer: 'https://www.tikwm.com/' } }
    )
    const data: { code: number; data?: { play?: string; hdplay?: string; wmplay?: string; music?: string } } = await apiResp.json()
    if (data?.code !== 0 || !data?.data) return null

    let url = wantAudio
      ? (data.data.music || data.data.play || data.data.hdplay || '')
      : (data.data.play || data.data.hdplay || data.data.wmplay || '')

    if (!url) return null
    if (url.startsWith('/')) url = 'https://www.tikwm.com' + url

    const { hostname } = new URL(url)
    if (!isAllowedMediaHost(hostname)) return null

    const mediaResp = await fetch(url, { headers: MEDIA_FETCH_HEADERS })
    if (!mediaResp.ok || isJsonResponse(mediaResp)) return null
    return mediaResp
  } catch {
    return null
  }
}

async function handleVideo(request: Request, env: Env): Promise<Response> {
  const origin = corsOrigin(request)
  const { searchParams } = new URL(request.url)
  const videoUrl = searchParams.get('url')

  if (!videoUrl) {
    return Response.json({ error: 'url param required' }, { status: 400, headers: corsHeaders(origin) })
  }

  let hostname: string
  try {
    hostname = new URL(videoUrl).hostname
  } catch {
    return Response.json({ error: 'Invalid URL' }, { status: 400, headers: corsHeaders(origin) })
  }

  if (!isAllowedMediaHost(hostname)) {
    return Response.json({ error: 'Video source not allowed' }, { status: 403, headers: corsHeaders(origin) })
  }

  const response = await fetch(videoUrl, { headers: MEDIA_FETCH_HEADERS })

  if (videoUrl.includes('robotilab.online') && (!response.ok || isJsonResponse(response))) {
    const inner = new URL(videoUrl).searchParams.get('videoUrl')
    if (inner) {
      const fallback = await apiFallback(inner, env.TIKWM_API_KEY, false)
      if (fallback) return streamMedia(fallback, 'video', origin)
    }
  }

  if (!response.ok || isJsonResponse(response)) {
    return Response.json({ error: 'Failed to fetch video' }, { status: 502, headers: corsHeaders(origin) })
  }

  return streamMedia(response, 'video', origin)
}

async function handleAudio(request: Request, env: Env): Promise<Response> {
  const origin = corsOrigin(request)
  const { searchParams } = new URL(request.url)
  const audioUrl = searchParams.get('url')

  if (!audioUrl) {
    return Response.json({ error: 'url param required' }, { status: 400, headers: corsHeaders(origin) })
  }

  let hostname: string
  try {
    hostname = new URL(audioUrl).hostname
  } catch {
    return Response.json({ error: 'Invalid URL' }, { status: 400, headers: corsHeaders(origin) })
  }

  if (!isAllowedMediaHost(hostname)) {
    return Response.json({ error: 'Audio source not allowed' }, { status: 403, headers: corsHeaders(origin) })
  }

  const response = await fetch(audioUrl, { headers: MEDIA_FETCH_HEADERS })

  if (!response.ok || isJsonResponse(response)) {
    const fallback = await apiFallback(audioUrl, env.TIKWM_API_KEY, true)
    if (fallback) return streamMedia(fallback, 'audio', origin)
    return Response.json({ error: 'Failed to fetch audio' }, { status: 502, headers: corsHeaders(origin) })
  }

  return streamMedia(response, 'audio', origin)
}

function streamMedia(response: Response, type: 'video' | 'audio', origin: string): Response {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const isVideo = type === 'video' || (response.headers.get('content-type') || '').startsWith('video/')
  const ext = isVideo ? 'mp4' : 'mp3'
  const filename = `savefrominternet.com-tiktok-${type}-${timestamp}.${ext}`
  const contentLength = response.headers.get('content-length')

  const headers: Record<string, string> = {
    'Content-Type': isVideo ? 'video/mp4' : 'audio/mpeg',
    'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache',
    ...corsHeaders(origin),
  }
  if (contentLength) headers['Content-Length'] = contentLength

  return new Response(response.body, { status: 200, headers })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)
    const origin = corsOrigin(request)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    if (pathname === '/video' && request.method === 'GET') return handleVideo(request, env)
    if (pathname === '/audio' && request.method === 'GET') return handleAudio(request, env)

    return new Response('Not found', { status: 404 })
  },
}
