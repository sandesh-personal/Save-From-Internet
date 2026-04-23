import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TikTok Photo Downloader - Save TikTok Images & Carousels 2026 | Save From Internet',
  description:
    'Download TikTok photos and image carousels in original quality. Save individual images or download all as a ZIP. Free, no app, no sign-up required.',
  keywords: [
    'tiktok photo downloader',
    'download tiktok images',
    'tiktok carousel downloader',
    'save tiktok photos 2026',
  ],
  alternates: { canonical: 'https://www.savefrominternet.com/tiktok-photo-downloader' },
  openGraph: {
    title: 'TikTok Photo Downloader - Save TikTok Images & Carousels 2026',
    description: 'Save TikTok images and carousels in original quality. Free, fast, no app.',
    url: 'https://www.savefrominternet.com/tiktok-photo-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I download TikTok photos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copy the TikTok photo post URL, paste it on savefrominternet.com, and click Download TikTok Video. The images will be detected automatically. You can then download them individually or all at once as a ZIP file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download TikTok image carousels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SaveFromInternet.com detects all images in a TikTok carousel post. You can select specific images or download the entire carousel as a ZIP archive.',
      },
    },
    {
      '@type': 'Question',
      name: 'What quality are the downloaded TikTok images?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We download TikTok images in their original quality with no compression added.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the TikTok photo downloader free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Completely free — no account, no app, no limits.',
      },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download TikTok Photos and Image Carousels',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok photo post URL', text: 'Open TikTok and find a photo or carousel post. Tap Share → Copy Link.' },
    { '@type': 'HowToStep', position: 2, name: 'Paste on SaveFromInternet.com', text: 'Go to savefrominternet.com, paste the URL, and click Download TikTok Video.' },
    { '@type': 'HowToStep', position: 3, name: 'Select and download images', text: 'Tap "Show Images" to see the gallery. Select individual photos or tap All, then download individually or as a ZIP.' },
  ],
}

export default function TikTokPhotoDownloaderPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-violet-50/60 to-white py-14 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-violet-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-violet-100 shadow-sm">
            🖼️ Photo &amp; Carousel Downloader · Free
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            TikTok{' '}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              Photo Downloader
            </span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
            Download TikTok photos and image carousels in original quality. Save individual images or download all as a ZIP. Free, no app needed.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-rose-500/25 transition-all"
          >
            ⬇ Download TikTok Photos
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            How to Download TikTok Photos
          </h2>
          <div className="space-y-4">
            {[
              {
                n: '1',
                title: 'Copy the TikTok Photo Post URL',
                desc: 'Open TikTok and find a photo post or image carousel. Tap the Share button, then tap Copy Link to copy the URL.',
              },
              {
                n: '2',
                title: 'Paste on SaveFromInternet.com',
                desc: 'Go to savefrominternet.com, paste the URL into the input box, and click "Download TikTok Video". Our tool will detect the images automatically.',
              },
              {
                n: '3',
                title: 'Show the Image Gallery',
                desc: 'Tap "Show Images" to see all photos in the post. You can tap individual images to select or deselect them.',
              },
              {
                n: '4',
                title: 'Download Images',
                desc: 'Tap "All" to select every image, then click Download. Choose to save them individually or as a single ZIP archive.',
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0">
                  {n}
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">✨ Key Features</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                'Download all images from TikTok carousels',
                'Save photos in original quality — no compression',
                'Select individual images or download all',
                'ZIP download option for multiple images',
                'Works on iPhone, Android, PC, and Mac',
                'No app, no sign-up, completely free',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-5">📦 Download Options</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border border-slate-100">
                <h4 className="text-slate-900 font-semibold mb-1">📸 Individual Images</h4>
                <p className="text-slate-500 text-sm">Select specific photos from the carousel and download them one by one.</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-100">
                <h4 className="text-slate-900 font-semibold mb-1">🗜️ ZIP Archive</h4>
                <p className="text-slate-500 text-sm">Select all images and download everything as a single ZIP file — perfect for carousels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Also supports */}
      <section className="bg-slate-50 py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            Also Download TikTok Videos &amp; Audio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎬',
                title: 'TikTok Video',
                desc: 'Download TikTok videos in HD without watermark as MP4.',
                href: '/tiktok-video-downloader',
                linkText: 'Download videos →',
              },
              {
                icon: '🎵',
                title: 'TikTok to MP3',
                desc: 'Extract audio from any TikTok video as a high-quality MP3.',
                href: '/tiktok-to-mp3',
                linkText: 'Extract audio →',
              },
              {
                icon: '🖼️',
                title: 'TikTok Photos',
                desc: 'You are here — save TikTok image carousels instantly.',
                href: '/tiktok-photo-downloader',
                linkText: 'Current page',
              },
            ].map(({ icon, title, desc, href, linkText }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{desc}</p>
                <Link href={href} className="text-rose-500 text-sm font-semibold hover:underline">
                  {linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I download TikTok photos?',
                a: 'Copy the TikTok photo post URL, paste it on savefrominternet.com, and click Download. Tap "Show Images" to view the gallery, select the photos you want, and download.',
              },
              {
                q: 'Can I download TikTok image carousels?',
                a: 'Yes. All images in a TikTok carousel are detected automatically. You can download them individually or as a ZIP archive.',
              },
              {
                q: 'What quality are the downloaded images?',
                a: 'Original quality — we do not compress or resize the images.',
              },
              {
                q: 'Does it work on iPhone and Android?',
                a: 'Yes. Open the site in Safari (iPhone) or Chrome (Android), paste the TikTok URL, and download the images.',
              },
              {
                q: 'Is the TikTok photo downloader free?',
                a: 'Yes, completely free. No account, no app, no download limits.',
              },
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
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Download TikTok Photos Now — Free
        </h2>
        <p className="text-rose-100 mb-8 text-lg">
          Original quality · No compression · No sign-up
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-all"
        >
          ⬇ Download TikTok Photos
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  )
}
