'use client'
import { usePathname } from 'next/navigation'

interface ArticleSchemaProps {
  title: string
  description: string
  date: string
  image?: string
}

export default function ArticleSchema({ title, description, date, image }: ArticleSchemaProps) {
  const pathname = usePathname()
  const url = `https://www.savefrominternet.com${pathname}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished: date,
    dateModified: date,
    image: image ?? 'https://www.savefrominternet.com/og-final.jpg',
    author: {
      '@type': 'Organization',
      name: 'SaveFromInternet',
      url: 'https://www.savefrominternet.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SaveFromInternet',
      url: 'https://www.savefrominternet.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.savefrominternet.com/logo-final.png',
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
