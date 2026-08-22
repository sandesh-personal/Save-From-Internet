import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import FacebookContent from '@/components/FacebookContent'

export const metadata: Metadata = {
  title: 'Fast Facebook Video Downloader — Download FB Videos & Reels HD 1080p | SaveFromInternet',
  description:
    'Fast Facebook video downloader. Save Facebook videos, Reels, and FB Watch clips in Full HD 1080p & 720p MP4. Fast, free, unlimited, no app or registration required on iPhone, Android & PC.',
  keywords: [
    'fast facebook video downloader',
    'download facebook video',
    'fb video download',
    'facebook reel downloader',
    'download fb reels hd',
    'facebook video download 1080p',
    'save facebook video mp4',
    'fb watch downloader',
  ],
  alternates: {
    canonical: 'https://www.savefrominternet.com/facebook-video-downloader',
    languages: {
      'x-default': 'https://www.savefrominternet.com/facebook-video-downloader',
      en: 'https://www.savefrominternet.com/facebook-video-downloader',
      es: 'https://www.savefrominternet.com/es/facebook-video-downloader',
      pt: 'https://www.savefrominternet.com/pt/facebook-video-downloader',
      id: 'https://www.savefrominternet.com/id/facebook-video-downloader',
      fr: 'https://www.savefrominternet.com/fr/facebook-video-downloader',
      de: 'https://www.savefrominternet.com/de/facebook-video-downloader',
      ar: 'https://www.savefrominternet.com/ar/facebook-video-downloader',
      vi: 'https://www.savefrominternet.com/vi/facebook-video-downloader',
      zh: 'https://www.savefrominternet.com/zh/facebook-video-downloader',
      ja: 'https://www.savefrominternet.com/ja/facebook-video-downloader',
      ru: 'https://www.savefrominternet.com/ru/facebook-video-downloader',
    },
  },
  openGraph: {
    title: 'Fast Facebook Video Downloader — Save FB Videos & Reels in Full HD',
    description: 'Download Facebook videos and Reels in HD MP4 without software. Free, safe, and fast on all devices.',
    url: 'https://www.savefrominternet.com/facebook-video-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast Facebook Video Downloader — Save Videos in HD',
    description: 'Fast, free Facebook video and Reel downloader in 1080p HD.',
    images: ['/og-final.jpg'],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download Facebook Videos in HD',
  description: 'Step-by-step guide to download public Facebook videos and Reels to your mobile or computer in Full HD.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy the Facebook video link',
      text: 'Open the Facebook app or website, locate the video or Reel, click the Share button, and select "Copy Link".',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste the link into SaveFromInternet',
      text: 'Paste the copied URL into the search box at SaveFromInternet.com and tap the Download button.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Download HD MP4 video',
      text: 'Click Download Video to save the clean 1080p or 720p MP4 file to your phone gallery or PC.',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I download Facebook videos in Full HD 1080p?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copy the link of any public Facebook video or Reel, paste it into our search box above, and click Download. You will receive direct links to download in HD 1080p or 720p MP4.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download Facebook Reels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! SaveFromInternet supports all Facebook Reels. Just copy the Reel link and paste it into the downloader.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a Facebook account or login?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Our downloader is completely anonymous and requires no Facebook login or account.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I save Facebook videos on iPhone / iOS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open Safari on your iPhone, paste the Facebook URL into our tool, tap Download, and confirm download to save directly to Files or your Camera Roll.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it free to download Facebook videos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, SaveFromInternet provides 100% free, unlimited Facebook video downloads forever.',
      },
    },
  ],
}

export default function FacebookVideoDownloaderPage() {
  return (
    <>
      <ToolSchema
        name="Facebook Video Downloader"
        description="Download Facebook videos and Reels in Full HD 1080p MP4 quality."
        url="https://www.savefrominternet.com/facebook-video-downloader"
        ratingValue="4.9"
        ratingCount="6420"
        howTo={howToSchema}
        faq={faqSchema}
      />
      <FacebookContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
