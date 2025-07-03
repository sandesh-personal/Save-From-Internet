import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { siteConfig } from '@/config/site'
import Link from 'next/link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Save From Internet - Access all Public Videos',
  description:
    'Free Social Media video downloader. Download videos without watermarks from any platfroms in high quality. Fast, secure, and easy to use.',
  keywords: [
    'TikTok downloader',
    'Save From Internet',
    'savefrominternet.com',
    'save from net',
    'download TikTok videos',
    'TikTok video downloader',
    'TikTok downloader without watermark',
    'no watermark',
    'TikTok without watermark',
    'free TikTok downloader',
    'TikTok video saver',
    'TikTok MP4',
    'save TikTok videos',
    'TikTok content downloader',
    'social media downloader',
    'video downloader',
  ],
  // authors: [
  //   {
  //     name: siteConfig.name,
  //     url: siteConfig.links.github,
  //   },
  // ],
  // creator: siteConfig.links.github,
  // publisher: siteConfig.links.github,
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },
  // metadataBase: new URL('https://www.mohamedgado.site'),
  // alternates: {
  //   canonical: '/',
  // },
  openGraph: {
    title: 'Save From Internet TikTok Downloader - Download Videos Without Watermarks',
    description:
      'Free TikTok video downloader. Download TikTok videos without watermarks in high quality. Fast, secure, and easy to use.',
    url: siteConfig.links.github,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
    lang='en'
    >
      <head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='icon' href='/favicon.ico' sizes='32x32' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.svg' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#ff0050' />
        <meta name='msapplication-TileColor' content='#ff0050' />
      </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <main className="flex-grow bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
          {children}
        </main>
        
        {/* ✅ Global Footer */}
        <footer className="text-center py-6 text-white/100 text-base font-semibold bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
          <Link href="/" className="mx-2 hover:underline">Home</Link>
          <Link href="/about" className="mx-2 hover:underline">About</Link>
          <Link href="/privacy-policy" className="mx-2 hover:underline">Privacy Policy</Link>
          <Link href="/disclaimer" className="mx-2 hover:underline">Disclaimer</Link>
          <Link href="/blog" className="mx-2 hover:underline">Blog</Link>
        </footer>


        

        <Analytics />
      </body>
    </html>
  )
}