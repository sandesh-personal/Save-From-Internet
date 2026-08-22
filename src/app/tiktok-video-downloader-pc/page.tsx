import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import ToolSchema from '@/components/ToolSchema'
import ToolRelatedGuides from '@/components/ToolRelatedGuides'

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
    { '@type': 'HowToStep', position: 3, name: 'Paste and process', text: 'Paste the TikTok URL and click Download.' },
    { '@type': 'HowToStep', position: 4, name: 'Download the MP4', text: 'Click Download — the MP4 saves to your Downloads folder with zero watermark.' },
  ],
}

export default function TikTokDownloaderPCPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-black py-12 sm:py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-slate-200 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-slate-800 shadow-xs">Windows 10/11 &amp; Mac · No Software</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            TikTok Downloader for <span className="text-white underline decoration-slate-600">PC &amp; Windows</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">Free TikTok video saver for Windows 10/11 and Mac — download TikTok videos without watermark in any desktop browser. No software, no app to install.</p>
          <Link href="/" className="inline-block bg-white text-black font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:bg-slate-100 hover:scale-105 transition-all cursor-pointer">
            Download TikTok on PC
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">How to Download TikTok on PC / Windows</h2>
          <div className="space-y-4">
            {[
              { n: '1', title: 'Copy the TikTok Video Link', desc: 'Open TikTok in your desktop browser (tiktok.com) or on your phone. Click Share → Copy Link. You can also copy the URL directly from the browser address bar.' },
              { n: '2', title: 'Open SaveFromInternet.com', desc: 'On your Windows PC or Mac, open Chrome, Firefox, Edge, or Safari and go to savefrominternet.com.' },
              { n: '3', title: 'Paste and Process (Ctrl+V / Cmd+V)', desc: 'Click the input box, press Ctrl+V (Windows) or Cmd+V (Mac) to paste, then click Download.' },
              { n: '4', title: 'Save the MP4 File', desc: 'Click Download Video. The MP4 file saves directly to your computer Downloads folder with zero watermark and original Full HD quality.' },
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

      {/* Related Guides */}
      <ToolRelatedGuides
        guides={[
          { label: 'Download on Mac Safari Guide', href: '/blog/download-tiktok-mac-safari' },
          { label: 'Download on Chromebook', href: '/blog/download-tiktok-chromebook' },
          { label: 'Download on iPhone Guide', href: '/tiktok-video-downloader-iphone' },
          { label: 'Download on Android Guide', href: '/tiktok-video-downloader-android' },
        ]}
      />

      {/* CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-black rounded-3xl p-8 sm:p-12 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white">Download TikTok on PC / Mac Free</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">Original HD quality · No watermark · Works on all desktop browsers</p>
          <Link href="/" className="inline-block bg-white text-black font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:bg-slate-100 hover:scale-105 transition-all active:scale-95 cursor-pointer">
            Open Downloader
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolSchema name="TikTok Downloader for PC" url="https://www.savefrominternet.com/tiktok-video-downloader-pc" description="Free TikTok downloader for PC Windows 10/11 and Mac without watermark." ratingCount="1940" />
    </div>
  )
}
