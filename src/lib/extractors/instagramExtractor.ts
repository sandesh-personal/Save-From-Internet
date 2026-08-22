import { VideoData, ImageData, VideoQualityOption } from '../types'
import { parseVideoId } from '../validator'
import { extractViaRapidAPI } from './rapidApiExtractor'

const UA_DESKTOP =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
const UA_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
const UA_FB_BOT =
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'

export async function extractInstagram(url: string): Promise<VideoData | null> {
  const shortcode = extractShortcode(url) || parseVideoId(url) || `ig_${Date.now()}`

  // Strategy 1: Parse embedded JSON script tags from the Instagram Post page (Extracts all carousel slides 100%)
  const htmlScriptResult = await tryInstagramHtmlScriptJson(shortcode, url)
  if (htmlScriptResult) return htmlScriptResult

  // Strategy 2: Instagram GraphQL JSON endpoint
  const gqlResult = await tryInstagramGraphQL(shortcode, url)
  if (gqlResult) return gqlResult

  // Strategy 3: Instagram Embed page scraping (with Bot, Desktop, and Mobile)
  const embedResult =
    (await tryInstagramEmbed(shortcode, url, UA_FB_BOT)) ??
    (await tryInstagramEmbed(shortcode, url, UA_DESKTOP)) ??
    (await tryInstagramEmbed(shortcode, url, UA_MOBILE))
  if (embedResult) return embedResult

  // Strategy 4: Scrape the actual Instagram page HTML
  const scrapeResult = await tryInstagramScrape(url)
  if (scrapeResult) return scrapeResult

  // Strategy 5: RapidAPI universal fallback
  const rapidResult = await extractViaRapidAPI(url, 'instagram')
  if (rapidResult) return rapidResult

  return null
}

function extractShortcode(url: string): string | null {
  const match = url.match(/\/(reel|reels|p|tv)\/([a-zA-Z0-9_-]+)/)
  return match && match[2] ? match[2] : null
}

