import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import ToolSchema from '@/components/ToolSchema'
import ToolRelatedGuides from '@/components/ToolRelatedGuides'
import { FilmIcon, MusicIcon, PhotoIcon } from '@/components/icons'

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
    <div className="bg-white dark:bg-slate-900">

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50/50 dark:from-slate-800 to-white dark:to-slate-900 py-14 px-4 text-center border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-indigo-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-indigo-100 dark:border-indigo-900/40 shadow-sm">Free · HD · No Watermark</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            TikTok <span className="text-indigo-500">Video Downloader</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">Download TikTok videos without watermark 2026 in HD as MP4. Free, no app required. Also extract MP3 and save images.</p>
          <Link href="/" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg shadow-indigo-500/25 transition-all">
            Start Downloading Now
          </Link>
        </div>
      </section>

      {/* Ad */}
      <div className="flex justify-center py-6 px-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/50">
        <GoogleAdSense adSlot="5309301802" adFormat="auto" className="flex justify-center" containerStyle="default" />
      </div>

      {/* How It Works */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">How to Download TikTok Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy TikTok URL', desc: 'Open TikTok, tap Share → Copy Link on any video you want to download.' },
              { n: '2', title: 'Paste & Process', desc: 'Paste the URL on savefrominternet.com and click "Download TikTok Video".' },
              { n: '3', title: 'Download Content', desc: 'Get your HD video without watermark, MP3 audio, or photo gallery instantly.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm text-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">{n}</div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features + Platforms */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Key Features</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {['Download without watermark in HD','MP4 format, original quality','Extract MP3 audio','Save image galleries (ZIP or individual)','Works on all devices and browsers','No registration, unlimited downloads'].map((f) => (
                <li key={f} className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">✓</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Supported Platforms</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {[
                { label: 'iPhone & iPad', href: '/tiktok-video-downloader-iphone' },
                { label: 'Android phones & tablets', href: '/tiktok-video-downloader-android' },
                { label: 'Windows PC & Mac', href: '/tiktok-video-downloader-pc' },
                { label: 'Chrome, Firefox, Safari, Edge', href: '/' },
              ].map(({ label, href }) => (
                <li key={label} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <Link href={href} className="hover:text-indigo-500 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Download Options */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Download Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { Icon: FilmIcon, title: 'HD Video (MP4)', desc: 'Download TikTok videos in HD without watermark as MP4 files.' },
              { Icon: MusicIcon, title: 'Audio (MP3)', desc: 'Extract high-quality MP3 audio from any TikTok video.' },
              { Icon: PhotoIcon, title: 'Photo Gallery', desc: 'Save images from TikTok carousels individually or as ZIP.' },
            ] as const).map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Is downloading TikTok videos legal?', a: 'Downloading for personal use is generally accepted. Always respect copyright and creator rights.' },
              { q: 'What video quality will I get?', a: 'The highest available — typically 720p or 1080p HD with no compression.' },
              { q: 'Do I need to install any software?', a: 'No. Our downloader works in your browser. No app, no extension, no account required.' },
              { q: 'Can I download private TikTok videos?', a: 'No. Only public videos can be downloaded.' },
              { q: 'Are there download limits?', a: 'No limits. Download as many TikTok videos as you want, for free.' },
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
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Download TikTok Videos?</h2>
        <p className="text-indigo-100 mb-8 text-lg">Free. No watermark. No sign-up. Start in seconds.</p>
        <Link href="/" className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
          Download TikTok Videos Now
        </Link>
      </section>

      <ToolRelatedGuides guides={[
        { label: 'How to Download TikTok Videos in 2026', href: '/blog/how-to-download-tiktok-videos-2026' },
        { label: 'Download TikTok Without Watermark', href: '/blog/download-tiktok-videos-without-watermark-2025' },
        { label: 'Download TikTok in HD Quality', href: '/blog/how-to-download-tiktok-videos-in-hd-quality' },
        { label: 'TikTok Downloader for Android', href: '/blog/how-to-download-tiktok-videos-on-android-complete-guide' },
        { label: 'TikTok Downloader for PC & Mac', href: '/blog/tiktok-video-downloader-for-pc-windows-mac' },
        { label: 'Download TikTok Without Any App', href: '/blog/how-to-download-tiktok-videos-without-app' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolSchema name="TikTok Video Downloader" url="https://www.savefrominternet.com/tiktok-video-downloader" description="Free TikTok video downloader. Download TikTok videos without watermark in HD MP4. No app, no sign-up." ratingCount="3142" />
    </div>
  )
}
