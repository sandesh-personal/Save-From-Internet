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

    // Create proxy URLs for both video and audio
    const videoProxyUrl = `/api/video?url=${encodeURIComponent(
      videoData.downloadUrl
    )}`

    // Prefer the dedicated audio URL (actual MP3 from tikwm); fall back to video URL
    const audioSourceUrl = videoData.audioUrl || videoData.downloadUrl
    const audioProxyUrl = `/api/audio?url=${encodeURIComponent(audioSourceUrl)}`

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
