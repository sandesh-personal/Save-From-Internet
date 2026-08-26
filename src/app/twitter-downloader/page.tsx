import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import TwitterContent from '@/components/TwitterContent'

export const metadata: Metadata = {
  title: 'Twitter Video Downloader — Save X Videos & GIFs HD | SaveFromInternet',
  description: 'Download Twitter (X) videos and GIFs in HD MP4 quality for free. Fast, unlimited, no app needed on iPhone, Android, PC, and Mac.',
  keywords: ['twitter video downloader', 'x video downloader', 'download twitter video', 'save x video', 'twitter gif downloader'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/twitter-downloader',
  },
}

export default function TwitterDownloaderHubPage() {
  return (
    <>
      <ToolSchema
        name="Twitter Video Downloader"
        description="Download Twitter (X) videos and GIFs in HD MP4 quality."
        url="https://www.savefrominternet.com/twitter-downloader"
        ratingValue="4.9"
        ratingCount="5400"
      />
      <TwitterContent />
    </>
  )
}
