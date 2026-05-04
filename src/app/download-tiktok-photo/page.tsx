import type { Metadata } from 'next'
import Link from 'next/link'
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
    { '@type': 'HowToStep', position: 2, name: 'Paste on SaveFromInternet', text: 'Go to savefrominternet.com and paste the link, then tap Download TikTok Video.' },
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
    <div className="bg-white dark:bg-slate-900">

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50/50 dark:from-slate-800 to-white dark:to-slate-900 py-14 px-4 text-center border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-indigo-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-indigo-100 dark:border-indigo-900/40 shadow-sm">
            SaveFromInternet · TikTok Photo Downloader
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            Download{' '}
            <span className="text-indigo-500">
              TikTok Photo
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Save any TikTok photo or image carousel in original quality. Free, instant, no app or sign-up needed.
          </p>
          <Link
            href="/"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg shadow-indigo-500/25 transition-all"
          >
            Download TikTok Photo Now
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
            How to Download TikTok Photos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy the TikTok Photo Link', desc: 'Open TikTok, find a photo post, tap Share → Copy Link.' },
              { n: '2', title: 'Paste on SaveFromInternet', desc: 'Go to savefrominternet.com, paste the link and tap Download TikTok Video.' },
              { n: '3', title: 'Save Your Photos', desc: 'Tap Show Images, select photos, and download individually or all as ZIP.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm text-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">{n}</div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {([
            { Icon: PhotoIcon, title: 'Original Quality', desc: 'Full-resolution images, no compression added.' },
            { Icon: DownloadIcon, title: 'ZIP Download', desc: 'Download all carousel images in one ZIP file.' },
            { Icon: BoltIcon, title: 'Completely Free', desc: 'No account, no app, no hidden limits.' },
            { Icon: DevicePhoneIcon, title: 'All Devices', desc: 'iPhone, Android, PC, Mac — any browser.' },
          ] as const).map(({ Icon, title, desc }) => (
            <div key={title} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700/50 text-center">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-slate-900 dark:text-white font-bold mb-1">{title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What types of TikTok photos */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
            What TikTok Photos Can You Download?
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span><span><strong className="text-slate-900 dark:text-white">Single photo posts</strong> — any standalone image shared on TikTok</span></p>
            <p className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span><span><strong className="text-slate-900 dark:text-white">Photo carousels</strong> — all images in a multi-photo slideshow post</span></p>
            <p className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span><span><strong className="text-slate-900 dark:text-white">Image galleries</strong> — collections shared as TikTok Stories or posts</span></p>
            <p className="text-xs text-slate-400 dark:text-slate-500 pt-2">Only publicly available posts are supported. Private or restricted content cannot be downloaded.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I download a TikTok photo?', a: 'Copy the TikTok photo URL, paste it on savefrominternet.com, click Download, then tap "Show Images" to view and download the photos.' },
              { q: 'Can I download all photos from a TikTok carousel?', a: 'Yes. Select all images and tap Download — you can save them as individual files or as a single ZIP archive.' },
              { q: 'What quality are the images?', a: 'Original quality. We fetch the full-resolution image directly from TikTok with no compression.' },
              { q: 'Is TikTok photo download free?', a: 'Yes, completely free. No account, no app, no download limits.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700/50">
                <h3 className="text-slate-900 dark:text-white font-bold mb-2">{q}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-10 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">More SaveFromInternet Tools</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'TikTok Video Downloader', href: '/tiktok-video-downloader' },
              { label: 'TikTok to MP3', href: '/tiktok-to-mp3' },
              { label: 'No Watermark', href: '/tiktok-downloader-without-watermark' },
              { label: 'iPhone Guide', href: '/tiktok-video-downloader-iphone' },
              { label: 'Android Guide', href: '/tiktok-video-downloader-android' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 rounded-full text-sm font-medium transition-all">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-500 py-14 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Download TikTok Photos — Free</h2>
        <p className="text-indigo-100 mb-8 text-lg">Original quality · Carousel support · SaveFromInternet.com</p>
        <Link
          href="/"
          className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg text-lg shadow-xl hover:scale-105 transition-all"
        >
          Download TikTok Photo
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
