import { LanguageProvider } from '@/contexts/LanguageContext'
import { languages, type LangCode } from '@/lib/translations'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

export function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = (VALID_LOCALES as string[]).includes(rawLocale)
    ? (rawLocale as LangCode)
    : ('en' as LangCode)

  return <LanguageProvider initialLang={locale}>{children}</LanguageProvider>
}
