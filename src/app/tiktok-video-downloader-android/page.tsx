import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TikTok Video Downloader for Android (2025) - No Watermark',
  description:
    'How to download TikTok videos on Android without watermark (2025). Chrome/Brave steps and tips.',
  keywords: [
    'tiktok video downloader android',
    'android tik tok',
  ],
}

export default function TikTokDownloaderAndroidPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-4 text-white">
        <h1 className="text-3xl font-extrabold">TikTok Video Downloader for Android</h1>
        <p className="text-white/80">Open Chrome/Brave → go to <Link href="/" className="underline">savefrominternet.com</Link> → paste a TikTok link → choose MP4 or MP3.</p>
      </div>
    </div>
  )
}


