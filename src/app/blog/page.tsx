import Link from 'next/link';
import { blogPosts } from './blogData';
import Image from 'next/image';
import GoogleAdSense from '@/components/GoogleAdSense';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | SaveFromInternet - TikTok Video Downloader Guides & Tips',
  description: 'Read the latest tips, guides, and updates on downloading TikTok videos, audio, and images with SaveFromInternet. Learn how to download TikTok videos without watermark in 2025.',
  keywords: [
    'TikTok blog',
    'TikTok downloader guide',
    'download TikTok videos',
    'TikTok tips',
    'TikTok tutorial',
    'video downloader guide'
  ],
  openGraph: {
    title: 'Blog | SaveFromInternet - TikTok Video Downloader Guides & Tips',
    description: 'Read the latest tips, guides, and updates on downloading TikTok videos, audio, and images with SaveFromInternet.',
    type: 'website',
    url: 'https://www.savefrominternet.com/blog',
  },
  alternates: {
    canonical: 'https://www.savefrominternet.com/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto flex flex-col">

        <h1 className="text-3xl font-bold mb-8">Blog</h1>

        {/* Top Ad */}
        <div className="mb-8">
          <GoogleAdSense
            adSlot="5309301802"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>

        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <div key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-white/10 hover:bg-white/20 p-4 rounded-lg transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 relative rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                      priority
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                    <p className="text-sm text-white/70 mt-1">{post.description}</p>
                    <p className="text-xs text-white/50 mt-1">
                      Last updated:{' '}
                      {new Date(post.lastModified).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Show ad after every 3rd blog post */}
              {(index + 1) % 3 === 0 && (
                <div className="mt-6">
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

        {/* Bottom Ad */}
        <div className="mt-12">
          <GoogleAdSense
            adSlot="2491566773"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>
      </div>
    </div>
  );
}