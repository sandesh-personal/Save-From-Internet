import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'TikTok to MP3 Converter - Download TikTok Audio (2025) - Save From Internet',
  description:
    'Convert and download TikTok to MP3 in seconds. Free TikTok audio downloader (2025) — no app required.',
  keywords: [
    'TikTok to MP3',
    'download tiktok mp3',
    'mp3 tiktok',
    'mp3 converter tiktok',
  ],
  openGraph: {
    title: 'TikTok to MP3 Converter - Download TikTok Audio (2025)',
    description:
      'Download TikTok audio as MP3 in high quality. Free, fast, no app.',
    url: 'https://savefrominternet.com/tiktok-to-mp3',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok to MP3 Converter - Download TikTok Audio (2025)',
    description:
      'Download TikTok audio as MP3 in high quality. Free, fast, no app.',
    images: ['/og-final.jpg'],
  },
}

export default function TikTokToMp3Page() {
  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 py-8">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white">TikTok to MP3 Converter</h1>
        <p className="text-white/80">
          Paste your TikTok link on the{' '}
          <Link href="/" className="underline">homepage</Link> and choose <strong>Extract Audio (MP3)</strong> to download the original sound.
        </p>
        <div className="mt-8">
          <GoogleAdSense
            adSlot="3804648444"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>
      </div>
    </div>
  )
}


