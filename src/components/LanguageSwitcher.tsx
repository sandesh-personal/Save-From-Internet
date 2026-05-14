'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { languages, type LangCode } from '@/lib/translations'

const LOCALE_CODES = languages.map((l) => l.code).filter((c) => c !== 'en')

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const current = languages.find((l) => l.code === lang) ?? languages[0]

  function handleSelect(code: LangCode) {
    setLang(code)
    setOpen(false)

    // If on the homepage or a locale homepage, navigate to the correct locale URL
    const isLocalePage = LOCALE_CODES.some((loc) => pathname === `/${loc}`)
    const isHome = pathname === '/' || isLocalePage
    if (isHome) {
      router.push(code === 'en' ? '/' : `/${code}`)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-all"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:block text-xs">{current.code.toUpperCase()}</span>
        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden w-44">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code as LangCode)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 ${
                  lang === l.code
                    ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-base">{l.flag}</span>
                <span>{l.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
