import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'
import BackToTopButton from './BackToTopButton'
import MidArticleAd from './MidArticleAd'
import ArticleSchema from './ArticleSchema'
import type { ReactNode } from 'react'

interface BlogPostLayoutProps {
  title: string
  description: string
  date: string
  lastModified?: string
  category: string
  children: ReactNode
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join(' ')
  if (typeof node === 'object' && node !== null && 'props' in node)
    return extractText((node as { props: { children?: ReactNode } }).props.children)
  return ''
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

export default function BlogPostLayout({ title, description, date, lastModified, category, children }: BlogPostLayoutProps) {
  const label = categoryLabels[category] ?? category
  const wordCount = extractText(children).split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.round(wordCount / 200))

  return (
    <div className="bg-white dark:bg-slate-900" id="top">
      <ArticleSchema title={title} description={description} date={date} lastModified={lastModified} />
      {/* Sticky back-to-blog breadcrumb */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/50 px-4 py-3 sticky top-16 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/blog" className="text-rose-500 hover:underline font-semibold flex items-center gap-1">
              ← Blog
            </Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-400 dark:text-slate-500 truncate max-w-[140px] sm:max-w-none">{label}</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-sm hover:scale-105 transition-all whitespace-nowrap"
          >
            ⬇ Download Now
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        {/* Category badge + heading */}
        <header className="mb-8">
          <div className="inline-block bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
            {label}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-3">{description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <span>By <span className="font-medium text-slate-500 dark:text-slate-400">SaveFromInternet Team</span></span>
            <span>·</span>
            <span>
              Updated:{' '}
              {new Date(lastModified ?? date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span>·</span>
            <span>{readingTime} min read</span>
            <span>·</span>
            <Link href="/" className="text-rose-400 hover:underline font-medium">
              SaveFromInternet.com
            </Link>
          </div>
        </header>

        {/* Download Now CTA Banner — top of article */}
        <div className="bg-gradient-to-r from-rose-50 to-violet-50 dark:from-rose-900/20 dark:to-violet-900/20 border border-rose-100 dark:border-rose-800/40 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="font-extrabold text-slate-800 dark:text-slate-100 text-sm sm:text-base">Ready to download? It&apos;s 100% free!</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">TikTok · Instagram · YouTube · Facebook · Twitter/X · No watermark · No app</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-extrabold px-6 py-3 rounded-xl text-sm shadow-lg hover:scale-105 transition-all whitespace-nowrap"
          >
            ⬇ Download Now — Free
          </Link>
        </div>

        {/* Blog content */}
        <div className="blog-prose">{children}</div>
        <MidArticleAd />

        {/* Mid Ad — after content */}
        <div className="my-10">
          <p className="text-[10px] text-center text-slate-400 uppercase tracking-wider mb-1.5">Advertisement</p>
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
            Download Videos Without Watermark — Free
          </h2>
          <p className="text-rose-100 mb-2">
            TikTok · Instagram Reels · YouTube Shorts · Facebook · Twitter/X
          </p>
          <p className="text-rose-100 mb-6 text-sm">
            Paste any link and get an HD video, MP3, or photo ZIP in seconds. No app, no sign-up.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-all"
          >
            ⬇ Download Now — It&apos;s Free
          </Link>
        </div>

        {/* Bottom Ad */}
        <div className="mt-10 mb-4">
          <p className="text-[10px] text-center text-slate-400 uppercase tracking-wider mb-1.5">Advertisement</p>
          <GoogleAdSense
            adSlot="2491566773"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>

        {/* Back to blog + back to top */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-6">
          <Link href="/blog" className="text-rose-500 hover:underline font-semibold text-sm flex items-center gap-1">
            ← Back to All Posts
          </Link>
          <a
            href="#top"
            className="text-slate-400 dark:text-slate-500 hover:text-rose-500 font-semibold text-sm flex items-center gap-1 transition-colors"
          >
            ↑ Back to Top
          </a>
        </div>
      </article>

      <BackToTopButton />
    </div>
  )
}
