import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Save TikTok Video - Download & Save TikTok Videos Free 2026 | Save From Internet',
  description: 'Save TikTok videos to your phone or PC in HD. Free online tool — save TikTok videos without watermark, no app, no sign-up required.',
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
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/60 to-white py-14 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-rose-100 shadow-sm">💾 Save to Phone or PC · Free</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">Save</span>{' '}TikTok Video
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">Save TikTok videos to your phone or PC in HD without watermark. Free, no app, no sign-up needed.</p>
          <Link href="/" className="inline-block bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-rose-500/25 transition-all">
            ⬇ Save TikTok Video Now
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">How to Save a TikTok Video</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Copy TikTok Link', desc: 'Open TikTok, tap Share on any video, then tap Copy Link.' },
              { n: '2', title: 'Paste & Process', desc: 'Paste the link on savefrominternet.com and click Download TikTok Video.' },
              { n: '3', title: 'Save to Device', desc: 'Click Download — the file saves to your phone or PC. No watermark.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-violet-600 rounded-full flex items-center justify-center text-white font-extrabold text-xl mx-auto mb-4">{n}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Device guides */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">🍎 Saving on iPhone</h3>
            <ol className="space-y-3 text-sm text-slate-600 list-decimal list-inside">
              <li>Open <strong className="text-slate-900">Safari</strong> and go to savefrominternet.com</li>
              <li>Paste TikTok URL and tap Download TikTok Video</li>
              <li>Tap the Download Video button</li>
              <li><strong className="text-slate-900">Tap and hold</strong> the video when it plays</li>
              <li>Select <strong className="text-slate-900">&quot;Save Video&quot;</strong> → goes to Camera Roll</li>
            </ol>
            <Link href="/tiktok-video-downloader-iphone" className="inline-block mt-4 text-rose-500 text-sm font-semibold hover:underline">Full iPhone guide →</Link>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">🤖 Saving on Android</h3>
            <ol className="space-y-3 text-sm text-slate-600 list-decimal list-inside">
              <li>Open Chrome and go to savefrominternet.com</li>
              <li>Paste TikTok URL and tap Download TikTok Video</li>
              <li>Tap the Download Video button</li>
              <li>File downloads automatically</li>
              <li>Find it in <strong className="text-slate-900">Files → Downloads</strong> or Gallery</li>
            </ol>
            <Link href="/tiktok-video-downloader-android" className="inline-block mt-4 text-rose-500 text-sm font-semibold hover:underline">Full Android guide →</Link>
          </div>
        </div>
      </section>

      {/* What you can save */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">What You Can Save from TikTok</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎬', title: 'Videos', desc: 'Save as HD MP4 without watermark.', color: 'rose' },
              { icon: '🎵', title: 'Audio', desc: 'Save TikTok sounds as MP3 files.', color: 'emerald' },
              { icon: '🖼️', title: 'Photos', desc: 'Save photo carousels individually or ZIP.', color: 'violet' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I save a TikTok video to my phone?', a: 'Copy the TikTok URL, go to savefrominternet.com, paste it, and click Download. On iPhone, tap and hold the video in Safari and select Save Video. On Android, the file downloads directly.' },
              { q: 'Where do saved TikTok videos go on iPhone?', a: 'After tapping and holding the video in Safari and selecting Save Video, the video appears in your Photos app / Camera Roll.' },
              { q: 'Where do saved TikTok videos go on Android?', a: 'Downloaded videos go to your Downloads folder. Open the Files app and check Downloads, or look in your Gallery app.' },
              { q: 'Can I save TikTok without watermark?', a: 'Yes. SaveFromInternet.com saves the original file without any watermark. Completely free.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="text-slate-900 font-bold mb-2">{q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-rose-500 to-violet-600 py-14 px-4 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">Save Your TikTok Videos Now</h2>
        <p className="text-rose-100 mb-8 text-lg">Free · No watermark · iPhone, Android, and PC</p>
        <Link href="/" className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-all">
          ⬇ Save TikTok Video
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
