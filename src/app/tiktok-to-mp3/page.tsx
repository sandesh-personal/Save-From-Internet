import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'TikTok to MP3 Converter - Download TikTok Audio Free 2026 | Save From Internet',
  description:
    'Convert TikTok videos to MP3 audio in seconds. Free TikTok audio downloader 2026 — no app, no sign-up, works on iPhone, Android, and PC.',
  keywords: [
    'tiktok to mp3',
    'download tiktok mp3',
    'tiktok audio downloader',
    'tiktok mp3 converter 2026',
  ],
  openGraph: {
    title: 'TikTok to MP3 Converter - Download TikTok Audio Free 2026',
    description: 'Convert TikTok videos to MP3 in seconds. Free, no app, high quality.',
    url: 'https://www.savefrominternet.com/tiktok-to-mp3',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  alternates: {
    canonical: 'https://www.savefrominternet.com/tiktok-to-mp3',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert TikTok to MP3?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copy the TikTok video URL, paste it on savefrominternet.com, click Download TikTok Video, then click Extract Audio to download the MP3.',
      },
    },
    {
      '@type': 'Question',
      name: 'What quality is the TikTok MP3?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We extract audio in the highest quality available from TikTok — typically 128kbps or higher.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the TikTok to MP3 converter free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Completely free — no account, no app, no download limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it work on iPhone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Open Safari on your iPhone, go to savefrominternet.com, paste the TikTok URL, and tap Extract Audio. The MP3 saves to the Files app under Downloads.',
      },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert TikTok to MP3',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy TikTok URL', text: 'Open TikTok and tap Share → Copy Link on any video.' },
    { '@type': 'HowToStep', position: 2, name: 'Paste on SaveFromInternet.com', text: 'Go to savefrominternet.com, paste the URL, and click Download TikTok Video.' },
    { '@type': 'HowToStep', position: 3, name: 'Extract MP3', text: 'Click "Extract Audio" to download the TikTok audio as an MP3 file.' },
  ],
}

export default function TikTokToMp3Page() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50/60 to-white py-14 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-emerald-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-emerald-100 shadow-sm">
            🎵 MP3 Audio Extractor · Free
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            TikTok to{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-rose-500 bg-clip-text text-transparent">
              MP3 Converter
            </span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
            Convert any TikTok video to MP3 audio in seconds. High quality, no app, no sign-up — free forever.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-rose-500/25 transition-all"
          >
            ⬇ Convert TikTok to MP3
          </Link>
        </div>
      </section>

      {/* Ad */}
      <div className="flex justify-center py-6 px-4 border-b border-slate-100">
        <GoogleAdSense
          adSlot="3804648444"
          adFormat="auto"
          className="flex justify-center"
          containerStyle="default"
        />
      </div>

      {/* How it works */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            How to Convert TikTok to MP3
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy TikTok URL', desc: 'Open TikTok, tap Share on any video, then tap Copy Link.' },
              { n: '2', title: 'Paste & Process', desc: 'Paste the URL on savefrominternet.com and click Download TikTok Video.' },
              { n: '3', title: 'Extract MP3', desc: 'Click "Extract Audio" — the MP3 downloads instantly, no watermark.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-rose-500 rounded-full flex items-center justify-center text-white font-extrabold text-xl mx-auto mb-4">
                  {n}
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">✨ Key Features</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                'High-quality MP3 audio extraction',
                'No app installation required',
                'Works on iPhone, Android, and PC',
                'Fast processing — under 10 seconds',
                'No watermark, no branding',
                'Completely free, unlimited downloads',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">🎵 Perfect For</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                'Creating ringtones from TikTok sounds',
                'Extracting music for personal listening',
                'Downloading voiceovers and speeches',
                'Saving TikTok audio for offline use',
                'Building audio collections from trends',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Device guide */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            Download TikTok MP3 on Any Device
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🍎',
                title: 'iPhone (Safari)',
                steps: ['Open Safari → savefrominternet.com', 'Paste TikTok URL → tap Download', 'Tap Extract Audio', 'MP3 saves to Files → Downloads'],
              },
              {
                icon: '🤖',
                title: 'Android (Chrome)',
                steps: ['Open Chrome → savefrominternet.com', 'Paste TikTok URL → tap Download', 'Tap Extract Audio', 'MP3 saves to Downloads folder'],
              },
              {
                icon: '🖥️',
                title: 'PC (Windows / Mac)',
                steps: ['Open any browser → savefrominternet.com', 'Paste TikTok URL → click Download', 'Click Extract Audio', 'MP3 saves to your Downloads folder'],
              },
            ].map(({ icon, title, steps }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-4">{title}</h3>
                <ol className="space-y-2 text-sm text-slate-500 list-decimal list-inside">
                  {steps.map((s) => <li key={s}>{s}</li>)}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'How do I convert TikTok to MP3?', a: 'Copy the TikTok video URL, paste it on savefrominternet.com, click Download TikTok Video, then click Extract Audio to save the MP3.' },
              { q: 'What MP3 quality do I get?', a: 'We extract the original audio at the highest quality TikTok provides — typically 128kbps or higher, with no added compression.' },
              { q: 'Does it work on iPhone without an app?', a: 'Yes. Open Safari on your iPhone, go to savefrominternet.com, paste the TikTok URL, and tap Extract Audio. The MP3 saves to Files → Downloads.' },
              { q: 'Can I convert private TikTok videos?', a: 'No. Only public TikTok videos can be processed. Private videos require authentication we do not have.' },
              { q: 'Is the TikTok to MP3 converter free?', a: 'Yes. Completely free — no account, no app, no limits.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="text-slate-900 font-bold mb-2">{q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Also download */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            Also Download TikTok Videos &amp; Photos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎬', title: 'TikTok Video', desc: 'Download HD MP4 without watermark.', href: '/tiktok-video-downloader', linkText: 'Download videos →' },
              { icon: '🎵', title: 'TikTok MP3', desc: 'You are here — extract TikTok audio instantly.', href: '/tiktok-to-mp3', linkText: 'Current page' },
              { icon: '🖼️', title: 'TikTok Photos', desc: 'Save TikTok photo carousels individually or as ZIP.', href: '/tiktok-photo-downloader', linkText: 'Download photos →' },
            ].map(({ icon, title, desc, href, linkText }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{desc}</p>
                <Link href={href} className="text-rose-500 text-sm font-semibold hover:underline">{linkText}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-rose-500 to-violet-600 py-14 px-4 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Convert TikTok to MP3 — Free
        </h2>
        <p className="text-rose-100 mb-8 text-lg">
          High quality · No app · No sign-up · Works everywhere
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-all"
        >
          ⬇ Convert TikTok to MP3
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
