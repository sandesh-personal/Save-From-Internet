import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto flex flex-col">
        <div className="text-center mb-6 md:mb-8">
          <Link href="/">
            <div className="inline-block cursor-pointer">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                Save From Internet
              </h1>
            </div>
          </Link>
          <p className="text-sm md:text-base text-white/70 mb-4">
            Download TikTok videos without watermarks, extract MP3 audio, or save images.
          </p>
        </div>

        <h1 className="text-4xl font-bold mb-8">Blog</h1>

        <div className="space-y-8">

          {/* Blog Post Card */}
          <Link
            href="/blog/how-to-download-tiktok-videos-without-watermark-2025"
            className="block bg-white/10 hover:bg-white/20 p-4 rounded-lg transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src="/images/main.png"
                alt="Download TikTok videos"
                className="w-20 h-20 rounded object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  How to Download TikTok Videos Without Watermark in 2025
                </h2>
                <p className="text-sm text-white/70 mt-1">
                 
                </p>
              </div>
            </div>
          </Link>

          {/* You can add more blog posts below using the same format */}

        </div>
      </div>
    </div>
  );
}
