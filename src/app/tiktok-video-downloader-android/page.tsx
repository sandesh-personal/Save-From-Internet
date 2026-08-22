import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import ToolSchema from '@/components/ToolSchema'
import ToolRelatedGuides from '@/components/ToolRelatedGuides'
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
    { '@type': 'Question', name: 'Where does the video save on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Chrome saves downloads to the Downloads folder on your device. Open the Files app or your Gallery app to view it.' } },
    { '@type': 'Question', name: 'Do I need to install an app to download TikTok on Android?', acceptedAnswer: { '@type': 'Answer', text: 'No. SaveFromInternet works entirely in Chrome — no installation required. Just paste the TikTok URL and download.' } },
    { '@type': 'Question', name: 'Does the TikTok downloader work on Samsung Galaxy?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Works on all Android devices including Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, Motorola, and others.' } },
    { '@type': 'Question', name: 'Can I download TikTok audio as MP3 on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. After processing a TikTok URL, tap Extract MP3. The audio file downloads directly to your Downloads folder.' } },
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
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-black py-12 sm:py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-slate-900 text-slate-200 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 border border-slate-800 shadow-xs">Android Guide · 2026</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            TikTok Video Downloader for <span className="text-white underline decoration-slate-600">Android</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
            Download any TikTok video without watermark directly in Chrome, Samsung Internet, or Firefox. No app install, no account, no limits.
          </p>
          <Link href="/" className="inline-block bg-white text-black font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:bg-slate-100 hover:scale-105 transition-all cursor-pointer">
            Download TikTok on Android Now
          </Link>
        </div>
      </section>

      {/* Ad */}
      <div className="flex justify-center py-6 px-4 max-w-5xl mx-auto">
        <GoogleAdSense adSlot="5309301802" adFormat="auto" className="flex justify-center w-full" containerStyle="default" />
      </div>

      {/* Steps */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">How to Download on Android</h2>
          <div className="space-y-4">
            {[
              { n: '1', title: 'Copy the TikTok URL', desc: 'Open the TikTok app on your Android phone. Find the video, tap Share → Copy Link.' },
              { n: '2', title: 'Open Browser on SaveFromInternet.com', desc: 'Open Chrome or Samsung Internet and go to savefrominternet.com.' },
              { n: '3', title: 'Paste and Process', desc: 'Paste the URL into the search box and tap Download.' },
              { n: '4', title: 'Save File Automatically', desc: 'Tap Download MP4 — the file saves automatically to your Downloads folder and appears in your Gallery.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 bg-black rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">{n}</div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 border-b border-slate-200">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {([
            { Icon: ShieldCheckIcon, title: 'No Watermark', desc: 'Clean MP4 without TikTok logos or creator overlays' },
            { Icon: DevicePhoneIcon, title: 'All Android Brands', desc: 'Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, Oppo' },
            { Icon: BoltIcon, title: '100% Free', desc: 'Unlimited downloads, no subscriptions, no accounts' },
          ] as const).map(({ Icon, title, desc }) => (
            <div key={title} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-bold text-slate-900 text-base mb-1">{title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Guides */}
      <ToolRelatedGuides
        guides={[
          { label: 'TikTok to MP3 on Android', href: '/blog/tiktok-to-mp3-android' },
          { label: 'Download on Samsung Galaxy', href: '/blog/download-tiktok-samsung' },
          { label: 'Download on iPhone Guide', href: '/tiktok-video-downloader-iphone' },
          { label: 'Download on PC Guide', href: '/tiktok-video-downloader-pc' },
        ]}
      />

      {/* CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-black rounded-3xl p-8 sm:p-12 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white">Save TikTok Videos on Android</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">Works directly in Chrome. Clean HD MP4 with zero watermark.</p>
          <Link href="/" className="inline-block bg-white text-black font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:bg-slate-100 hover:scale-105 transition-all active:scale-95 cursor-pointer">
            Start Downloading Now
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolSchema name="TikTok Video Downloader for Android" url="https://www.savefrominternet.com/tiktok-video-downloader-android" description="Download TikTok videos on Android in Chrome without watermark." ratingCount="2104" />
    </div>
  )
}
