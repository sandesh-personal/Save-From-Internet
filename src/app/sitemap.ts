import { MetadataRoute } from 'next';
import { blogPosts } from './blog/blogData';

const LOCALES = ['es', 'pt', 'id', 'fr', 'de', 'ar', 'vi', 'zh', 'ja', 'ru']

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.savefrominternet.com';

  const staticPages: { path: string; lastModified: string; priority: number }[] = [
    { path: '', lastModified: '2026-08-21', priority: 1.0 },
    { path: '/tiktok-video-downloader', lastModified: '2026-08-21', priority: 0.9 },
    { path: '/instagram-reel-downloader', lastModified: '2026-08-21', priority: 0.9 },
    { path: '/facebook-video-downloader', lastModified: '2026-08-21', priority: 0.9 },
    { path: '/twitter-video-downloader', lastModified: '2026-08-21', priority: 0.9 },
    { path: '/instagram-video-downloader', lastModified: '2026-08-21', priority: 0.8 },
    { path: '/instagram-post-downloader', lastModified: '2026-08-21', priority: 0.9 },
    { path: '/tiktok-downloader-without-watermark', lastModified: '2026-08-21', priority: 0.9 },
    { path: '/tiktok-to-mp3', lastModified: '2026-08-21', priority: 0.9 },
    { path: '/tiktok-photo-downloader', lastModified: '2026-08-21', priority: 0.9 },
    { path: '/download-tiktok-photo', lastModified: '2026-08-21', priority: 0.8 },
    { path: '/tiktok-video-downloader-iphone', lastModified: '2026-08-21', priority: 0.8 },
    { path: '/tiktok-video-downloader-android', lastModified: '2026-08-21', priority: 0.8 },
    { path: '/tiktok-video-downloader-pc', lastModified: '2026-08-21', priority: 0.8 },
    { path: '/save-tiktok-video', lastModified: '2026-08-21', priority: 0.8 },
    { path: '/how-to-download-tiktok-videos', lastModified: '2026-08-21', priority: 0.8 },
    { path: '/faq', lastModified: '2026-08-21', priority: 0.7 },
    { path: '/blog', lastModified: '2026-08-21', priority: 0.7 },
    { path: '/about', lastModified: '2026-01-01', priority: 0.5 },
    { path: '/privacy-policy', lastModified: '2026-01-01', priority: 0.3 },
    { path: '/disclaimer', lastModified: '2026-08-21', priority: 0.3 },
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
      lastModified: '2026-08-21',
      changeFrequency: 'weekly' as const,
      priority: subPath === '' ? 0.9 : 0.85,
    }))
  )

  const allRoutes = [
    ...staticPages.map(({ path, lastModified, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified,
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
