import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/lib/translations'
import TikTokVideoDownloaderPage from '@/app/tiktok-video-downloader/page'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

const localeMeta: Record<string, { title: string; description: string }> = {
  id: {
    title: 'Download Video TikTok Tanpa Watermark HD 2026 — Gratis | SaveFromInternet',
    description: 'Download video TikTok tanpa watermark kualitas Full HD 1080p MP4 gratis. Ekstrak audio MP3 dan simpan foto carousel.',
  },
  vi: {
    title: 'Tải Video TikTok Không Logo Watermark HD 2026 — Miễn Phí | SaveFromInternet',
    description: 'Tải video TikTok không watermark chất lượng Full HD 1080p MP4 miễn phí. Hỗ trợ tải MP3 và ảnh carousel.',
  },
  ar: {
    title: 'تنزيل فيديوهات تيك توك بدون علامة مائية 2026 — بجودة HD مجاناً | SaveFromInternet',
    description: 'تنزيل فيديوهات تيك توك بدون علامة مائية بصيغة MP4 بجودة Full HD 1080p مجاناً. استخراج الصوت MP3 وتحميل الصور.',
  },
  es: {
    title: 'Descargar Videos de TikTok Sin Marca de Agua 2026 — Gratis HD | SaveFromInternet',
    description: 'Descarga videos de TikTok sin marca de agua en Full HD 1080p MP4 gratis. Extrae audio MP3 y guarda fotos de carrusel.',
  },
  pt: {
    title: 'Baixar Vídeos do TikTok Sem Marca d\'Água 2026 — Grátis HD | SaveFromInternet',
    description: 'Baixe vídeos do TikTok sem marca d\'água em Full HD 1080p MP4 grátis. Extraia áudio MP3 e salve fotos de carrossel.',
  },
  fr: {
    title: 'Télécharger Vidéo TikTok Sans Filigrane 2026 — Gratuit HD | SaveFromInternet',
    description: 'Téléchargez des vidéos TikTok sans filigrane en Full HD 1080p MP4 gratuitement. Extraction audio MP3 et sauvegarde de photos.',
  },
  de: {
    title: 'TikTok Video Downloader Ohne Wasserzeichen 2026 — Kostenlos HD | SaveFromInternet',
    description: 'TikTok Videos ohne Wasserzeichen in Full HD 1080p MP4 kostenlos downloaden. MP3-Audio extrahieren und Foto-Karussells speichern.',
  },
  zh: {
    title: 'TikTok无水印视频下载器 2026 — 免费高清MP4 | SaveFromInternet',
    description: '免费下载TikTok无水印高清视频MP4和提取MP3音频。支持批量保存图片相册。',
  },
  ja: {
    title: 'TikTok動画保存・透かしなしダウンロード 2026 — 無料HD | SaveFromInternet',
    description: 'TikTokの動画を透かしなしで高画質HD 1080p MP4保存＆MP3音声抽出。アプリ不要で無料。',
  },
  ru: {
    title: 'Скачать видео с Тик Ток без водяного знака 2026 — Бесплатно HD | SaveFromInternet',
    description: 'Скачивайте видео из TikTok без водяного знака в HD 1080p MP4 и музыку в MP3 бесплатно.',
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
      canonical: `${baseUrl}/${locale}/tiktok-video-downloader`,
      languages: {
        'x-default': `${baseUrl}/tiktok-video-downloader`,
        en: `${baseUrl}/tiktok-video-downloader`,
        ...Object.fromEntries(
          VALID_LOCALES.map((l) => [l, `${baseUrl}/${l}/tiktok-video-downloader`])
        ),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/tiktok-video-downloader`,
      type: 'website',
      siteName: 'Save From Internet',
      images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675 }],
    },
  }
}

export default async function LocaleTikTokVideoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locale || !(VALID_LOCALES as string[]).includes(locale)) {
    notFound()
  }
  return <TikTokVideoDownloaderPage />
}
