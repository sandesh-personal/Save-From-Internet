import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'TikTok Downloader Without Watermark (2026) — Free HD MP4 & MP3 | SaveFromInternet',
  description:
    'Download TikTok videos without watermark in HD MP4, extract MP3 audio, and save photo carousels for free. Fast, unlimited, no app needed on iPhone, Android & PC.',
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
}

export default function Home() {
  return <HomeContent />
}
