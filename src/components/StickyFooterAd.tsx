'use client'

import { useState, useEffect } from 'react'
import GoogleAdSense from '@/components/GoogleAdSense'

export default function StickyFooterAd() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Delay appearance by 4s so it doesn't fire on initial page load (CLS impact)
  useEffect(() => {
    const already = sessionStorage.getItem('sfi-footer-ad-dismissed')
    if (already) return
    const t = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(t)
  }, [])

  if (!visible || dismissed) return null

  return (
    // Mobile-only (md:hidden), fixed bottom, full width, z above content
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg">
      {/* Close button — required for AdSense anchor-ad compliance */}
      <button
        onClick={() => {
          setDismissed(true)
          sessionStorage.setItem('sfi-footer-ad-dismissed', '1')
        }}
        aria-label="Close ad"
        className="absolute -top-6 right-2 bg-white border border-slate-200 rounded-full w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 text-xs shadow-sm"
      >
        ✕
      </button>
      <div className="flex justify-center py-1">
        <GoogleAdSense
          adSlot="3804648444"
          adFormat="auto"
          style={{ minHeight: 50, width: 320 }}
          containerStyle="none"
        />
      </div>
    </div>
  )
}
