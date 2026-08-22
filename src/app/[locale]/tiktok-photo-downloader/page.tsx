import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/lib/translations'
import TikTokPhotoDownloaderPage from '@/app/tiktok-photo-downloader/page'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

const localeMeta: Record<string, { title: string; description: string }> = {
  id: {
    title: 'Download Foto TikTok & Carousel HD 2026 — Gratis | SaveFromInternet',
    description: 'Download foto dan gambar carousel TikTok kualitas asli HD gratis. Simpan satu per satu atau unduh ZIP.',
  },
  vi: {
    title: 'Tải Ảnh TikTok & Carousel HD 2026 — Miễn Phí | SaveFromInternet',
    description: 'Tải ảnh và album carousel TikTok chất lượng HD gốc miễn phí. Lưu từng ảnh hoặc tải ZIP.',
  },
  ar: {
    title: 'تنزيل صور تيك توك والألبومات بجودة HD 2026 — مجاناً | SaveFromInternet',
    description: 'تنزيل صور وعروض شرائح تيك توك بالجودة الأصلية مجاناً بدون تطبيقات.',
  },
  es: {
    title: 'Descargar Fotos de TikTok y Carrusel HD 2026 — Gratis | SaveFromInternet',
    description: 'Descarga fotos e imágenes de carrusel de TikTok en calidad HD original gratis. Guarda individualmente o como ZIP.',
  },
  pt: {
    title: 'Baixar Fotos do TikTok & Carrossel HD 2026 — Grátis | SaveFromInternet',
    description: 'Baixe fotos e carrosséis do TikTok em qualidade HD original grátis. Salve individualmente ou em ZIP.',
  },
  fr: {
    title: 'Télécharger Photos TikTok & Carrousel HD 2026 — Gratuit | SaveFromInternet',
    description: 'Téléchargez les photos et carrousels TikTok en qualité HD originale gratuitement.',
  },
  de: {
    title: 'TikTok Foto & Karussell Downloader HD 2026 — Kostenlos | SaveFromInternet',
    description: 'TikTok Fotos und Karussell-Bilder in Original-HD-Qualität kostenlos herunterladen. Einzeln oder als ZIP.',
  },
  zh: {
    title: 'TikTok图片和相册下载器 2026 — 免费高清 | SaveFromInternet',
    description: '免费下载TikTok原始高清图片和图片幻灯片相册，支持单张保存或ZIP批量下载。',
  },
  ja: {
    title: 'TikTok写真・カルーセル保存 2026 — 無料HD | SaveFromInternet',
    description: 'TikTokの写真やフォトスライドショーを高画質HDで無料ダウンロード。個別保存またはZIP一括保存。',
  },
  ru: {
    title: 'Скачать фото из TikTok и карусели HD 2026 — Бесплатно | SaveFromInternet',
    description: 'Скачивайте фото и слайдшоу из TikTok в оригинальном HD качестве бесплатно. Поштучно или в ZIP.',
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
      canonical: `${baseUrl}/${locale}/tiktok-photo-downloader`,
      languages: {
        'x-default': `${baseUrl}/tiktok-photo-downloader`,
        en: `${baseUrl}/tiktok-photo-downloader`,
        ...Object.fromEntries(
          VALID_LOCALES.map((l) => [l, `${baseUrl}/${l}/tiktok-photo-downloader`])
        ),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/tiktok-photo-downloader`,
      type: 'website',
      siteName: 'Save From Internet',
      images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675 }],
    },
  }
}

export default async function LocaleTikTokPhotoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locale || !(VALID_LOCALES as string[]).includes(locale)) {
    notFound()
  }
  return <TikTokPhotoDownloaderPage />
}
