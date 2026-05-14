import Link from 'next/link'
import { headers } from 'next/headers'
import GoogleAdSense from '@/components/GoogleAdSense'
import BackToTopButton from './BackToTopButton'
import MidArticleAd from './MidArticleAd'
import ArticleSchema from './ArticleSchema'
import RelatedPosts from './RelatedPosts'
import type { ReactNode } from 'react'
import type { BlogCategory } from '@/app/blog/blogData'

interface BlogPostLayoutProps {
  title: string
  description: string
  date: string
  lastModified?: string
  category: BlogCategory
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

export default async function BlogPostLayout({ title, description, date, lastModified, category, children }: BlogPostLayoutProps) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  const url = `https://www.savefrominternet.com${pathname}`
  const currentSlug = pathname.split('/').filter(Boolean).pop() ?? ''

  const label = categoryLabels[category] ?? category
  const wordCount = extractText(children).split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.round(wordCount / 200))

  const howToSchema = category === 'how-to' ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Copy the TikTok URL',
        text: "Open TikTok, tap the Share button on the video, then tap 'Copy Link'. On desktop, copy the URL from the address bar.",
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Paste on SaveFromInternet.com',
        text: "Open savefrominternet.com in your browser, paste the link into the input field, and click 'Download TikTok Video'.",
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Download and Save',
        text: "Click 'Download MP4' for a watermark-free video, 'Extract MP3' for audio only, or select photos from a carousel and download as a ZIP.",
      },
    ],
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.savefrominternet.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.savefrominternet.com/blog' },
      { '@type': 'ListItem', position: 3, name: label, item: url },
    ],
  }

  return (
    <div className="bg-white dark:bg-slate-900" id="top">
      <ArticleSchema title={title} description={description} date={date} lastModified={lastModified} url={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}

      {/* Sticky breadcrumb */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/50 px-4 py-3 sticky top-16 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/blog" className="text-indigo-500 hover:underline font-semibold flex items-center gap-1">
              ← Blog
            </Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-400 dark:text-slate-500 truncate max-w-[140px] sm:max-w-none">{label}</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-1.5 rounded-full text-xs shadow-sm hover:scale-105 transition-all whitespace-nowrap"
          >
            Download Now
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        {/* Category badge + heading */}
        <header className="mb-8">
          <div className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {label}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-3">{description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <span>By <span className="font-medium text-slate-500 dark:text-slate-400">Sandy</span></span>
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
            <Link href="/" className="text-indigo-400 hover:underline font-medium">
              SaveFromInternet.com
            </Link>
          </div>

          {/* Author bio */}
          <div className="flex items-start gap-4 mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/50">
            <div className="w-11 h-11 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
              S
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Sandy</div>
              <div className="text-xs text-indigo-500 mb-1.5">Founder, SaveFromInternet.com</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Building free video-download tools since 2024. Expert in web APIs, TikTok extractors, and multimedia processing across all major platforms.
              </p>
            </div>
          </div>
        </header>

        {/* Above-fold ad — Blog Top of Article */}
        <div className="mb-8">
          <p className="text-[10px] text-center text-slate-400 uppercase tracking-wider mb-1.5">Advertisement</p>
          <GoogleAdSense
            adSlot="9402513184"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>

        {/* Top CTA Banner */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40 rounded-lg p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base">Download TikTok videos — 100% free</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">TikTok · Instagram · YouTube · Facebook · Twitter/X · No watermark · No app</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg text-sm shadow-lg hover:scale-105 transition-all whitespace-nowrap"
          >
            Download Now
          </Link>
        </div>

        {/* Blog content */}
        <div className="blog-prose">{children}</div>
        <MidArticleAd />

        {/* Mid Ad */}
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
        <div className="bg-indigo-500 rounded-lg p-8 text-center mt-10">
          <h2 className="text-2xl font-bold text-white mb-3">
            Download Videos Without Watermark — Free
          </h2>
          <p className="text-indigo-100 mb-2">
            TikTok · Instagram Reels · YouTube Shorts · Facebook · Twitter/X
          </p>
          <p className="text-indigo-100 mb-6 text-sm">
            Paste any link and get an HD video, MP3, or photo ZIP in seconds. No app, no sign-up.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg text-lg shadow-xl hover:scale-105 transition-all"
          >
            Download Now
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

        <RelatedPosts category={category} currentSlug={currentSlug} />

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-6">
          <Link href="/blog" className="text-indigo-500 hover:underline font-semibold text-sm flex items-center gap-1">
            ← Back to All Posts
          </Link>
          <a
            href="#top"
            className="text-slate-400 dark:text-slate-500 hover:text-indigo-500 font-semibold text-sm flex items-center gap-1 transition-colors"
          >
            ↑ Back to Top
          </a>
        </div>
      </article>

      <BackToTopButton />
    </div>
  )
}
