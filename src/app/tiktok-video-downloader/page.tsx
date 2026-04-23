import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'TikTok Video Downloader - Download TikTok Without Watermark 2026 | Save From Internet',
  description: 'Free TikTok video downloader — download TikTok videos without watermark in HD as MP4. No app, no sign-up. Also extract MP3 and save photo galleries.',
  keywords: ['TikTok Video Downloader', 'download tiktok videos without watermark 2026', 'tiktok downloader 2026'],
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-video-downloader' },
  openGraph: {
    title: 'TikTok Video Downloader - Download Without Watermark 2026',
    description: 'Free TikTok video downloader. HD MP4, no watermark, no app required.',
    url: 'https://www.savefrominternet.com/tiktok-video-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download TikTok Videos Without Watermark',
  description: 'Download TikTok videos without watermark in HD using SaveFromInternet.com.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok URL', text: 'Open TikTok, tap Share, then Copy Link on any video.' },
    { '@type': 'HowToStep', position: 2, name: 'Paste and process', text: 'Go to savefrominternet.com, paste the URL, and click Download TikTok Video.' },
    { '@type': 'HowToStep', position: 3, name: 'Download your content', text: 'Choose MP4 video, MP3 audio, or image gallery. The file downloads instantly.' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is downloading TikTok videos legal?', acceptedAnswer: { '@type': 'Answer', text: 'Downloading for personal use is generally accepted. Do not redistribute content without creator permission.' } },
    { '@type': 'Question', name: 'What quality will the downloaded video be?', acceptedAnswer: { '@type': 'Answer', text: 'We download the original quality — typically 720p or 1080p HD, with no compression.' } },
    { '@type': 'Question', name: 'Do I need to install any software?', acceptedAnswer: { '@type': 'Answer', text: 'No. Works entirely in your browser — no app, no extension, no account.' } },
    { '@type': 'Question', name: 'Can I download private TikTok videos?', acceptedAnswer: { '@type': 'Answer', text: 'No. Only publicly available TikTok videos can be downloaded.' } },
    { '@type': 'Question', name: 'Are there download limits?', acceptedAnswer: { '@type': 'Answer', text: 'No limits. Download as many TikTok videos as you want, completely free.' } },
  ],
}

export default function TikTokVideoDownloaderPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/60 to-white py-14 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-rose-100 shadow-sm">✨ Free · HD · No Watermark</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            TikTok <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">Video Downloader</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">Download TikTok videos without watermark 2026 in HD as MP4. Free, no app required. Also extract MP3 and save images.</p>
          <Link href="/" className="inline-block bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-rose-500/25 transition-all">
            ⬇ Start Downloading Now
          </Link>
        </div>
      </section>

      {/* Ad */}
      <div className="flex justify-center py-6 px-4 bg-white border-b border-slate-100">
        <GoogleAdSense adSlot="5309301802" adFormat="auto" className="flex justify-center" containerStyle="default" />
      </div>

      {/* How It Works */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">How to Download TikTok Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy TikTok URL', desc: 'Open TikTok, tap Share → Copy Link on any video you want to download.' },
              { n: '2', title: 'Paste & Process', desc: 'Paste the URL on savefrominternet.com and click "Download TikTok Video".' },
              { n: '3', title: 'Download Content', desc: 'Get your HD video without watermark, MP3 audio, or photo gallery instantly.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-violet-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl mx-auto mb-4">{n}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features + Platforms */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">✨ Key Features</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {['Download without watermark in HD','MP4 format, original quality','Extract MP3 audio','Save image galleries (ZIP or individual)','Works on all devices and browsers','No registration, unlimited downloads'].map((f) => (
                <li key={f} className="flex items-start gap-2"><span className="text-emerald-500 font-bold mt-0.5">✓</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">📱 Supported Platforms</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                { label: 'iPhone & iPad', href: '/tiktok-video-downloader-iphone' },
                { label: 'Android phones & tablets', href: '/tiktok-video-downloader-android' },
                { label: 'Windows PC & Mac', href: '/tiktok-video-downloader-pc' },
                { label: 'Chrome, Firefox, Safari, Edge', href: '/' },
              ].map(({ label, href }) => (
                <li key={label} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <Link href={href} className="hover:text-rose-500 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Download Options */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">Download Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎬', title: 'HD Video (MP4)', desc: 'Download TikTok videos in HD without watermark as MP4 files.', color: 'rose' },
              { icon: '🎵', title: 'Audio (MP3)', desc: 'Extract high-quality MP3 audio from any TikTok video.', color: 'emerald' },
              { icon: '🖼️', title: 'Photo Gallery', desc: 'Save images from TikTok carousels individually or as ZIP.', color: 'violet' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Is downloading TikTok videos legal?', a: 'Downloading for personal use is generally accepted. Always respect copyright and creator rights.' },
              { q: 'What video quality will I get?', a: 'The highest available — typically 720p or 1080p HD with no compression.' },
              { q: 'Do I need to install any software?', a: 'No. Our downloader works in your browser. No app, no extension, no account required.' },
              { q: 'Can I download private TikTok videos?', a: 'No. Only public videos can be downloaded.' },
              { q: 'Are there download limits?', a: 'No limits. Download as many TikTok videos as you want, for free.' },
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
        <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Download TikTok Videos?</h2>
        <p className="text-rose-100 mb-8 text-lg">Free. No watermark. No sign-up. Start in seconds.</p>
        <Link href="/" className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
          ⬇ Download TikTok Videos Now
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
