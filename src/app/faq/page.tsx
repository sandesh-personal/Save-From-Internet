import Link from 'next/link';
import Script from 'next/script';
import GoogleAdSense from '@/components/GoogleAdSense';

export const metadata = {
  title: 'TikTok Downloader FAQ - Download TikTok Videos Without Watermark (2025)',
  description: 'Find answers to common questions about downloading TikTok videos without watermark. Use our free TikTok downloader for HD, MP4, and audio extraction. Works on PC, iPhone, Android.',
  keywords: [
    'tiktok downloader faq',
    'tiktok video downloader',
    'download tiktok videos',
    'tiktok download without watermark',
    'tiktok video download help',
    'tiktok downloader questions',
    'how to download tiktok videos',
    'tiktok video downloader guide',
    'tiktok downloader troubleshooting',
    'tiktok audio extractor faq',
    'tiktok video downloader problems',
    'tiktok downloader support',
    'tiktok downloader for pc',
    'tiktok downloader iphone',
    'tiktok downloader android'
  ],
  openGraph: {
    title: 'TikTok Downloader FAQ - Download TikTok Videos Without Watermark (2025)',
    description: 'Find answers to common questions about downloading TikTok videos without watermark. Use our free TikTok downloader for HD, MP4, and audio extraction. Works on PC, iPhone, Android.',
    type: 'website',
    url: 'https://savefrominternet.com/faq',
  },
  alternates: {
    canonical: 'https://savefrominternet.com/faq',
  },
};

