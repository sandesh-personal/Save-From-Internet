import Link from 'next/link'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

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
    <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto flex flex-col">

        <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>
        <p className="text-white/80 leading-relaxed text-lg">
          The content provided on <strong>Save From Internet</strong> is for general informational purposes only.
          We do not host or store any video, audio, or image files on our servers. All media remains the property
          of its respective owners. Users are solely responsible for how they use the downloaded content.
          This tool is made to help users who upload TikToks on their own accounts, allowing them to download their
          own videos without watermarks. <strong>Save From Internet</strong> is not affiliated with TikTok or any
          other platform. Use of this service is at your own risk, and we are not responsible for any misuse or
          copyright violations.
        </p>
      </div>
    </div>
  )
}
