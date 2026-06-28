import { Suspense } from 'react'
import Link from 'next/link'
import DownloaderTool from '@/components/DownloaderTool'
import {
  CheckIcon,
  FilmIcon,
  MusicIcon,
  PhotoIcon,
  ShieldCheckIcon,
  BoltIcon,
  LockIcon,
  DevicePhoneIcon,
  MonitorIcon,
  GlobeIcon,
} from '@/components/icons'

type FeatureIconComponent = React.ComponentType<{ className?: string }>

const features: { Icon: FeatureIconComponent; title: string; desc: string }[] = [
  { Icon: ShieldCheckIcon, title: 'No Watermark',    desc: 'Get the original clean video — no TikTok logo, no username overlay.' },
  { Icon: FilmIcon,        title: 'HD Quality',      desc: 'Download at the original resolution — 720p, 1080p, or higher.' },
  { Icon: MusicIcon,       title: 'MP3 Extraction',  desc: 'Pull the audio track from any TikTok video as a high-quality MP3.' },
  { Icon: PhotoIcon,       title: 'Image Galleries', desc: 'Save TikTok photo carousels — individual files or a single ZIP.' },
  { Icon: BoltIcon,        title: 'Instant & Fast',  desc: 'No waiting, no queues. Processing takes just a few seconds.' },
  { Icon: LockIcon,        title: 'Private & Secure',desc: 'We never store your videos. Downloads are processed in real time.' },
  { Icon: DevicePhoneIcon, title: 'All Devices',     desc: 'Works on iPhone, Android, Windows PC, Mac — any browser.' },
  { Icon: CheckIcon,       title: 'Unlimited',       desc: 'No daily caps. Download as many TikTok videos as you need.' },
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

const steps = [
  { n: '01', title: 'Copy TikTok URL',  desc: 'Open TikTok, tap the Share button on any video, then tap "Copy Link".' },
  { n: '02', title: 'Paste & Process', desc: 'Paste the URL on savefrominternet.com, hit Download, and wait a few seconds.' },
  { n: '03', title: 'Save to Device',  desc: 'Download the HD video without watermark, extract MP3, or save photos.' },
]

const downloadTypes = [
  { Icon: FilmIcon,  title: 'TikTok Video',       desc: 'Download in HD without watermark as MP4. Plays on any device or video player.',                    link: '/tiktok-downloader-without-watermark', linkLabel: 'Download without watermark' },
  { Icon: MusicIcon, title: 'TikTok Audio (MP3)', desc: 'Extract music, sounds, and voiceovers as high-quality MP3. Great for ringtones and edits.',        link: '/tiktok-to-mp3',                       linkLabel: 'TikTok to MP3' },
  { Icon: PhotoIcon, title: 'TikTok Photos',      desc: 'Save images from TikTok photo carousels. Download individually or as a ZIP archive.',              link: '/tiktok-photo-downloader',             linkLabel: 'Photo downloader' },
]

const devices: { Icon: FeatureIconComponent; label: string; href: string }[] = [
  { Icon: DevicePhoneIcon, label: 'iPhone & iPad', href: '/tiktok-video-downloader-iphone' },
  { Icon: DevicePhoneIcon, label: 'Android',       href: '/tiktok-video-downloader-android' },
  { Icon: MonitorIcon,     label: 'Windows / Mac', href: '/tiktok-video-downloader-pc' },
  { Icon: GlobeIcon,       label: 'Any Browser',   href: '/tiktok-video-downloader' },
]

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SaveFromInternet',
  url: 'https://www.savefrominternet.com',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SaveFromInternet',
  url: 'https://www.savefrominternet.com',
  logo: 'https://www.savefrominternet.com/og-final.jpg',
  description: 'Free TikTok video downloader. Download TikTok videos without watermark, extract MP3 audio, and save image galleries. No app required.',
  contactPoint: { '@type': 'ContactPoint', email: 'contact@savefrominternet.com', contactType: 'customer support' },
}

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
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function HomeContent() {
  return (
    <div className="bg-white dark:bg-slate-900">
      <Suspense fallback={null}>
        <DownloaderTool />
      </Suspense>

      {/* How It Works */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-16 px-4 border-t border-slate-100 dark:border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">3 Steps</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">How to Download TikTok Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <span className="text-5xl font-black text-indigo-100 dark:text-slate-700 leading-none select-none">{n}</span>
                </div>
                <h3 className="text-slate-900 dark:text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-slate-900 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">Everything You Need to Save TikTok Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all group">
                <div className="w-8 h-8 rounded-md bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-indigo-500" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-semibold mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Types */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-16 px-4 border-t border-slate-100 dark:border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">Supported Formats</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">What Can You Download?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {downloadTypes.map(({ Icon, title, desc, link, linkLabel }) => (
              <div key={title} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-100 dark:border-slate-700 shadow-sm text-center">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-semibold text-xl mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
                <Link href={link} className="text-indigo-500 text-sm font-semibold hover:underline">{linkLabel} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Devices */}
      <section className="bg-white dark:bg-slate-900 py-14 px-4 border-t border-slate-100 dark:border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">Works on Every Device</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {devices.map(({ Icon, label, href }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 rounded-lg py-5 px-3 transition-all group">
                <Icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-center transition-colors">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-14 px-4 border-t border-slate-100 dark:border-slate-700/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-5">Built by a developer, kept simple on purpose</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mb-4">
            I built SaveFromInternet because every TikTok downloader I tried either broke after a week,
            buried you in pop-ups, or quietly re-encoded your video at lower quality. This one fetches the
            original file directly from TikTok&apos;s CDN — the same file your phone streams — before their
            watermark pipeline touches it. You get the actual original, not a compressed copy.
          </p>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base mb-6">
            No account required. No app to install. Your files are never stored on our servers — downloads
            are processed and delivered in real time, then discarded. If something breaks or you have a
            question, email me directly.
          </p>
          <a
            href="mailto:contact@savefrominternet.com"
            className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium text-sm transition-colors"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            contact@savefrominternet.com
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 py-16 px-4 border-t border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700">
                <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{q}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="bg-slate-50 dark:bg-slate-800/50 py-12 px-4 border-t border-slate-100 dark:border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white text-center mb-6">More TikTok Downloader Tools</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'TikTok to MP3',    href: '/tiktok-to-mp3' },
              { label: 'Photo Downloader', href: '/tiktok-photo-downloader' },
              { label: 'iPhone Guide',     href: '/tiktok-video-downloader-iphone' },
              { label: 'Android Guide',    href: '/tiktok-video-downloader-android' },
              { label: 'PC / Mac Guide',   href: '/tiktok-video-downloader-pc' },
              { label: 'No Watermark',     href: '/tiktok-downloader-without-watermark' },
              { label: 'Save TikTok Video',href: '/save-tiktok-video' },
              { label: 'How to Download',  href: '/how-to-download-tiktok-videos' },
              { label: 'FAQ',              href: '/faq' },
              { label: 'Blog',             href: '/blog' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 rounded-full text-sm font-medium transition-all hover:shadow-sm">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
