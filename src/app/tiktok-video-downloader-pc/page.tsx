import type { Metadata } from 'next'
import Link from 'next/link'
import ToolSchema from '@/components/ToolSchema'

export const metadata: Metadata = {
  title: 'TikTok Downloader for PC & Windows — Free Video Saver, No Software 2026 | SaveFromInternet',
  description: 'Free TikTok downloader for PC — download TikTok videos on Windows 10/11 or Mac without watermark. TikTok video saver for Windows, MacBook, Chrome, Edge & Firefox. No software needed.',
  keywords: [
    'tiktok downloader pc',
    'tiktok downloader for pc',
    'tiktok video downloader pc',
    'tiktok downloader windows',
    'tiktok downloader windows 11',
    'free tiktok video downloader windows',
    'tiktok video saver pc',
    'tiktok downloader mac',
    'tiktok downloader macbook',
    'tiktok downloader app for pc',
    'download tiktok videos on pc',
    'download tiktok video on pc',
    'tiktok downloader for mac',
    'download tiktok on pc without watermark',
  ],
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-video-downloader-pc' },
  openGraph: {
    title: 'TikTok Video Downloader for PC - Windows & Mac 2026',
    description: 'Download TikTok videos on PC. Works in Chrome, Firefox, Edge, Safari. No software.',
    url: 'https://www.savefrominternet.com/tiktok-video-downloader-pc',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Can I download TikTok videos on Windows PC?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Open Chrome, Firefox, or Edge on Windows, go to savefrominternet.com, paste the TikTok URL, and click Download. The MP4 saves to your Downloads folder.' } },
    { '@type': 'Question', name: 'Does the TikTok downloader work on Mac?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Open Safari or Chrome on Mac, go to savefrominternet.com, paste the URL, and download. Works on macOS.' } },
    { '@type': 'Question', name: 'Do I need to install software to download TikTok on PC?', acceptedAnswer: { '@type': 'Answer', text: 'No. SaveFromInternet is entirely browser-based — no software, no extension, no account required.' } },
    { '@type': 'Question', name: 'Can I download TikTok in HD on PC?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We download the original quality — typically 720p or 1080p HD with no compression.' } },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download TikTok Videos on PC (Windows & Mac)',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok link', text: 'Open TikTok in your browser or phone app. Click Share → Copy Link.' },
    { '@type': 'HowToStep', position: 2, name: 'Open SaveFromInternet.com on your PC', text: 'Open Chrome, Firefox, Edge, or Safari and go to savefrominternet.com.' },
    { '@type': 'HowToStep', position: 3, name: 'Paste and process', text: 'Paste the TikTok URL and click Download TikTok Video.' },
    { '@type': 'HowToStep', position: 4, name: 'Download the MP4', text: 'Click Download — the MP4 saves to your Downloads folder. No watermark.' },
  ],
}

export default function TikTokDownloaderPCPage() {
  return (
    <div className="bg-white dark:bg-slate-900">

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50/50 dark:from-slate-800 to-white dark:to-slate-900 py-14 px-4 text-center border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-indigo-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-indigo-100 dark:border-indigo-900/40 shadow-sm">Windows 10/11 &amp; Mac · No Software</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            TikTok Downloader for{' '}
            <span className="text-indigo-500">PC &amp; Windows</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">Free TikTok video saver for Windows 10/11 and Mac — download TikTok videos without watermark in any browser. No software, no app to install.</p>
          <Link href="/" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg shadow-indigo-500/25 transition-all">
            Download TikTok on PC
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">How to Download TikTok on PC / Windows</h2>
          <div className="space-y-4">
            {[
              { n: '1', title: 'Copy the TikTok Video Link', desc: 'Open TikTok in your browser (tiktok.com) or on your phone. Click Share → Copy Link. On PC browser, you can also copy the URL from the address bar directly.' },
              { n: '2', title: 'Open SaveFromInternet.com', desc: 'On your Windows or Mac, open Chrome, Firefox, Edge, or Safari and go to savefrominternet.com.' },
              { n: '3', title: 'Paste and Process (Ctrl+V / Cmd+V)', desc: 'Click the input box, press Ctrl+V (Windows) or Cmd+V (Mac) to paste, then click Download TikTok Video.' },
              { n: '4', title: 'Download the MP4', desc: 'Click Download Video. The MP4 file saves to your PC Downloads folder automatically — no watermark, original HD quality.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">{n}</div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">{title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browser + Options */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Supported Browsers</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {['Google Chrome — best experience','Microsoft Edge — Windows default','Mozilla Firefox — fully supported','Safari — Mac and iPhone','Opera, Brave, Chromium-based browsers'].map((b) => (
                <li key={b} className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span><span>{b}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">What You Can Download</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {[
                'HD MP4 video — no watermark',
                'MP3 audio — saved as audio file',
                'Image gallery — ZIP or individual files',
                'Unlimited, no software, no account',
              ].map((d) => (
                <li key={d} className="flex gap-2"><span className="text-blue-500 font-bold">•</span><span>{d}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-500 py-14 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Download TikTok on Your PC Now</h2>
        <p className="text-indigo-100 mb-8 text-lg">No software. No watermark. Open browser and start.</p>
        <Link href="/" className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg text-lg shadow-xl hover:scale-105 transition-all">
          Download TikTok on PC
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolSchema name="TikTok Downloader for PC" url="https://www.savefrominternet.com/tiktok-video-downloader-pc" description="Download TikTok videos on PC and Windows. Free, no software install, works in Chrome, Firefox and Edge." ratingCount="1654" />
    </div>
  )
}
