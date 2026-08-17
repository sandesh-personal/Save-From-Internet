import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import ToolSchema from '@/components/ToolSchema'
import ToolRelatedGuides from '@/components/ToolRelatedGuides'
import { FilmIcon, MusicIcon, PhotoIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'TikTok Photo Downloader — Save TikTok Photos, Images & Pictures Free | SaveFromInternet',
  description:
    'Download TikTok photos, images, and picture carousels in original HD quality. Free TikTok photo & image downloader — save TikTok pics individually or as a ZIP. No app, no sign-up required.',
  keywords: [
    'tiktok photo downloader',
    'tiktok photo download',
    'download tiktok photo',
    'tiktok image download',
    'tiktok image downloader',
    'tiktok picture downloader',
    'tiktok picture download',
    'tiktok carousel downloader',
    'savefrominternet tiktok photo',
  ],
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-photo-downloader' },
  openGraph: {
    title: 'TikTok Photo Downloader - Save TikTok Images & Carousels 2026',
    description: 'Save TikTok images and carousels in original quality. Free, fast, no app.',
    url: 'https://www.savefrominternet.com/tiktok-photo-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I download TikTok photos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copy the TikTok photo post URL, paste it on savefrominternet.com, and click Download. The images will be detected automatically. You can then download them individually or all at once as a ZIP file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download TikTok image carousels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SaveFromInternet.com detects all images in a TikTok carousel post. You can select specific images or download the entire carousel as a ZIP archive.',
      },
    },
    {
      '@type': 'Question',
      name: 'What quality are the downloaded TikTok images?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We download TikTok images in their original full resolution with no compression added.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the TikTok photo downloader free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Completely free — no account, no app, no limits.',
      },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download TikTok Photos and Image Carousels',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok photo post URL', text: 'Open TikTok and find a photo or carousel post. Tap Share → Copy Link.' },
    { '@type': 'HowToStep', position: 2, name: 'Paste on SaveFromInternet.com', text: 'Go to savefrominternet.com, paste the URL, and click Download.' },
    { '@type': 'HowToStep', position: 3, name: 'Select and download images', text: 'Tap "Show Images" to see the gallery. Select individual photos or tap All, then download individually or as a ZIP.' },
  ],
}

export default function TikTokPhotoDownloaderPage() {
  return (
    <div className="bg-white min-h-screen">
      <ToolSchema
        name="TikTok Photo Downloader"
        description="Download TikTok photos and image carousels in HD quality."
        url="https://www.savefrominternet.com/tiktok-photo-downloader"
        howTo={howToSchema}
        faq={faqSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-12 sm:py-16 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-blue-100 shadow-xs">
            🖼️ Photo &amp; Carousel Downloader · Free
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            TikTok Photo &amp; <span className="text-blue-600">Image Downloader</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Download TikTok photos, images, and picture slideshows in original HD resolution. Save individual pics or download all as a ZIP file. Free, no app needed.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:scale-105 transition-all cursor-pointer"
          >
            Download TikTok Photos
          </Link>
        </div>
      </section>

      {/* Ad */}
      <div className="flex justify-center py-6 px-4 max-w-5xl mx-auto">
        <GoogleAdSense adSlot="5309301802" adFormat="auto" className="flex justify-center w-full" containerStyle="default" />
      </div>

      {/* How it works */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            How to Download TikTok Photos
          </h2>
          <div className="space-y-4">
            {[
              {
                n: '1',
                title: 'Copy the TikTok Photo Post URL',
                desc: 'Open TikTok and find a photo post or image carousel. Tap the Share button, then tap Copy Link to copy the URL.',
              },
              {
                n: '2',
                title: 'Paste on SaveFromInternet.com',
                desc: 'Go to savefrominternet.com, paste the URL into the input box, and click Download. Our tool detects all images automatically.',
              },
              {
                n: '3',
                title: 'Show the Image Gallery',
                desc: 'Tap "Show Images" to view all photos in the post. Tap individual photos to select or unselect them.',
              },
              {
                n: '4',
                title: 'Download Images or ZIP Archive',
                desc: 'Tap "All" to select every image, then click Download. You can also tick "Download as ZIP" to get a clean archive.',
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md shadow-blue-500/20">
                  {n}
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <ToolRelatedGuides
        guides={[
          { label: 'Download Carousel as ZIP', href: '/blog/tiktok-image-carousel-zip' },
          { label: 'TikTok Photos vs Video', href: '/blog/tiktok-photo-vs-video-download' },
          { label: 'Photo Downloader Guide', href: '/blog/how-to-download-tiktok-photos-and-image-carousels' },
          { label: 'TikTok to MP3 Converter', href: '/tiktok-to-mp3' },
          { label: 'TikTok Video Downloader', href: '/tiktok-video-downloader' },
        ]}
      />

      {/* Bottom CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-[#195fd7] to-[#1e6fe8] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-blue-600/20">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
            Download TikTok Photos in Original Quality
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Paste any photo slideshow link and download all photos at once. Free forever, no app required.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-700 font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition-all active:scale-95 cursor-pointer"
          >
            Start Downloading Photos
          </Link>
        </div>
      </section>
    </div>
  )
}