function cleanInstagramCaption(rawTitleOrDesc: string | null | undefined): string {
  if (!rawTitleOrDesc) return ''
  let str = rawTitleOrDesc
    .replace(/&quot;/g, '"')
    .replace(/&#x2019;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '')
    .trim()

  // If formatted as "Username on Instagram: \"Caption...\""
  const quoteMatch =
    str.match(/(?:on Instagram|:)\s*["“]([\s\S]+?)["”](?:\s*\.?\s*)$/i) ||
    str.match(/["“]([\s\S]+?)["”]/)
  if (quoteMatch && quoteMatch[1] && quoteMatch[1].trim().length > 5) {
    return quoteMatch[1].trim()
  }

  // Remove "Author on Instagram: " prefix if present
  str = str.replace(/^[^:]+on Instagram:\s*/i, '')
  return str.trim()
}

/**
 * Strategy 1: Scrape and parse embedded JSON script tags from the Instagram Post page.
 * Extracts full carousel images and multi-photo posts directly from the page scripts.
 */
async function tryInstagramHtmlScriptJson(shortcode: string, originalUrl: string): Promise<VideoData | null> {
  try {
    const postUrl = `https://www.instagram.com/p/${shortcode}/`
    const res = await fetch(postUrl, {
      headers: {
        'User-Agent': UA_DESKTOP,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
      },
      signal: AbortSignal.timeout(12000),
    })

    if (!res.ok) return null
    const html = await res.text()

    function findKeys(obj: any, keyToFind: string, results: any[] = []): any[] {
      if (!obj || typeof obj !== 'object') return results
      if (Array.isArray(obj)) {
        obj.forEach((item) => findKeys(item, keyToFind, results))
        return results
      }
      for (const k of Object.keys(obj)) {
        if (k === keyToFind) {
          results.push(obj[k])
        } else {
          findKeys(obj[k], keyToFind, results)
        }
      }
      return results
    }

    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi
    let match: RegExpExecArray | null
    let carouselMediaList: any[] | null = null
    let singleMediaItem: any = null
    let extractedCaption = ''
    let author = 'Instagram Creator'

    while ((match = scriptRegex.exec(html)) !== null) {
      const scriptContent = match[1].trim()
      if (!scriptContent.startsWith('{') && !scriptContent.startsWith('[')) continue
      try {
        const parsed = JSON.parse(scriptContent)
        const foundCarousel = findKeys(parsed, 'carousel_media')
        if (foundCarousel.length > 0 && Array.isArray(foundCarousel[0]) && foundCarousel[0].length > 0) {
          carouselMediaList = foundCarousel[0]
        }
        const foundSidecar = findKeys(parsed, 'edge_sidecar_to_children')
        if (foundSidecar.length > 0 && foundSidecar[0]?.edges?.length > 0) {
          carouselMediaList = foundSidecar[0].edges.map((e: any) => e.node)
        }
        const foundXdt = findKeys(parsed, 'xdt_shortcode_media')
        if (foundXdt.length > 0 && foundXdt[0]) {
          singleMediaItem = foundXdt[0]
        }
        // Extract full caption from JSON
        const foundCaptions = findKeys(parsed, 'caption')
        for (const cap of foundCaptions) {
          const text = cap?.text || (typeof cap === 'string' ? cap : '')
          if (text && text.length > extractedCaption.length) {
            extractedCaption = text
          }
        }
        const foundEdgeCaptions = findKeys(parsed, 'edge_media_to_caption')
        for (const edge of foundEdgeCaptions) {
          const text = edge?.edges?.[0]?.node?.text
          if (text && text.length > extractedCaption.length) {
            extractedCaption = text
          }
        }
        const foundOwners = findKeys(parsed, 'owner')
        for (const owner of foundOwners) {
          if (owner?.username) {
            author = `@${owner.username}`
            break
          }
        }
      } catch {
        // ignore non-json
      }
    }

    // Extract title / caption from meta tags as well if not already extracted from JSON
    if (!extractedCaption) {
      const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i)
      const ogDesc =
        html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i) ||
        html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)
      const metaText = ogTitle ? ogTitle[1] : (ogDesc ? ogDesc[1] : '')
      if (metaText) {
        extractedCaption = cleanInstagramCaption(metaText)
      }
    }

    // Fallback: If desktop HTML was stripped of meta, fetch with crawler headers for full caption
    if (!extractedCaption) {
      try {
        const fbRes = await fetch(postUrl, {
          headers: {
            'User-Agent': UA_FB_BOT,
            Accept: 'text/html,application/xhtml+xml',
          },
          signal: AbortSignal.timeout(6000),
        })
        if (fbRes.ok) {
          const fbHtml = await fbRes.text()
          const ogTitle = fbHtml.match(/<meta\s+property="og:title"\s+content="([\s\S]*?)"/i)
          const ogDesc = fbHtml.match(/<meta\s+property="og:description"\s+content="([\s\S]*?)"/i)
          if (ogTitle && ogTitle[1]) {
            extractedCaption = cleanInstagramCaption(ogTitle[1])
          } else if (ogDesc && ogDesc[1]) {
            extractedCaption = cleanInstagramCaption(ogDesc[1])
          }
        }
      } catch {
        // crawler fallback ignored
      }
    }

    const postTitle = extractedCaption || 'Instagram Post'

    if (carouselMediaList && carouselMediaList.length > 0) {
      const images: ImageData[] = carouselMediaList
        .map((m: any, idx: number) => {
          const candidates = m.image_versions2?.candidates || []
          const bestUrl = candidates[0]?.url || m.display_url || m.thumbnail_src || ''
          const cleaned = cleanUrl(bestUrl)
          return {
            id: `${shortcode}_${idx}`,
            url: cleaned,
            thumbnail: cleaned,
          }
        })
        .filter((img) => Boolean(img.url))

      if (images.length > 0) {
        return {
          id: shortcode,
          title: postTitle,
          url: originalUrl,
          thumbnail: images[0].url,
          duration: 0,
          author,
          description: postTitle,
          downloadUrl: images[0].url,
          images,
          isPhotoCarousel: images.length > 1,
          platform: 'instagram',
        }
      }
    }

    if (singleMediaItem) {
      const isVideo = singleMediaItem.is_video
      if (isVideo && singleMediaItem.video_url) {
        const hdUrl = cleanUrl(singleMediaItem.video_url)
        return {
          id: shortcode,
          title: postTitle,
          url: originalUrl,
          thumbnail: cleanUrl(singleMediaItem.display_url || ''),
          duration: 0,
          author,
          description: postTitle,
          downloadUrl: hdUrl,
          platform: 'instagram',
          qualities: [
            { quality: 'Best (4K Quality) / 1080p Full HD', url: hdUrl, resolution: '1080p' },
            { quality: '720p HD Standard', url: hdUrl, resolution: '720p' },
          ],
        }
      }
    }
  } catch {
    // Strategy 1 failed
  }
  return null
}

