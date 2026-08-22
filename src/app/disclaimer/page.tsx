import Link from 'next/link'
import type { Metadata } from 'next'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'Disclaimer - TikTok Video Downloader | Save From Internet',
  description: 'Legal disclaimer for Save From Internet TikTok video downloader. Learn about our terms of service, user responsibilities, and copyright information.',
  alternates: { canonical: 'https://www.savefrominternet.com/disclaimer' },
  openGraph: {
    title: 'Disclaimer - TikTok Video Downloader | Save From Internet',
    description: 'Legal disclaimer for Save From Internet TikTok video downloader. Learn about our terms of service, user responsibilities, and copyright information.',
    url: 'https://www.savefrominternet.com/disclaimer',
    type: 'website',
    siteName: 'Save From Internet',
  },
}

export default function DisclaimerPage() {
  return (
    <div className="bg-white min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Disclaimer &amp; Legal Notice</h1>
          <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
            Welcome to <strong>Save From Internet</strong>. We provide a free, browser-based web utility for downloading TikTok videos, audio, and photo carousels for personal and offline use. Please review this legal notice carefully.
          </p>
        </div>

        <div className="space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">General Trademark Disclaimer</h2>
            <p className="leading-relaxed text-slate-600">
              <strong>Save From Internet</strong> is an independent software tool and is <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with TikTok, ByteDance Ltd., Instagram, Meta, or any of their subsidiaries or affiliates. All product and company names are trademarks™ or registered® trademarks of their respective holders.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Copyright &amp; Content Ownership</h2>
            <p className="leading-relaxed text-slate-600 mb-2">
              We do <strong>not host, store, or archive</strong> any multimedia files on our servers. All downloads are executed directly from publicly accessible CDN streams. All intellectual property remains the property of the original copyright owners.
            </p>
            <p className="text-sm text-slate-500">
              If you are a copyright owner and have inquiries, please contact us at{' '}
              <a href="mailto:copyright@savefrominternet.com" className="text-black font-bold hover:underline">
                copyright@savefrominternet.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">User Responsibilities</h2>
            <p className="leading-relaxed text-slate-600">
              Users are solely responsible for compliance with applicable copyright laws and platform terms of service. This tool is designed strictly for fair use, personal study, and offline backup.
            </p>
          </section>

          <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Helpful Resources</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/privacy-policy" className="text-sm font-bold text-black hover:underline">Privacy Policy →</Link>
              <Link href="/faq" className="text-sm font-bold text-black hover:underline">FAQ →</Link>
              <Link href="/how-to-download-tiktok-videos" className="text-sm font-bold text-black hover:underline">How to Download →</Link>
              <Link href="/tiktok-video-downloader" className="text-sm font-bold text-black hover:underline">TikTok Downloader →</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
