import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import BackToTopButton from './BackToTopButton'
import type { ReactNode } from 'react'

interface BlogPostLayoutProps {
  title: string
  description: string
  date: string
  category: string
  children: ReactNode
}

const categoryLabels: Record<string, string> = {
  'how-to': 'How-To Guide',
  'no-watermark': 'No Watermark',
  device: 'Device Guide',
  audio: 'Audio & MP3',
  photos: 'Photos & Carousels',
  troubleshooting: 'Troubleshooting',
  comparison: 'Comparison',
  'other-platforms': 'Other Platforms',
  legal: 'Legal & Privacy',
}

export default function BlogPostLayout({ title, description, date, category, children }: BlogPostLayoutProps) {
  const label = categoryLabels[category] ?? category

  return (
    <div className="bg-white" id="top">
      {/* Sticky back-to-blog breadcrumb */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-16 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/blog" className="text-rose-500 hover:underline font-semibold flex items-center gap-1">
            ← Blog
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400 truncate max-w-[200px] sm:max-w-none">{label}</span>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        {/* Category badge + heading */}
        <header className="mb-8">
          <div className="inline-block bg-rose-50 text-rose-500 text-xs font-bold px-3 py-1 rounded-full mb-4">
            {label}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {title}
          </h1>
          <p className="text-slate-500 text-base leading-relaxed mb-3">{description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>
              Updated:{' '}
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span>·</span>
            <Link href="/" className="text-rose-400 hover:underline font-medium">
              SaveFromInternet.com
            </Link>
          </div>
        </header>

        {/* Top Ad */}
        <div className="mb-8">
          <GoogleAdSense
            adSlot="5309301802"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>

        {/* Blog content */}
        <div className="blog-prose">{children}</div>

        {/* Mid Ad */}
        <div className="my-10">
          <GoogleAdSense
            adSlot="3804648444"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-rose-500 to-violet-600 rounded-2xl p-8 text-center mt-10">
          <h2 className="text-2xl font-extrabold text-white mb-3">
            Download TikTok Without Watermark — Free
          </h2>
          <p className="text-rose-100 mb-6">
            Paste any TikTok link and get an HD video, MP3, or photo ZIP in seconds. No app, no sign-up.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-all"
          >
            ⬇ Try TikTok Downloader Now
          </Link>
        </div>

        {/* Bottom Ad */}
        <div className="mt-10 mb-4">
          <GoogleAdSense
            adSlot="2491566773"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>

        {/* Back to blog + back to top */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <Link href="/blog" className="text-rose-500 hover:underline font-semibold text-sm flex items-center gap-1">
            ← Back to All Posts
          </Link>
          <a
            href="#top"
            className="text-slate-400 hover:text-rose-500 font-semibold text-sm flex items-center gap-1 transition-colors"
          >
            ↑ Back to Top
          </a>
        </div>
      </article>

      <BackToTopButton />
    </div>
  )
}
