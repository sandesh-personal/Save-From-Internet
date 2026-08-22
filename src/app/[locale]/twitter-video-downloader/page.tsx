import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/lib/translations'
import TwitterVideoDownloaderPage from '@/app/twitter-video-downloader/page'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

const localeMeta: Record<string, { title: string; description: string }> = {
  id: {
    title: 'Download Video Twitter (X) HD 2026 — Gratis & Cepat | SaveFromInternet',
    description: 'Download video Twitter / X dan animasi GIF kualitas Full HD 1080p MP4 gratis tanpa aplikasi.',
  },
  vi: {
    title: 'Tải Video Twitter (X) HD 2026 — Miễn Phí & Nhanh Chóng | SaveFromInternet',
    description: 'Tải video và ảnh động GIF từ Twitter (X) chất lượng Full HD 1080p MP4 miễn phí.',
  },
  ar: {
    title: 'تنزيل فيديوهات تويتر (X) بجودة HD 2026 — مجاني وسريع | SaveFromInternet',
    description: 'تنزيل مقاطع الفيديو والصور المتحركة GIF من تويتر (X) بصيغة MP4 بجودة Full HD مجاناً.',
  },
  es: {
    title: 'Descargar Videos de Twitter (X) HD 2026 — Gratis y Rápido | SaveFromInternet',
    description: 'Descarga videos y GIFs de Twitter / X en Full HD 1080p MP4 gratis sin límites.',
  },
  pt: {
    title: 'Baixar Vídeos do Twitter (X) HD 2026 — Grátis e Rápido | SaveFromInternet',
    description: 'Baixe vídeos e GIFs do Twitter (X) em Full HD 1080p MP4 grátis no celular e PC.',
  },
  fr: {
    title: 'Télécharger Vidéo Twitter (X) HD 2026 — Gratuit et Rapide | SaveFromInternet',
    description: 'Téléchargez des vidéos et GIFs Twitter (X) en Full HD 1080p MP4 gratuitement.',
  },
  de: {
    title: 'Twitter (X) Video Downloader 2026 — Kostenlos in HD 1080p | SaveFromInternet',
    description: 'Twitter (X) Videos und GIFs in Full HD 1080p MP4 kostenlos auf allen Geräten downloaden.',
  },
  zh: {
    title: 'Twitter (X) 视频下载器 2026 — 免费高清1080p MP4/GIF | SaveFromInternet',
    description: '免费下载Twitter (X)推特高清视频和GIF动图，支持手机和电脑。',
  },
  ja: {
    title: 'Twitter (X) 動画保存・ダウンロード 2026 — 無料HD 1080p | SaveFromInternet',
    description: 'Twitter (X)の動画やGIFアニメを高画質Full HD 1080p MP4で無料保存。',
  },
  ru: {
    title: 'Скачать видео с Твиттера (X) 2026 — Бесплатно в HD 1080p | SaveFromInternet',
    description: 'Скачивайте видео и GIF из Twitter (X) в качестве Full HD 1080p MP4 бесплатно.',
  },
}

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
  const meta = localeMeta[locale]
  if (!meta) return {}
  const baseUrl = 'https://www.savefrominternet.com'
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/twitter-video-downloader`,
      languages: {
        'x-default': `${baseUrl}/twitter-video-downloader`,
        en: `${baseUrl}/twitter-video-downloader`,
        ...Object.fromEntries(
          VALID_LOCALES.map((l) => [l, `${baseUrl}/${l}/twitter-video-downloader`])
        ),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/twitter-video-downloader`,
      type: 'website',
      siteName: 'Save From Internet',
      images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675 }],
    },
  }
}

export default async function LocaleTwitterPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locale || !(VALID_LOCALES as string[]).includes(locale)) {
    notFound()
  }
  return <TwitterVideoDownloaderPage />
}
