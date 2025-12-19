import Link from 'next/link'
import type { Metadata } from 'next'
import GoogleAdSense from '@/components/GoogleAdSense'

const baseUrl = 'https://savefrominternet.com'

export const metadata: Metadata = {
  title: 'Disclaimer - TikTok Video Downloader | Save From Internet',
  description: 'Legal disclaimer for Save From Internet TikTok video downloader. Learn about our terms of service, user responsibilities, and copyright information.',
  openGraph: {
    title: 'Disclaimer - TikTok Video Downloader | Save From Internet',
    description: 'Legal disclaimer for Save From Internet TikTok video downloader. Learn about our terms of service, user responsibilities, and copyright information.',
    url: `${baseUrl}/disclaimer`,
    type: 'website',
    siteName: 'Save From Internet',
  },
  twitter: {
    card: 'summary',
    title: 'Disclaimer - TikTok Video Downloader | Save From Internet',
    description: 'Legal disclaimer for Save From Internet TikTok video downloader. Learn about our terms of service, user responsibilities, and copyright information.',
  },
}

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-white text-black">
      <div className="max-w-4xl mx-auto flex flex-col">

        <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>
        <p className="text-black/80 leading-relaxed text-lg mb-6">
          Welcome to <strong>Save From Internet</strong>! We are dedicated to providing a free, user-friendly tool for downloading TikTok videos, audio, and images for personal use. Please read this disclaimer carefully before using our website or services.
        </p>
        <h2 className="text-2xl font-semibold mb-4 mt-6">General Information</h2>
        <p className="text-black/80 leading-relaxed mb-4">
          <strong>Save From Internet</strong> is an independent platform and is <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with TikTok, ByteDance Ltd., or any of its subsidiaries or affiliates. All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.
        </p>
        <h2 className="text-2xl font-semibold mb-4 mt-6">Copyright & Content Ownership</h2>
        <p className="text-black/80 leading-relaxed mb-4">
          We do <strong>not host or store</strong> any video, audio, or image files on our servers. All downloadable content remains the property of its respective copyright owners. Our service simply provides a way for users to access publicly available content for personal, non-commercial use. <br />
          <span className="font-semibold">If you are a copyright owner and believe your rights have been infringed, please contact us at <a href="mailto:copyright@savefrominternet.com" className="underline text-blue-600">copyright@savefrominternet.com</a> and we will promptly address your concerns.</span>
        </p>
        <h2 className="text-2xl font-semibold mb-4 mt-6">User Responsibilities</h2>
        <p className="text-black/80 leading-relaxed mb-4">
          Users are solely responsible for how they use the content downloaded from our website. Downloading copyrighted material without permission may violate copyright laws in your country. <strong>Save From Internet</strong> is intended for personal use only, such as downloading your own TikTok videos or content you have permission to use.
        </p>
        <h2 className="text-2xl font-semibold mb-4 mt-6">No Guarantee of Service</h2>
        <p className="text-black/80 leading-relaxed mb-4">
          We strive to keep our service available and up-to-date, but we do not guarantee uninterrupted access or that all TikTok content will be downloadable at all times. TikTok may change its platform or restrict access at any time.
        </p>
        <h2 className="text-2xl font-semibold mb-4 mt-6">Related Resources</h2>
        <ul className="list-disc list-inside text-black/80 mb-6">
          <li><Link href="/privacy-policy" className="underline text-blue-600">Privacy Policy</Link></li>
          <li><Link href="/faq" className="underline text-blue-600">Frequently Asked Questions</Link></li>
          <li><Link href="/tiktok-video-downloader" className="underline text-blue-600">TikTok Video Downloader</Link></li>
          <li><Link href="/tiktok-to-mp3" className="underline text-blue-600">TikTok to MP3 Converter</Link></li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4 mt-6">Disclaimer FAQ</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="font-semibold">Is it legal to download TikTok videos or audio?</h3>
            <p className="text-black/70">Downloading your own TikTok videos or public content for personal use is generally legal. However, you should always respect copyright laws and the rights of content creators. Do not use downloaded content for commercial purposes without permission.</p>
          </div>
          <div>
            <h3 className="font-semibold">Does Save From Internet store any files?</h3>
            <p className="text-black/70">No, we do not store or host any media files. All downloads are processed directly from TikTok’s public servers.</p>
          </div>
          <div>
            <h3 className="font-semibold">How can I report copyright infringement?</h3>
            <p className="text-black/70">If you believe your copyright has been violated, please email us at <a href="mailto:copyright@savefrominternet.com" className="underline text-blue-600">copyright@savefrominternet.com</a> and we will investigate and take appropriate action.</p>
          </div>
        </div>

        {/* Middle Ad */}
        <div className="my-8">
          <GoogleAdSense
            adSlot="3804648444"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
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
      </div>
    </div>
  )
}
