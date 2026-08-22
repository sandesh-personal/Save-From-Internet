import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import InstagramReelContent from '@/components/InstagramReelContent'

export const metadata: Metadata = {
  title: 'Fast Instagram Reels & Video Downloader — Save IG Reels in HD 1080p | SaveFromInternet',
  description:
    'Fast Instagram Reels and video downloader. Download Instagram Reels without watermark in Full HD 1080p MP4. Free, unlimited, no login needed on iPhone, Android & PC.',
  keywords: [
    'fast instagram reels downloader',
    'download instagram reels',
    'instagram reels downloader',
    'save instagram reels',
    'ig video downloader',
    'download ig reels without watermark',
    'instagram mp4 downloader',
    'instagram story downloader',
  ],
  alternates: { canonical: 'https://www.savefrominternet.com/instagram-reel-downloader' },
  openGraph: {
    title: 'Fast Instagram Reels Downloader — Download IG Reels in 1080p HD',
    description: 'Save Instagram Reels and videos in original HD quality without watermark. No app required, 100% free and fast.',
    url: 'https://www.savefrominternet.com/instagram-reel-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast Instagram Reels Downloader — Save Reels in HD',
    description: 'Fast, free Instagram Reels downloader without watermark in 1080p HD.',
    images: ['/og-final.jpg'],
  },
}

export default function InstagramVideoDownloaderPage() {
  return (
    <>
      <ToolSchema
        name="Instagram Reels Downloader"
        description="Download Instagram Reels in Full HD 1080p MP4 quality without watermark."
        url="https://www.savefrominternet.com/instagram-reel-downloader"
        ratingValue="4.9"
        ratingCount="5610"
      />
      <InstagramReelContent />
    </>
  )
}
