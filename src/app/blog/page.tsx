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
    <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-white text-black">
      <div className="max-w-4xl mx-auto flex flex-col">

        <h1 className="text-3xl font-bold mb-2">TikTok Downloader Blog</h1>
        <p className="text-gray-600 mb-8">Guides, tips, and tutorials for downloading TikTok videos, audio, and images</p>

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
                className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
              >
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-full md:w-32 h-24 relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="128px"
                      priority={index < 3}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-200 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-3">
                      {post.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last updated: {' '}
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