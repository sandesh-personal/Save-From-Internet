import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2025 - Save From Internet',
  description:
    'TikTok Video Downloader to download TikTok videos without watermark 2025 in HD as MP4. Fast, free, no app required. Extract MP3 and save images, too.',
  keywords: [
    'TikTok Video Downloader',
    'download tiktok videos without watermark 2025',
    'tiktok downloader 2025',
  ],
  openGraph: {
    title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2025',
    description:
      'Download TikTok videos without watermark in HD. Free TikTok video downloader for PC, iPhone, Android. No app required.',
    url: 'https://www.savefrominternet.com/tiktok-video-downloader',
    type: 'website',
    images: ['/og-final.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Video Downloader - Download TikTok Videos Without Watermark 2025',
    description:
      'Download TikTok videos without watermark in HD. Free TikTok video downloader for PC, iPhone, Android. No app required.',
    images: ['/og-final.jpg'],
  },
  alternates: {
    canonical: 'https://www.savefrominternet.com/tiktok-video-downloader',
  },
}

export default function TikTokVideoDownloaderLanding() {
  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 py-8 bg-white text-black">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black">
            <span className="bg-gradient-to-r from-[#25F4EE] via-pink-500 to-[#FE2C55] bg-clip-text text-transparent">TikTok</span> Video Downloader
          </h1>
          <p className="text-xl text-black/80 max-w-2xl mx-auto">
            Download TikTok videos without watermark 2025 in HD as MP4. Fast, free, no app required. Extract MP3 and save images, too.
          </p>
          <div className="mt-6">
            <Link 
              href="/" 
              className="inline-block bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-pink-600 hover:to-violet-600 transition-all duration-200 text-lg"
            >
              Start Downloading Now
            </Link>
          </div>
        </div>

        {/* Ad Section */}
        <div className="flex justify-center">
          <GoogleAdSense
            adSlot="5309301802"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 rounded-xl p-6 border border-black/10">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">How to Download TikTok Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                <span className="text-2xl font-bold text-pink-400">1</span>
              </div>
              <h3 className="text-black font-semibold mb-2">Copy TikTok URL</h3>
              <p className="text-black/70 text-sm">Copy the link from any TikTok video you want to download</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                <span className="text-2xl font-bold text-pink-400">2</span>
              </div>
              <h3 className="text-black font-semibold mb-2">Paste & Process</h3>
              <p className="text-black/70 text-sm">Paste the URL on our homepage and click "Process TikTok URL"</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                <span className="text-2xl font-bold text-pink-400">3</span>
              </div>
              <h3 className="text-black font-semibold mb-2">Download Content</h3>
              <p className="text-black/70 text-sm">Choose to download video, audio, or images in high quality</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6 border border-black/10">
            <h3 className="text-xl font-semibold text-black mb-4">✨ Key Features</h3>
            <ul className="space-y-3 text-black/80">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Download videos without watermark</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>High-quality HD video downloads</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Extract MP3 audio from videos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Download image galleries</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Works on all devices and browsers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>No registration or app required</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">📱 Supported Platforms</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Windows PC and Mac computers</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>iPhone and iPad devices</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Android phones and tablets</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>All modern web browsers</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Chrome, Firefox, Safari, Edge</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Download Options */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Download Options Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-gradient-to-br from-pink-500/10 to-violet-500/10 rounded-lg p-4 border border-pink-500/20">
              <div className="text-3xl mb-3">🎥</div>
              <h3 className="text-lg font-semibold text-black mb-2">Video Download</h3>
              <p className="text-black/70 text-sm">Download TikTok videos in HD quality without watermark as MP4 files</p>
            </div>
            <div className="text-center bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-3xl mb-3">🎵</div>
              <h3 className="text-lg font-semibold text-black mb-2">Audio Extraction</h3>
              <p className="text-black/70 text-sm">Extract high-quality MP3 audio from TikTok videos for music and sounds</p>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl mb-3">🖼️</div>
              <h3 className="text-lg font-semibold text-black mb-2">Image Gallery</h3>
              <p className="text-black/70 text-sm">Download multiple images from TikTok posts individually or as ZIP</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Is downloading TikTok videos legal?</h3>
              <p className="text-black/70">Downloading your own TikTok videos or public videos for personal use is generally legal. Always respect copyright laws and creator rights.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">What video quality will I get?</h3>
              <p className="text-black/70">We provide the highest quality available from the original TikTok video, typically 720p or 1080p HD resolution.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Do I need to install any software?</h3>
              <p className="text-black/70">No! Our TikTok downloader works entirely in your web browser. No downloads, installations, or registrations required.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Can I download private TikTok videos?</h3>
              <p className="text-black/70">No, our tool only works with public TikTok videos. Private videos require authentication that we don't have access to.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Are there any download limits?</h3>
              <p className="text-black/70">No! You can download unlimited TikTok videos, audio, and images without any restrictions or limits.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-xl p-8 border border-pink-500/20">
          <h2 className="text-2xl font-bold text-black mb-4">Ready to Download TikTok Videos?</h2>
          <p className="text-black/80 mb-6">Start downloading your favorite TikTok videos without watermark right now!</p>
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-pink-600 hover:to-violet-600 transition-all duration-200 text-lg"
          >
            Download TikTok Videos Now
          </Link>
        </div>

      </div>
    </div>
  )
}


