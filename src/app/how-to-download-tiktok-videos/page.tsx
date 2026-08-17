import Link from 'next/link';
import Script from 'next/script';
import GoogleAdSense from '@/components/GoogleAdSense';

export const metadata = {
  title: 'How to Download TikTok Videos Without Watermark (2026 Step-by-Step Guide)',
  description: 'Complete step-by-step tutorial to download TikTok videos without watermark in Full HD 1080p MP4 or MP3 audio. Works on iPhone, Android, PC, and Mac.',
  keywords: [
    'tiktok downloader',
    'download tiktok videos',
    'tiktok video downloader',
    'tiktok download without watermark',
    'tiktok mp4 download',
    'how to download tiktok videos',
    'tiktok video download guide',
    'tiktok video downloader 2026',
    'tiktok downloader for pc',
    'tiktok downloader iphone',
    'tiktok downloader android',
    'tiktok to mp3',
    'tiktok video saver',
  ],
  openGraph: {
    title: 'How to Download TikTok Videos Without Watermark (2026 Step-by-Step Guide)',
    description: 'Complete step-by-step tutorial to download TikTok videos without watermark in Full HD 1080p MP4 or MP3 audio. Works on iPhone, Android, PC, and Mac.',
    type: 'article',
    url: 'https://www.savefrominternet.com/how-to-download-tiktok-videos',
  },
  alternates: {
    canonical: 'https://www.savefrominternet.com/how-to-download-tiktok-videos',
  },
};

