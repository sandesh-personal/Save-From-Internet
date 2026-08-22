import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import TiktokPhotoContent from '@/components/TiktokPhotoContent'

export const metadata: Metadata = {
  title: 'Fast TikTok Photo Downloader — Save TikTok Photos & Slideshows HD | SaveFromInternet',
  description:
    'Download TikTok photos, images, and picture carousels in original HD quality. Save TikTok pics individually or as a ZIP archive. Free, unlimited, no app needed.',
  keywords: [
    'tiktok photo downloader',
    'download tiktok photo',
    'tiktok image downloader',
    'tiktok carousel downloader',
    'save tiktok photos zip',
  ],
  alternates: {
    canonical: 'https://www.savefrominternet.com/tiktok-photo-downloader',
    languages: {
      'x-default': 'https://www.savefrominternet.com/tiktok-photo-downloader',
      en: 'https://www.savefrominternet.com/tiktok-photo-downloader',
      es: 'https://www.savefrominternet.com/es/tiktok-photo-downloader',
      pt: 'https://www.savefrominternet.com/pt/tiktok-photo-downloader',
      id: 'https://www.savefrominternet.com/id/tiktok-photo-downloader',
      fr: 'https://www.savefrominternet.com/fr/tiktok-photo-downloader',
      de: 'https://www.savefrominternet.com/de/tiktok-photo-downloader',
      ar: 'https://www.savefrominternet.com/ar/tiktok-photo-downloader',
      vi: 'https://www.savefrominternet.com/vi/tiktok-photo-downloader',
      zh: 'https://www.savefrominternet.com/zh/tiktok-photo-downloader',
      ja: 'https://www.savefrominternet.com/ja/tiktok-photo-downloader',
      ru: 'https://www.savefrominternet.com/ru/tiktok-photo-downloader',
    },
  },
  openGraph: {
    title: 'TikTok Photo Downloader — Save TikTok Images & Carousels HD',
    description: 'Save TikTok images and carousels in original quality. Free, fast, ZIP support.',
    url: 'https://www.savefrominternet.com/tiktok-photo-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download TikTok Photos and Carousels',
  description: 'Download full-resolution pictures and slide carousels from TikTok.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy photo link', text: 'Find the photo post on TikTok, tap Share, and select Copy Link.' },
    { '@type': 'HowToStep', position: 2, name: 'Paste link', text: 'Paste the link into SaveFromInternet and click Download.' },
    { '@type': 'HowToStep', position: 3, name: 'Save images', text: 'Download individual photos or click Download All (ZIP).' },
  ],
}

export default function TikTokPhotoDownloaderPage() {
  return (
    <>
      <ToolSchema
        name="TikTok Photo Downloader"
        description="Download TikTok photo carousels and images in full HD quality."
        url="https://www.savefrominternet.com/tiktok-photo-downloader"
        ratingValue="4.9"
        ratingCount="4890"
        howTo={howToSchema}
      />
      <TiktokPhotoContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  )
}
