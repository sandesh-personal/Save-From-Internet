import Link from 'next/link'
import DownloaderTool from '@/components/DownloaderTool'

/* ── Structured Data ───────────────────────────────────────────────── */
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TikTok Video Downloader - Save From Internet',
  url: 'https://www.savefrominternet.com',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Windows, macOS, iOS, Android',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free TikTok video downloader. Download TikTok videos without watermark in HD MP4, extract MP3 audio, and save image galleries. No app required.',
  featureList: ['Download TikTok videos without watermark', 'HD MP4 video download', 'MP3 audio extraction', 'Image gallery download', 'No registration required', 'Unlimited downloads'],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I download TikTok videos without watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Copy the TikTok video URL, paste it into savefrominternet.com, click "Download TikTok Video", and download the MP4. The file has no watermark.' } },
    { '@type': 'Question', name: 'Is SaveFromInternet.com free to use?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No subscription, no hidden fees, no download limits.' } },
    { '@type': 'Question', name: 'Do I need to install an app?', acceptedAnswer: { '@type': 'Answer', text: 'No. It works entirely in your web browser on any device — iPhone, Android, PC, or Mac.' } },
    { '@type': 'Question', name: 'Can I download TikTok audio as MP3?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. After processing a TikTok URL, click "Extract MP3" to save the audio track from any TikTok video.' } },
    { '@type': 'Question', name: 'Why does SaveFromInternet.com download without watermark?', acceptedAnswer: { '@type': 'Answer', text: "We fetch the original video file directly from TikTok's servers before any watermark is applied, so your download is clean." } },
    { '@type': 'Question', name: 'Is downloading TikTok videos legal?', acceptedAnswer: { '@type': 'Answer', text: 'Downloading for personal offline use is generally accepted. Do not redistribute or monetize downloaded content without the creator\'s permission.' } },
  ],
}

/* ── Feature data ──────────────────────────────────────────────────── */
const features = [
  { icon: '🚫', title: 'No Watermark', desc: 'Get the original clean video — no TikTok logo, no username overlay.' },
  { icon: '🎬', title: 'HD Quality', desc: 'Download at the original resolution — 720p, 1080p, or higher.' },
  { icon: '🎵', title: 'MP3 Extraction', desc: 'Pull the audio track from any TikTok video as a high-quality MP3.' },
  { icon: '🖼️', title: 'Image Galleries', desc: 'Save TikTok photo carousels — individual files or a single ZIP.' },
  { icon: '⚡', title: 'Instant & Fast', desc: 'No waiting, no queues. Processing takes just a few seconds.' },
  { icon: '🔒', title: 'Private & Secure', desc: 'We never store your videos. Downloads are processed in real time.' },
  { icon: '📱', title: 'All Devices', desc: 'Works on iPhone, Android, Windows PC, Mac — any browser.' },
  { icon: '♾️', title: 'Unlimited', desc: 'No daily caps. Download as many TikTok videos as you need.' },
]

const faqs = [
  { q: 'How do I download TikTok videos without watermark?', a: 'Open TikTok, tap Share → Copy Link. Paste the URL on savefrominternet.com, click "Download TikTok Video", and save the MP4. The downloaded file has no TikTok watermark.' },
  { q: 'Does it work on iPhone and Android?', a: 'Yes. On iPhone, open Safari, go to savefrominternet.com, paste the link and download. After the video opens in Safari, tap and hold the video and select "Save Video" to save to your Camera Roll. On Android, the file downloads directly to your Downloads folder.' },
  { q: 'Can I download TikTok audio as MP3?', a: 'Yes. After processing any TikTok URL, click "Extract MP3" to download the audio track as an MP3 file. Perfect for music, voiceovers, and sound effects.' },
  { q: 'How do I download TikTok photos?', a: 'Paste the URL of a TikTok photo carousel into savefrominternet.com. We detect images automatically. You can select individual photos or download all as a ZIP file.' },
  { q: 'Is my privacy protected?', a: 'Yes. We do not store your downloaded files, track your activity, or require any account. Everything is processed in real time and discarded immediately.' },
  { q: 'Can I download private TikTok videos?', a: 'No. The tool only works with publicly available TikTok videos. Private or followers-only content cannot be accessed by third-party tools.' },
  { q: 'Why download without watermark?', a: "TikTok's built-in save feature burns a watermark into the video. SaveFromInternet.com fetches the original video file before the watermark is applied, giving you a clean version." },
  { q: 'Is it legal to download TikTok videos?', a: 'Downloading for personal use (offline viewing, private archiving) is generally accepted. Redistribution or monetization of downloaded content without permission may violate copyright law.' },
]

