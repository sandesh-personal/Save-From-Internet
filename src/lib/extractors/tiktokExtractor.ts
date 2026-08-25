import { VideoData, ImageData } from '../types'
import { parseVideoId } from '../validator'

const PRIMARY_API_KEY = process.env.TIKWM_API_KEY ?? ''
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

export async function extractTikTok(url: string): Promise<VideoData | null> {
  const resolvedUrl = await resolveShortUrl(url)
  const videoId = parseVideoId(resolvedUrl) || parseVideoId(url) || 'tiktok_video'

  // Method 1: TikWM API
  try {
    const res = await fetch('https://www.tikwm.com/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': UA,
        Accept: 'application/json',
        Origin: 'https://www.tikwm.com',
        Referer: 'https://www.tikwm.com/',
      },
      body: JSON.stringify({ url: resolvedUrl, count: 12, cursor: 0, web: 1, hd: 1, api_key: PRIMARY_API_KEY }),
      signal: AbortSignal.timeout(20000),
    })

    const json = await res.json()
    if (json?.code === 0 && json?.data) {
      const data = json.data
      const isPhotoCarousel = Array.isArray(data.images) && data.images.length > 0

      const images: ImageData[] = isPhotoCarousel
        ? data.images.map((img: string, i: number) => ({ id: `${videoId}_img_${i}`, url: img, thumbnail: img }))
        : []

      let downloadUrl: string = data.hdplay || data.play || data.wmplay || ''
      if (downloadUrl.startsWith('/')) downloadUrl = 'https://www.tikwm.com' + downloadUrl

      let cover: string = data.cover || ''
      if (cover.startsWith('/')) cover = 'https://www.tikwm.com' + cover

      // For TikTok, data.music (/video/music/*.mp3) returns 403 on TikWM CDN.
      // We always use the valid video stream (downloadUrl) so FFmpeg extracts the crystal-clear audio track without 403 errors.
      const audioUrl = downloadUrl || (data.music && !data.music.includes('/video/music/') ? data.music : undefined)

      return {
        id: videoId,
        title: data.title || 'TikTok Video',
        url,
        thumbnail: cover,
        duration: data.duration || 0,
        author: data.author?.nickname ? `@${data.author.nickname}` : 'TikTok Creator',
        description: data.title || '',
        downloadUrl,
        audioUrl,
        images,
        isPhotoCarousel,
        platform: 'tiktok',
        qualities: [
          ...(data.hdplay ? [{ quality: '1080p Full HD (Best)', url: data.hdplay.startsWith('/') ? 'https://www.tikwm.com' + data.hdplay : data.hdplay, resolution: '1080p' }] : []),
          ...(data.play ? [{ quality: '720p HD', url: data.play.startsWith('/') ? 'https://www.tikwm.com' + data.play : data.play, resolution: '720p' }] : []),
        ],
      }
    }
  } catch (err) {
    console.warn(' API failed, attempting direct fallback:', err)
  }

  // Method 2: Direct Scrape fallback
  try {
    const resolvedUrl = await resolveShortUrl(url)
    const res = await fetch(resolvedUrl, {
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(15000),
    })
    const html = await res.text()
    const videoUrlMatch = html.match(/"playAddr":"([^"]+)"/) || html.match(/"downloadAddr":"([^"]+)"/)
    if (videoUrlMatch) {
      const downloadUrl = videoUrlMatch[1].replace(/\\u002F/g, '/')
      return {
        id: videoId,
        title: 'TikTok Video',
        url,
        thumbnail: '',
        duration: 0,
        author: 'TikTok Creator',
        description: '',
        downloadUrl,
        platform: 'tiktok',
      }
    }
  } catch {
    // fallback failed
  }

  return null
}

async function resolveShortUrl(url: string): Promise<string> {
  if (
    url.includes('vt.tiktok.com') ||
    url.includes('vm.tiktok.com') ||
    url.includes('t.tiktok.com') ||
    url.includes('/t/')
  ) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: { 'User-Agent': UA },
        signal: AbortSignal.timeout(10000),
      })
      return res.url || url
    } catch {
      return url
    }
  }
  return url
}
