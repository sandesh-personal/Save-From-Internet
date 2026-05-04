import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheckIcon, DevicePhoneIcon, BoltIcon } from '@/components/icons'

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
    { '@type': 'Question', name: 'Where does the video save on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Chrome saves downloads to the Downloads folder on your device. Open the Files app or the Chrome downloads tray to find your video. On Samsung Galaxy, videos also appear in the Gallery app under Downloads.' } },
    { '@type': 'Question', name: 'Do I need to install an app to download TikTok on Android?', acceptedAnswer: { '@type': 'Answer', text: 'No. SaveFromInternet works entirely in Chrome — no installation required. Just paste the TikTok URL and download.' } },
    { '@type': 'Question', name: 'Does the TikTok downloader work on Samsung Galaxy?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Works on all Android devices including Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, Motorola, and others.' } },
    { '@type': 'Question', name: 'Can I download TikTok audio as MP3 on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. After processing a TikTok URL, tap Extract Audio. The MP3 downloads directly to your Downloads folder.' } },
    { '@type': 'Question', name: 'Which browsers work for TikTok downloading on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Chrome, Samsung Internet, Firefox, and Edge all work. Chrome is recommended for the most reliable download experience.' } },
    { '@type': 'Question', name: 'How do I move the downloaded video to my Gallery?', acceptedAnswer: { '@type': 'Answer', text: 'Open the Files app, navigate to Downloads, long-press the video file, and tap Move. Navigate to DCIM/Camera to move it to your Gallery.' } },
  ],
}

export const metadata: Metadata = {
  title: 'TikTok Video Downloader for Android — No Watermark (2026)',
  description: 'Download TikTok videos on any Android phone without watermark in 2026. Works in Chrome, Samsung Internet, and Firefox. No app install needed. Includes MP3 audio extraction.',
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-video-downloader-android' },
  openGraph: {
    title: 'TikTok Video Downloader for Android — No Watermark (2026)',
    description: 'Download TikTok videos on Android without watermark. Works in any browser, no app needed.',
    url: 'https://www.savefrominternet.com/tiktok-video-downloader-android',
  },
}

export default function TikTokDownloaderAndroidPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] bg-white dark:bg-slate-900 px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Hero */}
        <div className="text-center space-y-3">
          <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Android Guide · 2026</span>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">TikTok Video Downloader for Android</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Download any TikTok video without watermark directly in Chrome or Samsung Internet. No app install, no account, no limits.</p>
          <Link href="/" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg text-base transition-colors mt-2">
            Download TikTok Video Now — Free
          </Link>
        </div>

        {/* Steps */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/40 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">How to Download TikTok on Android</h2>
          <ol className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span><span>Open TikTok → find the video → tap <strong>Share → Copy Link</strong></span></li>
            <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span><span>Open Chrome (or Samsung Internet) and go to <Link href="/" className="text-indigo-500 font-semibold underline">savefrominternet.com</Link></span></li>
            <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span><span>Paste the link in the box and tap <strong>Download TikTok Video</strong></span></li>
            <li className="flex gap-3"><span className="flex-shrink-0 w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span><span>Tap <strong>Download Video</strong> — the MP4 saves to your Downloads folder automatically</span></li>
          </ol>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {([
            { Icon: ShieldCheckIcon, title: 'No Watermark', desc: 'Clean MP4, no TikTok logo or branding' },
            { Icon: DevicePhoneIcon, title: 'Any Android', desc: 'Samsung, Pixel, OnePlus, Xiaomi — all work' },
            { Icon: BoltIcon, title: 'Completely Free', desc: 'No account, no limits, no hidden charges' },
          ] as const).map(({ Icon, title, desc }) => (
            <div key={title} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 text-center">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="font-bold text-slate-900 dark:text-white">{title}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{desc}</div>
            </div>
          ))}
        </div>

        {/* What you can download */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What You Can Download</h2>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">✓</span><span><strong>TikTok videos (MP4)</strong> — HD quality up to 1080p, no watermark</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">✓</span><span><strong>TikTok audio (MP3)</strong> — extract just the sound or music track</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">✓</span><span><strong>TikTok photo carousels</strong> — download all images as a ZIP file</span></li>
          </ul>
        </div>

        {/* Browser Comparison */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Which Browser Should You Use?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-3 font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">Browser</th>
                  <th className="p-3 font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">Works?</th>
                  <th className="p-3 font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">Notes</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                {[
                  ['Chrome', 'Best', 'Fastest downloads, direct to Downloads folder'],
                  ['Samsung Internet', 'Great', 'Integrates with Samsung Gallery automatically'],
                  ['Firefox', 'Good', 'Works well, download manager built in'],
                  ['Edge', 'Good', 'Full support on Android'],
                  ['Opera', 'Good', 'Works fine, has a built-in file manager'],
                ].map(([browser, works, note]) => (
                  <tr key={browser} className="border border-slate-200 dark:border-slate-700">
                    <td className="p-3 font-medium">{browser}</td>
                    <td className="p-3">{works}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Where Files Go */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Where Do Downloads Save on Android?</h2>
          <p className="text-slate-600 dark:text-slate-400">Downloaded videos save to your <strong>Downloads folder</strong>. Access them via:</p>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">→</span><span><strong>Files app</strong> (built-in on most Android devices) → Downloads</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">→</span><span><strong>Samsung Galaxy:</strong> My Files → Downloads, or Gallery → Downloads album</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">→</span><span><strong>Google Pixel:</strong> Files by Google app → Downloads</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">→</span><span><strong>Chrome tray:</strong> Tap the three dots → Downloads to see recent files</span></li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400 text-sm">To move a video to your main Gallery, open Files → Downloads, long-press the MP4, tap <strong>Move</strong>, then navigate to DCIM/Camera.</p>
        </div>

        {/* FAQ */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Where does the video save on Android?', a: 'Chrome saves downloads to the Downloads folder. Open the Files app or the Chrome downloads tray to find your video. On Samsung Galaxy, videos also appear in Gallery under Downloads.' },
              { q: 'Do I need to install an app?', a: 'No. SaveFromInternet works entirely in Chrome or any browser — no installation required.' },
              { q: 'Does it work on Samsung Galaxy, Google Pixel, OnePlus?', a: 'Yes. Works on all Android devices from any manufacturer, running any version of Android from 6.0 onwards.' },
              { q: 'Can I download TikTok audio (MP3) on Android?', a: 'Yes. After processing a TikTok URL, tap Extract Audio. The MP3 saves directly to your Downloads folder.' },
              { q: 'Why did my download fail?', a: 'The most common causes are: low storage space, slow internet connection, or a temporary TikTok API issue. Try again — most failures resolve on the second attempt.' },
              { q: 'Does the video have a watermark?', a: 'No. SaveFromInternet fetches the original source file from TikTok\'s servers, which has no watermark. TikTok only adds watermarks when you use their in-app save button.' },
            ].map(({ q, a }) => (
              <div key={q}><h3 className="font-semibold text-slate-900 dark:text-white">{q}</h3><p className="text-slate-600 dark:text-slate-400 mt-1">{a}</p></div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link href="/" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-colors">
            Download TikTok Video Now — Free
          </Link>
        </div>

        {/* Related */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Related Guides</h2>
          <ul className="space-y-1 text-indigo-500 text-sm">
            <li><Link href="/blog/how-to-download-tiktok-videos-on-android-complete-guide" className="underline">Complete Android TikTok Download Guide</Link></li>
            <li><Link href="/blog/download-tiktok-no-watermark-android" className="underline">Download TikTok Without Watermark on Android</Link></li>
            <li><Link href="/blog/download-tiktok-samsung" className="underline">Download TikTok on Samsung Galaxy</Link></li>
            <li><Link href="/blog/tiktok-to-mp3-android" className="underline">Convert TikTok to MP3 on Android</Link></li>
            <li><Link href="/blog/how-to-download-tiktok-videos-without-app" className="underline">Download TikTok Without Any App</Link></li>
          </ul>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
