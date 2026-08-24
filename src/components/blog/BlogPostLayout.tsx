import Link from 'next/link'
import ArticleSchema from './ArticleSchema'
import BackToTopButton from './BackToTopButton'
import GoogleAdSense from '@/components/GoogleAdSense'
import MidArticleAd from './MidArticleAd'
import RelatedPosts from './RelatedPosts'
import { type BlogCategory, categoryLabels } from '@/app/blog/blogData'

interface HowToStep {
  title: string
  text: string
}

interface Props {
  title: string
  description: string
  date: string
  lastModified?: string
  readingTime?: number
  category: BlogCategory
  currentSlug?: string
  howToSteps?: HowToStep[]
  children: React.ReactNode
}

export default function BlogPostLayout({
  title,
  description,
  date,
  lastModified,
  readingTime = 5,
  category,
  currentSlug = '',
  howToSteps,
  children,
}: Props) {
  const label = categoryLabels[category] ?? category
  const url = currentSlug
    ? `https://www.savefrominternet.com/blog/${currentSlug}`
    : 'https://www.savefrominternet.com/blog'

  const howToSchema = howToSteps?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: title,
        description,
        totalTime: `PT${readingTime}M`,
        step: howToSteps.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: step.title,
          text: step.text,
        })),
      }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.savefrominternet.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.savefrominternet.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Category: ' + label, item: 'https://www.savefrominternet.com/blog' },
      { '@type': 'ListItem', position: 4, name: title, item: url },
    ],
  }

  return (
    <div className="bg-white min-h-screen" id="top">
      <ArticleSchema title={title} description={description} date={date} lastModified={lastModified} url={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}

      {/* Sticky breadcrumb */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-16 z-40 shadow-xs">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/blog" className="text-slate-900 hover:text-black font-bold flex items-center gap-1">
              ← Blog
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 truncate max-w-[140px] sm:max-w-none">{label}</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-black hover:bg-slate-800 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-sm hover:scale-105 transition-all whitespace-nowrap"
          >
            Download Now
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-10">
        {/* Category badge + heading */}
        <header className="mb-8">
          <div className="inline-block bg-slate-100 text-slate-800 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 border border-slate-200">
            {label}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-slate-600 text-base leading-relaxed mb-3">{description}</p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>By <span className="font-semibold text-slate-700">Sandy</span></span>
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
            <Link href="/" className="text-slate-900 hover:underline font-semibold">
              SaveFromInternet.com
            </Link>
          </div>

          {/* Author bio */}
          <div className="flex items-start gap-4 mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm">
              S
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Sandy</div>
              <div className="text-xs text-slate-500 font-semibold mb-1">Founder, SaveFromInternet.com</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Building free video-download tools since 2024. Expert in web APIs, extractors, and multimedia processing across all major platforms.
              </p>
            </div>
          </div>
        </header>

        {/* Above-fold ad */}
        <div className="mb-8">
          <GoogleAdSense
            adSlot="9402513184"
            adFormat="auto"
            className="flex justify-center w-full"
            containerStyle="default"
          />
        </div>

        {/* Top CTA Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="font-bold text-slate-900 text-sm sm:text-base">Download Free HD Videos &amp; Media</p>
            <p className="text-xs text-slate-500 mt-0.5">TikTok · Instagram Reels · Facebook · Twitter/X · 100% Free · No Watermark</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href={
                currentSlug.includes('facebook')
                  ? '/facebook-video-downloader'
                  : currentSlug.includes('instagram')
                  ? '/instagram-reel-downloader'
                  : currentSlug.includes('twitter') || currentSlug.includes('x-video')
                  ? '/twitter-video-downloader'
                  : currentSlug.includes('mp3') || currentSlug.includes('audio') || currentSlug.includes('sound')
                  ? '/tiktok-to-mp3'
                  : currentSlug.includes('photo') || currentSlug.includes('image') || currentSlug.includes('carousel')
                  ? '/tiktok-photo-downloader'
                  : '/tiktok-video-downloader'
              }
              className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm hover:scale-105 transition-all whitespace-nowrap active:scale-95 cursor-pointer"
            >
              ⚡ Use Downloader Tool
            </Link>
          </div>
        </div>

        {/* Blog content */}
        <div className="blog-prose">{children}</div>
        <MidArticleAd />

        {/* Mid Ad */}
        <div className="my-10">
          <GoogleAdSense
            adSlot="3804648444"
            adFormat="auto"
            className="flex justify-center w-full"
            containerStyle="default"
          />
        </div>

        {/* Bottom CTA with Direct Tool Links */}
        <div className="bg-black rounded-3xl p-8 sm:p-10 text-center mt-10 shadow-lg text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Download Videos, Reels &amp; Audio Without Watermark
          </h2>
          <p className="text-slate-300 mb-6 text-sm sm:text-base max-w-xl mx-auto">
            Paste any link into our free browser tools. Fast HD MP4 downloads, 320kbps MP3 audio extraction, and full-resolution photo carousels.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
            <Link href="/tiktok-video-downloader" className="bg-white text-black font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-slate-100 transition-all">
              🎵 TikTok Downloader
            </Link>
            <Link href="/instagram-reel-downloader" className="bg-white text-black font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-slate-100 transition-all">
              📸 Instagram Reel Downloader
            </Link>
            <Link href="/facebook-video-downloader" className="bg-white text-black font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-slate-100 transition-all">
              📘 Facebook Video Downloader
            </Link>
            <Link href="/twitter-video-downloader" className="bg-white text-black font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-slate-100 transition-all">
              🐦 Twitter/X Downloader
            </Link>
            <Link href="/tiktok-to-mp3" className="bg-slate-800 text-white border border-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-slate-700 transition-all">
              🎧 TikTok to MP3
            </Link>
            <Link href="/tiktok-photo-downloader" className="bg-slate-800 text-white border border-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-slate-700 transition-all">
              🖼️ TikTok Photos / ZIP
            </Link>
          </div>
        </div>

        {/* Bottom Ad */}
        <div className="mt-10 mb-4">
          <GoogleAdSense
            adSlot="2491566773"
            adFormat="auto"
            className="flex justify-center w-full"
            containerStyle="default"
          />
        </div>

        <RelatedPosts category={category} currentSlug={currentSlug} />

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
          <Link href="/blog" className="text-slate-900 hover:text-black font-bold text-sm flex items-center gap-1">
            ← Back to All Posts
          </Link>
          <a
            href="#top"
            className="text-slate-400 hover:text-black font-semibold text-sm flex items-center gap-1 transition-colors"
          >
            ↑ Back to Top
          </a>
        </div>
      </article>

      <BackToTopButton />
    </div>
  )
}
