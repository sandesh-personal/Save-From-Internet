import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'Download TikTok Without Watermark HD (2026) — SaveFromInternet',
  description: 'Download TikTok videos without watermark in pristine 1080p Full HD. Fast, free, watermark-free TikTok video saver on any mobile or desktop device.',
  keywords: ['download tiktok without watermark', 'tiktok no watermark', 'tiktok watermark remover', 'save tiktok no watermark'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/tiktok-downloader/without-watermark',
  },
  openGraph: {
    title: 'Download TikTok Videos Without Watermark HD — SaveFromInternet',
    description: '100% free TikTok no watermark downloader in 1080p HD MP4.',
    url: 'https://www.savefrominternet.com/tiktok-downloader/without-watermark',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

export default function TikTokWithoutWatermarkPage() {
  return (
    <>
      <ToolSchema
        name="TikTok No Watermark Downloader"
        description="Download TikTok videos without watermark in 1080p Full HD."
        url="https://www.savefrominternet.com/tiktok-downloader/without-watermark"
        ratingValue="4.9"
        ratingCount="7820"
      />
      <HomeContent />
    </>
  )
}
