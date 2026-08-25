import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import fs from 'fs'

function getFfmpegPath(): string {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH
  }
  if (fs.existsSync('/usr/bin/ffmpeg')) return '/usr/bin/ffmpeg'
  if (fs.existsSync('/usr/local/bin/ffmpeg')) return '/usr/local/bin/ffmpeg'
  const wingetFfmpeg =
    'C:\\Users\\sande\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-N-125875-g5d4d3bdc61-win64-gpl\\bin\\ffmpeg.exe'
  if (fs.existsSync(wingetFfmpeg)) {
    return wingetFfmpeg
  }
  return 'ffmpeg'
}

function isFfmpegExecutable(): boolean {
  try {
    const path = getFfmpegPath()
    if (path.includes('/') || path.includes('\\')) {
      return fs.existsSync(path)
    }
    return true
  } catch {
    return true
  }
}

function isAllowedAudioHost(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false
    const host = parsed.hostname.toLowerCase()
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host.startsWith('192.168.') ||
      host.startsWith('10.') ||
      host.startsWith('172.16.')
    ) {
      return false
    }
    return true
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const rawAudioUrl = searchParams.get('url')
    const platform = searchParams.get('platform') || 'audio'
    const quality = searchParams.get('quality') || 'best'

    if (!rawAudioUrl) {
      return NextResponse.json({ success: false, error: 'Audio URL is required' }, { status: 400 })
    }

    let audioUrl = rawAudioUrl
      .replace(/&amp;/gi, '&')
      .replace(/&#038;/gi, '&')
      .replace(/\\u0026/g, '&')
      .trim()

    // Unwrap if wrapped inside /api/video proxy or query param
    if (audioUrl.includes('url=')) {
      try {
        const dummyUrl = new URL(audioUrl, 'https://savefrominternet.com')
        const inner = dummyUrl.searchParams.get('audioUrl') || dummyUrl.searchParams.get('url')
        if (inner) {
          audioUrl = inner.trim()
        }
      } catch { /* ignore */ }
    }

    if (!isAllowedAudioHost(audioUrl)) {
      return NextResponse.json({ success: false, error: 'Audio source host not allowed' }, { status: 403 })
    }

    const bitrate = quality === 'best' ? '320k' : quality === '192kbps' ? '192k' : '128k'
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `savefrominternet-${platform}-audio-${quality}-${timestamp}.mp3`

    // Try FFmpeg MP3 transcoding if available
    if (isFfmpegExecutable()) {
      try {
        const ffmpegExe = getFfmpegPath()
        let refererHeader = ''
        if (audioUrl.includes('tikwm.com')) {
          refererHeader = 'Referer: https://www.tikwm.com/\r\n'
        } else if (audioUrl.includes('tiktok') || platform === 'tiktok') {
          refererHeader = 'Referer: https://www.tiktok.com/\r\n'
        } else if (audioUrl.includes('instagram') || audioUrl.includes('cdninstagram') || platform === 'instagram') {
          refererHeader = 'Referer: https://www.instagram.com/\r\n'
        } else if (audioUrl.includes('facebook') || audioUrl.includes('fbcdn') || platform === 'facebook') {
          refererHeader = 'Referer: https://www.facebook.com/\r\n'
        } else if (audioUrl.includes('twitter') || audioUrl.includes('twimg') || platform === 'twitter') {
          refererHeader = 'Referer: https://twitter.com/\r\n'
        }

        const ffmpegArgs: string[] = [
          '-headers',
          `${refererHeader}User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36\r\n`,
          '-i',
          audioUrl,
          '-vn',
          '-c:a',
          'libmp3lame',
          '-b:a',
          bitrate,
          '-f',
          'mp3',
          'pipe:1',
        ]

        const ffmpegProc = spawn(ffmpegExe, ffmpegArgs)

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
          'Content-Type': 'audio/mpeg',
          'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Expose-Headers': 'Content-Disposition',
        }

        return new NextResponse(webStream, { status: 200, headers })
      } catch {
        // Fall through to direct fetch if FFmpeg fails
      }
    }

    // Direct stream via fetch
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 35000)

    const fetchHeaders: Record<string, string> = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      Accept: '*/*',
    }

    let response: Response | null = null
    try {
      response = await fetch(audioUrl, { headers: fetchHeaders, signal: controller.signal, redirect: 'follow' })
    } catch {
      response = null
    } finally {
      clearTimeout(timeout)
    }

    if (response && response.ok) {
      return buildAudioResponse(response, platform, filename)
    }

    // Fallback: Direct 302 redirect to audio stream
    return NextResponse.redirect(audioUrl, 302)
  } catch (error) {
    console.error('Audio extraction error:', error instanceof Error ? error.message : 'Unknown')
    return NextResponse.json({ success: false, error: 'Failed to extract audio' }, { status: 500 })
  }
}

function buildAudioResponse(response: Response, platform: string = 'audio', filename?: string): NextResponse {
  const contentLength = response.headers.get('content-length')
  const contentType = response.headers.get('content-type') || ''
  const isVideoSource = contentType.startsWith('video/')
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const outFilename = filename || `savefrominternet-${platform}-audio-${timestamp}.${isVideoSource ? 'mp4' : 'mp3'}`

  const headers: Record<string, string> = {
    'Content-Type': isVideoSource ? 'video/mp4' : 'audio/mpeg',
    'Content-Disposition': `attachment; filename="${outFilename}"; filename*=UTF-8''${encodeURIComponent(outFilename)}`,
    'Cache-Control': 'public, max-age=3600',
    'Access-Control-Allow-Origin': '*',
  }
  if (contentLength) headers['Content-Length'] = contentLength

  return new NextResponse(response.body, {
    status: 200,
    headers,
  })
}
