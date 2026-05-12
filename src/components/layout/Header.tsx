'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
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
      {/* Backdrop — sits below header (z-40) so tapping outside closes mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}

      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 z-50 transition-colors duration-200"
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 select-none flex-shrink-0" onClick={closeAll}>
            <img src="/logo-final.png" alt="Save From Internet Logo" className="h-8 w-auto object-contain" draggable={false} />
            <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-lg tracking-tight">
              Save From <span className="text-indigo-500">Internet</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">

            {/* TikTok — click-to-open dropdown */}
            <div className="relative">
              <button
                onClick={() => setDesktopTiktokOpen(o => !o)}
                className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all font-medium flex items-center gap-1 cursor-pointer select-none"
              >
                TikTok
                <svg
                  className={`w-3 h-3 opacity-50 transition-transform duration-200 ${desktopTiktokOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {desktopTiktokOpen && (
                <div className="absolute left-0 top-full pt-1.5 z-50 min-w-[210px]">
                  <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-xl py-1 overflow-hidden">
                    <Link href="/tiktok-video-downloader" onClick={closeAll} className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">Video Downloader</Link>
                    <Link href="/tiktok-to-mp3" onClick={closeAll} className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">TikTok to MP3</Link>
                    <Link href="/tiktok-photo-downloader" onClick={closeAll} className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">Photo Downloader</Link>
                    <Link href="/tiktok-downloader-without-watermark" onClick={closeAll} className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">No Watermark</Link>
                    <Link href="/save-tiktok-video" onClick={closeAll} className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">Save TikTok Video</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Instagram */}
            <a
              href="https://grabreels.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDesktopTiktokOpen(false)}
              className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all font-medium flex items-center gap-1"
            >
              Instagram
              <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>

            <Link href="/blog" onClick={() => setDesktopTiktokOpen(false)} className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all font-medium">Blog</Link>
            <Link href="/faq" onClick={() => setDesktopTiktokOpen(false)} className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all font-medium">FAQ</Link>
          </nav>

          {/* Right: Language + Theme + Hamburger */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className={`block w-5 h-0.5 bg-slate-700 dark:bg-slate-200 transition-all duration-200 ${mobileOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`block w-5 h-0.5 bg-slate-700 dark:bg-slate-200 mt-1 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-slate-700 dark:bg-slate-200 mt-1 transition-all duration-200 ${mobileOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 pb-4 shadow-lg">
            <nav className="max-w-6xl mx-auto px-4 pt-3 flex flex-col gap-1">

              {/* TikTok — expandable accordion */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                  onClick={(e) => { e.stopPropagation(); setMobileTiktokOpen(o => !o) }}
                >
                  TikTok
                  <svg className={`w-4 h-4 opacity-50 transition-transform duration-200 ${mobileTiktokOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {mobileTiktokOpen && (
                  <div className="ml-3 flex flex-col gap-0.5 border-l-2 border-indigo-100 dark:border-indigo-900 pl-3 mt-1">
                    <Link href="/tiktok-video-downloader" onClick={closeAll} className="block px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">Video Downloader</Link>
                    <Link href="/tiktok-to-mp3" onClick={closeAll} className="block px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">TikTok to MP3</Link>
                    <Link href="/tiktok-photo-downloader" onClick={closeAll} className="block px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">Photo Downloader</Link>
                    <Link href="/tiktok-downloader-without-watermark" onClick={closeAll} className="block px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">No Watermark</Link>
                    <Link href="/save-tiktok-video" onClick={closeAll} className="block px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">Save TikTok Video</Link>
                  </div>
                )}
              </div>

              {/* Instagram */}
              <a
                href="https://grabreels.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeAll}
                className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
              >
                Instagram
                <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>

              {/* Blog */}
              <Link href="/blog" onClick={closeAll} className="flex items-center px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                Blog
              </Link>

              {/* FAQ */}
              <Link href="/faq" onClick={closeAll} className="flex items-center px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                FAQ
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
