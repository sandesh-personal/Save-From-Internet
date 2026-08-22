import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/lib/translations'
import TikTokToMp3Page from '@/app/tiktok-to-mp3/page'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

const localeMeta: Record<string, { title: string; description: string }> = {
  id: {
    title: 'TikTok ke MP3 — Konverter Audio TikTok Gratis 2026 | SaveFromInternet',
    description: 'Ekstrak dan download audio MP3 dari video TikTok kualitas tinggi gratis. Tanpa aplikasi, langsung di browser.',
  },
  vi: {
    title: 'TikTok sang MP3 — Chuyển đổi Âm thanh TikTok Miễn Phí 2026 | SaveFromInternet',
    description: 'Trích xuất và tải nhạc MP3 chất lượng cao từ video TikTok miễn phí trên mọi thiết bị.',
  },
  ar: {
    title: 'تحويل تيك توك إلى MP3 — محول الصوت المجاني 2026 | SaveFromInternet',
    description: 'استخراج وتنزيل صوت MP3 عالي الجودة من فيديوهات تيك توك مجاناً بدون برامج.',
  },
  es: {
    title: 'TikTok a MP3 — Convertidor de Audio TikTok Gratis 2026 | SaveFromInternet',
    description: 'Extrae y descarga audio MP3 de alta calidad de videos de TikTok gratis sin aplicaciones.',
  },
  pt: {
    title: 'TikTok para MP3 — Conversor de Áudio TikTok Grátis 2026 | SaveFromInternet',
    description: 'Extraia e baixe áudio MP3 de alta qualidade de vídeos do TikTok gratuitamente.',
  },
  fr: {
    title: 'TikTok en MP3 — Convertisseur Audio TikTok Gratuit 2026 | SaveFromInternet',
    description: 'Extrayez et téléchargez de l\'audio MP3 haute qualité à partir de vidéos TikTok gratuitement.',
  },
  de: {
    title: 'TikTok zu MP3 — Kostenloser Audio-Konverter 2026 | SaveFromInternet',
    description: 'TikTok Audio als MP3 in hoher Qualität kostenlos extrahieren und herunterladen. Ohne App.',
  },
  zh: {
    title: 'TikTok转MP3 — 免费音频提取器 2026 | SaveFromInternet',
    description: '免费从TikTok视频中提取高质量MP3音频下载，无需安装任何应用。',
  },
  ja: {
    title: 'TikTokをMP3に変換 — 無料オーディオ変換 2026 | SaveFromInternet',
    description: 'TikTok動画から高音質MP3オーディオを無料で抽出・ダウンロード。アプリ不要。',
  },
  ru: {
    title: 'TikTok в MP3 — Бесплатный конвертер аудио 2026 | SaveFromInternet',
    description: 'Извлекайте и скачивайте качественный MP3-аудио из видео TikTok бесплатно без приложений.',
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
      canonical: `${baseUrl}/${locale}/tiktok-to-mp3`,
      languages: {
        'x-default': `${baseUrl}/tiktok-to-mp3`,
        en: `${baseUrl}/tiktok-to-mp3`,
        ...Object.fromEntries(
          VALID_LOCALES.map((l) => [l, `${baseUrl}/${l}/tiktok-to-mp3`])
        ),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/tiktok-to-mp3`,
      type: 'website',
      siteName: 'Save From Internet',
      images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675 }],
    },
  }
}

export default async function LocaleTikTokToMp3Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locale || !(VALID_LOCALES as string[]).includes(locale)) {
    notFound()
  }
  return <TikTokToMp3Page />
}
