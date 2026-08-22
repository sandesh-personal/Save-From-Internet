import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/lib/translations'
import InstagramReelsDownloaderPage from '@/app/instagram-reel-downloader/page'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

export function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!locale || !(VALID_LOCALES as string[]).includes(locale)) return {}
  const baseUrl = 'https://www.savefrominternet.com'
  return {
    title: 'Fast Instagram Reels Downloader — Save IG Reels in HD 1080p | SaveFromInternet',
    description: 'Download Instagram Reels and videos in Full HD 1080p MP4 without watermark.',
    alternates: {
      canonical: `${baseUrl}/${locale}/instagram-reel-downloader`,
    },
  }
}

export default async function LocaleInstagramVideoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locale || !(VALID_LOCALES as string[]).includes(locale)) {
    notFound()
  }
  return <InstagramReelsDownloaderPage />
}
