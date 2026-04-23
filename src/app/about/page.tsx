import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'About SaveFromInternet — Free TikTok Video Downloader',
  description: 'About SaveFromInternet.com — a free platform to download TikTok videos, audio, and images without watermark.',
  alternates: { canonical: 'https://www.savefrominternet.com/about' },
  openGraph: { title: 'About SaveFromInternet', url: 'https://www.savefrominternet.com/about' },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-white text-black">
      <div className="max-w-4xl mx-auto flex flex-col">

        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-black/80 leading-relaxed text-lg mb-6">
          <strong>Save From Internet</strong> is a free platform designed to let users download
          videos, audio, and images from social media platforms like TikTok. Our goal is to
          provide a fast, secure, and watermark-free experience to help creators and users access
          content offline without restrictions.
        </p>

        {/* Middle Ad */}
        <div className="my-8">
          <GoogleAdSense
            adSlot="3804648444"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="text-black/80 leading-relaxed text-lg mb-2">
          For technical issues or problems you encounter while using the website, please reach out to our support team at{' '}
          <a href="mailto:support@savefrominternet.com" className="underline hover:text-blue-400">
            support@savefrominternet.com
          </a>. We are here to help troubleshoot and resolve any difficulties you might be facing.
        </p>
        <p className="text-black/80 leading-relaxed text-lg">
          For business inquiries, partnership opportunities, or other general concerns, contact us at{' '}
          <a href="mailto:contact@savefrominternet.com" className="underline hover:text-blue-400">
            contact@savefrominternet.com
          </a>. We welcome collaborations and want to ensure all your questions are answered.
        </p>

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
