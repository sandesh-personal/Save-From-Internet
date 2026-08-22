import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import InstagramReelContent from '@/components/InstagramReelContent'

export const metadata: Metadata = {
  title: 'Fast Instagram Reels Downloader — Save IG Reels in HD 1080p | SaveFromInternet',
  description:
    'Fast Instagram Reels downloader. Download Instagram Reels and videos without watermark in Full HD 1080p MP4. Free, unlimited, no login needed on iPhone, Android & PC.',
  keywords: [
    'fast instagram reels downloader',
    'download instagram reels',
    'instagram reels downloader',
    'save instagram reels',
    'ig reel downloader',
    'download ig reels without watermark',
    'instagram reel mp4 download',
    'instagram story downloader',
  ],
  alternates: {
    canonical: 'https://www.savefrominternet.com/instagram-reel-downloader',
    languages: {
      'x-default': 'https://www.savefrominternet.com/instagram-reel-downloader',
      en: 'https://www.savefrominternet.com/instagram-reel-downloader',
      es: 'https://www.savefrominternet.com/es/instagram-reel-downloader',
      pt: 'https://www.savefrominternet.com/pt/instagram-reel-downloader',
      id: 'https://www.savefrominternet.com/id/instagram-reel-downloader',
      fr: 'https://www.savefrominternet.com/fr/instagram-reel-downloader',
      de: 'https://www.savefrominternet.com/de/instagram-reel-downloader',
      ar: 'https://www.savefrominternet.com/ar/instagram-reel-downloader',
      vi: 'https://www.savefrominternet.com/vi/instagram-reel-downloader',
      zh: 'https://www.savefrominternet.com/zh/instagram-reel-downloader',
      ja: 'https://www.savefrominternet.com/ja/instagram-reel-downloader',
      ru: 'https://www.savefrominternet.com/ru/instagram-reel-downloader',
    },
  },
  openGraph: {
    title: 'Fast Instagram Reels Downloader — Download IG Reels in 1080p HD',
    description: 'Save Instagram Reels and videos in original HD quality without watermark. 100% free and fast on all devices.',
    url: 'https://www.savefrominternet.com/instagram-reel-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast Instagram Reels Downloader — Save Reels in HD',
    description: 'Fast, free Instagram Reels downloader without watermark in 1080p HD.',
    images: ['/og-final.jpg'],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download Instagram Reels in HD Without Watermark',
  description: 'Download Instagram Reels to your phone or computer in high quality MP4 without watermark.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Instagram Reel link',
      text: 'Open the Instagram app or website, find the Reel, tap the three-dot menu (⋯) or Share icon, and select "Copy Link".',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste the link',
      text: 'Paste the copied URL into the SaveFromInternet search box above and click the Download button.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Download HD MP4 video',
      text: 'Click Download HD Video to save the watermark-free MP4 directly to your device gallery or downloads folder.',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I download Instagram Reels without a watermark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copy the link of any public Instagram Reel, paste it into our downloader input box above, and click Download. SaveFromInternet will fetch the original source video in high-definition MP4 without any added watermark.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download Instagram photo carousels or multiple images?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. For multi-photo posts and carousels, check out our Instagram Post Downloader page or paste the link here to download all high-resolution pictures individually or as a single ZIP archive.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an Instagram account or login to use this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. SaveFromInternet is completely anonymous and requires no Instagram login, password, or account registration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I save Instagram Reels on iPhone / iOS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open Safari on your iPhone, paste the Instagram Reel URL into our downloader, and tap Download. When prompted by Safari, tap Download to store the file in your Files app, where you can easily save it to your Camera Roll.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a limit on how many Instagram Reels I can download?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, SaveFromInternet provides 100% free and unlimited downloads with no daily caps or throttling.',
      },
    },
  ],
}

export default function InstagramReelsDownloaderPage() {
  return (
    <>
      <ToolSchema
        name="Instagram Reels Downloader"
        description="Download Instagram Reels in Full HD 1080p MP4 quality without watermark."
        url="https://www.savefrominternet.com/instagram-reel-downloader"
        ratingValue="4.9"
        ratingCount="5610"
        howTo={howToSchema}
        faq={faqSchema}
      />
      <InstagramReelContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
