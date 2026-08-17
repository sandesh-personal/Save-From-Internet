import type { Metadata } from 'next'
import Link from 'next/link'
import ToolSchema from '@/components/ToolSchema'

export const metadata: Metadata = {
  title: 'Instagram Reel Downloader — Save Reels & Carousels Free 2026 | GrabReels',
  description: 'Download Instagram Reels and photo carousels without watermark — free, no app needed. Works on iPhone, Android, PC. Powered by GrabReels.com.',
  keywords: [
    'instagram reel downloader',
    'download instagram reels',
    'instagram video downloader',
    'instagram reel downloader without watermark',
    'save instagram reels',
    'instagram carousel downloader',
    'download instagram photos',
  ],
  alternates: { canonical: 'https://www.savefrominternet.com/instagram-reel-downloader' },
  openGraph: {
    title: 'Instagram Reel Downloader — Save Reels Free | GrabReels',
    description: 'Download Instagram Reels and photo carousels without watermark. Free, no app, works on any device.',
    url: 'https://www.savefrominternet.com/instagram-reel-downloader',
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
      name: 'How do I download Instagram Reels?',
      acceptedAnswer: { '@type': 'Answer', text: 'Go to GrabReels.com, paste the Instagram Reel URL, and click Download. The video saves to your device without a watermark in seconds.' },
    },
    {
      '@type': 'Question',
      name: 'Can I download Instagram carousels (multiple photos)?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. GrabReels supports Instagram photo carousels — download all images at once as individual files or in a ZIP.' },
    },
    {
      '@type': 'Question',
      name: 'Does it work on iPhone and Android?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. GrabReels works in Safari (iPhone), Chrome (Android), and any browser on PC. No app install required.' },
    },
    {
      '@type': 'Question',
      name: 'Is it free to download Instagram Reels?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. GrabReels is completely free — no account, no subscription, no limits.' },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download Instagram Reels Without Watermark',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy the Instagram Reel link', text: 'Open Instagram, tap the three-dot menu on the Reel, then tap Copy Link.' },
    { '@type': 'HowToStep', position: 2, name: 'Open GrabReels.com', text: 'Go to grabreels.com in any browser on your phone or computer.' },
    { '@type': 'HowToStep', position: 3, name: 'Paste and download', text: 'Paste the link, tap Download, and save the Reel to your device — no watermark.' },
  ],
}

export default function InstagramReelDownloaderPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-50/60 via-white to-white py-14 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-pink-100 shadow-xs">
            Instagram · Reels &amp; Carousels · No Watermark
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            Instagram Reel <span className="text-pink-600">Downloader</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Download Instagram Reels and photo carousels without watermark — free, no app, works on iPhone, Android, and PC.
          </p>
          <a
            href="https://www.grabreels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-10 py-4 rounded-2xl text-base sm:text-lg shadow-lg shadow-pink-500/25 transition-all hover:scale-105"
          >
            Download Instagram Reels — Free
          </a>
          <p className="mt-3 text-xs text-slate-400">
            Powered by{' '}
            <a href="https://www.grabreels.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline font-bold">
              GrabReels.com
            </a>
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            How to Download Instagram Reels
          </h2>
          <div className="space-y-4">
            {[
              { n: '1', title: 'Copy the Instagram Reel link', desc: 'Open the Instagram app or website. On a Reel, tap the three-dot menu (⋯) → Copy Link. On desktop, copy the URL from the address bar.' },
              { n: '2', title: 'Open GrabReels.com', desc: 'Open GrabReels.com in any browser — Chrome, Safari, Firefox, Edge. Works on iPhone, Android, and PC with no app install.' },
              { n: '3', title: 'Paste and process', desc: 'Paste the Instagram link into the input box and tap Download. GrabReels fetches the original video in seconds.' },
              { n: '4', title: 'Save to your device', desc: 'Tap Download Video to save the MP4 without any watermark to your phone or computer. For carousels, download all photos as a ZIP.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md shadow-pink-500/20">{n}</div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">What You Can Download</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Instagram Reels (MP4)', desc: 'Full-quality Reels without the Instagram watermark badge. Original resolution.' },
              { title: 'Photo Carousels', desc: 'Download all photos from a multi-image post — individually or as a single ZIP file.' },
              { title: 'Instagram Stories', desc: 'Save Stories before they disappear — photos and videos, no screenshot quality loss.' },
              { title: 'Profile Photos (HD)', desc: 'Download any public Instagram profile picture in full resolution.' },
              { title: 'IGTV Videos', desc: 'Long-form IGTV content saved as MP4 at original quality.' },
              { title: 'Audio from Reels', desc: 'Extract the audio track from any Reel and save as MP3.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="text-pink-600 font-bold mb-1">✓ {title}</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-pink-500/20">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">Ready to Download Instagram Reels?</h2>
          <p className="text-pink-100 text-sm sm:text-base max-w-xl mx-auto mb-6">No watermark. No app. No sign-up. Open your browser and start.</p>
          <a
            href="https://www.grabreels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-pink-600 font-extrabold px-10 py-4 rounded-2xl text-base sm:text-lg shadow-xl hover:scale-105 transition-all"
          >
            Download Reels on GrabReels.com
          </a>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-10 px-4 text-center border-t border-slate-100">
        <p className="text-sm text-slate-500 mb-4">Looking for TikTok downloads?</p>
        <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-md">
          TikTok Downloader — SaveFromInternet.com
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolSchema
        name="Instagram Reel Downloader"
        url="https://www.savefrominternet.com/instagram-reel-downloader"
        description="Download Instagram Reels and photo carousels without watermark. Free, no app, works on any device. Powered by GrabReels.com."
        ratingCount="2143"
      />
    </div>
  )
}
