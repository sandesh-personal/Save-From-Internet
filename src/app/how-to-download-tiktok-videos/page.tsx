import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';

export const metadata = {
  title: 'How to Download TikTok Videos Without Watermark (2025 Guide)',
  description: 'Step-by-step guide to download TikTok videos without watermark in HD or MP4. Use our free TikTok downloader for PC, iPhone, Android. No app required!',
  keywords: [
    'tiktok downloader',
    'download tiktok videos',
    'tiktok video downloader',
    'tiktok download without watermark',
    'tiktok mp4 download',
    'how to download tiktok videos',
    'tiktok video download guide',
    'tiktok video downloader 2025',
    'tiktok downloader for pc',
    'tiktok downloader iphone',
    'tiktok downloader android',
    'tiktok to mp3',
    'tiktok video saver',
    'tiktok video download online',
    'tiktok downloader no watermark',
    'tiktok video download instructions',
    'tiktok video downloader tutorial',
    'tiktok video downloader how to use'
  ],
  openGraph: {
    title: 'How to Download TikTok Videos Without Watermark (2025 Guide)',
    description: 'Step-by-step guide to download TikTok videos without watermark in HD or MP4. Use our free TikTok downloader for PC, iPhone, Android. No app required!',
    type: 'article',
    url: 'https://savefrominternet.com/how-to-download-tiktok-videos',
  },
  alternates: {
    canonical: 'https://savefrominternet.com/how-to-download-tiktok-videos',
  },
};

export default function HowToDownloadPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download TikTok Videos Without Watermark (2025 Guide)",
    "description": "Step-by-step guide to download TikTok videos without watermark in HD or MP4 using SaveFromInternet.com. Works on PC, iPhone, Android.",
    "image": "https://savefrominternet.com/og.jpg",
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
      { "@type": "HowToStep", "name": "Copy TikTok URL", "text": "Open TikTok and copy the URL of the video you want to download", "image": "https://savefrominternet.com/images/step1.jpg" },
      { "@type": "HowToStep", "name": "Paste URL", "text": "Visit SaveFromInternet.com and paste the TikTok URL in the input box", "image": "https://savefrominternet.com/images/step2.jpg" },
      { "@type": "HowToStep", "name": "Process Video", "text": "Click the 'Process TikTok URL' button to analyze the video", "image": "https://savefrominternet.com/images/step3.jpg" },
      { "@type": "HowToStep", "name": "Download", "text": "Click the download button to save the video without watermark", "image": "https://savefrominternet.com/images/step4.jpg" }
    ]
  };

  const steps = [
    {
      number: 1,
      title: "Copy TikTok Video URL",
      description: "Open TikTok and find the video you want to download. Tap the 'Share' button and select 'Copy Link' to get the video URL.",
      image: "/images/step1.jpg"
    },
    {
      number: 2,
      title: "Visit SaveFromInternet.com",
      description: "Open your web browser and go to SaveFromInternet.com. Our TikTok video downloader works on all devices - mobile, tablet, or desktop.",
      image: "/images/step2.jpg"
    },
    {
      number: 3,
      title: "Paste the TikTok URL",
      description: "Paste the copied TikTok URL into the input box on our website. You can also use the 'Paste' button to automatically paste from your clipboard.",
      image: "/images/step3.jpg"
    },
    {
      number: 4,
      title: "Process the Video",
      description: "Click the 'Process TikTok URL' button. Our system will analyze the video and prepare it for download. This usually takes just a few seconds.",
      image: "/images/step4.jpg"
    },
    {
      number: 5,
      title: "Download Your Video",
      description: "Once processing is complete, click the 'Download Video' button to save the TikTok video without watermark to your device.",
      image: "/images/step5.jpg"
    }
  ];

  const features = [
    {
      title: "No Watermark Downloads",
      description: "Download TikTok videos in their original quality without any watermarks or logos"
    },
    {
      title: "Audio Extraction",
      description: "Extract MP3 audio from TikTok videos for music, ringtones, or audio content"
    },
    {
      title: "Image Downloads",
      description: "Download TikTok photos and image carousels in high quality"
    },
    {
      title: "Mobile Friendly",
      description: "Works perfectly on iPhone, Android, and all mobile devices"
    },
    {
      title: "No Registration",
      description: "Use our TikTok video downloader without creating an account or providing personal information"
    },
    {
      title: "Unlimited Downloads",
      description: "Download as many TikTok videos as you want without any limits or restrictions"
    }
  ];

  return (
    <>
      <Script
        id="how-to-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto flex flex-col">
          <h1 className="text-4xl font-bold mb-4">How to Download TikTok Videos - Complete Guide (2025)</h1>
          <p className="text-lg text-white/70 mb-8">
            Learn how to download TikTok videos step by step using our free TikTok video downloader. Download videos without watermark, extract audio, and save images easily.
          </p>

          {/* Step by Step Guide */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Step-by-Step Guide to Download TikTok Videos</h2>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-xl mb-2">{step.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">{step.description}</p>
                      {step.image && (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden">
                          <Image
                            src={step.image}
                            alt={`Step ${step.number}: ${step.title}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Why Choose Our TikTok Video Downloader?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-xl p-8 border border-pink-500/20">
            <h2 className="text-2xl font-bold mb-4">Ready to Download TikTok Videos?</h2>
            <p className="text-white/70 mb-6">
              Start downloading TikTok videos without watermark right now. It's free, fast, and easy to use!
            </p>
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-pink-600 hover:to-violet-600 transition-all duration-200 text-lg"
            >
              Download TikTok Videos Now
            </Link>
          </div>

          {/* Additional Resources */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/faq"
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <h3 className="text-white font-semibold mb-2">Frequently Asked Questions</h3>
                <p className="text-white/70 text-sm">Get answers to common questions about TikTok video downloading</p>
              </Link>
              <Link 
                href="/blog"
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <h3 className="text-white font-semibold mb-2">TikTok Downloader Blog</h3>
                <p className="text-white/70 text-sm">Read guides and tips for downloading TikTok content</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 