import { MetadataRoute } from 'next';
import { blogPosts } from './blog/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://savefrominternet.com';

  const staticPaths = [
    '', 
    '/about', 
    '/privacy-policy', 
    '/disclaimer', 
    '/blog',
    '/how-to-download-tiktok-videos',
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
