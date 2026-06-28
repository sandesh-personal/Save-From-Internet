import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | SaveFromInternet',
  description: 'The page you are looking for does not exist. Try the free TikTok downloader or browse our guides.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">

        {/* 404 number */}
        <div className="text-8xl font-bold text-indigo-100 dark:text-indigo-950 select-none mb-2">
          404
        </div>

        {/* Icon */}
        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6 -mt-4">
          <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Try the downloader or browse our guides.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Download TikTok Videos
          </Link>
          <Link
            href="/blog"
            className="inline-block bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse Guides
          </Link>
        </div>

        {/* Popular links */}
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700/50">
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-indigo-500">
            <Link href="/tiktok-to-mp3" className="hover:underline">TikTok to MP3</Link>
            <Link href="/tiktok-photo-downloader" className="hover:underline">Photo Downloader</Link>
            <Link href="/tiktok-video-downloader-iphone" className="hover:underline">iPhone Guide</Link>
            <Link href="/tiktok-video-downloader-android" className="hover:underline">Android Guide</Link>
            <Link href="/instagram-reel-downloader" className="hover:underline">Instagram Reels</Link>
          </div>
        </div>

      </div>
    </div>
  )
}
