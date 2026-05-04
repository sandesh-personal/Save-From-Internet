import type { Metadata } from 'next'
import Link from 'next/link'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I download TikTok videos on iPhone without watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Open Safari on your iPhone, go to savefrominternet.com, paste the TikTok video URL, and tap Download TikTok Video. Tap Download Video — when the video plays in Safari, tap and hold and select Save Video to save to your Camera Roll.' } },
    { '@type': 'Question', name: 'Why does the TikTok video open in Safari instead of downloading?', acceptedAnswer: { '@type': 'Answer', text: 'Safari streams videos by default on iPhone. After the video opens, tap and hold the video player and select Save Video to save it to your Camera Roll.' } },
    { '@type': 'Question', name: 'Can I download TikTok MP3 on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. After processing a TikTok URL, tap Extract Audio. The MP3 downloads via Safari and appears in the Files app under Downloads.' } },
    { '@type': 'Question', name: 'Does SaveFromInternet.com work on iPhone without an app?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Open Safari, go to savefrominternet.com, paste your TikTok link, and download. No app installation needed.' } },
    { '@type': 'Question', name: 'Does this work on iOS 18?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. SaveFromInternet works on iOS 14 through iOS 18. The download process is the same across all supported iOS versions.' } },
    { '@type': 'Question', name: 'Where do downloaded videos go on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'After tapping Save Video in Safari, the video goes to your Camera Roll (Photos app). MP3 files and photo ZIPs go to the Files app under Downloads.' } },
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
  { n: '1', title: 'Copy the TikTok URL', desc: 'Open TikTok on your iPhone. Tap the Share button (arrow icon) on any video, then tap Copy Link.' },
  { n: '2', title: 'Open Safari on SaveFromInternet.com', desc: 'Open Safari (the default iPhone browser) and go to savefrominternet.com. Use Safari for best results — Chrome on iPhone handles file saves differently.' },
  { n: '3', title: 'Paste and Process', desc: 'Tap the input box, paste the URL (or tap Paste), then tap Download TikTok Video. Wait a moment for the video to be processed.' },
  { n: '4', title: 'Save to Camera Roll', desc: "The video opens in Safari's player. Tap and hold the video, select Save Video. Done — no watermark, saved to Camera Roll." },
]

export const metadata: Metadata = {
  title: 'TikTok Video Downloader for iPhone 2026 — No Watermark | Save From Internet',
  description: 'How to download TikTok videos on iPhone without watermark in 2026. Step-by-step Safari guide for iOS 14–18, with tips for Camera Roll, MP3 extraction, and troubleshooting.',
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-video-downloader-iphone' },
}

