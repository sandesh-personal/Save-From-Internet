import type { Metadata } from 'next'
import ToolSchema from '@/components/ToolSchema'
import InstagramReelContent from '@/components/InstagramReelContent'

export const metadata: Metadata = {
  title: 'Instagram Photo Downloader — Save IG Photos in HD | SaveFromInternet',
  description: 'Download Instagram photos in original high resolution JPG. 100% free online photo saver for Instagram on iPhone, Android, and PC.',
  keywords: ['instagram photo downloader', 'download ig photos', 'save instagram images', 'instagram picture downloader'],
  alternates: {
    canonical: 'https://www.savefrominternet.com/instagram-downloader/photo',
  },
}

export default function InstagramPhotoSiloPage() {
  return (
    <>
      <ToolSchema
        name="Instagram Photo Downloader"
        description="Download Instagram photos in original high resolution."
        url="https://www.savefrominternet.com/instagram-downloader/photo"
        ratingValue="4.8"
        ratingCount="3100"
      />
      <InstagramReelContent />
    </>
  )
}
