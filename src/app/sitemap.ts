import { MetadataRoute } from 'next';
import { blogPosts } from './blog/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savefrominternet.com/';

  const staticPaths = [
    '/', 
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
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified,
    })),
  ];

  return allRoutes;
}
