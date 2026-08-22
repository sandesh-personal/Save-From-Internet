import { VideoData, VideoQualityOption } from '../types'
import { parseVideoId } from '../validator'
import { extractViaRapidAPI } from './rapidApiExtractor'

const UA_FB_BOT =
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
const UA_DESKTOP =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
const UA_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'

export async function extractFacebook(url: string): Promise<VideoData | null> {
  const videoId = parseVideoId(url) || `fb_${Date.now()}`
  
  // Step 1: Follow redirects (for fb.watch, fb.me, share links)
  const resolvedUrl = await resolveFacebookUrl(url)

  // Step 2: Try direct scrape with Bot (serves full rich SSR JSON with DASH HD streams)
  const scrapedData =
    (await tryScrapeFacebook(resolvedUrl, UA_FB_BOT)) ??
    (await tryScrapeFacebook(resolvedUrl, UA_DESKTOP)) ??
    (await tryScrapeFacebook(resolvedUrl, UA_MOBILE))

  if (scrapedData && scrapedData.downloadUrl) {
    return {
      id: videoId,
      title: scrapedData.title || 'Facebook Video',
      url,
      thumbnail: scrapedData.thumbnail || '',
      duration: scrapedData.duration || 0,
      author: scrapedData.author || 'Facebook Creator',
      description: scrapedData.description || 'Facebook Video',
      downloadUrl: scrapedData.downloadUrl,
      audioUrl: scrapedData.audioUrl,
      qualities: scrapedData.qualities,
      platform: 'facebook',
    }
  }

  // Step 3: Try mbasic.facebook.com (simplest HTML fallback)
  const mbasicResult = await tryMbasicFacebook(resolvedUrl)
  if (mbasicResult && mbasicResult.downloadUrl) {
    return {
      id: videoId,
      title: mbasicResult.title || 'Facebook Video',
      url,
      thumbnail: mbasicResult.thumbnail || '',
      duration: 0,
      author: 'Facebook Creator',
      description: mbasicResult.title || 'Facebook Video',
      downloadUrl: mbasicResult.downloadUrl,
      platform: 'facebook',
      qualities: [{ quality: 'Standard SD MP4', url: mbasicResult.downloadUrl }],
    }
  }

  // Step 4: RapidAPI universal fallback
  const rapidResult = await extractViaRapidAPI(url, 'facebook')
  if (rapidResult) return rapidResult

  return null
}

async function resolveFacebookUrl(url: string): Promise<string> {
  if (!url.includes('fb.watch') && !url.includes('/share/') && !url.includes('fb.me')) return url
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': UA_MOBILE,
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(8000),
    })
    return res.url || url
  } catch {
    return url
  }
}

