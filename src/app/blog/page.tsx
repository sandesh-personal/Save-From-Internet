import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import GoogleAdSense from '@/components/GoogleAdSense'
import { blogPosts, categoryMeta, type BlogCategory } from './blogData'

export const metadata: Metadata = {
  title: 'TikTok Downloader Blog — Guides, Tips & How-Tos | SaveFromInternet',
  description: `${blogPosts.length} guides on downloading TikTok videos, audio, and photos without watermark. Step-by-step tutorials for every device.`,
  alternates: { canonical: 'https://www.savefrominternet.com/blog' },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const activeCategory = (cat ?? 'all') as BlogCategory | 'all'

  const filtered =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 dark:from-slate-800 to-white dark:to-slate-900 py-14 px-4 text-center border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-indigo-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-indigo-100 dark:border-indigo-900/40 shadow-sm">
            Guides & Tips
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            TikTok Downloader{' '}
            <span className="text-indigo-500">Blog</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            {blogPosts.length} guides on downloading TikTok videos, audio, and photos — no watermark, no app.
          </p>
        </div>
      </section>

      {/* Top Ad */}
      <div className="flex justify-center py-6 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <GoogleAdSense
          adSlot="5309301802"
          adFormat="auto"
          className="flex justify-center"
          containerStyle="default"
        />
      </div>

      {/* Category filter tabs — <a> links so Google can crawl filtered views */}
      <section className="bg-white dark:bg-slate-900 px-4 pt-8 pb-2 border-b border-slate-100 dark:border-slate-700/50 sticky top-16 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <a
              href="/blog"
              className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                activeCategory === 'all'
                  ? 'bg-indigo-500 text-white border-indigo-500'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:text-indigo-500'
              }`}
            >
              All ({blogPosts.length})
            </a>
            {(Object.entries(categoryMeta) as [BlogCategory, { label: string }][]).map(
              ([key, { label }]) => {
                const count = blogPosts.filter((p) => p.category === key).length
                if (count === 0) return null
                return (
                  <a
                    key={key}
                    href={`/blog?cat=${key}`}
                    className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                      activeCategory === key
                        ? 'bg-indigo-500 text-white border-indigo-500'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:text-indigo-500'
                    }`}
                  >
                    {label} ({count})
                  </a>
                )
              }
            )}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-white dark:bg-slate-900 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-slate-400 dark:text-slate-500 text-center py-12">No posts in this category yet.</p>
          ) : (
            <div className="space-y-3">
              {filtered.map((post, index) => (
                <div key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700/50 rounded-lg p-4 shadow-sm transition-all group"
                  >
                    <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-700/50">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                        priority={index < 6}
                        unoptimized={post.image.startsWith('http')}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
                          {categoryMeta[post.category]?.label}
                        </span>
                      </div>
                      <h2 className="text-slate-900 dark:text-white font-bold text-sm sm:text-base leading-snug group-hover:text-indigo-500 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 line-clamp-1 leading-relaxed hidden sm:block">
                        {post.description}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        {new Date(post.lastModified).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className="text-indigo-400 font-bold text-lg flex-shrink-0 group-hover:translate-x-1 transition-transform hidden sm:block">
                      →
                    </span>
                  </Link>

                  {/* Ad after every 5th post */}
                  {(index + 1) % 5 === 0 && (
                    <div className="my-6">
                      <GoogleAdSense
                        adSlot="3804648444"
                        adFormat="auto"
                        className="flex justify-center"
                        containerStyle="default"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="flex justify-center py-8 px-4 border-t border-slate-100 dark:border-slate-700/50">
        <GoogleAdSense
          adSlot="2491566773"
          adFormat="auto"
          className="flex justify-center"
          containerStyle="default"
        />
      </div>

      {/* CTA */}
      <section className="bg-indigo-500 py-14 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Download TikTok Videos?
        </h2>
        <p className="text-indigo-100 mb-8 text-lg">
          Free · No watermark · No app · iPhone, Android & PC
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg text-lg shadow-xl hover:scale-105 transition-all"
        >
          Try TikTok Downloader Free
        </Link>
      </section>
    </div>
  )
}
