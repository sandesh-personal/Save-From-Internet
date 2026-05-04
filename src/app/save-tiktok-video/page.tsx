import type { Metadata } from 'next'
import Link from 'next/link'
import { FilmIcon, MusicIcon, PhotoIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Save TikTok Video - Download & Save TikTok Videos Free 2026 | Save From Internet',
  description: 'Save TikTok videos to your phone or PC in HD. Free online tool - save TikTok videos without watermark, no app, no sign-up required.',
  keywords: ['save tiktok video', 'save tiktok to phone', 'how to save tiktok video', 'save tiktok without watermark 2026'],
  alternates: { canonical: 'https://www.savefrominternet.com/save-tiktok-video' },
  openGraph: {
    title: 'Save TikTok Video - Free HD No Watermark 2026',
    description: 'Save TikTok videos to phone or PC in HD. Free, no app, no watermark.',
    url: 'https://www.savefrominternet.com/save-tiktok-video',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Save TikTok Videos to Your Phone or PC',
  description: 'Save TikTok videos without watermark to any device using SaveFromInternet.com.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok URL', text: 'Open TikTok, tap Share, then Copy Link.' },
    { '@type': 'HowToStep', position: 2, name: 'Paste on SaveFromInternet', text: 'Go to savefrominternet.com and paste the URL.' },
    { '@type': 'HowToStep', position: 3, name: 'Save to your device', text: 'Click Download. On iPhone, tap and hold the video in Safari and select Save Video. On Android, the MP4 saves to Downloads.' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I save a TikTok video to my phone?', acceptedAnswer: { '@type': 'Answer', text: 'Copy the TikTok URL, go to savefrominternet.com, paste it, and click Download. On iPhone, tap and hold the video and select Save Video. On Android, the file downloads to your Downloads folder.' } },
    { '@type': 'Question', name: 'Can I save TikTok videos without the watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. SaveFromInternet.com downloads the original file without any watermark.' } },
    { '@type': 'Question', name: 'Where do saved TikTok videos go on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Downloads go to your Downloads folder. Find them in the Files app or your Gallery app.' } },
    { '@type': 'Question', name: 'Where do saved TikTok videos go on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'After tapping and holding the video in Safari and selecting Save Video, the video appears in your Camera Roll (Photos app).' } },
  ],
}

export default function SaveTikTokVideoPage() {
  return (
    <div className="bg-white dark:bg-slate-900">

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50/50 dark:from-slate-800 to-white dark:to-slate-900 py-14 px-4 text-center border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-indigo-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-indigo-100 dark:border-indigo-900/40 shadow-sm">
            Save to Phone or PC - Free
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            <span className="text-indigo-500">Save</span>{' '}TikTok Video
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Save TikTok videos to your phone or PC in HD without watermark. Free, no app, no sign-up needed.
          </p>
          <Link href="/" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg shadow-indigo-500/25 transition-all">
            Save TikTok Video Now
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">How to Save a TikTok Video</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy TikTok Link', desc: 'Open TikTok, tap Share on any video, then tap Copy Link.' },
              { n: '2', title: 'Paste & Process', desc: 'Paste the link on savefrominternet.com and click Download TikTok Video.' },
              { n: '3', title: 'Save to Device', desc: 'Click Download - the file saves to your phone or PC. No watermark.' },
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

      {/* Device guides */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Saving on iPhone</h3>
            <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-300 list-decimal list-inside">
              <li>Open <strong className="text-slate-900 dark:text-white">Safari</strong> and go to savefrominternet.com</li>
              <li>Paste TikTok URL and tap Download TikTok Video</li>
              <li>Tap the Download Video button</li>
              <li><strong className="text-slate-900 dark:text-white">Tap and hold</strong> the video when it plays</li>
              <li>Select <strong className="text-slate-900 dark:text-white">&quot;Save Video&quot;</strong> - goes to Camera Roll</li>
            </ol>
            <Link href="/tiktok-video-downloader-iphone" className="inline-block mt-4 text-indigo-500 text-sm font-semibold hover:underline">
              Full iPhone guide &rarr;
            </Link>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Saving on Android</h3>
            <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-300 list-decimal list-inside">
              <li>Open Chrome and go to savefrominternet.com</li>
              <li>Paste TikTok URL and tap Download TikTok Video</li>
              <li>Tap the Download Video button</li>
              <li>File downloads automatically</li>
              <li>Find it in <strong className="text-slate-900 dark:text-white">Files / Downloads</strong> or Gallery</li>
            </ol>
            <Link href="/tiktok-video-downloader-android" className="inline-block mt-4 text-indigo-500 text-sm font-semibold hover:underline">
              Full Android guide &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* What you can save */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">What You Can Save from TikTok</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { Icon: FilmIcon, title: 'Videos', desc: 'Save as HD MP4 without watermark.' },
              { Icon: MusicIcon, title: 'Audio', desc: 'Save TikTok sounds as MP3 files.' },
              { Icon: PhotoIcon, title: 'Photos', desc: 'Save photo carousels individually or ZIP.' },
            ] as const).map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I save a TikTok video to my phone?', a: 'Copy the TikTok URL, go to savefrominternet.com, paste it, and click Download. On iPhone, tap and hold the video in Safari and select Save Video. On Android, the file downloads directly.' },
              { q: 'Where do saved TikTok videos go on iPhone?', a: 'After tapping and holding the video in Safari and selecting Save Video, the video appears in your Photos app / Camera Roll.' },
              { q: 'Where do saved TikTok videos go on Android?', a: 'Downloaded videos go to your Downloads folder. Open the Files app and check Downloads, or look in your Gallery app.' },
              { q: 'Can I save TikTok without watermark?', a: 'Yes. SaveFromInternet.com saves the original file without any watermark. Completely free.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700/50">
                <h3 className="text-slate-900 dark:text-white font-bold mb-2">{q}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-500 py-14 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Save Your TikTok Videos Now</h2>
        <p className="text-indigo-100 mb-8 text-lg">Free - No watermark - iPhone, Android, and PC</p>
        <Link href="/" className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg text-lg shadow-xl hover:scale-105 transition-all">
          Save TikTok Video
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