export default function HowToDownloadPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download TikTok Videos Without Watermark (2026 Guide)",
    "description": "Step-by-step guide to download TikTok videos without watermark in HD or MP4 using SaveFromInternet.com. Works on PC, iPhone, Android.",
    "image": "https://www.savefrominternet.com/og-final.jpg",
    "totalTime": "PT2M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      { "@type": "HowToSupply", "name": "TikTok video URL" },
      { "@type": "HowToSupply", "name": "Web browser" }
    ],
    "tool": [
      { "@type": "HowToTool", "name": "SaveFromInternet TikTok Video Downloader" }
    ],
    "step": [
      { "@type": "HowToStep", "name": "Copy TikTok URL", "text": "Open the TikTok app and tap the Share button, then tap Copy Link" },
      { "@type": "HowToStep", "name": "Paste URL", "text": "Go to SaveFromInternet.com and paste the URL into the search box" },
      { "@type": "HowToStep", "name": "Process Video", "text": "Click the Download button to analyze the video and fetch direct CDN streams" },
      { "@type": "HowToStep", "name": "Download", "text": "Select HD MP4 Video, MP3 Audio, or Photo ZIP to save the file without watermark" }
    ]
  };

  const steps = [
    {
      number: 1,
      title: "Copy TikTok Video Link",
      description: "Open the TikTok app on your smartphone or go to tiktok.com in your computer browser. Find the video you wish to save, tap the Share icon (arrow) at the bottom right, and tap 'Copy Link'.",
    },
    {
      number: 2,
      title: "Open SaveFromInternet.com",
      description: "Launch any web browser (Safari on iPhone, Chrome on Android/PC, or Edge/Firefox on Mac) and navigate to SaveFromInternet.com.",
    },
    {
      number: 3,
      title: "Paste the Copied URL",
      description: "Tap or click into the search box and paste your TikTok link. You can also tap our instant 'Paste from Clipboard' button.",
    },
    {
      number: 4,
      title: "Process & Fetch Media",
      description: "Click the blue 'Download' button. Our server immediately retrieves the clean, original CDN stream without applying any TikTok watermark overlays.",
    },
    {
      number: 5,
      title: "Save in Full HD or MP3",
      description: "Choose your preferred download option: 'Download MP4 (No Watermark HD)', 'Extract MP3 (Audio)', or 'Download All Images (ZIP)' for photo carousels.",
    }
  ];

  const features = [
    {
      title: "100% Free & Unlimited",
      description: "Download as many TikTok videos and audio tracks as you want with zero daily quotas or premium paywalls."
    },
    {
      title: "No Watermark or Logos",
      description: "Get clean, original video files without the bouncing TikTok watermark and username overlay."
    },
    {
      title: "High Quality (1080p HD & MP3)",
      description: "Downloads the highest available resolution uploaded by the creator and extracts crisp 320kbps MP3 audio."
    },
    {
      title: "All Devices & Browsers",
      description: "Works smoothly on iPhone Safari, iPad, Android Chrome, Windows PC, Mac, and Linux with zero app installations."
    },
    {
      title: "No Account or Software Needed",
      description: "Operates 100% in your browser. No registration, no passwords, and no extensions required."
    },
    {
      title: "Safe & Privacy-Focused",
      description: "We do not store your downloaded files or track personal identifiers. All processing occurs in real time."
    }
  ];

  return (
    <>
      <Script
        id="how-to-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'How do I download TikTok videos without a watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Copy the TikTok URL, paste it on savefrominternet.com, click Download, then select Download MP4 (No Watermark HD).' } },
            { '@type': 'Question', name: 'Can I download TikTok videos on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Open Safari on iPhone, go to savefrominternet.com, paste the link, and tap Download. Save directly to your Camera Roll via the Safari share menu.' } },
            { '@type': 'Question', name: 'Can I download TikTok videos on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Open Chrome on Android, visit savefrominternet.com, paste the URL, and tap Download. The file saves directly to your Downloads directory.' } },
            { '@type': 'Question', name: 'Is there a limit to how many TikTok videos I can download?', acceptedAnswer: { '@type': 'Answer', text: 'No. SaveFromInternet is completely free with no daily or monthly limits.' } },
            { '@type': 'Question', name: 'Do I need to install an app or software?', acceptedAnswer: { '@type': 'Answer', text: 'No. SaveFromInternet works 100% in your browser — no app, no extension, no registration.' } },
          ],
        }) }}
      />
      
      <div className="bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-12 sm:py-16 px-4 text-center border-b border-slate-100">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-blue-100 shadow-xs">
              📖 Step-by-Step Tutorial
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              How to Download TikTok Videos <span className="text-blue-600">Without Watermark</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Learn how to save high-quality TikTok videos, extract MP3 audio, and download photo slideshows to your iPhone, Android, PC, or Mac in 5 simple steps.
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
          {/* Step-by-Step Guide */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center sm:text-left">
              Step-by-Step Instructions
            </h2>
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-start gap-4 sm:gap-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs hover:border-blue-300 transition-all"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#195fd7] to-[#1e6fe8] text-white font-extrabold text-lg sm:text-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-900 font-bold text-lg sm:text-xl mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Native Ad */}
          <div className="py-4">
            <GoogleAdSense
              adSlot="3804648444"
              adFormat="auto"
              className="flex justify-center w-full"
              containerStyle="default"
            />
          </div>

          {/* Features Grid */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 text-center sm:text-left">
              Why Choose SaveFromInternet?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100">
                  <h3 className="text-slate-900 font-bold text-base sm:text-lg mb-1.5 flex items-center gap-2">
                    <span className="text-blue-600">✓</span> {feature.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Device-Specific Guides Links */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 text-center sm:text-left">
              Dedicated Device Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/tiktok-video-downloader-iphone"
                className="block bg-white hover:bg-blue-50/40 rounded-2xl p-5 border border-slate-200 hover:border-blue-300 transition-all shadow-xs group"
              >
                <div className="text-2xl mb-2">📱</div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-base mb-1">iPhone &amp; iPad</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Save directly to Camera Roll using Safari.</p>
              </Link>
              <Link
                href="/tiktok-video-downloader-android"
                className="block bg-white hover:bg-blue-50/40 rounded-2xl p-5 border border-slate-200 hover:border-blue-300 transition-all shadow-xs group"
              >
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-base mb-1">Android Phones</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Fast Chrome download to Downloads folder.</p>
              </Link>
              <Link
                href="/tiktok-video-downloader-pc"
                className="block bg-white hover:bg-blue-50/40 rounded-2xl p-5 border border-slate-200 hover:border-blue-300 transition-all shadow-xs group"
              >
                <div className="text-2xl mb-2">💻</div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-base mb-1">PC &amp; Mac</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Full HD 1080p MP4 download in any browser.</p>
              </Link>
            </div>
          </div>

          {/* Bottom CTA Card */}
          <div className="bg-gradient-to-r from-[#195fd7] to-[#1e6fe8] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-blue-600/20">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Ready to Download TikTok Videos?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Start downloading TikTok videos without watermark right now. Free, fast, and easy to use on any device!
            </p>
            <Link 
              href="/"
              className="inline-block bg-white text-blue-700 font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition-all active:scale-95 cursor-pointer"
            >
              Download TikTok Videos Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}