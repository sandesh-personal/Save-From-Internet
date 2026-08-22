import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import { FilmIcon, MusicIcon, PhotoIcon } from '@/components/icons'
import ToolRelatedGuides from '@/components/ToolRelatedGuides'

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
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-black py-12 sm:py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-slate-200 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-slate-800 shadow-xs">
            Save to Phone or PC · Free
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            <span className="text-white underline decoration-slate-600">Save</span> TikTok Video
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
            Save TikTok videos to your phone or PC in HD without watermark. Free, no app, no sign-up needed.
          </p>
          <Link href="/" className="inline-block bg-white text-black font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:bg-slate-100 hover:scale-105 transition-all cursor-pointer">
            Save TikTok Video Now
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">How to Save a TikTok Video</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy TikTok Link', desc: 'Open TikTok, tap Share on any video, then tap Copy Link.' },
              { n: '2', title: 'Paste & Process', desc: 'Paste the link on savefrominternet.com and click Download.' },
              { n: '3', title: 'Save to Device', desc: 'Click Download — the file saves to your phone or PC with zero watermark.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs text-center">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-sm">{n}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Device guides */}
      <section className="py-12 sm:py-16 px-4 border-b border-slate-200">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-5">Saving on iPhone</h3>
            <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
              <li>Open <strong className="text-slate-900">Safari</strong> and go to savefrominternet.com</li>
              <li>Paste TikTok URL and tap Download</li>
              <li>Tap the Download Video button</li>
              <li><strong className="text-slate-900">Tap and hold</strong> the video when it opens</li>
              <li>Select <strong className="text-slate-900">&quot;Save Video&quot;</strong> — saves to Camera Roll</li>
            </ol>
            <Link href="/tiktok-video-downloader-iphone" className="inline-block mt-4 text-black text-sm font-bold hover:underline">
              Full iPhone guide &rarr;
            </Link>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-5">Saving on Android</h3>
            <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
              <li>Open Chrome and go to savefrominternet.com</li>
              <li>Paste TikTok URL and tap Download</li>
              <li>Tap the Download Video button</li>
              <li>File downloads automatically</li>
              <li>Find it in <strong className="text-slate-900">Files / Downloads</strong> or Gallery</li>
            </ol>
            <Link href="/tiktok-video-downloader-android" className="inline-block mt-4 text-black text-sm font-bold hover:underline">
              Full Android guide &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* What you can save */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">What You Can Save from TikTok</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { Icon: FilmIcon, title: 'Videos', desc: 'Save as HD MP4 without watermark.' },
              { Icon: MusicIcon, title: 'Audio', desc: 'Save TikTok sounds as MP3 files.' },
              { Icon: PhotoIcon, title: 'Photos', desc: 'Save photo carousels individually or ZIP.' },
            ] as const).map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs text-center">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <ToolRelatedGuides
        guides={[
          { label: 'Save TikTok to Camera Roll', href: '/blog/how-to-save-tiktok-videos-to-camera-roll' },
          { label: 'Save TikTok Drafts', href: '/blog/save-tiktok-drafts' },
          { label: 'Save TikTok Slideshow', href: '/blog/save-tiktok-slideshow' },
          { label: 'Save TikTok to Google Drive', href: '/blog/save-tiktok-to-google-drive' },
        ]}
      />

      {/* CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-black rounded-3xl p-8 sm:p-12 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white">Save Your TikTok Videos Now</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">Free · No watermark · iPhone, Android, and PC</p>
          <Link href="/" className="inline-block bg-white text-black font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:bg-slate-100 hover:scale-105 transition-all active:scale-95 cursor-pointer">
            Save TikTok Video
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
