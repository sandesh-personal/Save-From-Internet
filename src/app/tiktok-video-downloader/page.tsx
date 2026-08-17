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
    <div className="bg-white min-h-screen">
      <ToolSchema
        name="TikTok Video Downloader"
        description="Download TikTok videos without watermark in HD MP4 quality."
        url="https://www.savefrominternet.com/tiktok-video-downloader"
        howTo={howToSchema}
        faq={faqSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-12 sm:py-16 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-blue-100 shadow-xs">Free · Full HD · No Watermark</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            TikTok <span className="text-blue-600">Video Downloader</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">Download TikTok videos without watermark in original Full HD MP4 quality. Free, unlimited, and no app required.</p>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:scale-105 transition-all cursor-pointer">
            Start Downloading Now
          </Link>
        </div>
      </section>

      {/* Ad */}
      <div className="flex justify-center py-6 px-4 max-w-5xl mx-auto">
        <GoogleAdSense adSlot="5309301802" adFormat="auto" className="flex justify-center w-full" containerStyle="default" />
      </div>

      {/* How It Works */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">How to Download TikTok Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy TikTok URL', desc: 'Open TikTok, tap Share → Copy Link on any video you want to download.' },
              { n: '2', title: 'Paste & Process', desc: 'Paste the URL on savefrominternet.com and click "Download".' },
              { n: '3', title: 'Download Content', desc: 'Get your HD video without watermark, MP3 audio, or photo gallery instantly.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-md shadow-blue-500/20">{n}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features + Platforms */}
      <section className="py-12 sm:py-16 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">Key Features</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {['Download without watermark in HD','MP4 format, original quality','Extract MP3 audio','Save image galleries (ZIP or individual)','Works on all devices and browsers','No registration, unlimited downloads'].map((f) => (
                <li key={f} className="flex items-start gap-2.5"><span className="text-blue-600 font-bold mt-0.5">✓</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">Supported Formats</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100/70 text-blue-600 rounded-xl">
                  <FilmIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">MP4 Video</h4>
                  <p className="text-xs text-slate-500">Full HD up to 1080p, no watermark</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100/70 text-blue-600 rounded-xl">
                  <MusicIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">MP3 Audio</h4>
                  <p className="text-xs text-slate-500">High bitrate audio extracted directly</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100/70 text-blue-600 rounded-xl">
                  <PhotoIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Photo Slideshows</h4>
                  <p className="text-xs text-slate-500">Download individual JPGs or ZIP archive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <ToolRelatedGuides
        guides={[
          { label: 'Download on iPhone Guide', href: '/tiktok-video-downloader-iphone' },
          { label: 'Download on Android Guide', href: '/tiktok-video-downloader-android' },
          { label: 'Download on PC Guide', href: '/tiktok-video-downloader-pc' },
          { label: 'TikTok to MP3 Converter', href: '/tiktok-to-mp3' },
          { label: 'TikTok Photo Downloader', href: '/tiktok-photo-downloader' },
        ]}
      />

      {/* Bottom CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-[#195fd7] to-[#1e6fe8] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-blue-600/20">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
            Download TikTok Videos Free
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Paste any TikTok link now and download in Full HD MP4 or extract MP3 audio. Free forever, no app required.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-700 font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition-all active:scale-95 cursor-pointer"
          >
            Go to Downloader
          </Link>
        </div>
      </section>
    </div>
  )
}
