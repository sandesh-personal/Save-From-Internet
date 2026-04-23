import Link from 'next/link'
import type { Metadata } from 'next'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'TikTok Downloader FAQ 2026 — Common Questions Answered | Save From Internet',
  description:
    'Answers to the most common questions about downloading TikTok videos without watermark, extracting MP3 audio, and using SaveFromInternet on iPhone, Android, and PC.',
  keywords: [
    'tiktok downloader faq',
    'download tiktok without watermark',
    'tiktok mp3 questions',
    'tiktok downloader help 2026',
  ],
  openGraph: {
    title: 'TikTok Downloader FAQ 2026 — Common Questions Answered',
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
    {
      '@type': 'Question',
      name: 'How do I download TikTok videos without a watermark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste the TikTok URL into savefrominternet.com, click Download TikTok Video, then click Download Video. The file has no watermark.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is SaveFromInternet free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Completely free — no registration, no hidden fees, and no download limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I extract audio from TikTok videos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. After processing a TikTok URL, click 'Extract Audio' to download an MP3 file.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does the TikTok downloader work on mobile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Open savefrominternet.com in Safari (iPhone) or Chrome (Android), paste the TikTok URL, and download.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download private TikTok videos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Only public TikTok videos can be downloaded. Private videos require authentication.',
      },
    },
  ],
}

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: 'How do I download TikTok videos without a watermark?',
    answer:
      'Paste the TikTok URL into savefrominternet.com, click Download TikTok Video, then click the Download Video button. The MP4 file saved to your device has no watermark — the original file is fetched directly before any branding is applied.',
  },
  {
    question: 'Is SaveFromInternet free to use?',
    answer:
      'Yes. Completely free — no registration, no hidden fees, and no download limits. You can download unlimited TikTok videos, audio, and images at no cost.',
  },
  {
    question: 'Can I extract audio from TikTok videos?',
    answer:
      "Yes. After processing a TikTok URL, click 'Extract Audio' to download the audio as a high-quality MP3 file. Perfect for ringtones, music, or offline listening.",
  },
  {
    question: 'Does the TikTok downloader work on iPhone?',
    answer:
      'Yes. Open Safari on your iPhone, go to savefrominternet.com, paste the TikTok URL, and tap Download TikTok Video. When the video opens in Safari, tap and hold to save it to your Camera Roll. MP3 files go to Files → Downloads.',
  },
  {
    question: 'Does the TikTok downloader work on Android?',
    answer:
      'Yes. Open Chrome on your Android device, go to savefrominternet.com, paste the TikTok URL, and tap Download. The video or audio saves directly to your Downloads folder.',
  },
  {
    question: 'Can I download private TikTok videos?',
    answer:
      "No. SaveFromInternet only works with public TikTok videos. Private videos require authentication that third-party tools don't have access to.",
  },
  {
    question: 'What video quality can I download?',
    answer:
      'We download TikTok videos in their original HD quality — typically 720p or 1080p, depending on what the creator uploaded. No additional compression is applied.',
  },
  {
    question: 'How do I download TikTok photos and image carousels?',
    answer: (
      <>
        Paste the TikTok photo post URL on savefrominternet.com and click Download. Tap &quot;Show Images&quot; to see the gallery, then download individual images or all of them as a ZIP archive. See the{' '}
        <Link href="/tiktok-photo-downloader" className="text-rose-500 hover:underline font-medium">
          TikTok photo downloader
        </Link>{' '}
        guide for details.
      </>
    ),
  },
  {
    question: 'Is it legal to download TikTok videos?',
    answer: (
      <>
        Downloading TikTok videos for personal use is generally permitted, but re-uploading or using them commercially without the creator&apos;s permission may violate copyright law. See our{' '}
        <Link href="/blog/is-downloading-tiktok-videos-legal-2025-guide" className="text-rose-500 hover:underline font-medium">
          legal guide
        </Link>{' '}
        for full details.
      </>
    ),
  },
  {
    question: "Why can't I download some TikTok videos?",
    answer: (
      <>
        Some videos may be private, region-restricted, or temporarily unavailable. Make sure the TikTok URL is correct and the video is set to public. Learn more in our{' '}
        <Link href="/blog/how-to-download-private-tiktok-videos-legal-methods" className="text-rose-500 hover:underline font-medium">
          private video guide
        </Link>.
      </>
    ),
  },
  {
    question: 'Is it safe to use SaveFromInternet?',
    answer: (
      <>
        Yes. SaveFromInternet does not collect personal information, install anything, or require any permissions beyond your browser. We are AdSense-approved, meaning Google has verified the site is safe and legitimate. Always avoid sites that ask you to install extensions or apps.
      </>
    ),
  },
  {
    question: 'Do I need to install any software or app?',
    answer:
      'No. SaveFromInternet works entirely in your browser. No app, no extension, no account — just paste the TikTok URL and download.',
  },
  {
    question: 'What if the download fails?',
    answer:
      "Check that the TikTok video is public and the URL is correct. Try refreshing the page or using a different browser. Our tool is regularly updated for TikTok's latest changes and works with most public videos.",
  },
  {
    question: 'What file formats are supported?',
    answer:
      'Video is downloaded as MP4, which plays on all devices and media players. Audio is extracted as MP3. TikTok photos are downloaded as JPEG/WEBP individually or as a ZIP archive.',
  },
  {
    question: 'Is my privacy protected?',
    answer:
      "Yes. We don't collect personal data, track your activity, or store downloaded content. All processing is done in real-time and nothing is saved on our servers. Your downloads are completely private.",
  },
]

export default function FAQPage() {
  return (
    <div className="bg-white">

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-14 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-rose-100 shadow-sm">
            ❓ Help & Support
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            TikTok Downloader{' '}
            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
              FAQ
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Answers to common questions about downloading TikTok videos, audio, and photos with SaveFromInternet.
          </p>
        </div>
      </section>

      {/* Top Ad */}
      <div className="flex justify-center py-6 px-4 border-b border-slate-100">
        <GoogleAdSense
          adSlot="5309301802"
          adFormat="auto"
          className="flex justify-center"
          containerStyle="default"
        />
      </div>

      {/* FAQ list */}
      <section className="bg-white py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="text-slate-900 font-bold text-base mb-2">{faq.question}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
              </div>

              {/* Ad after every 4th FAQ */}
              {(index + 1) % 4 === 0 && (
                <div className="my-6">
                  <GoogleAdSense
                    adSlot="3804648444"
                    adFormat="auto"
                    className="flex justify-center"
                    containerStyle="default"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="flex justify-center py-8 px-4 border-t border-slate-100">
        <GoogleAdSense
          adSlot="2491566773"
          adFormat="auto"
          className="flex justify-center"
          containerStyle="default"
        />
      </div>

      {/* CTA */}
      <section className="bg-gradient-to-r from-rose-500 to-violet-600 py-14 px-4 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Ready to Download TikTok Videos?
        </h2>
        <p className="text-rose-100 mb-8 text-lg">
          Free · No watermark · No app · iPhone, Android & PC
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-all"
        >
          ⬇ Try TikTok Downloader
        </Link>
      </section>
    </div>
  )
}
