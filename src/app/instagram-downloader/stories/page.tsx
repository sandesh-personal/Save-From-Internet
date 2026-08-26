import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import InstagramReelContent from '@/components/InstagramReelContent'

export const metadata: Metadata = {
  title: 'Instagram Story Downloader — Save IG Stories HD | SaveFromInternet',
  description: 'Download Instagram Stories and Highlights in original HD quality. Fast, free, no login or app required on any device.',
  keywords: ['instagram story downloader', 'download ig stories', 'save instagram story', 'story saver ig'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/instagram-downloader/stories',
  },
  openGraph: {
    title: 'Instagram Story Downloader — SaveFromInternet',
    description: 'Save Instagram Stories and Highlights in HD MP4/JPG for free.',
    url: 'https://www.savefrominternet.com/instagram-downloader/stories',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

export default function InstagramStoriesSiloPage() {
  return (
    <>
      <ToolSchema
        name="Instagram Story Downloader"
        description="Download public Instagram Stories and Highlights in HD."
        url="https://www.savefrominternet.com/instagram-downloader/stories"
        ratingValue="4.8"
        ratingCount="4120"
      />
      <InstagramReelContent />
    </>
  )
}
