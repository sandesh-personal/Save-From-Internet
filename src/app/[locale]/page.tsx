import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/lib/translations'
import HomeContent from '@/components/HomeContent'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

const localeMeta: Record<string, { title: string; description: string }> = {
  es: {
    title: 'Descargador de TikTok Gratis — Sin Marca de Agua | SaveFromInternet',
    description: 'Descarga videos de TikTok sin marca de agua en HD. Extrae MP3 y guarda fotos de carrusel. Funciona en iPhone, Android y PC. Sin app.',
  },
  pt: {
    title: 'Baixador de TikTok Grátis — Sem Marca d\'Água | SaveFromInternet',
    description: 'Baixe vídeos do TikTok sem marca d\'água em HD. Extraia MP3 e salve fotos. Funciona no iPhone, Android e PC. Sem aplicativo.',
  },
  id: {
    title: 'Unduh TikTok Gratis — Tanpa Watermark | SaveFromInternet',
    description: 'Unduh video TikTok tanpa watermark dalam kualitas HD. Ekstrak MP3 dan simpan foto karousel. Bekerja di iPhone, Android & PC.',
  },
  fr: {
    title: 'Télécharger TikTok Gratuit — Sans Filigrane | SaveFromInternet',
    description: 'Téléchargez des vidéos TikTok sans filigrane en HD. Extrayez l\'audio MP3 et sauvegardez des photos. Fonctionne sur iPhone, Android et PC.',
  },
  de: {
    title: 'TikTok Downloader Kostenlos — Kein Wasserzeichen | SaveFromInternet',
    description: 'Laden Sie TikTok-Videos ohne Wasserzeichen in HD herunter. MP3 extrahieren und Fotos speichern. Funktioniert auf iPhone, Android und PC.',
  },
  ar: {
    title: 'تنزيل تيك توك مجاناً — بدون علامة مائية | SaveFromInternet',
    description: 'نزّل مقاطع فيديو تيك توك بدون علامة مائية بجودة عالية. استخرج MP3 واحفظ الصور. يعمل على iPhone وAndroid والكمبيوتر.',
  },
  vi: {
    title: 'Tải TikTok Miễn Phí — Không Watermark | SaveFromInternet',
    description: 'Tải video TikTok không watermark chất lượng HD. Trích xuất MP3 và lưu ảnh carousel. Hoạt động trên iPhone, Android & PC.',
  },
  zh: {
    title: '免费TikTok下载器 — 无水印 | SaveFromInternet',
    description: '无水印高清下载TikTok视频。提取MP3音频，保存图片集。适用于iPhone、Android和PC。',
  },
  ja: {
    title: 'TikTok無料ダウンローダー — 透かしなし | SaveFromInternet',
    description: 'TikTok動画を透かしなしでHDダウンロード。MP3音声抽出と画像ギャラリー保存。iPhone・Android・PC対応。',
  },
  ru: {
    title: 'Бесплатный загрузчик TikTok — Без водяного знака | SaveFromInternet',
    description: 'Скачивайте видео TikTok без водяного знака в HD. Извлекайте MP3 и сохраняйте фото. Работает на iPhone, Android и ПК.',
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
  if (!(VALID_LOCALES as string[]).includes(locale)) return {}
  const meta = localeMeta[locale]
  const baseUrl = 'https://www.savefrominternet.com'
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        VALID_LOCALES.map((l) => [l, `${baseUrl}/${l}`])
      ),
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
  if (!(VALID_LOCALES as string[]).includes(locale)) notFound()
  return <HomeContent />
}
