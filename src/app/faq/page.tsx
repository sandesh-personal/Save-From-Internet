import Link from 'next/link'
import type { Metadata } from 'next'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'TikTok Downloader FAQ 2026 - Common Questions Answered | Save From Internet',
  description:
    'Answers to the most common questions about downloading TikTok videos without watermark, extracting MP3 audio, and using SaveFromInternet on iPhone, Android, and PC.',
  keywords: [
    'tiktok downloader faq',
    'download tiktok without watermark',
    'tiktok mp3 questions',
    'tiktok downloader help 2026',
  ],
  openGraph: {
    title: 'TikTok Downloader FAQ 2026 - Common Questions Answered',
    description:
      'Answers to common questions about downloading TikTok videos, audio, and images with SaveFromInternet.',
    type: 'website',
    url: 'https://www.savefrominternet.com/faq',
    images: ['/og-final.jpg'],
  },
  alternates: {
    canonical: 'https://www.savefrominternet.com/faq',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I download TikTok videos without a watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Paste the TikTok URL into savefrominternet.com, click Download TikTok Video, then click the Download Video button. The MP4 file saved to your device has no watermark.' } },
    { '@type': 'Question', name: 'Is SaveFromInternet free to use?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completely free - no registration, no hidden fees, and no download limits. You can download unlimited TikTok videos, audio, and images at no cost.' } },
    { '@type': 'Question', name: 'Can I extract audio from TikTok videos?', acceptedAnswer: { '@type': 'Answer', text: "Yes. After processing a TikTok URL, click 'Extract Audio' to download the audio as a high-quality MP3 file." } },
    { '@type': 'Question', name: 'Does the TikTok downloader work on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Open Safari on your iPhone, go to savefrominternet.com, paste the TikTok URL, and tap Download TikTok Video. When the video opens in Safari, tap and hold to save it to your Camera Roll.' } },
    { '@type': 'Question', name: 'Does the TikTok downloader work on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Open Chrome on your Android device, go to savefrominternet.com, paste the TikTok URL, and tap Download. The video or audio saves directly to your Downloads folder.' } },
    { '@type': 'Question', name: 'Can I download private TikTok videos?', acceptedAnswer: { '@type': 'Answer', text: "No. SaveFromInternet only works with public TikTok videos. Private videos require authentication that third-party tools don't have access to." } },
    { '@type': 'Question', name: 'What video quality can I download?', acceptedAnswer: { '@type': 'Answer', text: 'We download TikTok videos in their original HD quality - typically 720p or 1080p, depending on what the creator uploaded. No additional compression is applied.' } },
    { '@type': 'Question', name: 'How do I download TikTok photos and image carousels?', acceptedAnswer: { '@type': 'Answer', text: "Paste the TikTok photo post URL on savefrominternet.com and click Download. Tap 'Show Images' to see the gallery, then download individual images or all of them as a ZIP archive." } },
    { '@type': 'Question', name: 'Is it legal to download TikTok videos?', acceptedAnswer: { '@type': 'Answer', text: "Downloading TikTok videos for personal use is generally permitted, but re-uploading or using them commercially without the creator's permission may violate copyright law." } },
    { '@type': 'Question', name: "Why can't I download some TikTok videos?", acceptedAnswer: { '@type': 'Answer', text: 'Some videos may be private, region-restricted, or temporarily unavailable. Make sure the TikTok URL is correct and the video is set to public.' } },
    { '@type': 'Question', name: 'Is it safe to use SaveFromInternet?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. SaveFromInternet does not collect personal information, install anything, or require any permissions beyond your browser. We are AdSense-approved, meaning Google has verified the site is safe and legitimate.' } },
    { '@type': 'Question', name: 'Do I need to install any software or app?', acceptedAnswer: { '@type': 'Answer', text: 'No. SaveFromInternet works entirely in your browser. No app, no extension, no account - just paste the TikTok URL and download.' } },
    { '@type': 'Question', name: 'What if the download fails?', acceptedAnswer: { '@type': 'Answer', text: "Check that the TikTok video is public and the URL is correct. Try refreshing the page or using a different browser. Our tool is regularly updated for TikTok's latest changes." } },
    { '@type': 'Question', name: 'What file formats are supported?', acceptedAnswer: { '@type': 'Answer', text: 'Video is downloaded as MP4, which plays on all devices. Audio is extracted as MP3. TikTok photos are downloaded as JPEG/WEBP individually or as a ZIP archive.' } },
    { '@type': 'Question', name: 'Is my privacy protected?', acceptedAnswer: { '@type': 'Answer', text: "Yes. We don't collect personal data, track your activity, or store downloaded content. All processing is done in real-time and nothing is saved on our servers." } },
  ],
}

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: 'How do I download TikTok videos without a watermark?',
    answer:
      'Paste the TikTok URL into savefrominternet.com, click Download, then select your desired HD MP4 resolution. The MP4 file saved to your device has no watermark — the original stream is fetched directly before any watermark overlay is applied.',
  },
  {
    question: 'Is SaveFromInternet free to use?',
    answer:
      'Yes. Completely free — no registration, no hidden fees, and no daily download quotas. You can download unlimited TikTok videos, audio tracks, and photo slideshows at no cost.',
  },
  {
    question: 'Can I extract audio from TikTok videos?',
    answer: (
      <>
        Yes. After pasting a TikTok link, you can click &quot;Extract MP3&quot; to download the audio track in crystal-clear high quality. Perfect for ringtones, background music, or offline listening. You can also use our dedicated{' '}
        <Link href="/tiktok-to-mp3" className="text-black font-bold hover:underline">
          TikTok to MP3 converter
        </Link>.
      </>
    ),
  },
  {
    question: 'Does the TikTok downloader work on iPhone?',
    answer: (
      <>
        Yes. Open Safari on your iPhone, go to savefrominternet.com, paste the TikTok link, and tap Download. When the video opens in Safari, tap the share icon and select &quot;Save Video&quot; to save directly to your Camera Roll. Check out our detailed{' '}
        <Link href="/tiktok-video-downloader-iphone" className="text-black font-bold hover:underline">
          iPhone TikTok download guide
        </Link>.
      </>
    ),
  },
  {
    question: 'Does the TikTok downloader work on Android?',
    answer: (
      <>
        Yes. Open Chrome on your Android phone or tablet, go to savefrominternet.com, paste the TikTok URL, and tap Download. The video or MP3 audio saves automatically to your Downloads folder. See our{' '}
        <Link href="/tiktok-video-downloader-android" className="text-black font-bold hover:underline">
          Android TikTok download tutorial
        </Link>.
      </>
    ),
  },
  {
    question: 'Can I download private TikTok videos?',
    answer:
      "No. SaveFromInternet only works with public TikTok videos. Private videos require creator authentication that third-party web tools do not have access to.",
  },
  {
    question: 'What video quality can I download?',
    answer:
      'We download TikTok videos in their original source resolution — typically 720p or 1080p Full HD, depending on what the original creator uploaded. Zero re-compression is applied.',
  },
  {
    question: 'How do I download TikTok photos and image carousels?',
    answer: (
      <>
        Paste the TikTok photo post link on savefrominternet.com and click Download. Tap &quot;Show Images&quot; to preview all photos, then select specific images or download all of them at once in a convenient ZIP archive. See our{' '}
        <Link href="/tiktok-photo-downloader" className="text-black font-bold hover:underline">
          TikTok Photo Downloader
        </Link>{' '}
        for details.
      </>
    ),
  },
  {
    question: 'Is it legal to download TikTok videos?',
    answer: (
      <>
        Downloading public TikTok videos for personal, offline viewing is generally permitted under fair use principles. However, re-uploading, republishing, or commercially monetizing other creators&apos; content without permission may infringe copyright laws.
      </>
    ),
  },
  {
    question: "Why can't I download some TikTok videos?",
    answer:
      'Some videos may be set to private, age-restricted, removed by the creator, or temporarily unavailable. Make sure the TikTok URL is complete and that the video is publicly playable.',
  },
  {
    question: 'Is it safe to use SaveFromInternet?',
    answer:
      'Yes. SaveFromInternet runs 100% in your browser without requiring you to install any suspicious apps, plugins, or software. We do not store downloaded videos or log your personal data.',
  },
  {
    question: 'Do I need to install any software or app?',
    answer:
      'No. SaveFromInternet is a cloud-based web tool that works directly in any modern browser (Safari, Chrome, Firefox, Edge, Brave, Opera) on any desktop or mobile device.',
  },
  {
    question: 'What file formats are supported?',
    answer:
      'Videos are downloaded in universal MP4 format, which is playable on all phones, tablets, and computers. Audio is extracted in MP3 format. Photos are saved in high-res JPG/WEBP format or packed as a ZIP archive.',
  },
]

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="bg-black py-12 sm:py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-slate-200 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-slate-800 shadow-xs">
            💬 Help &amp; Support
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Frequently Asked <span className="text-white underline decoration-slate-600">Questions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about downloading TikTok videos without watermark, extracting MP3 audio, and using SaveFromInternet on any device.
          </p>
        </div>
      </section>

      {/* Top Leaderboard Ad */}
      <div className="flex justify-center py-6 px-4 max-w-5xl mx-auto">
        <GoogleAdSense
          adSlot="5309301802"
          adFormat="auto"
          className="flex justify-center w-full"
          containerStyle="default"
        />
      </div>

      {/* FAQ Accordion List */}
      <section className="py-8 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <details className="group bg-white rounded-2xl border border-slate-200 shadow-xs transition-all duration-200 overflow-hidden">
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer select-none font-bold text-slate-900 text-base sm:text-lg hover:bg-slate-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span className="pr-4 leading-snug">{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                  {faq.answer}
                </div>
              </details>

              {/* In-feed Ad after every 4th FAQ */}
              {(index + 1) % 4 === 0 && (
                <div className="my-6">
                  <GoogleAdSense
                    adSlot="3804648444"
                    adFormat="auto"
                    className="flex justify-center w-full"
                    containerStyle="default"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-black rounded-3xl p-8 sm:p-12 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white">
            Ready to Download Videos &amp; Media?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Paste any link now and download in Full HD MP4 or extract MP3 audio. Free forever, no app required.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-black font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:bg-slate-100 hover:scale-105 transition-all active:scale-95 cursor-pointer"
          >
            Try Downloader Free
          </Link>
        </div>
      </section>
    </div>
  )
}
