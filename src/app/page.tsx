import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'TikTok Downloader Without Watermark (2026) — Free HD MP4 & MP3 | SaveFromInternet',
  description:
    'Download TikTok videos without watermark in HD MP4, extract MP3 audio, and save photo carousels for free. Fast, unlimited, no app needed on iPhone, Android & PC.',
  keywords: [
    'tiktok downloader without watermark',
    'download tiktok video',
    'tiktok to mp3',
    'tiktok photo downloader',
    'free tiktok video downloader',
    'save tiktok video',
    'tiktok downloader 2026',
  ],
  alternates: {
    canonical: 'https://www.savefrominternet.com',
    languages: {
      'x-default': 'https://www.savefrominternet.com',
      en: 'https://www.savefrominternet.com',
      es: 'https://www.savefrominternet.com/es',
      pt: 'https://www.savefrominternet.com/pt',
      id: 'https://www.savefrominternet.com/id',
      fr: 'https://www.savefrominternet.com/fr',
      de: 'https://www.savefrominternet.com/de',
      ar: 'https://www.savefrominternet.com/ar',
      vi: 'https://www.savefrominternet.com/vi',
      zh: 'https://www.savefrominternet.com/zh',
      ja: 'https://www.savefrominternet.com/ja',
      ru: 'https://www.savefrominternet.com/ru',
    },
  },
  openGraph: {
    title: 'TikTok Downloader Without Watermark (2026) — Free HD MP4 & MP3',
    description: 'Download TikTok videos without watermark in HD MP4, extract MP3 audio, and save photo carousels for free. No app required.',
    url: 'https://www.savefrominternet.com',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Downloader Without Watermark — Save Videos in HD 1080p',
    description: 'Fast, free TikTok video downloader. Works on iPhone, Android, Mac & PC.',
    images: ['/og-final.jpg'],
  },
}

export default function Home() {
  return <HomeContent />
}
