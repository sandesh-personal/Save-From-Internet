import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import fs from 'fs'

const PRIMARY_API_KEY = process.env.TIKWM_API_KEY ?? ''

const ALLOWED_ORIGINS = [
  'https://savefrominternet.com',
  'https://www.savefrominternet.com',
  'http://localhost:3000',
]

function getFfmpegPath(): string {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH
  }
  const wingetFfmpeg =
    'C:\\Users\\sande\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-N-125875-g5d4d3bdc61-win64-gpl\\bin\\ffmpeg.exe'
  if (fs.existsSync(wingetFfmpeg)) {
    return wingetFfmpeg
  }
  return 'ffmpeg'
}

function isAllowedVideoHost(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    if (['www.tikwm.com', 'tikwm.com', 'robotilab.online', 'api.cobalt.tools'].includes(hostname)) return true
    return (
      // TikTok
      hostname.endsWith('.tiktok.com') ||
      hostname.endsWith('.tiktokv.com') ||
      hostname.endsWith('.tiktokcdn.com') ||
      hostname.endsWith('.tiktokcdn-eu.com') ||
      hostname.endsWith('.tiktokcdn-us.com') ||
      hostname.endsWith('.muscdn.com') ||
      hostname.includes('tiktok') ||
      // Facebook & Meta
      hostname.endsWith('.fbcdn.net') ||
      hostname.endsWith('.facebook.com') ||
      hostname.endsWith('.fbsbx.com') ||
      hostname.endsWith('.akamaihd.net') ||
      hostname.includes('fbcdn') ||
      // Instagram
      hostname.endsWith('.cdninstagram.com') ||
      hostname.endsWith('.instagram.com') ||
      hostname.includes('instagram') ||
      // Twitter / X
      hostname.endsWith('.twimg.com') ||
      hostname.endsWith('.twitter.com') ||
      hostname.endsWith('.x.com') ||
      hostname.includes('twimg') ||
      // Universal CDNs
      hostname.endsWith('.cloudfront.net') ||
      hostname.endsWith('.rapidapi.com') ||
      hostname.endsWith('.rapidapi.net')
    )
  } catch {
    return false
  }
}

function getPlatformHeaders(videoUrl: string, platform?: string): Record<string, string> {
  let referer: string | undefined = undefined

  const urlLower = videoUrl.toLowerCase()
  if (urlLower.includes('tiktok') || platform === 'tiktok') {
    referer = 'https://www.tiktok.com/'
  } else if (urlLower.includes('instagram') || urlLower.includes('cdninstagram') || platform === 'instagram') {
    referer = 'https://www.instagram.com/'
  } else if (urlLower.includes('fbcdn') || urlLower.includes('facebook') || urlLower.includes('fbsbx') || platform === 'facebook') {
    referer = 'https://www.facebook.com/'
  } else if (urlLower.includes('twimg') || urlLower.includes('twitter') || urlLower.includes('x.com') || platform === 'twitter') {
    referer = 'https://twitter.com/'
  }

  const headers: Record<string, string> = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    Accept: 'video/mp4,video/*;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'identity',
  }
  if (referer) {
    headers['Referer'] = referer
  }
  return headers
}

function isJsonContentType(response: Response): boolean {
  const ct = response.headers.get('content-type') || ''
  return ct.includes('application/json') || ct.includes('text/plain')
}

