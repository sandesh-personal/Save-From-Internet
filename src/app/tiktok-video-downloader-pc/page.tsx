import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TikTok Video Downloader for PC - Windows & Mac 2026 | Save From Internet',
  description: 'Download TikTok videos on PC without watermark. Works on Windows and Mac in Chrome, Firefox, Edge, and Safari. No software to install.',
  keywords: ['tiktok video downloader pc', 'download tiktok on windows', 'tiktok downloader mac 2026'],
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-video-downloader-pc' },
  openGraph: {
    title: 'TikTok Video Downloader for PC - Windows & Mac 2026',
    description: 'Download TikTok videos on PC. Works in Chrome, Firefox, Edge, Safari. No software.',
    url: 'https://www.savefrominternet.com/tiktok-video-downloader-pc',
    type: 'website',
    images: ['/og-final.jpg'],
  },
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
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/60 to-white py-14 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-rose-100 shadow-sm">🖥️ Windows & Mac · No Software</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            TikTok Downloader for{' '}
            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">PC</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">Download TikTok videos on Windows or Mac without watermark. Works in any browser — no software to install.</p>
          <Link href="/" className="inline-block bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-rose-500/25 transition-all">
            ⬇ Download TikTok on PC
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">How to Download TikTok on PC</h2>
          <div className="space-y-4">
            {[
              { n: '1', title: 'Copy the TikTok Video Link', desc: 'Open TikTok in your browser (tiktok.com) or on your phone. Click Share → Copy Link. On PC browser, you can also copy the URL from the address bar directly.' },
              { n: '2', title: 'Open SaveFromInternet.com', desc: 'On your Windows or Mac, open Chrome, Firefox, Edge, or Safari and go to savefrominternet.com.' },
              { n: '3', title: 'Paste and Process (Ctrl+V / Cmd+V)', desc: 'Click the input box, press Ctrl+V (Windows) or Cmd+V (Mac) to paste, then click Download TikTok Video.' },
              { n: '4', title: 'Download the MP4', desc: 'Click Download Video. The MP4 file saves to your PC Downloads folder automatically — no watermark, original HD quality.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 bg-gradient-to-r from-rose-500 to-violet-600 rounded-full flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0">{n}</div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browser + Options */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">🖥️ Supported Browsers</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {['Google Chrome — best experience','Microsoft Edge — Windows default','Mozilla Firefox — fully supported','Safari — Mac and iPhone','Opera, Brave, Chromium-based browsers'].map((b) => (
                <li key={b} className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span><span>{b}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">💾 What You Can Download</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                '🎬 HD MP4 video — no watermark',
                '🎵 MP3 audio — saved as audio file',
                '🖼️ Image gallery — ZIP or individual files',
                '♾️ Unlimited, no software, no account',
              ].map((d) => (
                <li key={d} className="flex gap-2"><span className="text-blue-500 font-bold">•</span><span>{d}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-rose-500 to-violet-600 py-14 px-4 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">Download TikTok on Your PC Now</h2>
        <p className="text-rose-100 mb-8 text-lg">No software. No watermark. Open browser and start.</p>
        <Link href="/" className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-all">
          ⬇ Download TikTok on PC
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </div>
  )
}
