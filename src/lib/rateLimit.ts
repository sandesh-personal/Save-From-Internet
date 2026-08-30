// In-memory per-instance rate limiter. Fine for a single-instance VPS deploy;
// switch to a shared store (e.g. Upstash Redis) if you scale to multiple instances.

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfter?: number } {
  const now = Date.now()
  const entry = store.get(key)
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true }
  }
  if (entry.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  entry.count++
  return { ok: true }
}

export function getClientIp(request: Request): string {
  const headers = request.headers
  return (
    headers.get('cf-connecting-ip') ??
    headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  )
}
