import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import ToolSchema from '@/components/ToolSchema'
import ToolRelatedGuides from '@/components/ToolRelatedGuides'

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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download TikTok Videos Without Watermark',
  description: 'Download TikTok videos without watermark using SaveFromInternet.com.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok URL', text: 'Open TikTok, tap Share, then Copy Link on any video.' },
    { '@type': 'HowToStep', position: 2, name: 'Paste on SaveFromInternet', text: 'Go to savefrominternet.com, paste the URL, and click Download.' },
    { '@type': 'HowToStep', position: 3, name: 'Download without watermark', text: 'Click Download — the MP4 file has no watermark and is saved at original HD quality.' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I download TikTok videos without the watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Go to savefrominternet.com, paste the TikTok URL, click Download. The downloaded file has no watermark.' } },
    { '@type': 'Question', name: 'Why does TikTok add a watermark?', acceptedAnswer: { '@type': 'Answer', text: "TikTok adds a watermark when using their built-in save feature. SaveFromInternet.com fetches the original file before the watermark is applied." } },
    { '@type': 'Question', name: 'Is it free to download TikTok without watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completely free, no subscription, no limits.' } },
  ],
}

export default function TikTokDownloaderWithoutWatermarkPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-12 sm:py-16 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-blue-100 shadow-xs">Zero Watermark Guarantee</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            TikTok Downloader <span className="text-blue-600">Without Watermark</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">Download TikTok videos without the TikTok watermark in original HD quality. Free, no app, no sign-up. Works everywhere.</p>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:scale-105 transition-all cursor-pointer">
            Download Without Watermark
          </Link>
        </div>
      </section>

      {/* Ad */}
      <div className="flex justify-center py-6 px-4 max-w-5xl mx-auto">
        <GoogleAdSense adSlot="5309301802" adFormat="auto" className="flex justify-center w-full" containerStyle="default" />
      </div>

      {/* Why no watermark */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-6">Why Our Downloads Have No Watermark</h2>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            <p>When you use TikTok&apos;s built-in Save feature, the app burns a watermark — the TikTok logo and creator username — directly into the video before saving it.</p>
            <p><strong className="text-slate-900">SaveFromInternet.com fetches the original video stream directly from TikTok&apos;s source CDN</strong> before any watermark is applied. The result is a clean, watermark-free MP4 at original Full HD quality.</p>
          </div>
        </div>
      </section>

      {/* How to */}
      <section className="py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">How to Download Without Watermark</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy TikTok URL', desc: 'Open TikTok, tap Share → Copy Link on any video.' },
              { n: '2', title: 'Paste & Process', desc: 'Paste the URL on savefrominternet.com and click Download.' },
              { n: '3', title: 'Download MP4', desc: 'Get a clean HD MP4 with zero TikTok branding.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-md shadow-blue-500/20">{n}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-5">What You Get</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {['No TikTok watermark or username overlay','Original HD quality — 720p, 1080p preserved','MP4 format, plays on any device','Also extract MP3 audio watermark-free','Completely free, unlimited downloads'].map((f) => (
                <li key={f} className="flex gap-2.5"><span className="text-blue-600 font-bold">✓</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-5">Works On</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {['iPhone & iPad (Safari)','Android phones & tablets','Windows PC (Chrome, Firefox, Edge)','Mac (Safari, Chrome)','No app or extension required'].map((p) => (
                <li key={p} className="flex gap-2.5"><span className="text-blue-600 font-bold">•</span><span>{p}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <ToolRelatedGuides
        guides={[
          { label: 'Remove Watermark Free Guide', href: '/blog/remove-tiktok-watermark-free' },
          { label: 'Watermark Remover Alternatives', href: '/blog/tiktok-watermark-remover-alternatives' },
          { label: 'Why TikTok Adds Watermarks', href: '/blog/why-tiktok-adds-watermark' },
          { label: 'TikTok Video Downloader', href: '/tiktok-video-downloader' },
        ]}
      />

      {/* CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-[#195fd7] to-[#1e6fe8] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-blue-600/20">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">Download TikTok Without Watermark Free</h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-6">Clean HD video. No watermark. No sign-up.</p>
          <Link href="/" className="inline-block bg-white text-blue-700 font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition-all active:scale-95 cursor-pointer">
            Download Without Watermark
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolSchema name="TikTok Downloader Without Watermark" url="https://www.savefrominternet.com/tiktok-downloader-without-watermark" description="Download TikTok videos without watermark in HD. Free, no app, no sign-up required." ratingCount="2541" />
    </div>
  )
}