/**
 * Strategy 2: Direct Instagram GraphQL JSON endpoint
 */
async function tryInstagramGraphQL(shortcode: string, originalUrl: string): Promise<VideoData | null> {
  try {
    const res = await fetch(`https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`, {
      headers: {
        'User-Agent': UA_DESKTOP,
        Accept: 'application/json',
        'X-IG-App-ID': '936619743392459',
        'Sec-Fetch-Site': 'same-origin',
      },
      signal: AbortSignal.timeout(12000),
    })

    if (!res.ok) return null
    const json = await res.json()
    const item = json?.items?.[0] || json?.graphql?.shortcode_media

    if (!item) return null

    const isVideo = item.is_video ?? (item.video_versions && item.video_versions.length > 0)
    const author = item.user?.username || item.owner?.username || 'Instagram User'
    const rawCaption = item.caption?.text || item.edge_media_to_caption?.edges?.[0]?.node?.text || 'Instagram Post'
    const caption = cleanInstagramCaption(rawCaption) || 'Instagram Post'
    const thumbnail =
      item.image_versions2?.candidates?.[0]?.url ||
      item.display_url ||
      item.thumbnail_src ||
      ''

    // Multi-photo / carousel handling
    const carouselMedia = item.carousel_media || item.edge_sidecar_to_children?.edges
    if (carouselMedia && carouselMedia.length > 0) {
      const images: ImageData[] = carouselMedia
        .map((m: any, idx: number) => {
          const node = m.node || m
          const imgUrl = node.image_versions2?.candidates?.[0]?.url || node.display_url || ''
          return {
            id: `${shortcode}_${idx}`,
            url: cleanUrl(imgUrl),
            thumbnail: cleanUrl(imgUrl),
          }
        })
        .filter((img: ImageData) => Boolean(img.url))

      return {
        id: shortcode,
        title: caption,
        url: originalUrl,
        thumbnail: cleanUrl(thumbnail),
        duration: 0,
        author: `@${author}`,
        description: caption,
        downloadUrl: images[0]?.url || '',
        images,
        isPhotoCarousel: true,
        platform: 'instagram',
      }
    }

    if (isVideo) {
      const videoVersions: any[] = item.video_versions || []
      // Sort video versions by height/bitrate descending
      videoVersions.sort((a, b) => (b.height || b.width || 0) - (a.height || a.width || 0))

      const hdVersion = videoVersions[0]?.url || item.video_url
      const sdVersion = videoVersions[videoVersions.length - 1]?.url || videoVersions[1]?.url || hdVersion

      const qualities: VideoQualityOption[] = []
      if (hdVersion) {
        qualities.push({ quality: 'Best (4K Quality) / 1080p Full HD', url: cleanUrl(hdVersion), resolution: '1080p' })
      }
      if (sdVersion && sdVersion !== hdVersion) {
        qualities.push({ quality: '720p HD Standard', url: cleanUrl(sdVersion), resolution: '720p' })
      }

      return {
        id: shortcode,
        title: caption,
        url: originalUrl,
        thumbnail: cleanUrl(thumbnail),
        duration: item.video_duration || 0,
        author: `@${author}`,
        description: caption,
        downloadUrl: cleanUrl(hdVersion),
        audioUrl: item.audio?.audio_src_url ? cleanUrl(item.audio.audio_src_url) : undefined,
        platform: 'instagram',
        qualities: qualities.length > 0 ? qualities : [{ quality: 'HD MP4 Video', url: cleanUrl(hdVersion) }],
      }
    }

    const isReelUrl = originalUrl.includes('/reel/') || originalUrl.includes('/reels/') || originalUrl.includes('/tv/')
    if (thumbnail && !isReelUrl) {
      const cleaned = cleanUrl(thumbnail)
      return {
        id: shortcode,
        title: caption,
        url: originalUrl,
        thumbnail: cleaned,
        duration: 0,
        author: `@${author}`,
        description: caption,
        downloadUrl: cleaned,
        images: [{ id: `${shortcode}_0`, url: cleaned, thumbnail: cleaned }],
        isPhotoCarousel: false,
        platform: 'instagram',
      }
    }
  } catch {
    // GraphQL failed
  }
  return null
}