async function tryScrapeFacebook(url: string, userAgent: string): Promise<Partial<VideoData> | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Mode': 'navigate',
      },
      signal: AbortSignal.timeout(12000),
    })

    if (!res.ok) return null
    const html = await res.text()

    // 1. Extract all raw MP4 stream links from HTML & DASH manifests
    const rawMp4Matches = html.match(/https?:[^"'\s<>]+\.mp4[^"'\s<>]*/gi) || []
    const cleanedMp4s: { url: string; bitrate?: number; tag: string }[] = []

    for (const raw of rawMp4Matches) {
      const clean = cleanUrl(raw)
      if (isValidVideoCdnUrl(clean)) {
        // Parse bitrate / tag from efg param if present
        let bitrate = 0
        let tag = ''
        try {
          const efgMatch = clean.match(/efg=([a-zA-Z0-9%_-]+)/)
          if (efgMatch) {
            const decoded = Buffer.from(decodeURIComponent(efgMatch[1]), 'base64').toString('utf-8')
            const j = JSON.parse(decoded)
            bitrate = j.bitrate || 0
            tag = j.vencode_tag || ''
          }
        } catch { /* parse error */ }

        if (!cleanedMp4s.some((item) => item.url === clean)) {
          cleanedMp4s.push({ url: clean, bitrate, tag })
        }
      }
    }

    // Separate audio stream from video streams
    const audioStream = cleanedMp4s.find(
      (s) => (s.tag || '').includes('audio') || (s.tag || '').includes('heaac') || s.url.includes('audio')
    )
    const audioUrl = audioStream ? audioStream.url : undefined
    const videoStreams = cleanedMp4s.filter((s) => s !== audioStream)

    // Sort video streams by bitrate / quality descending
    videoStreams.sort((a, b) => {
      const aTag = a.tag || ''
      const bTag = b.tag || ''
      const aIsHd = aTag.includes('1080') || aTag.includes('720') || a.url.includes('1080') || a.url.includes('720') || a.url.includes('hd')
      const bIsHd = bTag.includes('1080') || bTag.includes('720') || b.url.includes('1080') || b.url.includes('720') || b.url.includes('hd')
      if (aIsHd && !bIsHd) return -1
      if (!aIsHd && bIsHd) return 1
      return (b.bitrate || 0) - (a.bitrate || 0)
    })

    // 2. Fallback to direct JSON properties if raw stream regex was empty
    let hdUrl =
      videoStreams.find((s) => (s.tag || '').includes('1080') || (s.tag || '').includes('720') || s.url.includes('hd') || (s.bitrate && s.bitrate > 800000))?.url ||
      extractMatch(html, /"playable_url_quality_hd":"([^"]+)"/) ||
      extractMatch(html, /"browser_native_hd_url":"([^"]+)"/) ||
      extractMatch(html, /hd_src:"([^"]+)"/) ||
      extractMatch(html, /"hd_src":"([^"]+)"/) ||
      extractMatch(html, /hd_src_no_ratelimit:"([^"]+)"/)

    let sdUrl =
      videoStreams.find((s) => !(s.tag || '').includes('1080') && !(s.tag || '').includes('720') && s.url !== hdUrl)?.url ||
      extractMatch(html, /"playable_url":"([^"]+)"/) ||
      extractMatch(html, /"browser_native_sd_url":"([^"]+)"/) ||
      extractMatch(html, /sd_src:"([^"]+)"/) ||
      extractMatch(html, /sd_src_no_ratelimit:"([^"]+)"/)

    if (hdUrl) hdUrl = cleanUrl(hdUrl)
    if (sdUrl) sdUrl = cleanUrl(sdUrl)

    if (!isValidVideoCdnUrl(hdUrl)) hdUrl = ''
    if (!isValidVideoCdnUrl(sdUrl)) sdUrl = ''

    const mainDownloadUrl = hdUrl || sdUrl || videoStreams[0]?.url
    if (!mainDownloadUrl) return null

    // Extract title / description
    let title =
      extractMatch(html, /<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
      extractMatch(html, /"preferred_thumbnail":\{"image":\{"uri":"[^"]+"\},"video_title":"([^"]+)"/) ||
      extractMatch(html, /<title>([^<]+)<\/title>/i) ||
      'Facebook Video'
    title = cleanHtmlEntities(title.replace(/ \| Facebook/gi, ''))

    // Extract thumbnail
    let thumbnail =
      extractMatch(html, /<meta\s+property="og:image"\s+content="([^"]+)"/i) ||
      extractMatch(html, /"preferred_thumbnail":\{"image":\{"uri":"([^"]+)"/i) ||
      extractMatch(html, /"thumbnailUrl":"([^"]+)"/) ||
      ''
    if (thumbnail) thumbnail = cleanUrl(thumbnail)

    const durationMatch = extractMatch(html, /"playable_duration_in_ms":(\d+)/) || extractMatch(html, /"duration":"PT(\d+)S"/)
    const duration = durationMatch ? Math.round(parseInt(durationMatch, 10) / (durationMatch.length > 4 ? 1000 : 1)) : 0

    // Build quality options
    const qualities: VideoQualityOption[] = []
    if (hdUrl) {
      qualities.push({ quality: 'Best (4K Quality) / 1080p Full HD', url: hdUrl, resolution: '1080p' })
    }
    if (sdUrl && sdUrl !== hdUrl) {
      qualities.push({ quality: '720p HD Standard', url: sdUrl, resolution: '720p' })
    }

    // Add any other distinct streams found
    for (let i = 0; i < videoStreams.length; i++) {
      const s = videoStreams[i]
      if (s.url !== hdUrl && s.url !== sdUrl && qualities.length < 3) {
        const kbps = s.bitrate ? ` (${Math.round(s.bitrate / 1000)} kbps)` : ''
        qualities.push({
          quality: `${s.tag || '720p MP4 Stream'}${kbps}`,
          url: s.url,
          resolution: '720p',
        })
      }
    }

    if (qualities.length === 0) {
      qualities.push({ quality: 'HD MP4 Video', url: mainDownloadUrl })
    }

    return {
      title,
      thumbnail,
      duration,
      author: 'Facebook Creator',
      description: title,
      downloadUrl: qualities[0]?.url || mainDownloadUrl,
      audioUrl: audioUrl || undefined,
      qualities,
    }
  } catch {
    return null
  }
}

async function tryMbasicFacebook(url: string): Promise<Partial<VideoData> | null> {
  try {
    const mbasicUrl = url
      .replace('www.facebook.com', 'mbasic.facebook.com')
      .replace('m.facebook.com', 'mbasic.facebook.com')
      .replace('web.facebook.com', 'mbasic.facebook.com')

    const res = await fetch(mbasicUrl, {
      headers: {
        'User-Agent': UA_MOBILE,
        Accept: 'text/html',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) return null
    const html = await res.text()

    const videoUrl =
      extractMatch(html, /href="(https?:\/\/[^"]*video[^"]*\.mp4[^"]*)"/) ||
      extractMatch(html, /src="(https?:\/\/[^"]*video[^"]*\.mp4[^"]*)"/) ||
      extractMatch(html, /"videoData".*?"url":"([^"]+)"/)

    const thumbnail = extractMatch(html, /<meta\s+property="og:image"\s+content="([^"]+)"/i) || ''
    const title = extractMatch(html, /<meta\s+property="og:title"\s+content="([^"]+)"/i) || 'Facebook Video'

    if (videoUrl && isValidVideoCdnUrl(cleanUrl(videoUrl))) {
      return {
        downloadUrl: cleanUrl(videoUrl),
        title: cleanHtmlEntities(title),
        thumbnail: thumbnail ? cleanUrl(thumbnail) : '',
      }
    }
  } catch {
    // mbasic failed
  }
  return null
}

function extractMatch(content: string, regex: RegExp): string | null {
  const match = content.match(regex)
  return match && match[1] ? match[1] : null
}

function isValidVideoCdnUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false
  if (url.includes('lookaside.fbsbx.com')) return false
  if (url.includes('.js') || url.includes('.css') || url.includes('.png') || url.includes('.jpg')) return false
  return url.includes('fbcdn.net') || url.includes('.mp4') || url.includes('/v/') || url.includes('/o1/')
}

function cleanUrl(url: string): string {
  if (!url) return ''
  return url
    .replace(/\\u003C.*$/gi, '')
    .replace(/u003C.*$/gi, '')
    .replace(/<\/BaseURL.*$/gi, '')
    .replace(/&amp;/gi, '&')
    .replace(/&#038;/gi, '&')
    .replace(/\\u0025/g, '%')
    .replace(/\\u0026/g, '&')
    .replace(/\\u002F/g, '/')
    .replace(/\\/g, '')
    .trim()
}

function cleanHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .trim()
}
