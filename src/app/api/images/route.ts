import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}

function isAllowedImageHost(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    if (['www.tikwm.com', 'tikwm.com'].includes(hostname)) return true
    return (
      hostname.endsWith('.tiktok.com') ||
      hostname.endsWith('.tiktokv.com') ||
      hostname.endsWith('.tiktokcdn.com') ||
      hostname.endsWith('.tiktokcdn-eu.com') ||
      hostname.endsWith('.tiktokcdn-us.com')
    )
  } catch {
    return false
  }
}

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
          filename: `savefrominternet.com-tiktok-image-${index + 1}-${Date.now()}.jpg`,
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
          const name = imageUrls.length === 1
            ? 'savefrominternet.com-tiktok-image-1.jpg'
            : `image-${index + 1}.jpg`
          zip.file(name, buffer)
        } catch {
          zip.file(`image-${index + 1}-failed.txt`, `Failed to download: ${url}`)
        }
      })
    )

    const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' })
    const zipName = title
      ? `${title.replace(/[^a-zA-Z0-9]/g, '_')}_images.zip`
      : `tiktok-images-${Date.now()}.zip`

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${zipName}"`,
      },
    })
  } catch (error) {
    console.error('Image archive error:', error instanceof Error ? error.message : 'Unknown')
    return NextResponse.json({ success: false, error: 'Failed to process images' }, { status: 500 })
  }
}