async function fetchViaApiFallback(tiktokUrl: string): Promise<Response | null> {
  try {
    const apiResp = await fetch(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}&hd=1&api_key=${PRIMARY_API_KEY}`,
      { headers: { Referer: 'https://www.tikwm.com/' } }
    )
    const apiData = await apiResp.json()
    if (apiData?.code !== 0 || !apiData?.data) return null

    let dlUrl: string = apiData.data.play || apiData.data.hdplay || apiData.data.wmplay
    if (!dlUrl) return null
    if (dlUrl.startsWith('/')) dlUrl = 'https://www.tikwm.com' + dlUrl
    if (!isAllowedVideoHost(dlUrl)) return null

    const videoResp = await fetch(dlUrl, { headers: getPlatformHeaders(dlUrl, 'tiktok') })
    if (!videoResp.ok || isJsonContentType(videoResp)) return null
    return videoResp
  } catch {
    return null
  }
}

function streamProcessedVideo(
  videoUrl: string,
  audioUrl: string | undefined,
  quality: string,
  corsOrigin: string,
  platform: string = 'video'
): NextResponse | null {
  const ffmpegExe = getFfmpegPath()
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `savefrominternet-${platform}-${quality}-${timestamp}.mp4`

  const args: string[] = [
    '-headers',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\n',
    '-i',
    videoUrl,
  ]

  if (audioUrl) {
    args.push(
      '-headers',
      'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\n',
      '-i',
      audioUrl
    )
  }

  // Quality-specific processing rules
  if (quality === '720p') {
    // 720p HD Standard: Scaled to 720p with capped 600k bitrate so it is guaranteed smaller than 1080p & 4K
    args.push(
      '-vf',
      'scale=-2:min(ih\\,720)',
      '-c:v',
      'libx264',
      '-b:v',
      '600k',
      '-maxrate',
      '750k',
      '-bufsize',
      '1M',
      '-preset',
      'veryfast',
      '-c:a',
      'aac',
      '-b:a',
      '96k'
    )
  } else {
    // 1080p Full HD & Best (4K Quality): Untouched stream copy for highest original master fidelity & maximum size
    args.push('-c', 'copy')
  }

  args.push('-movflags', 'frag_keyframe+empty_moov', '-f', 'mp4', 'pipe:1')

  try {
    const ffmpegProc = spawn(ffmpegExe, args)

    const nodeStream = ffmpegProc.stdout
    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on('data', (chunk) => {
          controller.enqueue(new Uint8Array(chunk))
        })
        nodeStream.on('end', () => {
          controller.close()
        })
        nodeStream.on('error', (err) => {
          controller.error(err)
        })
      },
      cancel() {
        ffmpegProc.kill()
      },
    })

    const headers: Record<string, string> = {
      'Content-Type': 'video/mp4',
      'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Range',
      'Access-Control-Expose-Headers': 'Content-Disposition, Accept-Ranges',
    }

    return new NextResponse(webStream, { status: 200, headers })
  } catch (err) {
    console.warn('[FFMPEG] Processing failed, falling back to direct stream:', err)
    return null
  }
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[1]

  try {
    const { searchParams } = new URL(request.url)
    const rawVideoUrl = searchParams.get('url')
    const rawAudioUrl = searchParams.get('audioUrl')
    const platform = searchParams.get('platform') || 'video'
    const quality = searchParams.get('quality') || 'best'

    if (!rawVideoUrl) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
    }

    const videoUrl = rawVideoUrl
      .replace(/&amp;/gi, '&')
      .replace(/&#038;/gi, '&')
      .replace(/\\u0026/g, '&')
      .trim()

    const audioUrl = rawAudioUrl
      ? rawAudioUrl
          .replace(/&amp;/gi, '&')
          .replace(/&#038;/gi, '&')
          .replace(/\\u0026/g, '&')
          .trim()
      : undefined

    if (!isAllowedVideoHost(videoUrl)) {
      return NextResponse.json({ error: 'Video source host not allowed' }, { status: 403 })
    }

    // When audio needs muxing OR when 720p downscaling is requested:
    if (audioUrl || quality === '720p') {
      const processedResp = streamProcessedVideo(videoUrl, audioUrl, quality, corsOrigin, platform)
      if (processedResp) {
        return processedResp
      }
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 45000)

    const fetchHeaders = getPlatformHeaders(videoUrl, platform)

    // Forward range requests if client sent one
    const rangeHeader = request.headers.get('range')
    if (rangeHeader) {
      fetchHeaders['Range'] = rangeHeader
    }

    let response: Response
    try {
      response = await fetch(videoUrl, {
        headers: fetchHeaders,
        signal: controller.signal,
        redirect: 'follow',
      })
    } finally {
      clearTimeout(timeout)
    }

    if (videoUrl.includes('robotilab.online') && (!response.ok || isJsonContentType(response))) {
      try {
        const inner = new URL(videoUrl).searchParams.get('videoUrl')
        if (inner && isAllowedVideoHost(inner)) {
          const fallbackResp = await fetchViaApiFallback(inner)
          if (fallbackResp) return streamVideoResponse(fallbackResp, corsOrigin, platform, quality)
        }
      } catch { /* fall through */ }
    }

    if (!response.ok) {
      // Try secondary attempt without Referer header in case CDN rejects referer
      try {
        const retryResp = await fetch(videoUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            Accept: '*/*',
          },
          redirect: 'follow',
        })
        if (retryResp.ok && !isJsonContentType(retryResp)) {
          return streamVideoResponse(retryResp, corsOrigin, platform, quality)
        }
      } catch { /* fallback failed */ }

      return NextResponse.json({ error: 'Failed to fetch video stream from source' }, { status: response.status })
    }

    if (isJsonContentType(response)) {
      return NextResponse.json({ error: 'Video source returned an error. Please try again.' }, { status: 502 })
    }

    return streamVideoResponse(response, corsOrigin, platform, quality)
  } catch (error) {
    console.error('Video proxy error:', error)
    return NextResponse.json({ error: 'Failed to stream video. Please try again.' }, { status: 500 })
  }
}

function streamVideoResponse(
  response: Response,
  corsOrigin: string,
  platform: string = 'video',
  quality: string = 'best'
): NextResponse {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `savefrominternet-${platform}-${quality}-${timestamp}.mp4`
  const contentLength = response.headers.get('content-length')
  const contentType = response.headers.get('content-type') || 'video/mp4'

  const headers: Record<string, string> = {
    'Content-Type': contentType.startsWith('video/') ? contentType : 'video/mp4',
    'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=3600',
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, Range',
    'Access-Control-Expose-Headers': 'Content-Disposition, Accept-Ranges, Content-Length, Content-Range',
  }
  if (contentLength) headers['Content-Length'] = contentLength

  const contentRange = response.headers.get('content-range')
  if (contentRange) headers['Content-Range'] = contentRange

  return new NextResponse(response.body, {
    status: response.status === 206 ? 206 : 200,
    headers,
  })
}
