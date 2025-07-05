import type { Metadata } from 'next'
import Script from 'next/script'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

import { GA_TRACKING_ID } from '@/lib/ga' // your GA ID

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
  title: 'Save From Internet - Download Videos Without Watermarks',
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
    title: 'Save From Internet - Download Videos Without Watermarks',
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
  themeColor: '#ff0050',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics scripts */}
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <main className="flex-grow bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
          {children}
        </main>

        <footer className="text-center py-6 text-white text-base font-semibold bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
          <Link href="/" className="mx-2 hover:underline">
            Home
          </Link>
          <Link href="/about" className="mx-2 hover:underline">
            About
          </Link>
          <Link href="/privacy-policy" className="mx-2 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/disclaimer" className="mx-2 hover:underline">
            Disclaimer
          </Link>
          <Link href="/blog" className="mx-2 hover:underline">
            Blog
          </Link>
        </footer>
      </body>
    </html>
  )
}
