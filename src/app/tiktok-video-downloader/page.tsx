import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'TikTok Video Downloader — Download TikTok Videos Without Watermark HD | SaveFromInternet',
  description:
    'Free TikTok video downloader. Download TikTok videos without watermark in Full HD 1080p MP4, extract MP3 audio, and save photo carousels. Fast, unlimited, no app needed on iPhone, Android & PC.',
  keywords: [
    'TikTok Video Downloader',
    'download tiktok videos without watermark',
    'tiktok video downloader',
    'tiktok downloader without watermark',
    'save tiktok video',
  ],
  alternates: {
    canonical: 'https://www.savefrominternet.com/tiktok-video-downloader',
    languages: {
      'x-default': 'https://www.savefrominternet.com/tiktok-video-downloader',
      en: 'https://www.savefrominternet.com/tiktok-video-downloader',
      es: 'https://www.savefrominternet.com/es/tiktok-video-downloader',
      pt: 'https://www.savefrominternet.com/pt/tiktok-video-downloader',
      id: 'https://www.savefrominternet.com/id/tiktok-video-downloader',
      fr: 'https://www.savefrominternet.com/fr/tiktok-video-downloader',
      de: 'https://www.savefrominternet.com/de/tiktok-video-downloader',
      ar: 'https://www.savefrominternet.com/ar/tiktok-video-downloader',
      vi: 'https://www.savefrominternet.com/vi/tiktok-video-downloader',
      zh: 'https://www.savefrominternet.com/zh/tiktok-video-downloader',
      ja: 'https://www.savefrominternet.com/ja/tiktok-video-downloader',
      ru: 'https://www.savefrominternet.com/ru/tiktok-video-downloader',
    },
  },
  openGraph: {
    title: 'TikTok Video Downloader — Download Without Watermark 2026',
    description: 'Free TikTok video downloader. HD MP4, no watermark, no app required.',
    url: 'https://www.savefrominternet.com/tiktok-video-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

export default function TikTokVideoDownloaderPage() {
  return (
    <>
      <ToolSchema
        name="TikTok Video Downloader"
        description="Download TikTok videos without watermark in HD MP4 quality."
        url="https://www.savefrominternet.com/tiktok-video-downloader"
        ratingValue="4.9"
        ratingCount="8920"
      />
      <HomeContent />
    </>
  )
}
