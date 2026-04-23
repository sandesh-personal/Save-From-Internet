'use client'
import { useEffect, useState } from 'react'

export default function BackToTopButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return show ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 bg-rose-500 hover:bg-rose-600 text-white w-12 h-12 rounded-full shadow-lg shadow-rose-500/30 flex items-center justify-center text-xl font-bold transition-all hover:scale-110"
      aria-label="Back to top"
    >
      ↑
    </button>
  ) : null
}
