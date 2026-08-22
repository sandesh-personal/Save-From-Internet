import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/lib/translations'
import FacebookVideoDownloaderPage from '@/app/facebook-video-downloader/page'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

const localeMeta: Record<string, { title: string; description: string }> = {
  id: {
    title: 'Download Video Facebook HD 2026 — Gratis & Cepat | SaveFromInternet',
    description: 'Download video Facebook kualitas Full HD 1080p, Reels, dan video FB pribadi gratis tanpa aplikasi.',
  },
  vi: {
    title: 'Tải Video Facebook HD 2026 — Miễn Phí & Nhanh Chóng | SaveFromInternet',
    description: 'Tải video Facebook và Reels chất lượng cao Full HD 1080p miễn phí trên iPhone, Android và máy tính.',
  },
  ar: {
    title: 'تنزيل فيديوهات فيسبوك بجودة HD 2026 — مجاني وسريع | SaveFromInternet',
    description: 'أفضل موقع لتنزيل مقاطع فيديو وفيسبوك ريلز بجودة Full HD 1080p مجاناً بدون برامج.',
  },
  es: {
    title: 'Descargar Videos de Facebook HD 2026 — Gratis y Rápido | SaveFromInternet',
    description: 'Descarga videos y Reels de Facebook en Full HD 1080p MP4 gratis sin instalar aplicaciones.',
  },
  pt: {
    title: 'Baixar Vídeos do Facebook HD 2026 — Grátis e Rápido | SaveFromInternet',
    description: 'Baixe vídeos e Reels do Facebook em Full HD 1080p MP4 grátis no celular e PC.',
  },
  fr: {
    title: 'Télécharger Vidéo Facebook HD 2026 — Gratuit et Rapide | SaveFromInternet',
    description: 'Téléchargez des vidéos et Reels Facebook en Full HD 1080p MP4 gratuitement sur tous les appareils.',
  },
  de: {
    title: 'Facebook Video Downloader 2026 — Kostenlos in HD 1080p | SaveFromInternet',
    description: 'Facebook Videos und Reels in Full HD 1080p MP4 kostenlos auf Handy und PC herunterladen.',
  },
  zh: {
    title: 'Facebook视频下载器 2026 — 免费高清1080p MP4 | SaveFromInternet',
    description: '一键免费下载Facebook高清视频和Reels短视频，支持iPhone、安卓和电脑。',
  },
  ja: {
    title: 'Facebook動画保存・ダウンロード 2026 — 無料HD 1080p | SaveFromInternet',
    description: 'Facebookの動画やリールを高画質Full HD 1080p MP4で無料ダウンロード。アプリ不要。',
  },
  ru: {
    title: 'Скачать видео с Фейсбук 2026 — Бесплатно в HD 1080p | SaveFromInternet',
    description: 'Скачивайте видео и Reels из Facebook в высоком качестве Full HD 1080p MP4 бесплатно.',
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
      canonical: `${baseUrl}/${locale}/facebook-video-downloader`,
      languages: {
        'x-default': `${baseUrl}/facebook-video-downloader`,
        en: `${baseUrl}/facebook-video-downloader`,
        ...Object.fromEntries(
          VALID_LOCALES.map((l) => [l, `${baseUrl}/${l}/facebook-video-downloader`])
        ),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/facebook-video-downloader`,
      type: 'website',
      siteName: 'Save From Internet',
      images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675 }],
    },
  }
}

export default async function LocaleFacebookPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locale || !(VALID_LOCALES as string[]).includes(locale)) {
    notFound()
  }
  return <FacebookVideoDownloaderPage />
}
