import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import FacebookContent from '@/components/FacebookContent'

export const metadata: Metadata = {
  title: 'Facebook Reels Downloader HD — Save FB Reels Free | SaveFromInternet',
  description: 'Download Facebook Reels videos in Full HD MP4 quality. Fast, free, no login needed on iPhone, Android, and desktop.',
  keywords: ['facebook reels downloader', 'download fb reels', 'save facebook reels hd'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/facebook-downloader/reels',
  },
}

export default function FacebookReelsSiloPage() {
  return (
    <>
      <ToolSchema
        name="Facebook Reels Downloader"
        description="Download Facebook Reels videos in Full HD."
        url="https://www.savefrominternet.com/facebook-downloader/reels"
        ratingValue="4.8"
        ratingCount="2900"
      />
      <FacebookContent />
    </>
  )
}
