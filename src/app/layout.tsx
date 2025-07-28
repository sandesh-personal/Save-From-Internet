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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'TikTok Downloader - Download TikTok Videos Without Watermark [2025]',
  description:
    'Download TikTok videos in HD and MP4 without watermark. Fast, free TikTok video downloader for PC, iPhone, Android. No app required. Save videos instantly!',
  openGraph: {
    title: 'TikTok Downloader - Download TikTok Videos Without Watermark [2025]',
    description:
      'Download TikTok videos in HD and MP4 without watermark. Fast, free TikTok video downloader for PC, iPhone, Android. No app required. Save videos instantly!',
    url: baseUrl,
    type: 'website',
    siteName: 'Save From Internet',
    images: [
      {
        url: `${baseUrl}/og.jpg`,
        width: 1200,
        height: 675,
        alt: 'TikTok Downloader - Download TikTok Videos Without Watermark',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Downloader - Download TikTok Videos Without Watermark [2025]',
    description:
      'Download TikTok videos in HD and MP4 without watermark. Fast, free TikTok video downloader for PC, iPhone, Android. No app required. Save videos instantly!',
    site: '@savefrominternet',
    images: [`${baseUrl}/og.jpg`],
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
        {/*Adsense Code*/}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8190424610367988"
        crossOrigin="anonymous"></script>
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
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" /> */}
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
      <img src="/logo-final.png" alt="Site Logo" className="h-10 w-auto object-contain" draggable={false} />
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
