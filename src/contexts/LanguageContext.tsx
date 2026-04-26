'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, languages, type LangCode, type TranslationKey } from '@/lib/translations'

interface LanguageContextType {
  lang: LangCode
  setLang: (lang: LangCode) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => translations.en[key],
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as LangCode
    if (saved && languages.some((l) => l.code === saved)) {
      setLangState(saved)
    }
  }, [])

  const setLang = (l: LangCode) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  const t = (key: TranslationKey): string =>
    (translations[lang][key] as string) ?? (translations.en[key] as string) ?? key

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
