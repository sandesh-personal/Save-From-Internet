import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_HOSTS = ['www.tikwm.com', 'tikwm.com']

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get('url')

  if (!imageUrl) {
    return NextResponse.json({ error: 'url param required' }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(imageUrl)
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 403 })
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://www.tikwm.com/',
        Accept: 'image/webp,image/avif,image/*,*/*;q=0.8',
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Upstream ${response.status}` }, { status: response.status })
    }

    const buffer = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'image/webp'

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch thumbnail: ' + (error instanceof Error ? error.message : 'Unknown') },
      { status: 500 }
    )
  }
}
