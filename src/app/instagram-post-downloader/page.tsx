import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import InstagramPostContent from '@/components/InstagramPostContent'

export const metadata: Metadata = {
  title: 'Fast Instagram Post Downloader — Download IG Photos & Carousels HD | SaveFromInternet',
  description:
    'Fast Instagram post downloader. Download Instagram posts, photo carousels, and high-resolution pictures for free. Download individual images or all photos in a ZIP archive. Fast, unlimited, no app needed.',
  keywords: [
    'fast instagram post downloader',
    'download instagram photos',
    'instagram carousel downloader',
    'save instagram pictures',
    'download multiple instagram photos',
    'instagram photo downloader hd',
    'ig post downloader',
  ],
  alternates: {
    canonical: 'https://www.savefrominternet.com/instagram-post-downloader',
    languages: {
      'x-default': 'https://www.savefrominternet.com/instagram-post-downloader',
      en: 'https://www.savefrominternet.com/instagram-post-downloader',
      es: 'https://www.savefrominternet.com/es/instagram-post-downloader',
      pt: 'https://www.savefrominternet.com/pt/instagram-post-downloader',
      id: 'https://www.savefrominternet.com/id/instagram-post-downloader',
      fr: 'https://www.savefrominternet.com/fr/instagram-post-downloader',
      de: 'https://www.savefrominternet.com/de/instagram-post-downloader',
      ar: 'https://www.savefrominternet.com/ar/instagram-post-downloader',
      vi: 'https://www.savefrominternet.com/vi/instagram-post-downloader',
      zh: 'https://www.savefrominternet.com/zh/instagram-post-downloader',
      ja: 'https://www.savefrominternet.com/ja/instagram-post-downloader',
      ru: 'https://www.savefrominternet.com/ru/instagram-post-downloader',
    },
  },
  openGraph: {
    title: 'Fast Instagram Post Downloader — Save Photos & Carousels in Full HD',
    description: 'Download Instagram photos and multi-image carousels in original quality. Free, fast, no sign-up.',
    url: 'https://www.savefrominternet.com/instagram-post-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast Instagram Post Downloader — Save Photos & Carousels',
    description: 'Fast, free Instagram photo and multi-image carousel downloader with ZIP support.',
    images: ['/og-final.jpg'],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download Instagram Photos and Carousels',
  description: 'Download full-resolution pictures and multi-photo carousel posts from Instagram.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy post link',
      text: 'Find the Instagram post or carousel, tap the three-dot menu (⋯) or Share icon, and select "Copy Link".',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste URL',
      text: 'Paste the link into SaveFromInternet and click Download to parse all images.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Download photos or ZIP',
      text: 'Download individual images in Full HD or click Download All (ZIP) to get the whole carousel.',
    },
  ],
}

export default function InstagramPostDownloaderPage() {
  return (
    <>
      <ToolSchema
        name="Instagram Post Downloader"
        description="Download Instagram photos and multi-image carousels in Full HD quality."
        url="https://www.savefrominternet.com/instagram-post-downloader"
        ratingValue="4.9"
        ratingCount="5180"
        howTo={howToSchema}
      />
      <InstagramPostContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  )
}
