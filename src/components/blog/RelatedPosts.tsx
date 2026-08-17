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
    <div className="mt-10 border-t border-slate-100 pt-8">
      <h2 className="text-xl font-bold text-slate-900 mb-5">Related Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="p-3.5">
              <p className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
