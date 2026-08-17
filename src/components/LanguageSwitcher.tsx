'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { languages, type LangCode } from '@/lib/translations'

const LOCALE_CODES = languages.map((l) => l.code).filter((c) => c !== 'en')

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const current = languages.find((l) => l.code === lang) ?? languages[0]

  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  function handleSelect(code: LangCode) {
    setLang(code)
    setOpen(false)

    const isLocalePage = LOCALE_CODES.some((loc) => pathname === `/${loc}`)
    const isHome = pathname === '/' || isLocalePage
    if (isHome) {
      router.push(code === 'en' ? '/' : `/${code}`)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 h-10 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all cursor-pointer active:scale-95 touch-manipulation focus-visible:ring-2 focus-visible:ring-blue-500 select-none"
        aria-label="Select language"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs font-bold">{current.code.toUpperCase()}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden w-48 max-h-80 overflow-y-auto py-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {languages.map((l) => (
            <button
              type="button"
              key={l.code}
              onClick={() => handleSelect(l.code as LangCode)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/80 cursor-pointer touch-manipulation active:bg-blue-50 ${
                lang === l.code
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              <span className="text-lg leading-none">{l.flag}</span>
              <span className="truncate">{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
