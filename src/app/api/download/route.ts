import { NextRequest, NextResponse } from 'next/server'
import { Downloader } from '../../../lib/downloader'
import { validateUrl } from '../../../lib/validator'

export async function POST(request: NextRequest) {
  try {
    const { url, type = 'video' } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      )
    }

    if (!validateUrl(url)) {
      return NextResponse.json(
        { success: false, error: 'Invalid TikTok URL' },
        { status: 400 }
      )
    }

    console.log('Processing TikTok URL:', url, 'Type:', type)

    const downloader = new Downloader()
    const videoData = await downloader.downloadVideo(url)

    if (!videoData || !videoData.downloadUrl) {
      return NextResponse.json(
        { success: false, error: 'Failed to extract video download URL' },
        { status: 500 }
      )
    }

    // Route video/audio through CF Worker if configured, else fall back to local proxy
    const workerBase = process.env.PROXY_WORKER_URL?.replace(/\/$/, '')
    const videoProxyUrl = workerBase
      ? `${workerBase}/video?url=${encodeURIComponent(videoData.downloadUrl)}`
      : `/api/video?url=${encodeURIComponent(videoData.downloadUrl)}`

    const audioSourceUrl = videoData.audioUrl || videoData.downloadUrl
    const audioProxyUrl = workerBase
      ? `${workerBase}/audio?url=${encodeURIComponent(audioSourceUrl)}`
      : `/api/audio?url=${encodeURIComponent(audioSourceUrl)}`

    return NextResponse.json({
      success: true,
      downloadUrl: videoProxyUrl,
      audioUrl: audioProxyUrl,
      metadata: {
        title: videoData.title,
        author: videoData.author,
        duration: videoData.duration,
        thumbnail: videoData.thumbnail,
        images:
          videoData.images?.map((img) => ({
            ...img,
            selected: false,
          })) || [],
      },
    })
  } catch (error) {
    console.error('Download error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { success: false, error: 'Failed to process video. Please try again.' },
      { status: 500 }
    )
  }
}
