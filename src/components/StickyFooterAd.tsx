'use client'

import { useState, useEffect } from 'react'
import GoogleAdSense from '@/components/GoogleAdSense'

export default function StickyFooterAd() {
  const [mounted, setMounted] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const already = sessionStorage.getItem('sfi-footer-ad-dismissed')
    if (already) {
      setDismissed(true)
    }
    setMounted(true)
  }, [])

  if (!mounted || dismissed) return null

  return (
    <aside
      aria-label="Advertisement"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-xl"
      style={{ minHeight: '52px' }}
    >
      {/* Close button */}
      <button
        onClick={() => {
          setDismissed(true)
          sessionStorage.setItem('sfi-footer-ad-dismissed', '1')
        }}
        aria-label="Close bottom advertisement"
        className="absolute -top-7 right-3 bg-white border border-slate-200 rounded-full w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 text-xs shadow-md transition-transform active:scale-95"
      >
        ✕
      </button>
      <div className="flex justify-center py-1">
        <GoogleAdSense
          adSlot="3804648444"
          adFormat="auto"
          minHeight={50}
          style={{ minHeight: 50, maxWidth: 320 }}
          containerStyle="none"
        />
      </div>
    </aside>
  )
}
