import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import InstagramReelContent from '@/components/InstagramReelContent'

export const metadata: Metadata = {
  title: 'Instagram Reels Downloader HD (2026) — SaveFromInternet',
  description: 'Download Instagram Reels in Full HD 1080p MP4 without watermark. Fast, unlimited, no app needed on iOS, Android, and desktop.',
  keywords: ['instagram reels downloader', 'download ig reels', 'save instagram reels hd', 'instagram reel saver'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/instagram-downloader/reels',
  },
  openGraph: {
    title: 'Instagram Reels Downloader HD — SaveFromInternet',
    description: 'Download Instagram Reels in 1080p HD MP4 without watermark.',
    url: 'https://www.savefrominternet.com/instagram-downloader/reels',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

export default function InstagramReelsSiloPage() {
  return (
    <>
      <ToolSchema
        name="Instagram Reels Downloader"
        description="Download Instagram Reels in 1080p HD MP4."
        url="https://www.savefrominternet.com/instagram-downloader/reels"
        ratingValue="4.9"
        ratingCount="6400"
      />
      <InstagramReelContent />
    </>
  )
}
