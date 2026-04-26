import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { Geist } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import { GA_TRACKING_ID } from '@/lib/ga'
import { Providers } from '@/components/Providers'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const baseUrl = 'https://www.savefrominternet.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2026 - Save From Internet',
  description:
    'Download TikTok videos in HD and MP4 without watermark. Fast, free TikTok video downloader for PC, iPhone, Android. No app required. Save videos instantly!',
  keywords: [
    'TikTok Video Downloader',
    'download tiktok videos without watermark 2026',
    'tiktok video downloader',
    'tiktok downloader 2026',
    'download tiktok hd',
    'save tiktok without watermark',
  ],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2026 - Save From Internet',
    description:
      'Download TikTok videos in HD and MP4 without watermark. Fast, free TikTok video downloader for PC, iPhone, Android. No app required. Save videos instantly!',
    url: baseUrl,
    type: 'website',
    siteName: 'Save From Internet',
    images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675, alt: 'TikTok Downloader - Download TikTok Videos Without Watermark' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2026 - Save From Internet',
    description: 'Download TikTok videos in HD and MP4 without watermark. Fast, free TikTok video downloader for PC, iPhone, Android. No app required. Save videos instantly!',
    site: '@savefrominternet',
    images: [`${baseUrl}/og-final.jpg`],
  },
  icons: {
    icon: [{ url: '/favicon-final.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: '32x32' }],
    apple: '/apple-touch-icon-final.svg',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.tiktok.com" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8190424610367988"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
        `}</Script>
        <meta name="google-site-verification" content="eKo5Uv_vQHwOIYPOM5qRSv0CPbQVWTwXJ4zYHXgcUjo" />
        <meta name="msvalidate.01" content="3040BFA752B13D1315F7D0433AD753E1" />
      </head>
      <body
        className="antialiased flex flex-col min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200"
        suppressHydrationWarning
      >
        <Providers>
          {/* Header */}
          <header className="fixed top-0 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 z-50 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 select-none flex-shrink-0">
                <img src="/logo-final.png" alt="Save From Internet Logo" className="h-8 w-auto object-contain" draggable={false} />
                <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight hidden sm:block">
                  Save From <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">Internet</span>
                </span>
              </Link>

              {/* Nav */}
              <nav className="hidden md:flex items-center gap-1">
                <Link href="/tiktok-video-downloader" className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all font-medium">TikTok Downloader</Link>
                <Link href="/tiktok-to-mp3" className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all font-medium">TikTok to MP3</Link>
                <Link href="/tiktok-photo-downloader" className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all font-medium">Photo Downloader</Link>
                <Link href="/blog" className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all font-medium">Blog</Link>
                <Link href="/faq" className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all font-medium">FAQ</Link>
              </nav>

              {/* Right: Language picker + Theme toggle + Mobile CTA */}
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
                <Link href="/" className="md:hidden px-4 py-2 bg-gradient-to-r from-rose-500 to-violet-600 text-white text-sm font-bold rounded-lg">
                  Download
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow pt-16">
            {children}
          </main>

          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
