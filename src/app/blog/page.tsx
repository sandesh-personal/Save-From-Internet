'use client'
import Link from 'next/link'
import Image from 'next/image'
import GoogleAdSense from '@/components/GoogleAdSense'
import { blogPosts, categoryMeta, type BlogCategory } from './blogData'
import { useState } from 'react'

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all')

  const filtered =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-14 px-4 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-rose-100 shadow-sm">
            📖 Guides & Tips
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            TikTok Downloader{' '}
            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            {blogPosts.length} guides on downloading TikTok videos, audio, and photos — no watermark, no app.
          </p>
        </div>
      </section>

      {/* Top Ad */}
      <div className="flex justify-center py-6 px-4 border-b border-slate-100">
        <GoogleAdSense
          adSlot="5309301802"
          adFormat="auto"
          className="flex justify-center"
          containerStyle="default"
        />
      </div>

      {/* Category filter tabs */}
      <section className="bg-white px-4 pt-8 pb-2 border-b border-slate-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                activeCategory === 'all'
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-500'
              }`}
            >
              All ({blogPosts.length})
            </button>
            {(Object.entries(categoryMeta) as [BlogCategory, { label: string; icon: string }][]).map(
              ([key, { label, icon }]) => {
                const count = blogPosts.filter((p) => p.category === key).length
                if (count === 0) return null
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                      activeCategory === key
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-500'
                    }`}
                  >
                    {icon} {label} ({count})
                  </button>
                )
              }
            )}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-slate-400 text-center py-12">No posts in this category yet.</p>
          ) : (
            <div className="space-y-3">
              {filtered.map((post, index) => (
                <div key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-sm transition-all group"
                  >
                    <div className="w-20 h-20 relative rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                        priority={index < 6}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full">
                          {categoryMeta[post.category]?.icon} {categoryMeta[post.category]?.label}
                        </span>
                      </div>
                      <h2 className="text-slate-900 font-bold text-sm sm:text-base leading-snug group-hover:text-rose-500 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 text-xs mt-1 line-clamp-1 leading-relaxed hidden sm:block">
                        {post.description}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(post.lastModified).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className="text-rose-400 font-bold text-lg flex-shrink-0 group-hover:translate-x-1 transition-transform hidden sm:block">
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
      <div className="flex justify-center py-8 px-4 border-t border-slate-100">
        <GoogleAdSense
          adSlot="2491566773"
          adFormat="auto"
          className="flex justify-center"
          containerStyle="default"
        />
      </div>

      {/* CTA */}
      <section className="bg-gradient-to-r from-rose-500 to-violet-600 py-14 px-4 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Ready to Download TikTok Videos?
        </h2>
        <p className="text-rose-100 mb-8 text-lg">
          Free · No watermark · No app · iPhone, Android & PC
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-rose-600 font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-all"
        >
          ⬇ Try TikTok Downloader Free
        </Link>
      </section>
    </div>
  )
}
