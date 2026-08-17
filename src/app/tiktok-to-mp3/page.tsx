import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import ToolRelatedGuides from '@/components/ToolRelatedGuides'
import ToolSchema from '@/components/ToolSchema'
import { FilmIcon, MusicIcon, PhotoIcon, DevicePhoneIcon, MonitorIcon } from '@/components/icons'

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
        text: 'Copy the TikTok video URL, paste it on savefrominternet.com, click Download, then click Extract MP3 to download the audio.',
      },
    },
    {
      '@type': 'Question',
      name: 'What quality is the TikTok MP3?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We extract audio in the highest available bitrate directly from the TikTok source stream without re-compression.',
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
        text: 'Yes. Open Safari on your iPhone, go to savefrominternet.com, paste the TikTok URL, and tap Extract MP3. The MP3 saves to the Files app under Downloads.',
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
    { '@type': 'HowToStep', position: 2, name: 'Paste on SaveFromInternet.com', text: 'Go to savefrominternet.com, paste the URL, and click Download.' },
    { '@type': 'HowToStep', position: 3, name: 'Extract MP3', text: 'Click "Extract MP3" to download the TikTok audio as an MP3 file.' },
  ],
}

export default function TikTokToMp3Page() {
  return (
    <div className="bg-white min-h-screen">
      <ToolSchema
        name="TikTok to MP3 Converter"
        description="Convert TikTok videos to high-quality MP3 audio."
        url="https://www.savefrominternet.com/tiktok-to-mp3"
        howTo={howToSchema}
        faq={faqSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-12 sm:py-16 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-blue-100 shadow-xs">
            🎵 MP3 Audio Extractor · Free
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            TikTok to <span className="text-blue-600">MP3 Converter</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Convert any TikTok video to high-bitrate MP3 audio in seconds. Crystal-clear sound, no app, no sign-up — 100% free forever.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:scale-105 transition-all cursor-pointer"
          >
            Convert TikTok to MP3
          </Link>
        </div>
      </section>

      {/* Ad */}
      <div className="flex justify-center py-6 px-4 max-w-5xl mx-auto">
        <GoogleAdSense
          adSlot="3804648444"
          adFormat="auto"
          className="flex justify-center w-full"
          containerStyle="default"
        />
      </div>

      {/* How it works */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            How to Convert TikTok to MP3
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy TikTok URL', desc: 'Open TikTok, tap Share on any video, then tap Copy Link.' },
              { n: '2', title: 'Paste & Process', desc: 'Paste the URL on savefrominternet.com and click Download.' },
              { n: '3', title: 'Extract MP3', desc: 'Click "Extract MP3" — the audio file downloads instantly.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-md shadow-blue-500/20">
                  {n}
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">Key Features</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {[
                'High-quality MP3 audio extraction',
                'No app installation required',
                'Works on iPhone, Android, and PC',
                'Fast processing — under 5 seconds',
                'No watermark, no audio compression',
                'Completely free, unlimited conversions',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="text-blue-600 font-bold mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">Popular Uses</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {[
                'Creating ringtones & notifications from TikTok trends',
                'Extracting music & podcast snippets for offline listening',
                'Downloading voiceovers and speeches for editing',
                'Saving original sounds and remixes',
                'Building offline audio collections without video files',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <ToolRelatedGuides
        guides={[
          { label: 'TikTok to MP3 on iPhone', href: '/blog/tiktok-to-mp3-iphone' },
          { label: 'TikTok to MP3 on Android', href: '/blog/tiktok-to-mp3-android' },
          { label: 'Extract Audio Guide', href: '/blog/how-to-extract-audio-from-tiktok-videos-mp3-download' },
          { label: 'TikTok Audio Quality Guide', href: '/blog/tiktok-mp3-quality-guide' },
          { label: 'Save Sound as Ringtone', href: '/blog/save-tiktok-sound-as-ringtone' },
        ]}
      />

      {/* Bottom CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-[#195fd7] to-[#1e6fe8] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-blue-600/20">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
            Convert TikTok to MP3 Audio Free
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Paste any TikTok link now and extract crystal-clear MP3 audio. Free forever, no app required.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-700 font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition-all active:scale-95 cursor-pointer"
          >
            Start Converting Now
          </Link>
        </div>
      </section>
    </div>
  )
}
