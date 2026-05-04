import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import { GA_TRACKING_ID } from '@/lib/ga'
import { Providers } from '@/components/Providers'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const baseUrl = 'https://www.savefrominternet.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'SaveFromInternet — Free TikTok Downloader, Photo & MP3 | Save From Internet',
  description:
    'SaveFromInternet — the free savefrom.net alternative for TikTok. Download TikTok videos without watermark, save TikTok photos, and extract MP3 audio. Works on PC, iPhone, Android. No app needed.',
  keywords: [
    'savefrominternet',
    'save from internet',
    'savefrom tiktok',
    'save from internet tiktok',
    'save from net tiktok',
    'savefrom.net tiktok',
    'TikTok Video Downloader',
    'download tiktok videos without watermark',
    'tiktok video downloader',
    'tiktok photo downloader',
    'download tiktok photo',
    'tiktok downloader 2026',
    'download tiktok hd',
    'save tiktok without watermark',
    'save from tiktok',
  ],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: 'SaveFromInternet — Free TikTok Downloader, Photo & MP3 | Save From Internet',
    description:
      'SaveFromInternet — free TikTok downloader without watermark. Save TikTok videos, photos, and MP3 audio. Works on PC, iPhone, Android. No app required.',
    url: baseUrl,
    type: 'website',
    siteName: 'Save From Internet',
    images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675, alt: 'TikTok Downloader - Download TikTok Videos Without Watermark' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaveFromInternet — Free TikTok Downloader, Photo & MP3 | Save From Internet',
    description: 'SaveFromInternet — free TikTok downloader without watermark. Save TikTok videos, photos, and MP3 audio. Works on PC, iPhone, Android. No app required.',
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
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
                <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-lg tracking-tight">
                  Save From <span className="text-indigo-500">Internet</span>
                </span>
              </Link>

              {/* Nav */}
              <nav className="hidden md:flex items-center gap-1">

                {/* TikTok dropdown */}
                <div className="relative group">
                  <div className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all font-medium flex items-center gap-1 cursor-default select-none">
                    TikTok
                    <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  <div className="absolute left-0 top-full pt-1.5 hidden group-hover:block z-50 min-w-[210px]">
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-xl py-1 overflow-hidden">
                      <Link href="/tiktok-video-downloader" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">Video Downloader</Link>
                      <Link href="/tiktok-to-mp3" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">TikTok to MP3</Link>
                      <Link href="/tiktok-photo-downloader" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">Photo Downloader</Link>
                      <Link href="/tiktok-downloader-without-watermark" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">No Watermark</Link>
                      <Link href="/save-tiktok-video" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">Save TikTok Video</Link>
                    </div>
                  </div>
                </div>

                {/* Instagram - powered by GrabReels */}
                <a
                  href="https://grabreels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all font-medium flex items-center gap-1"
                >
                  Instagram
                  <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>

                <Link href="/blog" className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all font-medium">Blog</Link>
                <Link href="/faq" className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all font-medium">FAQ</Link>
              </nav>

              {/* Right: Language picker + Theme toggle + Mobile CTA */}
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow pt-16">
            {children}
          </main>

          <Footer />
          <Analytics />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'SaveFromInternet',
            alternateName: ['Save From Internet', 'SaveFrom TikTok', 'savefrominternet.com', 'Save From Net TikTok'],
            url: 'https://www.savefrominternet.com',
          }) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SaveFromInternet',
            alternateName: ['Save From Internet', 'savefrominternet.com'],
            url: 'https://www.savefrominternet.com',
            logo: 'https://www.savefrominternet.com/logo-final.png',
            contactPoint: { '@type': 'ContactPoint', email: 'contact@savefrominternet.com', contactType: 'customer support' },
          }) }} />
        </Providers>
      </body>
    </html>
  )
}
