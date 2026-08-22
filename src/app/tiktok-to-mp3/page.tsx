import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import TiktokToMp3Content from '@/components/TiktokToMp3Content'

export const metadata: Metadata = {
  title: 'Fast TikTok to MP3 Converter — Download TikTok Audio Free 2026 | SaveFromInternet',
  description:
    'Convert TikTok videos to MP3 audio in seconds. Download 320kbps high-quality TikTok audio & songs for free — no app, no sign-up, works on iPhone, Android, and PC.',
  keywords: [
    'tiktok to mp3',
    'download tiktok mp3',
    'tiktok audio downloader',
    'tiktok mp3 converter',
    'extract tiktok audio',
  ],
  alternates: {
    canonical: 'https://www.savefrominternet.com/tiktok-to-mp3',
    languages: {
      'x-default': 'https://www.savefrominternet.com/tiktok-to-mp3',
      en: 'https://www.savefrominternet.com/tiktok-to-mp3',
      es: 'https://www.savefrominternet.com/es/tiktok-to-mp3',
      pt: 'https://www.savefrominternet.com/pt/tiktok-to-mp3',
      id: 'https://www.savefrominternet.com/id/tiktok-to-mp3',
      fr: 'https://www.savefrominternet.com/fr/tiktok-to-mp3',
      de: 'https://www.savefrominternet.com/de/tiktok-to-mp3',
      ar: 'https://www.savefrominternet.com/ar/tiktok-to-mp3',
      vi: 'https://www.savefrominternet.com/vi/tiktok-to-mp3',
      zh: 'https://www.savefrominternet.com/zh/tiktok-to-mp3',
      ja: 'https://www.savefrominternet.com/ja/tiktok-to-mp3',
      ru: 'https://www.savefrominternet.com/ru/tiktok-to-mp3',
    },
  },
  openGraph: {
    title: 'TikTok to MP3 Converter — Download TikTok Audio Free 2026',
    description: 'Convert TikTok videos to MP3 in seconds. Free, high-quality audio extraction.',
    url: 'https://www.savefrominternet.com/tiktok-to-mp3',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert TikTok Videos to MP3 Audio',
  description: 'Extract and save MP3 audio from any TikTok video.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy TikTok link', text: 'Open TikTok, tap Share on the video, and tap Copy Link.' },
    { '@type': 'HowToStep', position: 2, name: 'Paste URL', text: 'Paste the URL into SaveFromInternet and click Download.' },
    { '@type': 'HowToStep', position: 3, name: 'Extract MP3', text: 'Click Extract MP3 to save the audio file to your device.' },
  ],
}

export default function TikTokToMp3Page() {
  return (
    <>
      <ToolSchema
        name="TikTok to MP3 Converter"
        description="Convert TikTok videos to MP3 audio in 320kbps high quality."
        url="https://www.savefrominternet.com/tiktok-to-mp3"
        ratingValue="4.9"
        ratingCount="5430"
        howTo={howToSchema}
      />
      <TiktokToMp3Content />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  )
}
