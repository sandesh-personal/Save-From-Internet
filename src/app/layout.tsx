import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/Header'
import StickyFooterAd from '@/components/StickyFooterAd'
import { GA_TRACKING_ID } from '@/lib/ga'
import { Providers } from '@/components/Providers'
import PwaInstallPrompt from '@/components/PwaInstallPrompt'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const baseUrl = 'https://www.savefrominternet.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'TikTok Downloader Without Watermark (2026) — Free HD MP4 & MP3 | SaveFromInternet',
  description:
    'Download TikTok videos without watermark in HD MP4, extract MP3 audio, and save photo carousels for free. Fast, unlimited, no app needed on iPhone, Android & PC.',
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
  openGraph: {
    title: 'TikTok Downloader Without Watermark (2026) — Free HD MP4 & MP3 | SaveFromInternet',
    description:
      'Download TikTok videos without watermark in HD MP4, extract MP3 audio, and save photo carousels for free. Fast, unlimited, no app needed on iPhone, Android & PC.',
    url: baseUrl,
    type: 'website',
    siteName: 'Save From Internet',
    images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675, alt: 'TikTok Downloader - Download TikTok Videos Without Watermark' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Downloader Without Watermark (2026) — Free HD MP4 & MP3 | SaveFromInternet',
    description: 'Download TikTok videos without watermark in HD MP4, extract MP3 audio, and save photo carousels for free. Fast, unlimited, no app needed on iPhone, Android & PC.',
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
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://tpc.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.tiktok.com" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8190424610367988"
          crossOrigin="anonymous"
        />
        {/* Google Publisher Tag (GPT) for Web Rewarded Ads */}
        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          crossOrigin="anonymous"
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="lazyOnload" />
        <Script id="gtag-init" strategy="lazyOnload">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
        `}</Script>
        <meta name="google-site-verification" content="eKo5Uv_vQHwOIYPOM5qRSv0CPbQVWTwXJ4zYHXgcUjo" />
        <meta name="msvalidate.01" content="3040BFA752B13D1315F7D0433AD753E1" />
      </head>
      <body
        className="antialiased flex flex-col min-h-screen bg-white text-slate-900 font-sans"
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
          <PwaInstallPrompt />
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
