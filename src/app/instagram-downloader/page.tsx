import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import InstagramReelContent from '@/components/InstagramReelContent'

export const metadata: Metadata = {
  title: 'Instagram Downloader — Reels, Stories, Photos & Carousels | SaveFromInternet',
  description: 'Download Instagram Reels, videos, stories, photo carousels, and audio in original 1080p HD quality. Free, fast, no login required on iPhone, Android & PC.',
  keywords: ['instagram downloader', 'download instagram reels', 'instagram story downloader', 'instagram photo downloader', 'ig downloader'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/instagram-downloader',
  },
  openGraph: {
    title: 'Instagram Downloader — Reels, Stories & Photos | SaveFromInternet',
    description: 'Save Instagram Reels, Photos, and Stories in 1080p HD without watermark for free.',
    url: 'https://www.savefrominternet.com/instagram-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

export default function InstagramDownloaderHubPage() {
  return (
    <>
      <ToolSchema
        name="Instagram Downloader"
        description="Download Instagram Reels, Photos, Stories, and Carousels in HD."
        url="https://www.savefrominternet.com/instagram-downloader"
        ratingValue="4.9"
        ratingCount="8200"
      />
      <InstagramReelContent />
    </>
  )
}
