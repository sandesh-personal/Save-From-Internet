import Link from 'next/link';
import { blogPosts } from './blogData';
import Image from 'next/image';

export const metadata = {
  title: 'Blog | SaveFromInternet',
  description: 'Read the latest tips, guides, and updates on downloading TikTok videos, audio, and images with SaveFromInternet.',
};

export default function BlogPage() {
  return (
    <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto flex flex-col">


        <h1 className="text-3xl font-bold mb-8">Blog</h1>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
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
          ))}
        </div>
      </div>
    </div>
  );
}