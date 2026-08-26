import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import TiktokToMp3Content from '@/components/TiktokToMp3Content'

export const metadata: Metadata = {
  title: 'TikTok to MP3 Converter & Audio Downloader (2026) — SaveFromInternet',
  description: 'Extract MP3 audio and songs from TikTok videos in 320kbps high quality. 100% free online TikTok sound & music downloader for all devices.',
  keywords: ['tiktok to mp3', 'tiktok audio downloader', 'download tiktok sound', 'tiktok music download', 'extract audio from tiktok'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/tiktok-downloader/mp3',
  },
  openGraph: {
    title: 'TikTok to MP3 Converter & Audio Downloader — SaveFromInternet',
    description: 'Extract 320kbps high quality MP3 audio from any TikTok video instantly.',
    url: 'https://www.savefrominternet.com/tiktok-downloader/mp3',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

export default function TikTokMp3SiloPage() {
  return (
    <>
      <ToolSchema
        name="TikTok to MP3 Converter"
        description="Extract high-quality 320kbps MP3 audio from any TikTok video."
        url="https://www.savefrominternet.com/tiktok-downloader/mp3"
        ratingValue="4.9"
        ratingCount="5120"
      />
      <TiktokToMp3Content />
    </>
  )
}
