import { NextRequest, NextResponse } from 'next/server'

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoUrl = searchParams.get('url')

    if (!videoUrl) {
      return NextResponse.json({ success: false, error: 'Video URL is required' }, { status: 400 })
    }

    if (!isAllowedVideoHost(videoUrl)) {
      return NextResponse.json({ success: false, error: 'Video source not allowed' }, { status: 403 })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    let response: Response
    try {
      response = await fetch(videoUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://www.tiktok.com/',
        },
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!response.ok) {
      return NextResponse.json({ success: false, error: 'Failed to fetch audio' }, { status: 500 })
    }

    const videoBuffer = await response.arrayBuffer()

    return new NextResponse(videoBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="savefrominternet.com-tiktok-audio.mp3"',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Audio extraction error:', error instanceof Error ? error.message : 'Unknown')
    return NextResponse.json({ success: false, error: 'Failed to extract audio' }, { status: 500 })
  }
}