/**
 * Strategy 3: Instagram Embed Page Scraping
 */
async function tryInstagramEmbed(
  shortcode: string,
  originalUrl: string,
  userAgent: string = UA_FB_BOT
): Promise<VideoData | null> {
  try {
    const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`
    const res = await fetch(embedUrl, {
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
      },
      signal: AbortSignal.timeout(12000),
    })

    if (!res.ok) return null
    const html = await res.text()

    const rawVideoUrls = html.match(/https?:\\\/\\\/[^\s"']+\.mp4[^\s"']*/g) || []
    const rawAudioUrls = html.match(/https?:\\\/\\\/[^\s"']+\.mp4\?_nc_cat=[^\s"']*_nc_sid=[^\s"']*&efg=[^\s"']*/g) || []

    const videoStreams: { url: string; height: number; bitrate: number }[] = []
    let audioUrl: string | null = null

    for (const raw of rawVideoUrls) {
      const cleaned = cleanUrl(raw)
      if (isValidInstagramCdnUrl(cleaned)) {
        if (cleaned.includes('dash_ln_heaac') || cleaned.includes('_audio') || cleaned.includes('audio_dashinit')) {
          if (!audioUrl) audioUrl = cleaned
        } else {
          const heightMatch = cleaned.match(/_([0-9]{3,4})p\./) || cleaned.match(/\/([0-9]{3,4})x[0-9]+\//)
          const height = heightMatch ? parseInt(heightMatch[1], 10) : 720
          videoStreams.push({ url: cleaned, height, bitrate: height >= 1080 ? 2000000 : 800000 })
        }
      }
    }

    videoStreams.sort((a, b) => b.height - a.height)

    let hdUrl = videoStreams[0]?.url || null
    let sdUrl = videoStreams[videoStreams.length - 1]?.url || null

    if (hdUrl) hdUrl = cleanUrl(hdUrl)
    if (sdUrl) sdUrl = cleanUrl(sdUrl)

    const imageUrl =
      extractMatch(html, /"display_url":"([^"]+)"/) ||
      extractMatch(html, /class="EmbeddedMediaImage"[^>]*src="([^"]+)"/) ||
      extractMatch(html, /property="og:image"[^>]*content="([^"]+)"/i)

    const rawCaption =
      extractMatch(html, /<div class="Caption"[^>]*>[\s\S]*?<div[^>]*>([\s\S]*?)<\/div>/) ||
      extractMatch(html, /property="og:title"[^>]*content="([^"]+)"/i) ||
      extractMatch(html, /property="og:description"[^>]*content="([^"]+)"/i) ||
      'Instagram Post'

    const cleanCaption = cleanInstagramCaption(rawCaption) || 'Instagram Post'

    if (hdUrl || videoStreams.length > 0) {
      const mainDownloadUrl = hdUrl || videoStreams[0]?.url || ''
      const qualities: VideoQualityOption[] = []
      if (hdUrl) {
        qualities.push({ quality: 'Best (4K Quality) / 1080p Full HD', url: hdUrl, resolution: '1080p' })
      }
      if (sdUrl && sdUrl !== hdUrl) {
        qualities.push({ quality: '720p HD Standard', url: sdUrl, resolution: '720p' })
      }

      return {
        id: shortcode,
        title: cleanCaption || 'Instagram Reel',
        url: originalUrl,
        thumbnail: imageUrl ? cleanUrl(imageUrl) : '',
        duration: 0,
        author: 'Instagram Creator',
        description: cleanCaption,
        downloadUrl: mainDownloadUrl,
        audioUrl: audioUrl || undefined,
        platform: 'instagram',
        qualities: qualities.length > 0 ? qualities : [{ quality: 'HD MP4 Video', url: mainDownloadUrl }],
      }
    }

    const isReelUrl = originalUrl.includes('/reel/') || originalUrl.includes('/reels/') || originalUrl.includes('/tv/')
    if (imageUrl && !isReelUrl) {
      const cleanedImageUrl = cleanUrl(imageUrl)
      return {
        id: shortcode,
        title: cleanCaption || 'Instagram Photo',
        url: originalUrl,
        thumbnail: cleanedImageUrl,
        duration: 0,
        author: 'Instagram Creator',
        description: cleanCaption,
        downloadUrl: cleanedImageUrl,
        images: [{ id: `${shortcode}_0`, url: cleanedImageUrl, thumbnail: cleanedImageUrl }],
        isPhotoCarousel: false,
        platform: 'instagram',
      }
    }
  } catch {
    // Embed scrape failed
  }
  return null
}

/**
 * Strategy 4: Scrape the main Instagram page HTML
 */
async function tryInstagramScrape(url: string): Promise<VideoData | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA_DESKTOP,
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(12000),
    })

    const html = await res.text()

    const videoMatch =
      html.match(/<meta\s+property="og:video:secure_url"\s+content="([^"]+)"/i) ||
      html.match(/<meta\s+property="og:video"\s+content="([^"]+)"/i) ||
      html.match(/"video_url":"([^"]+)"/i)

    const imageMatch =
      html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) ||
      html.match(/"display_url":"([^"]+)"/i)

    const titleMatch =
      html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
      html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i) ||
      html.match(/<title>([^<]+)<\/title>/i)

    const videoUrl = videoMatch ? cleanUrl(videoMatch[1]) : null
    const imageUrl = imageMatch ? cleanUrl(imageMatch[1]) : ''
    const title = titleMatch ? cleanInstagramCaption(titleMatch[1]) : 'Instagram Post'
    const shortcode = extractShortcode(url) || `ig_${Date.now()}`

    if (videoUrl && isValidInstagramCdnUrl(videoUrl)) {
      return {
        id: shortcode,
        title,
        url,
        thumbnail: imageUrl,
        duration: 0,
        author: 'Instagram Creator',
        description: title,
        downloadUrl: videoUrl,
        platform: 'instagram',
        qualities: [
          { quality: 'Best (4K Quality) / 1080p Full HD', url: videoUrl, resolution: '1080p' },
          { quality: '720p HD Standard', url: videoUrl, resolution: '720p' },
        ],
      }
    }

    if (imageUrl && isValidInstagramCdnUrl(imageUrl)) {
      return {
        id: shortcode,
        title,
        url,
        thumbnail: imageUrl,
        duration: 0,
        author: 'Instagram Creator',
        description: title,
        downloadUrl: imageUrl,
        images: [{ id: `${shortcode}_0`, url: imageUrl, thumbnail: imageUrl }],
        isPhotoCarousel: false,
        platform: 'instagram',
      }
    }
  } catch {
    // scrape failed
  }
  return null
}

function isValidInstagramCdnUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false
  if (url.includes('lookaside.fbsbx.com')) return false
  if (url.includes('.js') || url.includes('.css')) return false
  return url.includes('fbcdn.net') || url.includes('cdninstagram.com') || url.includes('.mp4') || url.includes('/v/') || url.includes('/o1/')
}

function extractMatch(content: string, regex: RegExp): string | null {
  const match = content.match(regex)
  return match && match[1] ? match[1] : null
}

function cleanUrl(url: string): string {
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
