'use client'

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { translations, languages, type LangCode, type TranslationKey } from '@/lib/translations'

const LOCALE_CODES = languages.map((l) => l.code).filter((c) => c !== 'en')

const MULTILINGUAL_PATHS = [
  '',
  '/',
  '/tiktok-video-downloader',
  '/tiktok-to-mp3',
  '/tiktok-photo-downloader',
  '/facebook-video-downloader',
  '/twitter-video-downloader',
  '/instagram-reel-downloader',
  '/instagram-video-downloader',
  '/instagram-post-downloader',
]

interface LanguageContextType {
  lang: LangCode
  setLang: (lang: LangCode) => void
  t: (key: TranslationKey) => string
  localizeUrl: (href: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => translations.en[key],
  localizeUrl: (href) => href,
})

export function LanguageProvider({ children, initialLang }: { children: ReactNode; initialLang?: LangCode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Detect locale from current route pathname (e.g. /es, /es/facebook-video-downloader, etc.)
  const pathLocale = useMemo<LangCode | null>(() => {
    if (!pathname) return null
    const firstSegment = pathname.split('/').filter(Boolean)[0]
    if (firstSegment && (LOCALE_CODES as string[]).includes(firstSegment)) {
      return firstSegment as LangCode
    }
    return null
  }, [pathname])

  const [lang, setLangState] = useState<LangCode>(() => {
    if (initialLang) return initialLang
    if (pathLocale) return pathLocale
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lang') as LangCode
        if (saved && languages.some((l) => l.code === saved)) {
          return saved
        }
      } catch {}
    }
    return 'en'
  })

  // Sync when pathname or initialLang changes
  useEffect(() => {
    if (pathLocale) {
      setLangState(pathLocale)
      try {
        localStorage.setItem('lang', pathLocale)
        document.cookie = `NEXT_LOCALE=${pathLocale}; path=/; max-age=31536000; SameSite=Lax`
      } catch {}
    } else {
      // Non-locale route (e.g. / or /facebook-video-downloader)
      try {
        const saved = localStorage.getItem('lang') as LangCode
        if (saved && saved !== 'en' && languages.some((l) => l.code === saved)) {
          setLangState(saved)
          // If on a supported multilingual page without locale prefix, route to saved locale
          const cleanPath = pathname || '/'
          if (MULTILINGUAL_PATHS.includes(cleanPath)) {
            const targetPath = cleanPath === '/' ? `/${saved}` : `/${saved}${cleanPath}`
            router.replace(targetPath)
          }
          return
        }
      } catch {}
      setLangState('en')
    }
  }, [pathname, pathLocale, router])

  const setLang = useCallback((l: LangCode) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
      document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; SameSite=Lax`
    } catch {}
  }, [])

  const localizeUrl = useCallback((href: string): string => {
    if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('#')) {
      return href
    }
    if (lang === 'en') {
      return href
    }

    // Strip leading slash for parsing
    const segments = href.split('/').filter(Boolean)
    const hasLocalePrefix = (LOCALE_CODES as readonly string[]).includes(segments[0])
    const pathWithoutLocale = hasLocalePrefix ? `/${segments.slice(1).join('/')}` : (href.startsWith('/') ? href : `/${href}`)

    // Check if this path is one of the supported multilingual pages
    if (MULTILINGUAL_PATHS.includes(pathWithoutLocale)) {
      if (pathWithoutLocale === '' || pathWithoutLocale === '/') {
        return `/${lang}`
      }
      return `/${lang}${pathWithoutLocale}`
    }

    return href
  }, [lang])

  const t = useCallback((key: TranslationKey): string =>
    (translations[lang]?.[key] as string) ?? (translations.en[key] as string) ?? key,
  [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, localizeUrl }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
