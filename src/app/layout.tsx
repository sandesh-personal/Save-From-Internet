import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/Header'
import StickyFooterAd from '@/components/StickyFooterAd'
import { GA_TRACKING_ID } from '@/lib/ga'
import { Providers } from '@/components/Providers'

const LOCALE_PATHS = ['es', 'pt', 'id', 'fr', 'de', 'ar', 'vi', 'zh', 'ja', 'ru']

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
    icon: [{ url: '/logo-final.png', type: 'image/png' }, { url: '/favicon.ico', sizes: '32x32' }],
    apple: '/logo-final.png',
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const locale = headersList.get('x-locale') ?? 'en'

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        <link rel="alternate" hrefLang="en" href={baseUrl} />
        {LOCALE_PATHS.map((loc) => (
          <link key={loc} rel="alternate" hrefLang={loc} href={`${baseUrl}/${loc}`} />
        ))}
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
          <Header />

          {/* Main Content */}
          <main className="flex-grow pt-16">
            {children}
          </main>

          <Footer />
          <StickyFooterAd />
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
