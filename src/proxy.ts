import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const WWW_HOST = 'www.savefrominternet.com'
const BASE_DOMAIN = 'savefrominternet.com'
const LOCALES = ['es', 'pt', 'id', 'fr', 'de', 'ar', 'vi', 'zh', 'ja', 'ru']

const MULTILINGUAL_PATHS = [
  '/',
  '/tiktok-video-downloader',
  '/tiktok-to-mp3',
  '/tiktok-photo-downloader',
  '/facebook-video-downloader',
  '/twitter-video-downloader',
  '/instagram-reel-downloader',
  '/instagram-video-downloader',
  '/instagram-post-downloader',
]

function setMeta(response: NextResponse, pathname: string) {
  const segment = pathname.split('/')[1]
  response.headers.set('x-pathname', pathname)
  response.headers.set('x-locale', LOCALES.includes(segment) ? segment : 'en')
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Never touch API routes, Next static assets, or public files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.json'
  ) {
    return NextResponse.next()
  }

  // Cookie-based locale default redirection for supported multilingual paths
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (localeCookie && LOCALES.includes(localeCookie) && MULTILINGUAL_PATHS.includes(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/' ? `/${localeCookie}` : `/${localeCookie}${pathname}`
    const response = NextResponse.redirect(url, 307)
    setMeta(response, url.pathname)
    return response
  }

  if (process.env.NODE_ENV !== 'production') {
    const response = NextResponse.next()
    setMeta(response, pathname)
    return response
  }

  const host = request.headers.get('host') ?? ''
  const protocol = request.headers.get('x-forwarded-proto') ?? 'https'

  if (!host) {
    const response = NextResponse.next()
    setMeta(response, pathname)
    return response
  }

  const isLocal =
    host.includes('localhost') ||
    host.includes('127.0.0.1') ||
    host.includes('0.0.0.0') ||
    host.includes('192.168.') ||
    host.includes('10.') ||
    host.includes('172.') ||
    host.includes(':3000')

  if (isLocal) {
    const response = NextResponse.next()
    setMeta(response, pathname)
    return response
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

  const response = NextResponse.next()
  setMeta(response, pathname)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, manifest.json
     * - static image/font assets (.png, .jpg, .svg, .webp, .ico, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|ttf|woff|woff2)).*)',
  ],
}
