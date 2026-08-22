import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/lib/translations'
import InstagramPostDownloaderPage from '@/app/instagram-post-downloader/page'

const VALID_LOCALES = languages.map((l) => l.code).filter((c) => c !== 'en')

const localeMeta: Record<string, { title: string; description: string }> = {
  id: {
    title: 'Download Postingan & Foto Instagram HD 2026 — Gratis | SaveFromInternet',
    description: 'Download foto Instagram, carousel multi-gambar, dan postingan kualitas Full HD 1080p tanpa watermark gratis.',
  },
  vi: {
    title: 'Tải Ảnh & Bài Đăng Instagram HD 2026 — Miễn Phí | SaveFromInternet',
    description: 'Tải ảnh Instagram, album carousel chất lượng Full HD 1080p không watermark miễn phí.',
  },
  ar: {
    title: 'تنزيل صور ومنشورات إنستقرام بجودة HD 2026 — مجاناً | SaveFromInternet',
    description: 'تنزيل صور إنستقرام والألبومات المتعددة بجودة Full HD 1080p مجاناً بدون تطبيقات.',
  },
  es: {
    title: 'Descargar Fotos y Posts de Instagram HD 2026 — Gratis | SaveFromInternet',
    description: 'Descarga fotos de Instagram, carruseles multi-imagen y publicaciones en Full HD 1080p gratis.',
  },
  pt: {
    title: 'Baixar Fotos e Posts do Instagram HD 2026 — Grátis | SaveFromInternet',
    description: 'Baixe fotos do Instagram, carrosséis multi-imagem e publicações em Full HD 1080p grátis.',
  },
  fr: {
    title: 'Télécharger Photos & Posts Instagram HD 2026 — Gratuit | SaveFromInternet',
    description: 'Téléchargez des photos Instagram, carrousels et publications en Full HD 1080p sans filigrane gratuitement.',
  },
  de: {
    title: 'Instagram Post & Foto Downloader HD 2026 — Kostenlos | SaveFromInternet',
    description: 'Instagram Fotos, Karussells und Beiträge in Full HD 1080p ohne Wasserzeichen kostenlos herunterladen.',
  },
  zh: {
    title: 'Instagram帖子和图片下载器 2026 — 免费高清1080p | SaveFromInternet',
    description: '免费下载Instagram图片、多图相册帖子，Full HD 1080p无水印。',
  },
  ja: {
    title: 'Instagram投稿・写真保存 2026 — 無料HD 1080p | SaveFromInternet',
    description: 'Instagramの写真、カルーセル投稿をFull HD 1080pで無料ダウンロード。透かしなし。',
  },
  ru: {
    title: 'Скачать фото и посты Instagram HD 2026 — Бесплатно | SaveFromInternet',
    description: 'Скачивайте фото Instagram, карусели и публикации в качестве Full HD 1080p бесплатно.',
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
      canonical: `${baseUrl}/${locale}/instagram-post-downloader`,
      languages: {
        'x-default': `${baseUrl}/instagram-post-downloader`,
        en: `${baseUrl}/instagram-post-downloader`,
        ...Object.fromEntries(
          VALID_LOCALES.map((l) => [l, `${baseUrl}/${l}/instagram-post-downloader`])
        ),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/instagram-post-downloader`,
      type: 'website',
      siteName: 'Save From Internet',
      images: [{ url: `${baseUrl}/og-final.jpg`, width: 1200, height: 675 }],
    },
  }
}

export default async function LocaleInstagramPostPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locale || !(VALID_LOCALES as string[]).includes(locale)) {
    notFound()
  }
  return <InstagramPostDownloaderPage />
}
