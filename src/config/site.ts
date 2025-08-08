export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Save From Internet',
  description:
    '',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
  ],
  ogImage: '/og-final.jpg',
  links: {
    github: 'https://github.com/sandesh-personal/Save-From-Internet',
    websiteUrl: 'https://www.savefrominternet.com',
  },
  openGraph: {
    locale: 'en_US',
    type: 'website',
  },
  email: 'contact@savefrominternet.com',
}
