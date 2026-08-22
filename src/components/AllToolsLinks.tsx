'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface ToolLinkItem {
  title: string
  href: string
  badge?: string
}

const allTools: ToolLinkItem[] = [
  { title: 'TikTok Video Downloader', href: '/tiktok-video-downloader', badge: 'HD MP4' },
  { title: 'Instagram Reels Downloader', href: '/instagram-reel-downloader', badge: 'Reels' },
  { title: 'Facebook Video Downloader', href: '/facebook-video-downloader', badge: '1080p' },
  { title: 'Twitter / X Downloader', href: '/twitter-video-downloader', badge: 'GIFs' },
  { title: 'Instagram Post Downloader', href: '/instagram-post-downloader', badge: 'Photos' },
  { title: 'TikTok to MP3', href: '/tiktok-to-mp3', badge: 'Audio' },
  { title: 'TikTok Photo Downloader', href: '/tiktok-photo-downloader', badge: 'Slideshow' },
  { title: 'No Watermark Download', href: '/tiktok-downloader-without-watermark', badge: 'Clean' },
  { title: 'Save TikTok Video', href: '/save-tiktok-video', badge: 'Fast' },
  { title: 'iPhone Guide', href: '/tiktok-video-downloader-iphone', badge: 'iOS' },
  { title: 'Android Guide', href: '/tiktok-video-downloader-android', badge: 'APK' },
  { title: 'PC & Mac Guide', href: '/tiktok-video-downloader-pc', badge: 'Desktop' },
  { title: 'How to Download', href: '/how-to-download-tiktok-videos', badge: 'Guide' },
  { title: 'FAQ', href: '/faq', badge: 'Help' },
]

export default function AllToolsLinks() {
  const { localizeUrl } = useLanguage()

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            All Free Video &amp; Media Downloader Tools
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Explore our complete suite of free multi-platform video, audio, and photo downloaders
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {allTools.map((tool) => (
            <Link
              key={tool.href}
              href={localizeUrl(tool.href)}
              className="group flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:bg-black hover:border-black transition-all duration-150 shadow-2xs hover:shadow-md"
            >
              <div className="space-y-1">
                <span className="block text-xs sm:text-sm font-bold text-slate-900 group-hover:text-white transition-colors line-clamp-1">
                  {tool.title}
                </span>
                {tool.badge && (
                  <span className="inline-block text-[10px] font-semibold text-slate-500 group-hover:text-slate-300 transition-colors">
                    {tool.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center text-xs font-semibold text-slate-400 group-hover:text-white pt-2 transition-colors">
                <span>Open Tool</span>
                <svg className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
