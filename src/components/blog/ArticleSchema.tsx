'use client'
import { usePathname } from 'next/navigation'

interface ArticleSchemaProps {
  title: string
  description: string
  date: string
  lastModified?: string
  image?: string
}

export default function ArticleSchema({ title, description, date, lastModified, image }: ArticleSchemaProps) {
  const pathname = usePathname()
  const url = `https://www.savefrominternet.com${pathname}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished: date,
    dateModified: lastModified ?? date,
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
        url: 'https://www.savefrominternet.com/logo-circle.svg',
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.savefrominternet.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.savefrominternet.com/blog' },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}
