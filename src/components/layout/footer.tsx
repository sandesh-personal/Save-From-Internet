'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const allTools = [
  { label: 'TikTok Video Downloader', href: '/tiktok-video-downloader' },
  { label: 'Instagram Reels Downloader', href: '/instagram-reel-downloader' },
  { label: 'Facebook Video Downloader', href: '/facebook-video-downloader' },
  { label: 'Twitter / X Downloader', href: '/twitter-video-downloader' },
  { label: 'TikTok to MP3 Audio', href: '/tiktok-to-mp3' },
  { label: 'TikTok Photo Downloader', href: '/tiktok-photo-downloader' },
  { label: 'Instagram Photo Downloader', href: '/instagram-post-downloader' },
  { label: 'TikTok Without Watermark', href: '/tiktok-downloader-without-watermark' },
  { label: 'Save TikTok Video', href: '/save-tiktok-video' },
  { label: 'Photo Editor Online', href: 'https://imgeditkit.com', external: true },
]

const guidesAndDevices = [
  { label: 'Download on iPhone & iPad', href: '/tiktok-video-downloader-iphone' },
  { label: 'Download on Android', href: '/tiktok-video-downloader-android' },
  { label: 'Download on PC & Mac', href: '/tiktok-video-downloader-pc' },
  { label: 'How to Download Videos', href: '/how-to-download-tiktok-videos' },
  { label: 'Instagram Reels Guide', href: '/blog/how-to-download-instagram-reels-without-watermark' },
  { label: 'Twitter (X) Video Guide', href: '/blog/download-twitter-x-videos-2026' },
  { label: 'Facebook Video Guide', href: '/blog/how-to-download-facebook-videos-complete-guide' },
  { label: 'TikTok to MP3 Guide', href: '/blog/how-to-extract-audio-from-tiktok-videos-mp3-download' },
]

const resources = [
  { label: 'Blog & Articles (90+)', href: '/blog' },
  { label: 'Frequently Asked Questions', href: '/faq' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'DMCA Policy', href: '/dmca' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'About SaveFromInternet', href: '/about' },
]

export default function Footer() {
  const { localizeUrl } = useLanguage()

  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-600">
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href={localizeUrl('/')}
              className="flex items-center gap-2.5 mb-4 select-none"
              aria-label="Save From Internet Home"
            >
              <img
                src="/logo-final.png"
                width="32"
                height="32"
                alt=""
                aria-hidden="true"
                className="h-8 w-auto object-contain"
              />
              <span className="font-bold text-slate-900 text-base tracking-tight">
                Save From <span className="text-black underline decoration-slate-400">Internet</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Free, fast, and secure social media video downloader. Save videos, Reels, and photos from TikTok, Facebook, Instagram, and Twitter (X) in HD without watermark.
            </p>
            <p className="text-slate-600 text-xs mt-4 font-medium">contact@savefrominternet.com</p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-slate-900 font-extrabold mb-4 text-xs uppercase tracking-wider">Tools</h3>
            <ul className="space-y-2.5">
              {allTools.map(({ label, href, external }) => (
                <li key={href}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-black text-sm font-medium transition-colors inline-flex items-center gap-1"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link href={localizeUrl(href)} className="text-slate-600 hover:text-black text-sm font-medium transition-colors">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Devices */}
          <div>
            <h3 className="text-slate-900 font-extrabold mb-4 text-xs uppercase tracking-wider">Guides</h3>
            <ul className="space-y-2.5">
              {guidesAndDevices.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-600 hover:text-black text-sm font-medium transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-slate-900 font-extrabold mb-4 text-xs uppercase tracking-wider">Resources &amp; Info</h3>
            <ul className="space-y-2.5">
              {resources.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-600 hover:text-black text-sm font-medium transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            &copy; 2026 SaveFromInternet.com. Not affiliated with TikTok, ByteDance, Meta, Instagram, Facebook, or X Corp.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-black transition-colors">Terms</Link>
            <Link href="/dmca" className="hover:text-black transition-colors">DMCA</Link>
            <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
            <Link href="/about" className="hover:text-black transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
