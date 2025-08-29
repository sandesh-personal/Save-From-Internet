import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TikTok Photo Downloader - Save TikTok Images & Carousels (2025)',
  description:
    'Download TikTok photos and image carousels in original quality. Free and easy (2025).',
  keywords: [
    'tik tok photo download',
    'tiktok photo downloader',
  ],
  openGraph: {
    title: 'TikTok Photo Downloader - Save TikTok Images & Carousels (2025)',
    description:
      'Save TikTok images and carousels in original quality. Free, fast, no app.',
    url: 'https://savefrominternet.com/tiktok-photo-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

export default function TikTokPhotoDownloaderPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 py-8">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white">TikTok Photo Downloader</h1>
        <p className="text-white/80">
          Paste any TikTok image post on the{' '}
          <Link href="/" className="underline">homepage</Link> and choose images to download individually or as a ZIP.
        </p>
      </div>
    </div>
  )
}


