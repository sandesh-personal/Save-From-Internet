import { SupportedPlatform } from './types'
export type { SupportedPlatform }

// TikTok patterns
const TIKTOK_PATTERNS = [
  /^(https?:\/\/)?((www|m|vm|vt)\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/i,
  /^(https?:\/\/)?((www|m|vm|vt)\.)?tiktok\.com\/[\w.-]+\/video\/\d+/i,
  /^(https?:\/\/)?((www|m|vm|vt)\.)?tiktok\.com\/@[\w.-]+\/photo\/\d+/i,
  /^(https?:\/\/)?vm\.tiktok\.com\/[\w\d]+/i,
  /^(https?:\/\/)?vt\.tiktok\.com\/[\w\d]+/i,
  /^(https?:\/\/)?m\.tiktok\.com\/v\/\d+/i,
  /^(https?:\/\/)?((www|m)\.)?tiktok\.com\/t\/[\w\d]+/i,
]

// Facebook patterns (Watch, Reels, Videos, Shares, Mobile)
const FACEBOOK_PATTERNS = [
  /^(https?:\/\/)?((www|m|web|touch|mbasic)\.)?facebook\.com\/watch\/?(\?v=\d+|\?id=\d+)?/i,
  /^(https?:\/\/)?((www|m|web|touch|mbasic)\.)?facebook\.com\/reel\/\d+/i,
  /^(https?:\/\/)?((www|m|web|touch|mbasic)\.)?facebook\.com\/reels\/\d+/i,
  /^(https?:\/\/)?((www|m|web|touch|mbasic)\.)?facebook\.com\/[\w.-]+\/videos\/\d+/i,
  /^(https?:\/\/)?((www|m|web|touch|mbasic)\.)?facebook\.com\/video\.php\?v=\d+/i,
  /^(https?:\/\/)?((www|m|web|touch|mbasic)\.)?facebook\.com\/share\/[vr]?\/[\w\d-]+/i,
  /^(https?:\/\/)?((www|m|web|touch|mbasic)\.)?facebook\.com\/story\.php/i,
  /^(https?:\/\/)?fb\.watch\/[\w\d-]+/i,
  /^(https?:\/\/)?fb\.me\/[\w\d-]+/i,
]

// Instagram patterns (Reels, Posts, IGTV, Share links)
const INSTAGRAM_PATTERNS = [
  /^(https?:\/\/)?((www|m)\.)?instagram\.com\/(reel|reels)\/[\w\d_-]+/i,
  /^(https?:\/\/)?((www|m)\.)?instagram\.com\/p\/[\w\d_-]+/i,
  /^(https?:\/\/)?((www|m)\.)?instagram\.com\/tv\/[\w\d_-]+/i,
  /^(https?:\/\/)?((www|m)\.)?instagram\.com\/share\/[\w\d_-]+/i,
  /^(https?:\/\/)?instagr\.am\/(p|reel|tv)\/[\w\d_-]+/i,
]

// Twitter / X patterns
const TWITTER_PATTERNS = [
  /^(https?:\/\/)?((www|mobile)\.)?(twitter|x)\.com\/[\w.-]+\/status\/\d+/i,
  /^(https?:\/\/)?((www|mobile)\.)?(twitter|x)\.com\/i\/status\/\d+/i,
  /^(https?:\/\/)?t\.co\/[\w\d]+/i,
]

export function detectPlatform(url: string): SupportedPlatform | null {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()

  if (TIKTOK_PATTERNS.some((p) => p.test(trimmed)) || trimmed.includes('tiktok.com')) return 'tiktok'
  if (INSTAGRAM_PATTERNS.some((p) => p.test(trimmed)) || trimmed.includes('instagram.com') || trimmed.includes('instagr.am')) return 'instagram'
  if (FACEBOOK_PATTERNS.some((p) => p.test(trimmed)) || trimmed.includes('facebook.com') || trimmed.includes('fb.watch')) return 'facebook'
  if (TWITTER_PATTERNS.some((p) => p.test(trimmed)) || trimmed.includes('twitter.com') || trimmed.includes('x.com')) return 'twitter'

  return null
}

export function validatePlatformUrl(url: string, platform?: SupportedPlatform): boolean {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()

  if (platform === 'tiktok') return TIKTOK_PATTERNS.some((p) => p.test(trimmed))
  if (platform === 'facebook') return FACEBOOK_PATTERNS.some((p) => p.test(trimmed))
  if (platform === 'instagram') return INSTAGRAM_PATTERNS.some((p) => p.test(trimmed))
  if (platform === 'twitter') return TWITTER_PATTERNS.some((p) => p.test(trimmed))

  return (
    TIKTOK_PATTERNS.some((p) => p.test(trimmed)) ||
    FACEBOOK_PATTERNS.some((p) => p.test(trimmed)) ||
    INSTAGRAM_PATTERNS.some((p) => p.test(trimmed)) ||
    TWITTER_PATTERNS.some((p) => p.test(trimmed))
  )
}

export function validateUrl(url: string): boolean {
  return validatePlatformUrl(url)
}

export function parseVideoId(url: string): string | null {
  const patterns = [
    /\/video\/(\d+)/,
    /\/v\/(\d+)/,
    /\/reel\/([\w\d_-]+)/,
    /\/reels\/([\w\d_-]+)/,
    /\/p\/([\w\d_-]+)/,
    /\/status\/(\d+)/,
    /vm\.tiktok\.com\/([\w\d]+)/,
    /vt\.tiktok\.com\/([\w\d]+)/,
    /\/t\/([\w\d]+)/,
    /fb\.watch\/([\w\d-]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  // Fallback: create hash-like identifier from URL
  try {
    const parsed = new URL(url)
    return parsed.pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '_') || null
  } catch {
    return null
  }
}
