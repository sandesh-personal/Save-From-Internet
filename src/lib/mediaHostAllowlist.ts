// Shared CDN host allowlist for proxied media (video/audio/image streaming).
// Keep this in sync with next.config.js images.remotePatterns.

const ALLOWED_HOST_SUFFIXES = [
  '.tiktok.com',
  '.tiktokv.com',
  '.tiktokcdn.com',
  '.tiktokcdn-eu.com',
  '.tiktokcdn-us.com',
  '.muscdn.com',
  '.cdninstagram.com',
  '.instagram.com',
  '.fbcdn.net',
  '.facebook.com',
  '.twimg.com',
  '.twitter.com',
  '.x.com',
  '.cloudfront.net',
]

const ALLOWED_HOST_SUBSTRINGS = ['tiktok', 'instagram', 'fbcdn', 'fbsbx']

const ALLOWED_EXACT_HOSTS = ['www.tikwm.com', 'tikwm.com', 'robotilab.online']

export function isAllowedMediaHost(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false
    const host = parsed.hostname.toLowerCase()
    if (ALLOWED_EXACT_HOSTS.includes(host)) return true
    if (ALLOWED_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix))) return true
    if (ALLOWED_HOST_SUBSTRINGS.some((needle) => host.includes(needle))) return true
    return false
  } catch {
    return false
  }
}
