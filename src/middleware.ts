import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const WWW_HOST = 'www.savefrominternet.com'
const BASE_DOMAIN = 'savefrominternet.com'

export function middleware(request: NextRequest) {
  // 🔒 Do NOTHING in development
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }

  const host = request.headers.get('host') ?? ''
  const protocol = request.headers.get('x-forwarded-proto') ?? 'https'

  if (!host) {
    return NextResponse.next()
  }

  const isLocal = host.includes('localhost') || host.includes('127.0.0.1') || host.includes('0.0.0.0')

  if (isLocal) {
    return NextResponse.next()
  }

  // Redirect any subdomain (e.g. insta.savefrominternet.com) to www
  if (host.endsWith(BASE_DOMAIN) && host !== WWW_HOST && host !== BASE_DOMAIN) {
    const url = request.nextUrl.clone()
    url.hostname = WWW_HOST
    return NextResponse.redirect(url, 301)
  }

  const needsHttps = protocol !== 'https'
  const needsWww = host !== WWW_HOST

  if (needsHttps || needsWww) {
    const url = request.nextUrl.clone()
    url.protocol = 'https'
    url.hostname = WWW_HOST
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json).*)',
  ],
}
