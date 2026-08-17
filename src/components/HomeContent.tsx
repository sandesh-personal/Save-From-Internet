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
  { Icon: ShieldCheckIcon, title: 'No Watermark',       desc: 'Fetches the original CDN file — the one TikTok streams to your phone, before their watermark pipeline runs. The logo is never added.' },
  { Icon: FilmIcon,        title: 'Original Quality',   desc: 'Downloads at whatever resolution TikTok stored the video — typically 720p or 1080p. No re-encoding, no quality loss.' },
  { Icon: MusicIcon,       title: 'MP3 Audio',          desc: 'Pulls just the audio track as an MP3. Useful for ringtones, background music, voiceovers, or sound clips.' },
  { Icon: PhotoIcon,       title: 'Photo Carousels',    desc: 'Handles TikTok\'s photo carousel format, which most downloaders ignore. Download images one at a time or all as a ZIP.' },
  { Icon: BoltIcon,        title: 'Done in 3–5 Seconds',desc: 'Most TikTok links resolve and start downloading in under 5 seconds. No queue, no spinner spinning forever.' },
  { Icon: LockIcon,        title: 'Nothing Stored',     desc: 'Your URL is sent, the file is fetched and returned, done. We don\'t log requests or keep copies of your videos.' },
  { Icon: DevicePhoneIcon, title: 'Every Device',       desc: 'Works in Safari, Chrome, Firefox, and Edge — on iPhone, Android, Mac, and PC. No extension, no app.' },
  { Icon: CheckIcon,       title: 'No Account, No Cap', desc: 'No daily limit, no account, no rate throttle. Paste and download as often as you need to.' },
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
  { n: 1, title: 'Copy the TikTok link',  desc: 'Open TikTok, tap Share on any video or carousel, then tap "Copy Link". The URL goes to your clipboard.' },
  { n: 2, title: 'Paste it here',         desc: 'Paste the URL into the box above and click Download. The original file is fetched from TikTok\'s servers in 3–5 seconds.' },
  { n: 3, title: 'Save to your device',   desc: 'Click Download Video, Extract MP3, or download your images as a ZIP. Clean file, no watermark, original quality.' },
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
    <div className="bg-white">
      <Suspense fallback={null}>
        <DownloaderTool />
      </Suspense>

      {/* ── Section 1: Intro About Card (SnapTik Style) ── */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-sm p-6 sm:p-10">
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-600 mb-4 sm:mb-5 shadow-sm">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Download TikTok Videos Without Watermark FREE
                </span>
              </h2>

              <div className="mx-auto mt-4 sm:mt-5 w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />

              <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                <strong>SaveFromInternet.com</strong> is one of the best online HD TikTok Downloaders. We help you download TikTok videos without any watermark in original MP4 format and Full HD quality. You are not required to install any software or extensions — simply paste the TikTok link and save your video instantly.
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                SaveFromInternet also allows you to extract crystal-clear MP3 audio and download TikTok photo slideshows with one tap. Fast, unlimited, and 100% free forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: How It Works (Numbered Stepper) ── */}
      <section id="how-to" className="bg-slate-50 py-12 sm:py-16 lg:py-20 border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              How to Download TikTok Videos Without Watermarks
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Save any TikTok video to your iPhone, Android, or PC in 3 simple steps
            </p>
          </div>

          <ol className="flex flex-col sm:flex-row sm:justify-center gap-8 sm:gap-6 lg:gap-8 list-none p-0 m-0">
            {/* Step 1 */}
            <li className="relative flex flex-row sm:flex-col items-center sm:text-center gap-4 sm:gap-0 sm:flex-1">
              <div className="absolute left-[60%] top-10 hidden h-0.5 w-full bg-gradient-to-r from-blue-600 to-cyan-500 sm:block pointer-events-none" />
              <div className="relative flex-shrink-0 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center sm:mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 opacity-10" />
                <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white shadow-lg border border-slate-100">
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-sm">
                    1
                  </span>
                  <svg className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 sm:flex-none text-left sm:text-center">
                <h3 className="mb-1 text-base sm:text-lg font-bold text-slate-900">
                  Copy Video Link
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Open TikTok app, find your video, tap <strong>Share</strong> and tap <strong>Copy Link</strong>.
                </p>
              </div>
            </li>

            {/* Step 2 */}
            <li className="relative flex flex-row sm:flex-col items-center sm:text-center gap-4 sm:gap-0 sm:flex-1">
              <div className="absolute left-[60%] top-10 hidden h-0.5 w-full bg-gradient-to-r from-blue-600 to-cyan-500 sm:block pointer-events-none" />
              <div className="relative flex-shrink-0 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center sm:mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 opacity-10" />
                <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white shadow-lg border border-slate-100">
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-sm">
                    2
                  </span>
                  <svg className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 sm:flex-none text-left sm:text-center">
                <h3 className="mb-1 text-base sm:text-lg font-bold text-slate-900">
                  Paste Link
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Paste the copied TikTok URL into the search box above.
                </p>
              </div>
            </li>

            {/* Step 3 */}
            <li className="relative flex flex-row sm:flex-col items-center sm:text-center gap-4 sm:gap-0 sm:flex-1">
              <div className="relative flex-shrink-0 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center sm:mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 opacity-10" />
                <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white shadow-lg border border-slate-100">
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-sm">
                    3
                  </span>
                  <svg className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 sm:flex-none text-left sm:text-center">
                <h3 className="mb-1 text-base sm:text-lg font-bold text-slate-900">
                  Download
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Click Download and choose HD MP4 Video, MP3 Audio, or Photo ZIP.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ── Section 3: Features Grid (SnapTik Style 6 Cards) ── */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              TikTok Download Features
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              The fastest and most reliable way to save TikTok media
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50/30">
              <div className="mb-3.5 inline-flex rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3 text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-1.5 text-base sm:text-lg font-bold text-slate-900">
                No Watermarks
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Removes all watermarks and creator username overlays for clean, crystal-clear playback.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50/30">
              <div className="mb-3.5 inline-flex rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3 text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-1.5 text-base sm:text-lg font-bold text-slate-900">
                All Devices Supported
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Seamlessly works on iPhone, iPad, Android phones, tablets, Windows PC, and Mac Safari.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50/30">
              <div className="mb-3.5 inline-flex rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3 text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="mb-1.5 text-base sm:text-lg font-bold text-slate-900">
                Browser Only (No App)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Runs 100% in your browser. No suspicious third-party apps, plugins, or software installations needed.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50/30">
              <div className="mb-3.5 inline-flex rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3 text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-1.5 text-base sm:text-lg font-bold text-slate-900">
                Always Free & Unlimited
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                No subscription, no registration, and no daily download quotas. Download as much as you like.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50/30">
              <div className="mb-3.5 inline-flex rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3 text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-1.5 text-base sm:text-lg font-bold text-slate-900">
                Photo Carousels & ZIP
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Easily download every image from TikTok photo slideshows individually or packed as a convenient ZIP file.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50/30">
              <div className="mb-3.5 inline-flex rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3 text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-1.5 text-base sm:text-lg font-bold text-slate-900">
                Full HD Original Quality
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Fetches original video bitrates up to 1080p without server-side compression or quality degradation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Interactive FAQ Accordions (SnapTik Style) ── */}
      <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Everything you need to know about SaveFromInternet
            </p>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200"
              >
                <summary className="flex w-full cursor-pointer items-center justify-between px-5 sm:px-6 py-4 text-left transition hover:bg-slate-50 min-h-[48px] list-none [&::-webkit-details-marker]:hidden select-none">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 pr-4 leading-snug">
                    {q}
                  </h3>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-slate-100 px-5 sm:px-6 py-4 text-sm text-slate-600 leading-relaxed">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Related Tools & Explore Links ── */}
      <section className="bg-white py-12 px-4 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 text-center mb-6">
            Popular TikTok Downloader Tools & Guides
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              { label: 'TikTok to MP3', href: '/tiktok-to-mp3' },
              { label: 'Photo Downloader', href: '/tiktok-photo-downloader' },
              { label: 'No Watermark Download', href: '/tiktok-downloader-without-watermark' },
              { label: 'Save TikTok Video', href: '/save-tiktok-video' },
              { label: 'iPhone Guide', href: '/tiktok-video-downloader-iphone' },
              { label: 'Android Guide', href: '/tiktok-video-downloader-android' },
              { label: 'PC & Mac Guide', href: '/tiktok-video-downloader-pc' },
              { label: 'How to Download', href: '/how-to-download-tiktok-videos' },
              { label: 'Blog', href: '/blog' },
              { label: 'FAQ', href: '/faq' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 rounded-full text-xs sm:text-sm font-medium transition-all hover:shadow-sm"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
