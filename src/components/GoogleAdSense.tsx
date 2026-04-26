'use client'

import { useEffect, useRef } from 'react'

interface GoogleAdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'banner'
  style?: React.CSSProperties
  className?: string
  containerStyle?: 'default' | 'minimal' | 'none'
}

export default function GoogleAdSense({
  adSlot,
  adFormat = 'auto',
  style = {},
  className = '',
  containerStyle = 'default',
}: GoogleAdSenseProps) {
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try {
      const adsbygoogle = (window as any).adsbygoogle
      if (Array.isArray(adsbygoogle)) {
        adsbygoogle.push({})
      } else {
        ;(window as any).adsbygoogle = [{}]
      }
    } catch {
      // AdSense not available (e.g. ad blocker or localhost) — silent fail
    }
  }, [adSlot])

  const containerClass =
    containerStyle === 'none'
      ? ''
      : 'rounded-xl overflow-hidden'

  return (
    <div className={`${containerClass} ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-8190424610367988"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}