export default function FAQPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to download TikTok videos without watermark?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To download TikTok videos without watermark, paste the TikTok URL into our downloader, click process, and download. Our tool removes watermarks and provides high-quality videos in MP4 format."
        }
      },
      {
        "@type": "Question",
        "name": "Is TikTok downloader free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SaveFromInternet TikTok downloader is 100% free. No registration, no hidden fees, and no limits on downloads."
        }
      },
      {
        "@type": "Question",
        "name": "Can I extract audio from TikTok videos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can extract MP3 audio from TikTok videos using our tool. After processing a TikTok URL, you'll see an 'Extract Audio' button to download the audio file."
        }
      },
      {
        "@type": "Question",
        "name": "How to download TikTok videos on mobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our TikTok downloader works on all devices including mobile phones. Open the website in your mobile browser, paste the TikTok URL, and download directly to your device."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download private TikTok videos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, our TikTok downloader only works with public TikTok videos. Private videos require authentication and cannot be downloaded through third-party tools."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "How to download TikTok videos without watermark?",
      answer: "To download TikTok videos without watermark, simply paste the TikTok URL into our downloader, click process, and download. Our tool automatically removes watermarks and provides clean, high-quality videos in MP4 format. The process is simple: copy the TikTok link, paste it in our downloader, and get your watermark-free video instantly."
    },
    {
      question: "Is TikTok video downloader free to use?",
      answer: "Yes, SaveFromInternet TikTok video downloader is completely free to use. No registration required, no hidden fees, and no limits on downloads. You can download unlimited TikTok videos without any cost or subscription."
    },
    {
      question: "Can I extract audio from TikTok videos?",
      answer: "Yes, you can extract MP3 audio from TikTok videos using our tool. After processing a TikTok URL, you'll see an 'Extract Audio' button that allows you to download the audio in high-quality MP3 format. Perfect for creating ringtones, background music, or audio content."
    },
    {
      question: "How to download TikTok videos on mobile?",
      answer: "Our TikTok video downloader works perfectly on all devices including mobile phones. Simply open the website in your mobile browser, paste the TikTok URL, and download directly to your device. No app installation required - it works in any mobile browser."
    },
    {
      question: "Can I download private TikTok videos?",
      answer: "No, our TikTok video downloader only works with public TikTok videos. Private videos require authentication and cannot be downloaded through third-party tools. This protects user privacy and respects TikTok's terms of service."
    },
    {
      question: "What video quality can I download?",
      answer: "Our TikTok video downloader provides the highest available quality for each video. Most TikTok videos can be downloaded in HD quality (720p or 1080p) depending on the original upload quality. We maintain the original resolution without any quality loss."
    },
    {
      question: "How to download TikTok images and photos?",
      answer: "To download TikTok images and photos, paste the TikTok URL of an image post into our downloader. Our tool will detect all images in the post and allow you to download them individually or as a ZIP file. Perfect for saving photo carousels and image collections."
    },
    {
      question: "Is it legal to download TikTok videos?",
      answer: (
        <>
          Downloading TikTok videos for personal use is generally allowed, but sharing, re-uploading, or using them for commercial purposes without permission may violate copyright laws. See our <Link href="/blog/is-downloading-tiktok-videos-legal-2025-guide">legal guide</Link> for details.
        </>
      )
    },
    {
      question: "Why can't I download some TikTok videos?",
      answer: (
        <>
          Some videos may be private, region-restricted, or protected by TikTok. Learn more in our <Link href="/blog/how-to-download-private-tiktok-videos-legal-methods">private video guide</Link>.
        </>
      )
    },
    {
      question: "How do I download TikTok videos on iPhone or Android?",
      answer: (
        <>
          Our downloader works on all devices. See our guides for <Link href="/blog/best-tiktok-video-downloaders-for-iphone-2025-guide">iPhone</Link> and <Link href="/blog/how-to-download-tiktok-videos-on-android-complete-guide">Android</Link>.
        </>
      )
    },
    {
      question: "Is it safe to use TikTok video downloaders?",
      answer: (
        <>
          Yes, as long as you use reputable tools like <Link href="/">SaveFromInternet</Link>. Avoid sites that require excessive permissions or install unwanted software. See our <Link href="/blog/is-downloading-tiktok-videos-legal-2025-guide">safety & legal guide</Link>.
        </>
      )
    },
    {
      question: "Do I need to install any software?",
      answer: "No, you don't need to install any software or apps. Our TikTok video downloader works entirely in your web browser. Just visit our website, paste the TikTok URL, and download. No downloads, installations, or registrations required."
    },
    {
      question: "What if the download doesn't work?",
      answer: "If a download doesn't work, check that the TikTok video is public and the URL is correct. Try refreshing the page or using a different browser. Our tool is regularly updated to handle TikTok's latest changes and should work with most public videos."
    },
    {
      question: "Can I download TikTok videos on iPhone?",
      answer: "Yes, our TikTok video downloader works perfectly on iPhone. Open Safari or any mobile browser, visit our website, paste the TikTok URL, and download. The videos will be saved to your iPhone's photo library automatically."
    },
    {
      question: "How to download TikTok videos on Android?",
      answer: "Our TikTok video downloader works great on Android devices. Simply open Chrome or any mobile browser, visit our website, paste the TikTok URL, and download. Videos will be saved to your Android device's download folder."
    },
    {
      question: "Can I download TikTok videos without the app?",
      answer: "Yes, you can download TikTok videos without installing any app. Our web-based TikTok video downloader works directly in your browser. No app store downloads, no installations, and no permissions required."
    },
    {
      question: "What file formats are supported?",
      answer: "Our TikTok video downloader supports MP4 video format and MP3 audio format. Videos are downloaded in high-quality MP4, and audio can be extracted as MP3 files. Both formats are widely compatible with all devices and media players."
    },
    {
      question: "Is my privacy protected when using the downloader?",
      answer: "Yes, your privacy is fully protected. We don't collect personal information, track your activity, or store downloaded videos. All processing happens in real-time and no data is saved on our servers. Your downloads remain completely private."
    }
  ];

  return (
    <>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-white text-black">
        <div className="max-w-4xl mx-auto flex flex-col">
          <h1 className="text-3xl font-bold mb-4">TikTok Video Downloader FAQ</h1>
          <p className="text-lg text-black/70 mb-8">
            Get answers to frequently asked questions about downloading TikTok videos, extracting audio, and using our free TikTok video downloader.
          </p>

          {/* Top Ad */}
          <div className="mb-8">
            <GoogleAdSense
              adSlot="5309301802"
              adFormat="auto"
              className="flex justify-center"
              containerStyle="default"
            />
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-black font-semibold text-lg mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-black/70 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

                {/* Show ad after every 4th FAQ */}
                {(index + 1) % 4 === 0 && (
                  <div className="mt-6">
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

          {/* Bottom Ad */}
          <div className="mt-8">
            <GoogleAdSense
              adSlot="2491566773"
              adFormat="auto"
              className="flex justify-center"
              containerStyle="default"
            />
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-pink-600 hover:to-violet-600 transition-all duration-200"
            >
              Try Our TikTok Video Downloader
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 