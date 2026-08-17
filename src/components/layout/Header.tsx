'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileTiktokOpen, setMobileTiktokOpen] = useState(false)
  const [desktopTiktokOpen, setDesktopTiktokOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  function closeAll() {
    setMobileOpen(false)
    setMobileTiktokOpen(false)
    setDesktopTiktokOpen(false)
  }

  // Close desktop TikTok dropdown on outside click
  useEffect(() => {
    if (!desktopTiktokOpen) return
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setDesktopTiktokOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [desktopTiktokOpen])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}

      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 z-50 transition-colors duration-200"
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 select-none flex-shrink-0" onClick={closeAll} aria-label="Save From Internet Home">
            <img src="/logo-final.png" width="44" height="44" alt="" aria-hidden="true" className="h-9 sm:h-11 w-auto object-contain" draggable={false} />
            <span className="font-extrabold text-slate-900 text-lg sm:text-2xl tracking-tight leading-none">
              Save From <span className="text-blue-600">Internet</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">

            {/* TikTok — click-to-open dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDesktopTiktokOpen(o => !o)}
                className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-semibold flex items-center gap-1 cursor-pointer select-none"
              >
                TikTok
                <svg
                  className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${desktopTiktokOpen ? 'rotate-180 text-blue-600' : ''}`}
                  fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {desktopTiktokOpen && (
                <div className="absolute left-0 top-full pt-1.5 z-50 min-w-[220px]">
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link href="/tiktok-video-downloader" onClick={closeAll} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">Video Downloader</Link>
                    <Link href="/tiktok-to-mp3" onClick={closeAll} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">TikTok to MP3</Link>
                    <Link href="/tiktok-photo-downloader" onClick={closeAll} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">Photo Downloader</Link>
                    <Link href="/tiktok-downloader-without-watermark" onClick={closeAll} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">No Watermark</Link>
                    <Link href="/save-tiktok-video" onClick={closeAll} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">Save TikTok Video</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Edit Photos */}
            <a
              href="https://imgeditkit.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDesktopTiktokOpen(false)}
              className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-semibold flex items-center gap-1 cursor-pointer"
            >
              Edit Photos
              <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>

            <Link href="/how-to-download-tiktok-videos" onClick={() => setDesktopTiktokOpen(false)} className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-semibold">How to Use</Link>
            <Link href="/faq" onClick={() => setDesktopTiktokOpen(false)} className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-semibold">FAQ</Link>
            <Link href="/blog" onClick={() => setDesktopTiktokOpen(false)} className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-semibold">Blog</Link>
          </nav>

          {/* Right: Language + Hamburger */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* Hamburger button — mobile only */}
            <button
              type="button"
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 rounded-xl hover:bg-slate-100 transition-all cursor-pointer touch-manipulation active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span
                className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${
                  mobileOpen ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-slate-700 mt-1 transition-all duration-200 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-slate-700 mt-1 transition-all duration-200 ${
                  mobileOpen ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/98 backdrop-blur-md pb-6 shadow-2xl max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
            <nav className="max-w-6xl mx-auto px-4 pt-3 flex flex-col gap-1.5">
              {/* TikTok — expandable accordion */}
              <div className="rounded-xl overflow-hidden">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-3.5 py-3 text-sm font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer touch-manipulation active:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMobileTiktokOpen((o) => !o)
                  }}
                >
                  <span>TikTok Tools</span>
                  <svg
                    className={`w-4 h-4 opacity-60 transition-transform duration-200 ${
                      mobileTiktokOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {mobileTiktokOpen && (
                  <div className="ml-3 flex flex-col gap-1 border-l-2 border-blue-200 pl-3 my-1">
                    <Link
                      href="/tiktok-video-downloader"
                      onClick={closeAll}
                      className="block px-3 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium touch-manipulation"
                    >
                      Video Downloader
                    </Link>
                    <Link
                      href="/tiktok-to-mp3"
                      onClick={closeAll}
                      className="block px-3 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium touch-manipulation"
                    >
                      TikTok to MP3
                    </Link>
                    <Link
                      href="/tiktok-photo-downloader"
                      onClick={closeAll}
                      className="block px-3 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium touch-manipulation"
                    >
                      Photo Downloader
                    </Link>
                    <Link
                      href="/tiktok-downloader-without-watermark"
                      onClick={closeAll}
                      className="block px-3 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium touch-manipulation"
                    >
                      No Watermark
                    </Link>
                    <Link
                      href="/save-tiktok-video"
                      onClick={closeAll}
                      className="block px-3 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium touch-manipulation"
                    >
                      Save TikTok Video
                    </Link>
                  </div>
                )}
              </div>

              {/* Edit Photos */}
              <a
                href="https://imgeditkit.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeAll}
                className="flex items-center justify-between px-3.5 py-3 text-sm font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer touch-manipulation"
              >
                <span>Edit Photos</span>
                <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>

              {/* How to Use */}
              <Link
                href="/how-to-download-tiktok-videos"
                onClick={closeAll}
                className="flex items-center px-3.5 py-3 text-sm font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer touch-manipulation"
              >
                How to Use
              </Link>

              {/* FAQ */}
              <Link
                href="/faq"
                onClick={closeAll}
                className="flex items-center px-3.5 py-3 text-sm font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer touch-manipulation"
              >
                FAQ
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                onClick={closeAll}
                className="flex items-center px-3.5 py-3 text-sm font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer touch-manipulation"
              >
                Blog
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
