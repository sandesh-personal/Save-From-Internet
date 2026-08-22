import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'

const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
}

function isAllowedImageHost(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    if (['www.tikwm.com', 'tikwm.com', 'robotilab.online'].includes(hostname)) return true
    return (
      hostname.endsWith('.tiktok.com') ||
      hostname.endsWith('.tiktokv.com') ||
      hostname.endsWith('.tiktokcdn.com') ||
      hostname.endsWith('.tiktokcdn-eu.com') ||
      hostname.endsWith('.tiktokcdn-us.com') ||
      hostname.endsWith('.muscdn.com') ||
      hostname.includes('tiktok') ||
      hostname.endsWith('.cdninstagram.com') ||
      hostname.endsWith('.instagram.com') ||
      hostname.includes('instagram') ||
      hostname.endsWith('.fbcdn.net') ||
      hostname.endsWith('.facebook.com') ||
      hostname.includes('fbcdn') ||
      hostname.includes('fbsbx') ||
      hostname.endsWith('.twimg.com') ||
      hostname.endsWith('.twitter.com') ||
      hostname.endsWith('.x.com') ||
      hostname.endsWith('.cloudfront.net')
    )
  } catch {
    return false
  }
}

/**
 * GET: Single Image Proxy Download
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const rawUrl = searchParams.get('url')
    const customFilename = searchParams.get('filename') || `savefrominternet.com-image-${Date.now()}.jpg`

    if (!rawUrl) {
      return NextResponse.json({ success: false, error: 'Image URL is required' }, { status: 400 })
    }

    const imageUrl = rawUrl
      .replace(/&amp;/gi, '&')
      .replace(/&#038;/gi, '&')
      .replace(/\\u0026/g, '&')
      .trim()

    if (!isAllowedImageHost(imageUrl)) {
      return NextResponse.json({ success: false, error: 'Image source host not allowed' }, { status: 403 })
    }

    const ac = new AbortController()
    const timer = setTimeout(() => ac.abort(), 20000)

    let response: Response
    try {
      response = await fetch(imageUrl, { headers: FETCH_HEADERS, signal: ac.signal })
    } finally {
      clearTimeout(timer)
    }

    if (!response.ok) {
      return NextResponse.json({ success: false, error: 'Failed to fetch image stream' }, { status: 500 })
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${customFilename}"; filename*=UTF-8''${encodeURIComponent(customFilename)}`,
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    }

    return new NextResponse(response.body, { headers })
  } catch (error) {
    console.error('Single image download error:', error instanceof Error ? error.message : 'Unknown')
    return NextResponse.json({ success: false, error: 'Failed to download image' }, { status: 500 })
  }
}

/**
 * POST: Multi-Image ZIP Archiver / Batch Fetch
 */
export async function POST(request: NextRequest) {
  try {
    const { imageUrls, title, asZip = false } = await request.json()

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return NextResponse.json({ success: false, error: 'No images provided' }, { status: 400 })
    }

    const invalidUrl = (imageUrls as unknown[]).find(
      (u) => typeof u !== 'string' || !isAllowedImageHost(u)
    )
    if (invalidUrl) {
      return NextResponse.json({ success: false, error: 'Image source not allowed' }, { status: 403 })
    }

    if (!asZip) {
      return NextResponse.json({
        success: true,
        images: imageUrls.map((url: string, index: number) => ({
          url,
          filename: `savefrominternet.com-image-${index + 1}-${Date.now()}.jpg`,
        })),
      })
    }

    const zip = new JSZip()

    await Promise.all(
      imageUrls.map(async (url: string, index: number) => {
        try {
          const ac = new AbortController()
          const timer = setTimeout(() => ac.abort(), 30000)
          const response = await fetch(url, { headers: FETCH_HEADERS, signal: ac.signal })
          clearTimeout(timer)
          if (!response.ok) throw new Error()
          const buffer = await response.arrayBuffer()
          const name = `savefrominternet.com-image-${index + 1}.jpg`
          zip.file(name, buffer)
        } catch {
          zip.file(`image-${index + 1}-failed.txt`, `Failed to download: ${url}`)
        }
      })
    )

    const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' })
    const zipName = title
      ? `savefrominternet.com-${title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 50)}_images.zip`
      : `savefrominternet.com-images-${Date.now()}.zip`

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${zipName}"`,
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Image archive error:', error instanceof Error ? error.message : 'Unknown')
    return NextResponse.json({ success: false, error: 'Failed to process images' }, { status: 500 })
  }
}
