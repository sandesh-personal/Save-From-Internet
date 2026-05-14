interface ToolSchemaProps {
  name: string
  url: string
  description: string
  ratingValue?: string
  ratingCount?: string
}

export default function ToolSchema({
  name,
  url,
  description,
  ratingValue = '4.8',
  ratingCount = '3142',
}: ToolSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    url,
    description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Windows, macOS, iOS, Android',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
