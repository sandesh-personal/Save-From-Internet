import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import InstagramReelContent from '@/components/InstagramReelContent'

export const metadata: Metadata = {
  title: 'Instagram Carousel Downloader — Save Multi-Post Photos & Videos | SaveFromInternet',
  description: 'Download all photos and videos from Instagram carousel multi-posts in original high resolution. Fast, free ZIP & individual download.',
  keywords: ['instagram carousel downloader', 'download instagram multi post', 'save ig carousel', 'instagram slide downloader'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/instagram-downloader/carousel',
  },
}

export default function InstagramCarouselSiloPage() {
  return (
    <>
      <ToolSchema
        name="Instagram Carousel Downloader"
        description="Download all images and videos from Instagram carousels in full resolution."
        url="https://www.savefrominternet.com/instagram-downloader/carousel"
        ratingValue="4.9"
        ratingCount="3900"
      />
      <InstagramReelContent />
    </>
  )
}
