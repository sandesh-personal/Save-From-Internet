import { MetadataRoute } from 'next';
import { blogPosts } from './blog/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.savefrominternet.com';

  const staticPaths = [
    '', 
    '/about', 
    '/privacy-policy', 
    '/disclaimer', 
    '/blog',
    '/tiktok-video-downloader',
    '/how-to-download-tiktok-videos',
    '/tiktok-to-mp3',
    '/tiktok-photo-downloader',
    '/tiktok-video-downloader-iphone',
    '/tiktok-video-downloader-android',
    '/faq'
  ];

  const allRoutes = [
    ...staticPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1.0 : 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return allRoutes;
}
