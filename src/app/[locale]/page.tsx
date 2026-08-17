import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/lib/translations'
import HomeContent from '@/components/HomeContent'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

const localeMeta: Record<string, { title: string; description: string }> = {
  id: {
    title: 'Download Video TikTok Tanpa Watermark HD 2026 — Gratis & Cepat | SaveFromInternet',
    description: 'Download video TikTok tanpa watermark kualitas HD MP4 & lagu MP3 gratis. Unduh foto carousel TikTok di HP Android, iPhone, dan PC tanpa aplikasi.',
  },
  vi: {
    title: 'Tải Video TikTok Không Logo Watermark 2026 — Miễn Phí HD | SaveFromInternet',
    description: 'Tải video TikTok không logo watermark HD MP4 và nhạc chuông MP3 miễn phí. Hỗ trợ lưu ảnh TikTok carousel trên iPhone, Android và máy tính.',
  },
  ar: {
    title: 'تنزيل فيديوهات تيك توك بدون علامة مائية 2026 — بجودة HD مجاناً | SaveFromInternet',
    description: 'أفضل موقع تنزيل تيك توك بدون علامة مائية بصيغة MP4 و MP3 مجاناً وبسرعة فائقة. يعمل على الآيفون والأندرويد والكمبيوتر بدون برامج.',
  },
  es: {
    title: 'Descargar Videos de TikTok Sin Marca de Agua 2026 — Gratis HD | SaveFromInternet',
    description: 'Descarga videos de TikTok sin marca de agua en HD MP4 y audio MP3 gratis. Guarda fotos de carrusel en iPhone, Android y PC sin instalar aplicaciones.',
  },
  pt: {
    title: 'Baixar Vídeo do TikTok Sem Marca d\'Água 2026 — Grátis HD | SaveFromInternet',
    description: 'Baixe vídeos do TikTok sem marca d\'água em HD MP4 e áudio MP3 grátis. Salve fotos de carrossel no celular Android, iPhone e PC sem instalar nada.',
  },
  fr: {
    title: 'Télécharger Vidéo TikTok Sans Filigrane 2026 — Gratuit HD | SaveFromInternet',
    description: 'Téléchargez des vidéos TikTok sans filigrane en qualité HD MP4 et MP3 gratuitement. Sauvegardez des photos carrousel sur iPhone, Android et PC.',
  },
  de: {
    title: 'TikTok Video Downloader Ohne Wasserzeichen 2026 — Kostenlos HD | SaveFromInternet',
    description: 'TikTok Videos ohne Wasserzeichen in Full HD MP4 und MP3 kostenlos downloaden. Fotos & Slideshows auf iPhone, Android & PC ohne App speichern.',
  },
  zh: {
    title: 'TikTok无水印视频下载器 2026 — 免费高清MP4/MP3 | SaveFromInternet',
    description: '一键免费下载TikTok无水印高清视频(MP4)和提取MP3音频。支持批量保存图片相册，适用于iPhone、安卓和电脑。',
  },
  ja: {
    title: 'TikTok動画保存・透かしなしダウンロード 2026 — 無料HD | SaveFromInternet',
    description: 'TikTokの動画を透かし（ロゴ）なしで高画質HD MP4保存＆MP3音声抽出。iPhone・Android・PCでアプリなしで無料ダウンロード。',
  },
  ru: {
    title: 'Скачать видео с Тик Ток без водяного знака 2026 — Бесплатно HD | SaveFromInternet',
    description: 'Скачивайте видео из TikTok без водяного знака в HD MP4 и музыку в MP3 бесплатно. Сохраняйте фото и слайдшоу на iPhone, Android и ПК.',
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
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'x-default': baseUrl,
        en: baseUrl,
        ...Object.fromEntries(
          VALID_LOCALES.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}`,
      type: 'website',
      siteName: 'Save From Internet',
      images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675 }],
    },
  }
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locale || !(VALID_LOCALES as string[]).includes(locale)) {
    notFound()
  }
  return <HomeContent />
}
