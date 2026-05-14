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
    'instagram reel downloader online',
    'grabreels',
    'grab reels instagram',
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
    <div className="bg-white dark:bg-slate-900">

      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-50/60 dark:from-slate-800 to-white dark:to-slate-900 py-16 px-4 text-center border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-pink-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-pink-100 dark:border-pink-900/40 shadow-sm">
            Instagram · Reels &amp; Carousels · No Watermark
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            Instagram Reel{' '}
            <span className="text-pink-500">Downloader</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Download Instagram Reels and photo carousels without watermark — free, no app, works on iPhone, Android, and PC.
          </p>
          <a
            href="https://www.grabreels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-10 py-4 rounded-lg text-lg shadow-lg shadow-pink-500/25 transition-all hover:scale-105"
          >
            Download Instagram Reels — Free
          </a>
          <p className="mt-3 text-sm text-slate-400 dark:text-slate-500">
            Powered by{' '}
            <a href="https://www.grabreels.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline font-semibold">
              GrabReels.com
            </a>
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
            How to Download Instagram Reels
          </h2>
          <div className="space-y-4">
            {[
              { n: '1', title: 'Copy the Instagram Reel link', desc: 'Open the Instagram app or website. On a Reel, tap the three-dot menu (⋯) → Copy Link. On desktop, copy the URL from the address bar.' },
              { n: '2', title: 'Open GrabReels.com', desc: 'Open GrabReels.com in any browser — Chrome, Safari, Firefox, Edge. Works on iPhone, Android, and PC with no app install.' },
              { n: '3', title: 'Paste and process', desc: 'Paste the Instagram link into the input box and tap Download. GrabReels fetches the original video in seconds.' },
              { n: '4', title: 'Save to your device', desc: 'Tap Download Video to save the MP4 without any watermark to your phone or computer. For carousels, download all photos as a ZIP.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">{n}</div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">{title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">What You Can Download</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Instagram Reels (MP4)', desc: 'Full-quality Reels without the Instagram watermark badge. Original resolution.' },
              { title: 'Photo Carousels', desc: 'Download all photos from a multi-image post — individually or as a single ZIP file.' },
              { title: 'Instagram Stories', desc: 'Save Stories before they disappear — photos and videos, no screenshot quality loss.' },
              { title: 'Profile Photos (HD)', desc: 'Download any public Instagram profile picture in full resolution.' },
              { title: 'IGTV Videos', desc: 'Long-form IGTV content saved as MP4 at original quality.' },
              { title: 'Audio from Reels', desc: 'Extract the audio track from any Reel and save as MP3.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700/50">
                <div className="text-pink-500 font-bold mb-1">✓ {title}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About GrabReels */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">About GrabReels</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-6 leading-relaxed">
            GrabReels is the dedicated Instagram downloader from the same team behind SaveFromInternet.com. Built specifically for Instagram Reels and carousels, it delivers the fastest and cleanest downloads available — no sign-up, no limits, no watermark.
          </p>
          <a
            href="https://www.grabreels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-8 py-3 rounded-lg text-base shadow-lg hover:scale-105 transition-all"
          >
            Visit GrabReels.com
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'How do I download Instagram Reels?', a: 'Go to GrabReels.com, paste the Instagram Reel URL, and click Download. The MP4 saves to your device without any watermark.' },
              { q: 'Can I download an entire Instagram carousel?', a: 'Yes. GrabReels detects photo carousels automatically and lets you download all images individually or as a single ZIP file.' },
              { q: 'Does it work on iPhone?', a: 'Yes. Open GrabReels.com in Safari on your iPhone. After downloading, the video saves to your Files app. To move it to your Camera Roll, long-press in Files and tap Save to Photos.' },
              { q: 'Does it work on Android?', a: 'Yes. Open GrabReels.com in Chrome on Android. Downloads go directly to your Downloads folder and are accessible from the Gallery app.' },
              { q: 'Is GrabReels free?', a: 'Yes, completely free. No account, no subscription, no hidden charges.' },
              { q: 'Does the downloaded Reel have a watermark?', a: 'No. GrabReels fetches the original source file from Instagram servers, which does not include the watermark badge that Instagram adds when you use their built-in Share feature.' },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{q}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 py-14 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Download Instagram Reels?</h2>
        <p className="text-pink-100 mb-8 text-lg">No watermark. No app. No sign-up. Open your browser and start.</p>
        <a
          href="https://www.grabreels.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-pink-600 font-semibold px-10 py-4 rounded-lg text-lg shadow-xl hover:scale-105 transition-all"
        >
          Download Reels on GrabReels.com
        </a>
      </section>

      {/* Related tools */}
      <section className="bg-white dark:bg-slate-900 py-10 px-4 text-center border-t border-slate-100 dark:border-slate-700/50">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Looking for TikTok downloads?</p>
        <Link href="/" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors">
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
