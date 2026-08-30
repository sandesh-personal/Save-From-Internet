import { MetadataRoute } from 'next';
import { execFileSync } from 'child_process';
import { blogPosts } from './blog/blogData';

const LOCALES = ['es', 'pt', 'id', 'fr', 'de', 'ar', 'vi', 'zh', 'ja', 'ru']

// Same date for 100+ sitemap URLs reads as synthetic to crawlers. Pull the
// real last-edited date per route from git history instead. Falls back to a
// fixed date if git isn't available or the build checkout is shallow (no
// history for that file) — most deploy environments have full history, but
// this keeps the sitemap valid either way.
const FALLBACK_DATE = '2026-08-26'
const dateCache = new Map<string, string>()

function lastModifiedFor(routeFilePath: string): string {
  const cached = dateCache.get(routeFilePath)
  if (cached) return cached
  let result = FALLBACK_DATE
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%aI', '--', routeFilePath], {
      cwd: process.cwd(),
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (out) result = out.slice(0, 10)
  } catch {
    // git unavailable or file untracked — use fallback
  }
  dateCache.set(routeFilePath, result)
  return result
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.savefrominternet.com';

  const staticPaths: { path: string; priority: number }[] = [
    { path: '', priority: 1.0 },
    // Core Programmatic Silos
    { path: '/tiktok-downloader', priority: 0.95 },
    { path: '/tiktok-downloader/without-watermark', priority: 0.9 },
    { path: '/tiktok-downloader/mp3', priority: 0.9 },
    { path: '/instagram-downloader', priority: 0.95 },
    { path: '/instagram-downloader/reels', priority: 0.9 },
    { path: '/instagram-downloader/stories', priority: 0.85 },
    { path: '/instagram-downloader/carousel', priority: 0.85 },
    { path: '/instagram-downloader/photo', priority: 0.85 },
    { path: '/facebook-downloader', priority: 0.95 },
    { path: '/facebook-downloader/reels', priority: 0.85 },
    { path: '/twitter-downloader', priority: 0.9 },
    // Platform Aliases & Legacy High-Authority Tools
    { path: '/tiktok-video-downloader', priority: 0.9 },
    { path: '/instagram-reel-downloader', priority: 0.9 },
    { path: '/facebook-video-downloader', priority: 0.9 },
    { path: '/twitter-video-downloader', priority: 0.9 },
    { path: '/instagram-video-downloader', priority: 0.8 },
    { path: '/instagram-post-downloader', priority: 0.9 },
    { path: '/tiktok-downloader-without-watermark', priority: 0.9 },
    { path: '/tiktok-to-mp3', priority: 0.9 },
    { path: '/tiktok-photo-downloader', priority: 0.9 },
    { path: '/download-tiktok-photo', priority: 0.8 },
    { path: '/tiktok-video-downloader-iphone', priority: 0.8 },
    { path: '/tiktok-video-downloader-android', priority: 0.8 },
    { path: '/tiktok-video-downloader-pc', priority: 0.8 },
    { path: '/save-tiktok-video', priority: 0.8 },
    { path: '/how-to-download-tiktok-videos', priority: 0.8 },
    { path: '/faq', priority: 0.7 },
    { path: '/blog', priority: 0.7 },
    { path: '/about', priority: 0.5 },
    { path: '/privacy-policy', priority: 0.4 },
    { path: '/terms-of-service', priority: 0.4 },
    { path: '/dmca', priority: 0.4 },
    { path: '/contact', priority: 0.4 },
    { path: '/disclaimer', priority: 0.3 },
  ];

  const multilingualPaths = [
    '',
    '/tiktok-video-downloader',
    '/tiktok-to-mp3',
    '/tiktok-photo-downloader',
    '/facebook-video-downloader',
    '/twitter-video-downloader',
    '/instagram-reel-downloader',
    '/instagram-post-downloader',
  ]

  const localePages = LOCALES.flatMap((locale) =>
    multilingualPaths.map((subPath) => ({
      url: `${baseUrl}/${locale}${subPath}`,
      // One shared page.tsx per subPath serves every locale — look up once.
      lastModified: lastModifiedFor(`src/app/[locale]${subPath}/page.tsx`),
      changeFrequency: 'weekly' as const,
      priority: subPath === '' ? 0.9 : 0.85,
    }))
  )

  const allRoutes = [
    ...staticPaths.map(({ path, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: lastModifiedFor(`src/app${path}/page.tsx`),
      changeFrequency: 'weekly' as const,
      priority,
    })),
    ...localePages,
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return allRoutes;
}
