import type { Metadata } from 'next'
import Script from 'next/script'

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
  title: 'Save From Internet - Download TikTok Videos Instantly — No Watermark',
  description:
    'Free TikTok video downloader. Download TikTok videos without watermarks in high quality. Fast, secure, and easy to use.',
  openGraph: {
    title: 'Save From Internet - Download Videos Without Watermarks',
    description:
      'Free TikTok video downloader. Download TikTok videos without watermarks in high quality. Fast, secure, and easy to use.',
    url: baseUrl,
    type: 'website',
    siteName: 'Save From Internet',
    images: [
      {
        url: `${baseUrl}/og.jpg`,
        width: 1200,
        height: 675,
        alt: 'Save From Internet TikTok Downloader',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Save From Internet - Download Tiktok Videos Without Watermarks',
    description:
      'Free TikTok video downloader. Download TikTok videos without watermarks in high quality. Fast, secure, and easy to use.',
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
          {/* Canonical URL */}
  <link rel="canonical" href={baseUrl} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >

{/* Global Header - visible on all pages */}
<header className="fixed top-0 left-0 w-full bg-gradient-to-br from-black via-gray-900 to-black py-4 z-50">
  <div className="max-w-6xl mx-auto flex items-center justify-center select-none">
    <Link href="/" className="flex items-center gap-3 uppercase font-black tracking-wide text-xl text-white">
      <img src="/logo.png?timestamp=20250724" alt="Site Logo" className="h-8 w-auto object-contain" draggable={false} />
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
      </body>
    </html>
  )
}
