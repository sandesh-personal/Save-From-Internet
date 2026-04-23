import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TikTok Video Downloader for iPhone 2026 - No Watermark | Save From Internet',
  description: 'How to download TikTok videos on iPhone without watermark in 2026. Step-by-step Safari guide, tips for saving to Camera Roll, and MP3 extraction on iOS.',
  keywords: ['tiktok video downloader iphone', 'download tiktok on iphone without watermark', 'save tiktok to camera roll iphone', 'tiktok downloader ios 2026'],
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-video-downloader-iphone' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I download TikTok videos on iPhone without watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Open Safari on your iPhone, go to savefrominternet.com, paste the TikTok video URL, and tap Process TikTok URL. Tap Download Video — when the video plays, tap and hold and select Save Video to save to your Camera Roll.' } },
    { '@type': 'Question', name: 'Why does the TikTok video open in Safari instead of downloading?', acceptedAnswer: { '@type': 'Answer', text: 'Safari streams videos by default on iPhone. After the video opens, tap and hold the video player and select "Save Video" to save it to your Camera Roll.' } },
    { '@type': 'Question', name: 'Can I download TikTok MP3 on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. After processing a TikTok URL, tap Extract Audio. The MP3 will download via Safari — check the Files app under Downloads.' } },
    { '@type': 'Question', name: 'Does SaveFromInternet.com work on iPhone without an app?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Open Safari, go to savefrominternet.com, paste your link, and download. No app needed.' } },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download TikTok Videos on iPhone Without Watermark',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok video URL', text: 'Open TikTok. Tap Share → Copy Link.' },
    { '@type': 'HowToStep', position: 2, name: 'Open Safari and go to SaveFromInternet.com', text: 'Open Safari on your iPhone and navigate to savefrominternet.com.' },
    { '@type': 'HowToStep', position: 3, name: 'Paste and process', text: 'Paste the TikTok URL and tap Download TikTok Video.' },
    { '@type': 'HowToStep', position: 4, name: 'Save to Camera Roll', text: 'When the video opens in Safari, tap and hold the video, then select Save Video.' },
  ],
}

const steps = [
  { n: '1', icon: '📋', title: 'Copy the TikTok URL', desc: 'Open TikTok on your iPhone. Tap the Share button (arrow icon) on any video, then tap Copy Link.' },
  { n: '2', icon: '🌐', title: 'Open Safari → SaveFromInternet.com', desc: 'Open Safari (the default iPhone browser) and go to savefrominternet.com. Use Safari for best results.' },
  { n: '3', icon: '⚙️', title: 'Paste and Process', desc: 'Tap the input box, paste the URL (or tap Paste), then tap Download TikTok Video.' },
  { n: '4', icon: '💾', title: 'Save to Camera Roll', desc: 'The video opens in Safari. Tap and hold the video player → select Save Video. Done — no watermark.' },
]

export default function TikTokDownloaderIphonePage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/60 to-white py-14 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-rose-100 shadow-sm">🍎 iPhone Guide · Safari · No App</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            TikTok Downloader for{' '}
            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">iPhone</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
            Download TikTok videos on iPhone without watermark — 2026 guide. Works in Safari, saves to Camera Roll. No app install.
          </p>
          <Link href="/" className="inline-block bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-rose-500/25 transition-all">
            ⬇ Start Downloading
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">How to Download TikTok on iPhone</h2>
          <div className="space-y-4">
            {steps.map(({ n, icon, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 bg-gradient-to-r from-rose-500 to-violet-600 rounded-full flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0">{n}</div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-1">{icon} {title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips + What you get */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">📱 iPhone Tips</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                'Use Safari — Chrome may not support tap-to-save on iPhone',
                'After video opens, tap and hold to see "Save Video" option',
                'MP3 files go to Files app → Downloads',
                'Allow Photos access when prompted for Camera Roll saves',
                'Works on iPhone 12, 13, 14, 15, and 16 (iOS 15+)',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span><span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">✨ What You Can Download</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                { icon: '🎬', text: 'HD Video (MP4) — no watermark, original quality' },
                { icon: '🎵', text: 'MP3 Audio — extract music or sounds' },
                { icon: '🖼️', text: 'Photos — save TikTok photo carousels' },
                { icon: '♾️', text: 'Unlimited — no daily limits, no account needed' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-2"><span>{icon}</span><span>{text}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">FAQ — TikTok Downloader iPhone</h2>
          <div className="space-y-4">
            {[
              { q: 'Why does the video open in Safari instead of downloading?', a: 'Safari streams videos by default on iPhone. When the video opens, tap and hold the video player and select "Save Video" to save to your Camera Roll.' },
              { q: 'Can I download TikTok audio (MP3) on iPhone?', a: 'Yes. After processing a TikTok URL, tap Extract Audio. Find the MP3 in the Files app under Downloads.' },
              { q: 'Do I need to install an app on my iPhone?', a: 'No. Open Safari, visit savefrominternet.com, paste a TikTok link, and download. Nothing to install.' },
              { q: 'Does it work on older iPhones?', a: 'Yes, works on any iPhone running iOS 14 or later.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="text-slate-900 font-bold mb-2">{q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-rose-500 to-violet-600 py-14 px-4 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">Download TikTok on iPhone Now</h2>
        <p className="text-rose-100 mb-8 text-lg">Free · No watermark · No app · Works in Safari</p>
        <Link href="/" className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-all">
          ⬇ Download TikTok on iPhone
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
