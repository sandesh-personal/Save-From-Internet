import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import GoogleAdSense from '@/components/GoogleAdSense'
import { blogPosts, categoryMeta, type BlogCategory } from './blogData'

export const metadata: Metadata = {
  title: 'TikTok Downloader Blog — Guides, Tips & Tutorials | SaveFromInternet',
  description: `${blogPosts.length} comprehensive guides on downloading TikTok videos, audio, and photos without watermark. Step-by-step tutorials for every device.`,
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

  // Order of categories requested by user
  const orderedCategories: BlogCategory[] = [
    'how-to',
    'no-watermark',
    'device',
    'audio',
    'photos',
    'troubleshooting',
    'comparison',
    'other-platforms',
    'legal',
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-black py-12 sm:py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-slate-200 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-slate-800 shadow-xs">
            📚 Guides, Tips &amp; Tutorials
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Video &amp; Media Downloader <span className="text-white underline decoration-slate-600">Blog</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore {blogPosts.length} step-by-step guides on downloading TikTok, Instagram, Twitter, and Facebook videos without watermark, extracting MP3 audio, and saving photo carousels.
          </p>
        </div>
      </section>

      {/* Top Leaderboard Ad */}
      <div className="flex justify-center py-6 px-4 max-w-5xl mx-auto">
        <GoogleAdSense
          adSlot="5309301802"
          adFormat="auto"
          className="flex justify-center w-full"
          containerStyle="default"
        />
      </div>

      {/* Category Filter Chips — Wrap list without horizontal scrollbar */}
      <section className="px-4 py-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <Link
            href="/blog"
            className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all ${
              activeCategory === 'all'
                ? 'bg-black text-white shadow-sm scale-[1.02]'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-black'
            }`}
          >
            All ({blogPosts.length})
          </Link>
          {orderedCategories.map((key) => {
            const count = blogPosts.filter((p) => p.category === key).length
            if (count === 0) return null
            const label = categoryMeta[key]?.label || key
            return (
              <Link
                key={key}
                href={`/blog?cat=${key}`}
                rel="nofollow"
                className={`text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${
                  activeCategory === key
                    ? 'bg-black text-white shadow-sm font-bold scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-black'
                }`}
              >
                {label} ({count})
              </Link>
            )
          })}
        </div>
      </section>

      {/* Posts Grid — Modern 3-Column Card Layout */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No posts found in this category.</p>
            <Link href="/blog" className="inline-block mt-3 text-sm font-bold text-black hover:underline">
              View all posts →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, index) => (
              <article
                key={post.slug}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-black transition-all duration-200 hover:-translate-y-0.5"
              >
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 6}
                    unoptimized={post.image.startsWith('http')}
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    {categoryMeta[post.category]?.label || 'Guide'}
                  </div>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-slate-900 font-bold text-base sm:text-lg leading-snug group-hover:text-black transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {new Date(post.lastModified).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="font-bold text-slate-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Read Guide →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Mid-Grid Native Ad */}
      <div className="flex justify-center py-6 px-4 max-w-5xl mx-auto">
        <GoogleAdSense
          adSlot="3804648444"
          adFormat="auto"
          className="flex justify-center w-full"
          containerStyle="default"
        />
      </div>

      {/* Bottom CTA Card */}
      <section className="py-12 px-4 max-w-5xl mx-auto mb-12">
        <div className="bg-black rounded-3xl p-8 sm:p-12 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white">
            Ready to Download Videos &amp; Media Without Watermark?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Paste any social media link and get your original HD MP4 video, MP3 audio, or photo ZIP in seconds. 100% free forever.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-black font-extrabold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:bg-slate-100 hover:scale-105 transition-all active:scale-95 cursor-pointer"
          >
            Download Videos Free
          </Link>
        </div>
      </section>
    </div>
  )
}