/* ── Page ──────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="bg-white">

      {/* Interactive Downloader */}
      <DownloaderTool />

      {/* ── How It Works ── */}
      <section className="bg-slate-50 py-16 px-4 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-rose-500 mb-3">Simple 3-Step Process</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12">How to Download TikTok Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: '📋', title: 'Copy TikTok URL', desc: 'Open TikTok, tap the Share button on any video, then tap "Copy Link" to copy the URL.' },
              { n: '02', icon: '⚙️', title: 'Paste & Process', desc: 'Paste the URL on savefrominternet.com, hit the Download button, and wait a few seconds.' },
              { n: '03', icon: '⬇️', title: 'Save to Device', desc: 'Download the HD video without watermark, extract MP3 audio, or save photo galleries.' },
            ].map(({ n, icon, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{icon}</span>
                  <span className="text-5xl font-black text-slate-100 leading-none select-none">{n}</span>
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-violet-500 mb-3">Why Users Choose Us</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12">Everything You Need to Save TikTok Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all group">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-slate-900 font-bold mb-1.5 group-hover:text-rose-600 transition-colors">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Download Types ── */}
      <section className="bg-slate-50 py-16 px-4 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">Multiple Format Support</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12">What Can You Download?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🎬</div>
              <h3 className="text-slate-900 font-bold text-xl mb-2">TikTok Video</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Download in HD without watermark as MP4. Plays on any device or video player.</p>
              <Link href="/tiktok-downloader-without-watermark" className="text-rose-500 text-sm font-semibold hover:underline">Download without watermark →</Link>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🎵</div>
              <h3 className="text-slate-900 font-bold text-xl mb-2">TikTok Audio (MP3)</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Extract music, sounds, and voiceovers as high-quality MP3. Great for ringtones and edits.</p>
              <Link href="/tiktok-to-mp3" className="text-emerald-600 text-sm font-semibold hover:underline">TikTok to MP3 →</Link>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🖼️</div>
              <h3 className="text-slate-900 font-bold text-xl mb-2">TikTok Photos</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Save images from TikTok photo carousels. Download individually or as a ZIP archive.</p>
              <Link href="/tiktok-photo-downloader" className="text-violet-600 text-sm font-semibold hover:underline">Photo downloader →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Device Links ── */}
      <section className="bg-white py-14 px-4 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-8">Works on Every Device</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '🍎', label: 'iPhone & iPad', href: '/tiktok-video-downloader-iphone' },
              { icon: '🤖', label: 'Android', href: '/tiktok-video-downloader-android' },
              { icon: '🖥️', label: 'Windows / Mac', href: '/tiktok-video-downloader-pc' },
              { icon: '🌐', label: 'Any Browser', href: '/tiktok-video-downloader' },
            ].map(({ icon, label, href }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-2 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 rounded-2xl py-5 px-3 transition-all group">
                <span className="text-3xl">{icon}</span>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-rose-600 text-center transition-colors">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="bg-slate-50 py-14 px-4 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">About SaveFromInternet.com</h2>
          <p className="text-slate-500 leading-relaxed text-base">
            SaveFromInternet.com is a free, browser-based TikTok video downloader. No installs, no accounts, no watermarks.
            Just paste a link and download your content instantly. We support videos, audio, and image galleries from any
            public TikTok. Built for privacy — your downloads are never stored on our servers.
          </p>
          <p className="text-slate-400 text-sm mt-3">Contact: contact@savefrominternet.com</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-16 px-4 border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-rose-500 mb-3">Got Questions?</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="text-slate-900 font-bold mb-2">{q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Tools ── */}
      <section className="bg-slate-50 py-12 px-4 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-6">More TikTok Downloader Tools</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'TikTok to MP3', href: '/tiktok-to-mp3' },
              { label: 'Photo Downloader', href: '/tiktok-photo-downloader' },
              { label: 'iPhone Guide', href: '/tiktok-video-downloader-iphone' },
              { label: 'Android Guide', href: '/tiktok-video-downloader-android' },
              { label: 'PC / Mac Guide', href: '/tiktok-video-downloader-pc' },
              { label: 'No Watermark', href: '/tiktok-downloader-without-watermark' },
              { label: 'Save TikTok Video', href: '/save-tiktok-video' },
              { label: 'How to Download', href: '/how-to-download-tiktok-videos' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Blog', href: '/blog' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="px-4 py-2 bg-white text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-full text-sm font-medium transition-all hover:shadow-sm">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
