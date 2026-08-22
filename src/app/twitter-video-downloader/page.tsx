import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import TwitterContent from '@/components/TwitterContent'

export const metadata: Metadata = {
  title: 'Fast Twitter (X) Video Downloader — Download Videos & GIFs HD 1080p | SaveFromInternet',
  description:
    'Fast Twitter (X) video downloader. Save Twitter videos and GIFs in Full HD 1080p, 720p & MP4. Fast, free, unlimited, no app or account required on iPhone, Android & PC.',
  keywords: [
    'fast twitter video downloader',
    'download twitter video',
    'twitter video download',
    'x video downloader',
    'download x video hd',
    'twitter gif downloader',
    'save twitter video mp4',
  ],
  alternates: {
    canonical: 'https://www.savefrominternet.com/twitter-video-downloader',
    languages: {
      'x-default': 'https://www.savefrominternet.com/twitter-video-downloader',
      en: 'https://www.savefrominternet.com/twitter-video-downloader',
      es: 'https://www.savefrominternet.com/es/twitter-video-downloader',
      pt: 'https://www.savefrominternet.com/pt/twitter-video-downloader',
      id: 'https://www.savefrominternet.com/id/twitter-video-downloader',
      fr: 'https://www.savefrominternet.com/fr/twitter-video-downloader',
      de: 'https://www.savefrominternet.com/de/twitter-video-downloader',
      ar: 'https://www.savefrominternet.com/ar/twitter-video-downloader',
      vi: 'https://www.savefrominternet.com/vi/twitter-video-downloader',
      zh: 'https://www.savefrominternet.com/zh/twitter-video-downloader',
      ja: 'https://www.savefrominternet.com/ja/twitter-video-downloader',
      ru: 'https://www.savefrominternet.com/ru/twitter-video-downloader',
    },
  },
  openGraph: {
    title: 'Fast Twitter (X) Video Downloader — Save Videos & GIFs in HD',
    description: 'Download Twitter (X) videos and GIFs in original HD MP4 without software. Free and fast on all devices.',
    url: 'https://www.savefrominternet.com/twitter-video-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast Twitter Video Downloader — Save Videos in HD',
    description: 'Fast, free Twitter and X video & GIF downloader in 1080p HD.',
    images: ['/og-final.jpg'],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download Twitter (X) Videos and GIFs in HD',
  description: 'Step-by-step tutorial to download Twitter videos and animated GIFs in high quality MP4.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Tweet link',
      text: 'Open Twitter (X), find the tweet with the video or GIF, tap the Share icon, and select "Copy Link".',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste the link into SaveFromInternet',
      text: 'Paste the URL into the search box at SaveFromInternet.com and tap the Download button.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Download HD MP4 video',
      text: 'Choose your desired resolution (1080p, 720p, 480p) and save the MP4 video directly to your phone or computer.',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I download Twitter videos in HD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copy the tweet URL, paste it into our search box above, and click Download. You will see direct links for 1080p, 720p, or 480p MP4.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download Twitter GIFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Twitter converts GIFs to MP4 format internally, and our tool lets you download them as clean MP4 video files.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an X / Twitter account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, SaveFromInternet requires no account or login.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to save Twitter videos on iPhone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open Safari on your iPhone, paste the tweet link, tap Download and save to your Camera Roll.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a limit on downloads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, downloads are 100% free and unlimited.',
      },
    },
  ],
}

export default function TwitterVideoDownloaderPage() {
  return (
    <>
      <ToolSchema
        name="Twitter (X) Video Downloader"
        description="Download Twitter videos and GIFs in HD 1080p MP4 quality."
        url="https://www.savefrominternet.com/twitter-video-downloader"
        ratingValue="4.9"
        ratingCount="5120"
        howTo={howToSchema}
        faq={faqSchema}
      />
      <TwitterContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
