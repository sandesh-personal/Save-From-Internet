import type { Metadata } from 'next'
import Link from 'next/link'

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download TikTok Videos on Android Without Watermark',
  description: 'Download TikTok videos on Android in Chrome without watermark using SaveFromInternet.com.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy TikTok URL', text: 'Open TikTok, find the video, tap Share → Copy Link.' },
    { '@type': 'HowToStep', position: 2, name: 'Open Chrome and go to SaveFromInternet', text: 'Open Chrome on your Android and go to savefrominternet.com.' },
    { '@type': 'HowToStep', position: 3, name: 'Paste and download', text: 'Paste the URL and tap Download TikTok Video. The MP4 saves to your Downloads folder with no watermark.' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where does the video save on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Chrome saves downloads to the Downloads folder on your device. Open the Files app or the Chrome downloads tray to find your video.' } },
    { '@type': 'Question', name: 'Do I need to install an app to download TikTok on Android?', acceptedAnswer: { '@type': 'Answer', text: 'No. SaveFromInternet works entirely in Chrome — no installation required.' } },
    { '@type': 'Question', name: 'Does the TikTok downloader work on Samsung Galaxy?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Works on all Android devices including Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, and others.' } },
    { '@type': 'Question', name: 'Can I download TikTok audio as MP3 on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. After processing a TikTok URL, tap Extract Audio. The MP3 downloads directly to your Downloads folder.' } },
  ],
}

export const metadata: Metadata = {
  title: 'TikTok Video Downloader for Android — No Watermark (2026)',
  description: 'Download TikTok videos on any Android phone without watermark in 2026. Works in Chrome, no app install needed.',
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-video-downloader-android' },
  openGraph: {
    title: 'TikTok Video Downloader for Android — No Watermark (2026)',
    description: 'Download TikTok videos on Android without watermark. Works in Chrome, no app needed.',
    url: 'https://www.savefrominternet.com/tiktok-video-downloader-android',
  },
}

export default function TikTokDownloaderAndroidPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] bg-white dark:bg-slate-900 px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Android Guide</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">TikTok Video Downloader for Android</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Download any TikTok video without watermark directly in Chrome. No app install, no account needed.</p>
        </div>

        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">How to Download TikTok on Android</h2>
          <ol className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span><span>Open TikTok → find the video → tap <strong>Share → Copy Link</strong></span></li>
            <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span><span>Open Chrome and go to <Link href="/" className="text-rose-500 font-semibold underline">savefrominternet.com</Link></span></li>
            <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span><span>Paste the link in the box and tap <strong>Download TikTok Video</strong></span></li>
            <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span><span>Tap <strong>Download Video</strong> — the MP4 saves to your Downloads folder</span></li>
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '🚫', title: 'No Watermark', desc: 'Clean MP4, no TikTok logo' },
            { icon: '📱', title: 'Any Android', desc: 'Samsung, Pixel, OnePlus — all work' },
            { icon: '🆓', title: 'Completely Free', desc: 'No account, no limits' },
          ].map(f => (
            <div key={f.title} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="font-bold text-slate-900 dark:text-white">{f.title}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What You Can Download</h2>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2"><span className="text-rose-500 font-bold mt-0.5">✓</span><span><strong>TikTok videos (MP4)</strong> — HD quality, no watermark</span></li>
            <li className="flex items-start gap-2"><span className="text-rose-500 font-bold mt-0.5">✓</span><span><strong>TikTok audio (MP3)</strong> — extract just the sound</span></li>
            <li className="flex items-start gap-2"><span className="text-rose-500 font-bold mt-0.5">✓</span><span><strong>TikTok photo carousels</strong> — download all images as ZIP</span></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-slate-900 dark:text-white">Where does the video save on Android?</h3><p className="text-slate-600 dark:text-slate-400 mt-1">Chrome saves downloads to the <strong>Downloads</strong> folder on your device. Open the Files app or the Chrome downloads tray to find your video.</p></div>
            <div><h3 className="font-semibold text-slate-900 dark:text-white">Do I need to install an app?</h3><p className="text-slate-600 dark:text-slate-400 mt-1">No. SaveFromInternet works entirely in Chrome — no installation required.</p></div>
            <div><h3 className="font-semibold text-slate-900 dark:text-white">Does it work on Samsung Galaxy?</h3><p className="text-slate-600 dark:text-slate-400 mt-1">Yes. Works on all Android devices including Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, and others.</p></div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link href="/" className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-colors">
            Download TikTok Video Now — Free
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Related Guides</h2>
          <ul className="space-y-1 text-rose-500 text-sm">
            <li><Link href="/blog/how-to-download-tiktok-videos-on-android-complete-guide" className="underline">Complete Android TikTok Download Guide</Link></li>
            <li><Link href="/blog/download-tiktok-no-watermark-android" className="underline">Download TikTok Without Watermark on Android</Link></li>
            <li><Link href="/blog/download-tiktok-samsung" className="underline">Download TikTok on Samsung Galaxy</Link></li>
          </ul>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
