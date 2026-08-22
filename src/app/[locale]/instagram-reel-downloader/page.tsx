import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/lib/translations'
import InstagramReelsDownloaderPage from '@/app/instagram-reel-downloader/page'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

const localeMeta: Record<string, { title: string; description: string }> = {
  id: {
    title: 'Download Instagram Reels HD 2026 — Tanpa Watermark Gratis | SaveFromInternet',
    description: 'Download Instagram Reels dan video IG kualitas Full HD 1080p tanpa watermark gratis tanpa aplikasi.',
  },
  vi: {
    title: 'Tải Instagram Reels Không Logo 2026 — Miễn Phí HD 1080p | SaveFromInternet',
    description: 'Tải video Instagram Reels không logo watermark chất lượng cao Full HD 1080p miễn phí trên mọi thiết bị.',
  },
  ar: {
    title: 'تنزيل انستقرام ريلز بدون علامة مائية 2026 — بجودة HD مجاناً | SaveFromInternet',
    description: 'أفضل موقع لتنزيل مقاطع انستقرام ريلز وفيديوهات IG بدون علامة مائية بجودة 1080p مجاناً.',
  },
  es: {
    title: 'Descargar Reels de Instagram Sin Marca de Agua 2026 — Gratis HD | SaveFromInternet',
    description: 'Descarga Reels y videos de Instagram en Full HD 1080p sin marca de agua gratis sin instalar aplicaciones.',
  },
  pt: {
    title: 'Baixar Instagram Reels Sem Marca d\'Água 2026 — Grátis HD | SaveFromInternet',
    description: 'Baixe vídeos do Instagram Reels em Full HD 1080p sem marca d\'água grátis no celular e PC.',
  },
  fr: {
    title: 'Télécharger Instagram Reels Sans Filigrane 2026 — Gratuit HD | SaveFromInternet',
    description: 'Téléchargez des Reels et vidéos Instagram en Full HD 1080p sans filigrane gratuitement.',
  },
  de: {
    title: 'Instagram Reels Downloader Ohne Wasserzeichen 2026 — Kostenlos HD | SaveFromInternet',
    description: 'Instagram Reels und Videos ohne Wasserzeichen in Full HD 1080p MP4 kostenlos speichern.',
  },
  zh: {
    title: 'Instagram Reels下载器 2026 — 免费无水印高清1080p | SaveFromInternet',
    description: '免费下载Instagram Reels短视频和高清视频，无水印MP4，适用于所有设备。',
  },
  ja: {
    title: 'Instagramリール保存・ダウンロード 2026 — 透かしなし無料HD | SaveFromInternet',
    description: 'Instagramのリール動画やIG動画を透かしなしFull HD 1080pで無料保存。',
  },
  ru: {
    title: 'Скачать Инстаграм Рилс без водяного знака 2026 — Бесплатно HD | SaveFromInternet',
    description: 'Скачивайте Instagram Reels и видео без водяного знака в Full HD 1080p MP4 бесплатно.',
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
      canonical: `${baseUrl}/${locale}/instagram-reel-downloader`,
      languages: {
        'x-default': `${baseUrl}/instagram-reel-downloader`,
        en: `${baseUrl}/instagram-reel-downloader`,
        ...Object.fromEntries(
          VALID_LOCALES.map((l) => [l, `${baseUrl}/${l}/instagram-reel-downloader`])
        ),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/instagram-reel-downloader`,
      type: 'website',
      siteName: 'Save From Internet',
      images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675 }],
    },
  }
}

export default async function LocaleInstagramReelPage({
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
