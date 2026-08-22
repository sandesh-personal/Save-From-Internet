import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import ToolSchema from '@/components/ToolSchema'
import ToolRelatedGuides from '@/components/ToolRelatedGuides'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I download TikTok videos on iPhone without watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Open Safari on your iPhone, go to savefrominternet.com, paste the TikTok video URL, and tap Download. Tap Download Video — when the video opens in Safari, tap the share icon and select Save Video to save to your Camera Roll.' } },
    { '@type': 'Question', name: 'Why does the TikTok video open in Safari instead of downloading directly?', acceptedAnswer: { '@type': 'Answer', text: 'Safari streams media files directly by default. Tap the share sheet or tap and hold the video to save it to your Photos app.' } },
    { '@type': 'Question', name: 'Can I download TikTok MP3 on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. After processing a TikTok URL, tap Extract MP3. The MP3 downloads via Safari and appears in the Files app under Downloads.' } },
    { '@type': 'Question', name: 'Does SaveFromInternet.com work on iPhone without an app?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Open Safari, go to savefrominternet.com, paste your TikTok link, and download. No app installation needed.' } },
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
    { '@type': 'HowToStep', position: 3, name: 'Paste and process', text: 'Paste the TikTok URL and tap Download.' },
    { '@type': 'HowToStep', position: 4, name: 'Save to Camera Roll', text: 'When the video opens in Safari, tap and hold the video, then select Save Video.' },
  ],
}

const steps = [
  { n: '1', title: 'Copy the TikTok URL', desc: 'Open TikTok on your iPhone. Tap the Share button (arrow icon) on any video, then tap Copy Link.' },
  { n: '2', title: 'Open Safari on SaveFromInternet.com', desc: 'Open Safari (the default iPhone browser) and go to savefrominternet.com for the cleanest Camera Roll save experience.' },
  { n: '3', title: 'Paste and Process', desc: 'Tap the input box, paste the URL, then tap Download. Our server fetches the clean HD stream without watermark.' },
  { n: '4', title: 'Save to Camera Roll', desc: "The video opens in Safari's player. Tap the share icon or tap and hold the video, then select 'Save Video' to save to your Photos app." },
]

export const metadata: Metadata = {
  title: 'TikTok Video Downloader for iPhone 2026 — No Watermark | Save From Internet',
  description: 'How to download TikTok videos on iPhone without watermark in 2026. Step-by-step Safari guide for iOS 14–18, with tips for Camera Roll, MP3 extraction, and troubleshooting.',
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-video-downloader-iphone' },
}

export default function TikTokDownloaderIphonePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-black py-12 sm:py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-slate-200 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-slate-800 shadow-xs">iPhone · Safari · No App · iOS 14–18</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            TikTok Downloader for <span className="text-white underline decoration-slate-600">iPhone</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
            Download TikTok videos on iPhone without watermark — 2026 guide. Works in Safari, saves directly to Camera Roll. No app install needed.
          </p>
          <Link href="/" className="inline-block bg-white text-black font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:bg-slate-100 hover:scale-105 transition-all cursor-pointer">
            Start Downloading on iPhone
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">How to Download TikTok on iPhone</h2>
          <div className="space-y-4">
            {steps.map(({ n, title, desc }) => (
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

      {/* Tips + What you get */}
      <section className="py-12 sm:py-16 px-4 border-b border-slate-200">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-5">iPhone Tips</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {[
                'Use Safari — provides direct 1-tap Camera Roll integration',
                'After video opens, tap the share icon or tap and hold to see "Save Video"',
                'MP3 audio files and photo ZIPs download into the Files app → Downloads',
                'Works on iPhone 11, 12, 13, 14, 15, and 16 running iOS 14 through iOS 18',
                'No third-party Shortcuts or App Store apps needed',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2.5">
                  <span className="text-black font-bold mt-0.5">✓</span><span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-5">Supported Formats on iOS</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {[
                'MP4 Video without watermark in 1080p / 720p',
                'High-quality MP3 audio for ringtones & music',
                'Photo carousel images saved individually or as ZIP',
                'Compatible with AirDrop, iCloud Drive, and Photos',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-black font-bold mt-0.5">•</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <ToolRelatedGuides
        guides={[
          { label: 'TikTok to MP3 on iPhone', href: '/blog/tiktok-to-mp3-iphone' },
          { label: 'Save TikTok to Camera Roll', href: '/blog/how-to-save-tiktok-videos-to-camera-roll' },
          { label: 'Download on Android Guide', href: '/tiktok-video-downloader-android' },
          { label: 'Download on PC Guide', href: '/tiktok-video-downloader-pc' },
        ]}
      />

      {/* CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-black rounded-3xl p-8 sm:p-12 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white">Download TikTok on iPhone Now</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">Open Safari, paste any TikTok link, and save directly to Camera Roll.</p>
          <Link href="/" className="inline-block bg-white text-black font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:bg-slate-100 hover:scale-105 transition-all active:scale-95 cursor-pointer">
            Open Downloader
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolSchema name="TikTok Video Downloader for iPhone" url="https://www.savefrominternet.com/tiktok-video-downloader-iphone" description="Download TikTok videos on iPhone without watermark. Step-by-step Safari guide for iOS 14-18." ratingCount="1845" />
    </div>
  )
}
