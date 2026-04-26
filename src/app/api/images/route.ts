import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import JSZip from 'jszip'

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

    // Validate all URLs before processing
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

    if (imageUrls.length === 1) {
      try {
        const response = await axios.get(imageUrls[0], {
          responseType: 'arraybuffer',
          timeout: 30000,
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        })
        zip.file('savefrominternet.com-tiktok-image-1.jpg', response.data)
      } catch {
        return NextResponse.json({ success: false, error: 'Failed to download image' }, { status: 500 })
      }
    } else {
      await Promise.all(
        imageUrls.map(async (url: string, index: number) => {
          try {
            const response = await axios.get(url, {
              responseType: 'arraybuffer',
              timeout: 30000,
              headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
            })
            zip.file(`image-${index + 1}.jpg`, response.data)
          } catch {
            zip.file(`image-${index + 1}-failed.txt`, `Failed to download: ${url}`)
          }
        })
      )
    }

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
