import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'SaveFromInternet — Free TikTok Downloader, Photo & MP3 | Save From Internet',
  description:
    'SaveFromInternet — the free savefrom.net alternative for TikTok. Download TikTok videos without watermark, save TikTok photos, and extract MP3 audio. Works on PC, iPhone, Android. No app needed.',
  alternates: { canonical: 'https://www.savefrominternet.com' },
}

export default function Home() {
  return <HomeContent />
}
