import Link from 'next/link'
import Image from 'next/image'
import { blogPosts, BlogPost } from '@/app/blog/blogData'

interface RelatedBlogsProps {
  platform?: 'tiktok' | 'twitter' | 'facebook' | 'instagram-video' | 'instagram-post' | 'general'
  slugs?: string[]
  title?: string
  subtitle?: string
}

const defaultSlugsByPlatform: Record<string, string[]> = {
  tiktok: [
    'download-tiktok-videos-without-watermark-2025',
    'how-to-extract-audio-from-tiktok-videos-mp3-download',
    'how-to-download-tiktok-photos-and-image-carousels',
    'how-to-save-tiktok-videos-to-camera-roll',
  ],
  twitter: [
    'download-twitter-x-videos-2026',
    'video-downloader-without-watermark-all-platforms',
    'best-browser-video-downloader-extension',
    'online-video-downloader-all-sites',
  ],
  facebook: [
    'how-to-download-facebook-videos-complete-guide',
    'facebook-video-downloader-hd-2026',
    'video-downloader-without-watermark-all-platforms',
    'repurpose-tiktok-content',
  ],
  'instagram-video': [
    'how-to-download-instagram-reels-without-watermark',
    'instagram-reel-downloader-2026',
    'how-to-download-instagram-stories',
    'save-instagram-reels-camera-roll',
  ],
  'instagram-post': [
    'instagram-photo-downloader',
    'how-to-download-instagram-stories',
    'instagram-video-downloader-without-app',
    'how-to-download-instagram-reels-without-watermark',
  ],
  general: [
    'video-downloader-without-watermark-all-platforms',
    'how-to-download-facebook-videos-complete-guide',
    'how-to-download-instagram-reels-without-watermark',
    'download-tiktok-videos-without-watermark-2025',
  ],
}

export default function RelatedBlogs({
  platform = 'tiktok',
  slugs,
  title,
  subtitle,
}: RelatedBlogsProps) {
  const targetSlugs = slugs || defaultSlugsByPlatform[platform] || defaultSlugsByPlatform.tiktok

  // Resolve matching blog posts or fallback to top posts
  const posts: BlogPost[] = targetSlugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p))

  // If fewer than 3 resolved, supplement with top general posts
  const displayPosts = posts.length >= 3 ? posts.slice(0, 4) : blogPosts.slice(0, 4)

  const sectionHeading = title || 'Related Guides & Tutorials'
  const sectionSubheading =
    subtitle || 'Step-by-step guides and tips to get the most out of your downloads'

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-bold mb-3 border border-slate-300 shadow-2xs">
            📰 From Our Blog &amp; Knowledge Base
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            {sectionHeading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            {sectionSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-black transition-all duration-200"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/85 text-[11px] font-bold text-white shadow-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-2">
                    <span>{post.readTime || '3 min read'}</span>
                    <span>•</span>
                    <span>{post.date || post.datePublished}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-black transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-black">
                  <span>Read Article</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:scale-105 active:scale-95"
          >
            <span>Explore All Blog Articles &amp; Guides</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
