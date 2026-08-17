import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import { PhotoIcon, DownloadIcon, BoltIcon, DevicePhoneIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Download TikTok Photo - Save TikTok Photos & Carousels Free | SaveFromInternet',
  description: 'Download TikTok photos instantly with SaveFromInternet. Save TikTok images and carousels in original quality — no watermark, no app, no sign-up required.',
  keywords: [
    'download tiktok photo',
    'tiktok download photo',
    'tiktok photo downloader',
    'save tiktok photos',
    'savefrominternet tiktok photo',
    'tiktok image downloader',
    'download tiktok carousel',
  ],
  alternates: { canonical: 'https://www.savefrominternet.com/download-tiktok-photo' },
  openGraph: {
    title: 'Download TikTok Photo Free — SaveFromInternet',
    description: 'Download TikTok photos and carousels in original quality. Free, no app, no sign-up.',
    url: 'https://www.savefrominternet.com/download-tiktok-photo',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download TikTok Photos and Image Carousels',
  description: 'Download TikTok photos in original quality using SaveFromInternet.com.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok photo link', text: 'Open TikTok, find a photo post, tap Share → Copy Link.' },
    { '@type': 'HowToStep', position: 2, name: 'Paste on SaveFromInternet', text: 'Go to savefrominternet.com and paste the link, then tap Download.' },
    { '@type': 'HowToStep', position: 3, name: 'Save photos', text: "Tap 'Show Images' to view the carousel. Download individual photos or all at once as a ZIP file." },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I download a TikTok photo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copy the TikTok photo post URL, go to savefrominternet.com, paste it, and click Download. Tap "Show Images" to view all photos in the post, then download individually or as a ZIP.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download TikTok carousel photos all at once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SaveFromInternet detects all images in a TikTok carousel. Select all and download as a single ZIP file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TikTok photo download free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Completely free — no account, no app, no limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What quality are downloaded TikTok photos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Original quality with no compression. We fetch the full-resolution image directly from TikTok.',
      },
    },
  ],
}

export default function DownloadTikTokPhotoPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-12 sm:py-16 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-blue-100 shadow-xs">
            SaveFromInternet · TikTok Photo Downloader
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            Download <span className="text-blue-600">TikTok Photo</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Save any TikTok photo or image carousel in original quality. Free, instant, no app or sign-up needed.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:scale-105 transition-all cursor-pointer"
          >
            Download TikTok Photo Now
          </Link>
        </div>
      </section>

      {/* Ad */}
      <div className="flex justify-center py-6 px-4 max-w-5xl mx-auto">
        <GoogleAdSense adSlot="5309301802" adFormat="auto" className="flex justify-center w-full" containerStyle="default" />
      </div>

      {/* Steps */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            How to Download TikTok Photos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy the Photo Link', desc: 'Open TikTok, find a photo post, tap Share → Copy Link.' },
              { n: '2', title: 'Paste on SaveFromInternet', desc: 'Go to savefrominternet.com, paste the link and tap Download.' },
              { n: '3', title: 'Save Your Photos', desc: 'Tap Show Images, select photos, and download individually or all as ZIP.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-md shadow-blue-500/20">{n}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {([
            { Icon: PhotoIcon, title: 'Original Quality', desc: 'Full-resolution images, no compression added.' },
            { Icon: DownloadIcon, title: 'ZIP Download', desc: 'Download all carousel images in one ZIP file.' },
            { Icon: BoltIcon, title: 'Completely Free', desc: 'No account, no app, no hidden limits.' },
            { Icon: DevicePhoneIcon, title: 'All Devices', desc: 'iPhone, Android, PC, Mac — any browser.' },
          ] as const).map(({ Icon, title, desc }) => (
            <div key={title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
              <div className="w-10 h-10 bg-blue-100/70 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-slate-900 font-bold mb-1">{title}</h3>
              <p className="text-slate-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What types of TikTok photos */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-8">
            What TikTok Photos Can You Download?
          </h2>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3 text-sm text-slate-700">
            <p className="flex gap-2.5"><span className="text-blue-600 font-bold">✓</span><span><strong className="text-slate-900">Single photo posts</strong> — any standalone image shared on TikTok</span></p>
            <p className="flex gap-2.5"><span className="text-blue-600 font-bold">✓</span><span><strong className="text-slate-900">Photo carousels</strong> — all images in a multi-photo slideshow post</span></p>
            <p className="flex gap-2.5"><span className="text-blue-600 font-bold">✓</span><span><strong className="text-slate-900">Image galleries</strong> — collections shared as TikTok Stories or posts</span></p>
            <p className="text-xs text-slate-400 pt-2">Only publicly available posts are supported. Private or restricted content cannot be downloaded.</p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-10 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg font-bold text-slate-900 mb-5">More SaveFromInternet Tools</h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              { label: 'TikTok Video Downloader', href: '/tiktok-video-downloader' },
              { label: 'TikTok to MP3', href: '/tiktok-to-mp3' },
              { label: 'No Watermark', href: '/tiktok-downloader-without-watermark' },
              { label: 'iPhone Guide', href: '/tiktok-video-downloader-iphone' },
              { label: 'Android Guide', href: '/tiktok-video-downloader-android' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="px-4 py-2 bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 rounded-full text-sm font-medium transition-all">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-[#195fd7] to-[#1e6fe8] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-blue-600/20">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">Download TikTok Photos Free</h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-6">Original quality · Carousel support · SaveFromInternet.com</p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-700 font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition-all active:scale-95 cursor-pointer"
          >
            Download TikTok Photo
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