export default function TikTokDownloaderIphonePage() {
  return (
    <div className="bg-white dark:bg-slate-900">

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50/50 dark:from-slate-800 to-white dark:to-slate-900 py-14 px-4 text-center border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-indigo-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-indigo-100 dark:border-indigo-900/40 shadow-sm">iPhone · Safari · No App · iOS 14–18</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            TikTok Downloader for{' '}
            <span className="text-indigo-500">iPhone</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Download TikTok videos on iPhone without watermark — 2026 guide. Works in Safari, saves to Camera Roll. No app install.
          </p>
          <Link href="/" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg shadow-indigo-500/25 transition-all">
            Start Downloading
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">How to Download TikTok on iPhone</h2>
          <div className="space-y-4">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">{n}</div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">{title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips + What you get */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">iPhone Tips</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {[
                'Use Safari — Chrome on iPhone saves files differently (goes to Files, not Camera Roll)',
                'After video opens, tap and hold to see the Save Video option',
                'MP3 files and photo ZIPs go to Files app → Downloads',
                'Allow Photos access when prompted for Camera Roll saves',
                'Works on iPhone 12, 13, 14, 15, and 16 (iOS 14+)',
                'On iOS 15+, some downloads go straight to Files without needing tap-and-hold',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold mt-0.5">✓</span><span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">What You Can Download</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {[
                { text: 'HD Video (MP4) — no watermark, original quality up to 1080p' },
                { text: 'MP3 Audio — extract music or spoken-word tracks' },
                { text: 'Photos — save TikTok photo carousels as a ZIP file' },
                { text: 'Unlimited — no daily limits, no account needed' },
              ].map(({ text }) => (
                <li key={text} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" /><span>{text}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* iOS Version Notes */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-10 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">iOS Version Notes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-white dark:bg-slate-800">
                  <th className="p-3 text-left font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">iOS Version</th>
                  <th className="p-3 text-left font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">Download Behavior</th>
                  <th className="p-3 text-left font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">Where It Saves</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                {[
                  ['iOS 14', 'Video opens in Safari player — tap and hold → Save Video', 'Camera Roll'],
                  ['iOS 15 & 16', 'Download button appears in share sheet on some files', 'Camera Roll or Files'],
                  ['iOS 17', 'Consistent download behavior, Files integration improved', 'Camera Roll'],
                  ['iOS 18', 'Same as iOS 17 — tap and hold → Save Video', 'Camera Roll'],
                ].map(([ios, behavior, saves]) => (
                  <tr key={ios} className="border border-slate-200 dark:border-slate-700">
                    <td className="p-3 font-medium">{ios}</td>
                    <td className="p-3">{behavior}</td>
                    <td className="p-3 text-indigo-500 font-medium">{saves}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="bg-white dark:bg-slate-900 py-10 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Troubleshooting</h2>
          <div className="space-y-4">
            {[
              { q: 'The video opens in Safari but I don\'t see "Save Video"', a: 'Tap and hold the video player for 1–2 seconds until the context menu appears. Make sure you are pressing on the video itself, not the surrounding page.' },
              { q: 'The Save Video option is greyed out', a: 'This occasionally happens due to a Safari cache issue. Reload the page and try again, or go back to savefrominternet.com and re-process the URL.' },
              { q: 'Where is my downloaded MP3?', a: 'MP3 files save to the Files app. Open Files → On My iPhone (or iCloud Drive) → Downloads. Tap the file to play it.' },
              { q: 'The URL I pasted gives an error', a: 'Make sure you copied the full TikTok link including https://. If you copied a short TikTok URL (like vm.tiktok.com/...), that should also work — paste it and let the tool resolve it.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-100 dark:border-slate-700/50">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{q}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">FAQ — TikTok Downloader iPhone</h2>
          <div className="space-y-4">
            {[
              { q: 'Why does the video open in Safari instead of downloading?', a: 'Safari streams videos by default on iPhone. When the video opens, tap and hold the video player and select "Save Video" to save to your Camera Roll.' },
              { q: 'Can I download TikTok audio (MP3) on iPhone?', a: 'Yes. After processing a TikTok URL, tap Extract Audio. Find the MP3 in the Files app under Downloads.' },
              { q: 'Do I need to install an app on my iPhone?', a: 'No. Open Safari, visit savefrominternet.com, paste a TikTok link, and download. Nothing to install.' },
              { q: 'Does it work on older iPhones?', a: 'Yes — works on any iPhone running iOS 14 or later, including older models like iPhone 8, X, XS, and 11.' },
              { q: 'Where do videos save when using Chrome on iPhone?', a: 'Chrome on iPhone saves files to the Files app, not Camera Roll. If you want videos in Camera Roll, use Safari instead.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                <h3 className="text-slate-900 dark:text-white font-bold mb-2">{q}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="bg-white dark:bg-slate-900 py-10 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Related Guides</h2>
          <ul className="space-y-2 text-indigo-500 text-sm">
            <li><Link href="/blog/download-tiktok-no-watermark-iphone" className="underline">Download TikTok Without Watermark on iPhone</Link></li>
            <li><Link href="/blog/tiktok-downloader-safari-ios" className="underline">Best TikTok Downloader for Safari on iPhone</Link></li>
            <li><Link href="/blog/tiktok-to-mp3-iphone" className="underline">Convert TikTok to MP3 on iPhone</Link></li>
            <li><Link href="/blog/download-tiktok-ios18-iphone" className="underline">Download TikTok on iOS 18 — Updated Guide</Link></li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-500 py-14 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Download TikTok on iPhone Now</h2>
        <p className="text-indigo-100 mb-8 text-lg">Free · No watermark · No app · Works in Safari · iOS 14–18</p>
        <Link href="/" className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg text-lg shadow-xl hover:scale-105 transition-all">
          Download TikTok on iPhone
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
