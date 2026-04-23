import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TikTok Downloader Without Watermark 2026 - Free HD | Save From Internet',
  description: 'Download TikTok videos without watermark in HD. Free online TikTok downloader — no watermark, no app, no sign-up. Works on iPhone, Android, and PC.',
  keywords: ['tiktok downloader without watermark', 'download tiktok no watermark', 'tiktok video without watermark 2026'],
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-downloader-without-watermark' },
  openGraph: {
    title: 'TikTok Downloader Without Watermark 2026 - Free HD',
    description: 'Download TikTok videos without watermark in HD. Free, no app, no sign-up.',
    url: 'https://www.savefrominternet.com/tiktok-downloader-without-watermark',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I download TikTok videos without the watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Go to savefrominternet.com, paste the TikTok URL, click Download TikTok Video. The downloaded file has no watermark.' } },
    { '@type': 'Question', name: 'Why does TikTok add a watermark?', acceptedAnswer: { '@type': 'Answer', text: "TikTok adds a watermark when using their built-in save feature. SaveFromInternet.com fetches the original file before the watermark is applied." } },
    { '@type': 'Question', name: 'Is it free to download TikTok without watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completely free, no subscription, no limits.' } },
  ],
}

export default function TikTokDownloaderWithoutWatermarkPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/60 to-white py-14 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-rose-100 shadow-sm">🚫💧 Zero Watermark Guarantee</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            TikTok Downloader{' '}
            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">Without Watermark</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">Download TikTok videos without the TikTok watermark in HD quality. Free, no app, no sign-up. Works everywhere.</p>
          <Link href="/" className="inline-block bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-rose-500/25 transition-all">
            ⬇ Download Without Watermark
          </Link>
        </div>
      </section>

      {/* Why no watermark */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-6">Why Our Downloads Have No Watermark</h2>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 text-sm text-slate-500 leading-relaxed">
            <p>When you use TikTok&apos;s built-in Save feature, the app burns a watermark — the TikTok logo and creator username — directly into the video before it reaches your device.</p>
            <p><strong className="text-slate-900">SaveFromInternet.com fetches the original video file directly from TikTok&apos;s servers</strong> before any watermark is applied. The result: a clean, watermark-free MP4 at original HD quality.</p>
          </div>
        </div>
      </section>

      {/* How to */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">How to Download Without Watermark</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy TikTok URL', desc: 'Open TikTok, tap Share → Copy Link on any video.' },
              { n: '2', title: 'Paste & Process', desc: 'Paste the URL on savefrominternet.com and click Download.' },
              { n: '3', title: 'Download — No Watermark', desc: 'Get a clean HD MP4 with no TikTok branding.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-violet-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl mx-auto mb-4">{n}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-5">✨ What You Get</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {['No TikTok watermark or username overlay','Original HD quality — 720p, 1080p preserved','MP4 format, plays on any device','Also extract MP3 audio watermark-free','Completely free, unlimited downloads'].map((f) => (
                <li key={f} className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-5">📱 Works On</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {['iPhone & iPad (Safari)','Android phones & tablets','Windows PC (Chrome, Firefox, Edge)','Mac (Safari, Chrome)','No app or extension required'].map((p) => (
                <li key={p} className="flex gap-2"><span className="text-blue-500 font-bold">•</span><span>{p}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I download TikTok without watermark?', a: 'Paste the TikTok URL on savefrominternet.com and click Download. The file will have no watermark.' },
              { q: 'Why does TikTok add a watermark to saved videos?', a: "TikTok's built-in save adds a watermark for brand visibility. We bypass this by fetching the original file." },
              { q: 'Is it free?', a: 'Yes. Completely free, no subscription, no account, no limits.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="text-slate-900 font-bold mb-2">{q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-rose-500 to-violet-600 py-14 px-4 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">Download TikTok Without Watermark — Free</h2>
        <p className="text-rose-100 mb-8 text-lg">Clean HD video. No watermark. No sign-up.</p>
        <Link href="/" className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-all">
          ⬇ Download Without Watermark
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
