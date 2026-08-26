import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'TikTok Downloader Without Watermark (2026) — SaveFromInternet',
  description: 'Download TikTok videos without watermark in HD 1080p MP4, extract MP3 audio, and save photo carousels for free. Fast, unlimited, no app needed.',
  keywords: ['tiktok downloader', 'download tiktok without watermark', 'tiktok video downloader', 'save tiktok', 'savefrominternet tiktok'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/tiktok-downloader',
  },
  openGraph: {
    title: 'TikTok Downloader Without Watermark — SaveFromInternet',
    description: 'Save TikTok videos in HD MP4 without watermark for free on iPhone, Android, and PC.',
    url: 'https://www.savefrominternet.com/tiktok-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

export default function TikTokDownloaderHubPage() {
  return (
    <>
      <ToolSchema
        name="TikTok Downloader"
        description="Download TikTok videos without watermark in HD MP4 quality."
        url="https://www.savefrominternet.com/tiktok-downloader"
        ratingValue="4.9"
        ratingCount="9450"
      />
      <HomeContent />
    </>
  )
}
