import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'TikTok to MP3 Converter - Download TikTok Audio (2025) - Save From Internet',
  description:
    'Convert and download TikTok to MP3 in seconds. Free TikTok audio downloader (2025) — no app required.',
  keywords: [
    'TikTok to MP3',
    'download tiktok mp3',
    'mp3 tiktok',
    'mp3 converter tiktok',
  ],
  openGraph: {
    title: 'TikTok to MP3 Converter - Download TikTok Audio (2025)',
    description:
      'Download TikTok audio as MP3 in high quality. Free, fast, no app.',
    url: 'https://www.savefrominternet.com/tiktok-to-mp3',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok to MP3 Converter - Download TikTok Audio (2025)',
    description:
      'Download TikTok audio as MP3 in high quality. Free, fast, no app.',
    images: ['/og-final.jpg'],
  },
  alternates: {
    canonical: 'https://www.savefrominternet.com/tiktok-to-mp3',
  },
}

export default function TikTokToMp3Page() {
  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 py-8 bg-white text-black">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            <span className="bg-gradient-to-r from-[#25F4EE] via-pink-500 to-[#FE2C55] bg-clip-text text-transparent">TikTok</span> to MP3 Converter
          </h1>
          <p className="text-xl text-black/80 max-w-2xl mx-auto">
            Convert and download TikTok audio to MP3 in seconds. Free TikTok audio downloader (2025) — no app required.
          </p>
          <div className="mt-6">
            <Link 
              href="/" 
              className="inline-block bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-pink-600 hover:to-violet-600 transition-all duration-200 text-lg"
            >
              Start Converting Now
            </Link>
          </div>
        </div>

        {/* Ad Section */}
        <div className="flex justify-center">
          <GoogleAdSense
            adSlot="3804648444"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">How to Convert TikTok to MP3</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-100">
                <span className="text-2xl font-bold text-pink-400">1</span>
              </div>
              <h3 className="text-black font-semibold mb-2">Copy TikTok URL</h3>
              <p className="text-black/70 text-sm">Copy the link from any TikTok video you want to convert to MP3</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-100">
                <span className="text-2xl font-bold text-pink-400">2</span>
              </div>
              <h3 className="text-black font-semibold mb-2">Paste & Process</h3>
              <p className="text-black/70 text-sm">Paste the URL on our homepage and click "Process TikTok URL"</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-100">
                <span className="text-2xl font-bold text-pink-400">3</span>
              </div>
              <h3 className="text-black font-semibold mb-2">Download MP3</h3>
              <p className="text-black/70 text-sm">Click "Extract Audio" to download the TikTok audio as MP3</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-black mb-4">✨ Key Features</h3>
            <ul className="space-y-3 text-black/80">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>High-quality MP3 audio extraction</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>No app installation required</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Works on all devices (PC, iPhone, Android)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Fast processing and download</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Completely free to use</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-black mb-4">🎵 Perfect For</h3>
            <ul className="space-y-3 text-black/80">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Creating ringtones from TikTok sounds</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Extracting music for personal use</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Downloading voiceovers and speeches</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Creating audio collections</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Offline listening to TikTok audio</span>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Is it legal to download TikTok audio as MP3?</h3>
              <p className="text-black/70">Yes, downloading audio from your own TikTok videos or public videos for personal use is generally legal. However, always respect copyright laws and the original creator's rights.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">What quality will the MP3 be?</h3>
              <p className="text-black/70">We extract audio in the highest quality available from the original TikTok video, typically 128kbps or higher, ensuring clear and crisp audio.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Do I need to install any software?</h3>
              <p className="text-black/70">No! Our TikTok to MP3 converter works entirely in your web browser. No downloads, installations, or registrations required.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Can I convert private TikTok videos?</h3>
              <p className="text-black/70">No, our tool only works with public TikTok videos. Private videos require authentication that we don't have access to.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-xl p-8 border border-pink-100">
          <h2 className="text-2xl font-bold text-black mb-4">Ready to Convert TikTok to MP3?</h2>
          <p className="text-black/80 mb-6">Start converting your favorite TikTok audio to MP3 format right now!</p>
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-pink-600 hover:to-violet-600 transition-all duration-200 text-lg"
          >
            Convert TikTok to MP3 Now
          </Link>
        </div>

      </div>
    </div>
  )
}


