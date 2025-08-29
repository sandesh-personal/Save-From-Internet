import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2025 - Save From Internet',
  description:
    'TikTok Video Downloader to download TikTok videos without watermark 2025 in HD as MP4. Fast, free, no app required. Extract MP3 and save images, too.',
  keywords: [
    'TikTok Video Downloader',
    'download tiktok videos without watermark 2025',
    'tiktok downloader 2025',
  ],
  openGraph: {
    title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2025',
    description:
      'Download TikTok videos without watermark in HD. Free TikTok video downloader for PC, iPhone, Android. No app required.',
    url: 'https://savefrominternet.com/tiktok-video-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2025',
    description:
      'Download TikTok videos without watermark in HD. Free TikTok video downloader for PC, iPhone, Android. No app required.',
    images: ['/og-final.jpg'],
  },
}

export default function TikTokVideoDownloaderLanding() {
  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 py-8">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white">TikTok Video Downloader</h1>
        <p className="text-white/80">
          Download TikTok videos without watermark 2025 in HD. Use the tool on the{' '}
          <Link href="/" className="underline">homepage</Link>{' '}
          to paste a TikTok link and get instant download options.
        </p>
        <div className="mt-8">
          <GoogleAdSense
            adSlot="5309301802"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>
      </div>
    </div>
  )
}


