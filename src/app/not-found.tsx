import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | SaveFromInternet',
  description: 'The page you are looking for does not exist. Try the free TikTok downloader or browse our guides.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="bg-white min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        {/* 404 number */}
        <div className="text-8xl sm:text-9xl font-extrabold text-blue-50 select-none mb-2">
          404
        </div>

        {/* Icon */}
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 -mt-8 border border-blue-100 shadow-xs">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-600 mb-8 leading-relaxed text-sm sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Try downloading a video directly or browse our free guides.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all shadow-md shadow-blue-500/20 hover:scale-105"
          >
            Download TikTok Videos
          </Link>
          <Link
            href="/blog"
            className="inline-block bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold px-6 py-3.5 rounded-2xl text-sm border border-slate-200 transition-all hover:scale-105"
          >
            Browse All Guides
          </Link>
        </div>

        {/* Popular links */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Popular Tools &amp; Guides</p>
          <div className="flex flex-wrap justify-center gap-2.5 text-xs font-semibold">
            <Link href="/tiktok-to-mp3" className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">TikTok to MP3</Link>
            <Link href="/tiktok-photo-downloader" className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">Photo Downloader</Link>
            <Link href="/tiktok-video-downloader-iphone" className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">iPhone Guide</Link>
            <Link href="/tiktok-video-downloader-android" className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">Android Guide</Link>
            <Link href="/faq" className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
