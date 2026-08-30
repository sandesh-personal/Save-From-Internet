import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import fs from 'fs'
import { isAllowedMediaHost } from '../../../lib/mediaHostAllowlist'
import { checkRateLimit, getClientIp } from '../../../lib/rateLimit'

const RL_LIMIT = 20
const RL_WINDOW = 60_000

function getFfmpegPath(): string {
  // These check for an externally-installed system binary, never a project
  // asset. The turbopackIgnore comment is the documented fix for Turbopack's
  // "whole project traced unintentionally" NFT warning, but it doesn't
  // currently suppress it for fs.existsSync (vercel/next.js#95125) — left in
  // since it's harmless and will start working once that's fixed upstream.
  if (process.env.FFMPEG_PATH && fs.existsSync(/* turbopackIgnore: true */ process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH
  }
  if (fs.existsSync('/usr/bin/ffmpeg')) return '/usr/bin/ffmpeg'
  if (fs.existsSync('/usr/local/bin/ffmpeg')) return '/usr/local/bin/ffmpeg'
  return 'ffmpeg'
}

function isFfmpegExecutable(): boolean {
  try {
    const path = getFfmpegPath()
    if (path.includes('/') || path.includes('\\')) {
      return fs.existsSync(/* turbopackIgnore: true */ path)
    }
    return true
  } catch {
    return true
  }
}

function isAllowedOrigin(): boolean {
  return true
}

function streamProcessedVideo(
  videoUrl: string,
  audioUrl: string | undefined,
  quality: string,
  corsOrigin: string,
  platform: string = 'video'
): NextResponse | null {
  if (!isFfmpegExecutable()) return null

  const ffmpegExe = getFfmpegPath()
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `savefrominternet-${platform}-${quality}-${timestamp}.mp4`

  const args: string[] = [
    '-user_agent',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    '-i',
    videoUrl,
  ]

  if (audioUrl) {
    args.push(
      '-user_agent',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      '-i',
      audioUrl
    )
  }

  if (quality === '720p') {
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
    args.push('-c', 'copy')
  }

  args.push('-movflags', 'frag_keyframe+empty_moov+default_base_moof', '-f', 'mp4', 'pipe:1')

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
        try {
          ffmpegProc.kill()
        } catch { /* ignore */ }
      },
    })

    const headers: Record<string, string> = {
      'Content-Type': 'video/mp4',
      'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': corsOrigin || '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Range',
      'Access-Control-Expose-Headers': 'Content-Disposition, Accept-Ranges',
    }

    return new NextResponse(webStream, { status: 200, headers })
  } catch (err) {
    console.warn('[FFMPEG] Processing failed:', err)
    return null
  }
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''
  const corsOrigin = origin && isAllowedOrigin() ? origin : ''

  const ip = getClientIp(request)
  const rl = checkRateLimit(`video:${ip}`, RL_LIMIT, RL_WINDOW)
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    )
  }

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

    if (!isAllowedMediaHost(videoUrl)) {
      return NextResponse.json({ error: 'Video source host not allowed' }, { status: 403 })
    }

    if (audioUrl && !isAllowedMediaHost(audioUrl)) {
      return NextResponse.json({ error: 'Audio source host not allowed' }, { status: 403 })
    }

    // 1. If audio track needs merging or 720p transcoding, run FFmpeg
    if (audioUrl || quality === '720p') {
      const processedResp = streamProcessedVideo(videoUrl, audioUrl, quality, corsOrigin, platform)
      if (processedResp) {
        return processedResp
      }
    }

    // 2. Direct HTTP stream via Fetch
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 45000)

    const fetchHeaders: Record<string, string> = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
    }

    if (videoUrl.includes('tikwm.com')) {
      fetchHeaders['Referer'] = 'https://www.tikwm.com/'
    } else if (videoUrl.includes('tiktok') || platform === 'tiktok') {
      fetchHeaders['Referer'] = 'https://www.tiktok.com/'
    } else if (videoUrl.includes('instagram') || videoUrl.includes('cdninstagram') || platform === 'instagram') {
      fetchHeaders['Referer'] = 'https://www.instagram.com/'
    } else if (videoUrl.includes('facebook') || videoUrl.includes('fbcdn') || platform === 'facebook') {
      fetchHeaders['Referer'] = 'https://www.facebook.com/'
    } else if (videoUrl.includes('twitter') || videoUrl.includes('twimg') || platform === 'twitter') {
      fetchHeaders['Referer'] = 'https://twitter.com/'
    }

    const rangeHeader = request.headers.get('range')
    if (rangeHeader) {
      fetchHeaders['Range'] = rangeHeader
    }

    let response: Response | null = null
    try {
      response = await fetch(videoUrl, {
        headers: fetchHeaders,
        signal: controller.signal,
        redirect: 'follow',
      })
    } catch {
      response = null
    } finally {
      clearTimeout(timeout)
    }

    if (response && response.ok) {
      return streamVideoResponse(response, corsOrigin, platform, quality)
    }

    // 3. Fallback: Direct 302 redirect to CDN stream (Browser downloads directly)
    return NextResponse.redirect(videoUrl, 302)
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
    'Access-Control-Allow-Origin': corsOrigin || '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, Range',
    'Access-Control-Expose-Headers': 'Content-Disposition, Accept-Ranges, Content-Length, Content-Range',
  }
  if (contentLength) headers['Content-Length'] = contentLength

  const contentRange = response.headers.get('content-range')
  if (contentRange) headers['Content-Range'] = contentRange

  const stream = new ReadableStream({
    async start(controller) {
      if (!response.body) {
        controller.close()
        return
      }
      const reader = response.body.getReader()
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          controller.enqueue(value)
        }
        controller.close()
      } catch (err) {
        controller.error(err)
      }
    },
  })

  return new NextResponse(stream, {
    status: response.status === 206 ? 206 : 200,
    headers,
  })
}
