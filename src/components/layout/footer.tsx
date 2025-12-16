'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const footerClass = isHome
    ? 'mt-auto w-full text-center py-6 text-black text-base font-semibold bg-white border-t border-gray-200'
    : 'fixed bottom-0 left-0 w-full text-center py-6 text-black text-base font-semibold bg-white border-t border-gray-200 z-50'

  return (
    <footer className={footerClass}>
      <Link href="/" className="mx-2 hover:underline">Home</Link>
      <span className="mx-2 select-none">|</span>
      <Link href="/about" className="mx-2 hover:underline">About</Link>
      <span className="mx-2 select-none">|</span>
      <Link href="/privacy-policy" className="mx-2 hover:underline">Privacy Policy</Link>
      <span className="mx-2 select-none">|</span>
      <Link href="/disclaimer" className="mx-2 hover:underline">Disclaimer</Link>
      <span className="mx-2 select-none">|</span>
      <Link href="/blog" className="mx-2 hover:underline">Blog</Link>
    </footer>
  )
}
