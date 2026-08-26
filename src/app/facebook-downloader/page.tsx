import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import FacebookContent from '@/components/FacebookContent'

export const metadata: Metadata = {
  title: 'Facebook Video Downloader HD (2026) — SaveFromInternet',
  description: 'Download Facebook videos in Full HD 1080p MP4. Free online Facebook video saver for Watch, Reels, and public posts on any device.',
  keywords: ['facebook video downloader', 'download facebook videos', 'facebook reel downloader', 'fb video download hd'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/facebook-downloader',
  },
}

export default function FacebookDownloaderHubPage() {
  return (
    <>
      <ToolSchema
        name="Facebook Video Downloader"
        description="Download public Facebook videos and Reels in 1080p Full HD."
        url="https://www.savefrominternet.com/facebook-downloader"
        ratingValue="4.9"
        ratingCount="6200"
      />
      <FacebookContent />
    </>
  )
}
