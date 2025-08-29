import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Footer from '@/components/layout/footer'

import { GA_TRACKING_ID } from '@/lib/ga'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const baseUrl = 'https://savefrominternet.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2025 - Save From Internet',
  description:
    'Download TikTok videos in HD and MP4 without watermark. Fast, free TikTok video downloader for PC, iPhone, Android. No app required. Save videos instantly!',
  keywords: [
    'TikTok Video Downloader',
    'download tiktok videos without watermark 2025',
    'tiktok video downloader',
    'tiktok downloader 2025',
    'download tiktok hd',
    'save tiktok without watermark',
  ],
  openGraph: {
    title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2025 - Save From Internet',
    description:
      'Download TikTok videos in HD and MP4 without watermark. Fast, free TikTok video downloader for PC, iPhone, Android. No app required. Save videos instantly!',
    url: baseUrl,
    type: 'website',
    siteName: 'Save From Internet',
    images: [
      {
        url: `${baseUrl}/og-final.jpg`,
        width: 1200,
        height: 675,
        alt: 'TikTok Downloader - Download TikTok Videos Without Watermark',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2025 - Save From Internet',
    description:
      'Download TikTok videos in HD and MP4 without watermark. Fast, free TikTok video downloader for PC, iPhone, Android. No app required. Save videos instantly!',
    site: '@savefrominternet',
    images: [`${baseUrl}/og-final.jpg`],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#000000ff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense - Using Next.js Script for better control */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8190424610367988"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="eKo5Uv_vQHwOIYPOM5qRSv0CPbQVWTwXJ4zYHXgcUjo" />
        {/* Bing (also used by Yahoo) Verification */}
        <meta name="msvalidate.01" content="3040BFA752B13D1315F7D0433AD753E1" />
        {/* Naver Verification */}
        {/* Replace YOUR_NAVER_VERIFICATION_CODE with your actual code from Naver Search Advisor */}
        <meta name="naver-site-verification" content="YOUR_NAVER_VERIFICATION_CODE" />
        {/* Canonical URL */}
        <link rel="canonical" href={baseUrl} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >

{/* Global Header - visible on all pages */}
<header className="fixed top-0 left-0 w-full bg-gradient-to-br from-black via-gray-900 to-black py-4 z-50">
  <div className="max-w-6xl mx-auto flex items-center justify-center select-none px-4">
    <Link href="/" className="flex items-center gap-3 uppercase font-black tracking-wide text-xl text-white">
      <img src="/logo-final.png" alt="TikTok Video Downloader - Save From Internet" className="h-10 w-auto object-contain" draggable={false} />
      <span>SAVE FROM INTERNET</span>
    </Link>
  </div>
</header>


        {/* Main Content */}
        {/* <div className="pt-16">
          </div> */}
          
        <main className="flex-grow bg-gradient-to-br from-black via-gray-900 to-black text-white pt-16 pb-24">
          {children}
        </main>

  {/* Footer */}
<Footer />
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}
