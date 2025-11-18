import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const WWW_HOST = 'www.savefrominternet.com'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')
  const protocol = request.headers.get('x-forwarded-proto') ?? 'https'

  if (!host) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()

  // Enforce HTTPS first
  if (protocol !== 'https') {
    url.protocol = 'https'
    return NextResponse.redirect(url, 301)
  }

  // Enforce www host
  if (host !== WWW_HOST) {
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

