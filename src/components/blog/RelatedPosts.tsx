import Link from 'next/link'
import Image from 'next/image'
import { blogPosts, type BlogCategory } from '@/app/blog/blogData'

interface Props {
  category: BlogCategory
  currentSlug: string
}

export default function RelatedPosts({ category, currentSlug }: Props) {
  const related = blogPosts
    .filter((p) => p.category === category && p.slug !== currentSlug)
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <div className="mt-10 border-t border-slate-100 dark:border-slate-700/50 pt-8">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Related Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-lg overflow-hidden hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-indigo-500 transition-colors">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
