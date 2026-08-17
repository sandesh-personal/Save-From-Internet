'use client'

import { useEffect, useRef, useState } from 'react'

interface GoogleAdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'banner'
  style?: React.CSSProperties
  className?: string
  containerStyle?: 'default' | 'minimal' | 'none'
  minHeight?: number | string
}

export default function GoogleAdSense({
  adSlot,
  adFormat = 'auto',
  style = {},
  className = '',
  containerStyle = 'default',
  minHeight = 250,
}: GoogleAdSenseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const pushedRef = useRef(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || pushedRef.current) return
    const el = containerRef.current
    if (!el) return

    // Use IntersectionObserver to push ads only when the slot is in/near viewport and has non-zero width
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          if (el.offsetWidth > 0 && !pushedRef.current) {
            pushedRef.current = true
            try {
              const adsbygoogle = (window as any).adsbygoogle
              if (Array.isArray(adsbygoogle)) {
                adsbygoogle.push({})
              } else {
                ;(window as any).adsbygoogle = [{}]
              }
            } catch {
              // Silently fail if adblocker is active
            }
            observer.disconnect()
          }
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isClient, adSlot])

  const containerClass =
    containerStyle === 'none'
      ? ''
      : 'rounded-2xl overflow-hidden'

  const resolvedMinHeight = typeof minHeight === 'number' ? `${minHeight}px` : minHeight

  return (
    <div
      ref={containerRef}
      className={`${containerClass} ${className} transition-all duration-200`}
      style={{ minHeight: resolvedMinHeight, width: '100%', ...style }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: resolvedMinHeight }}
        data-ad-client="ca-pub-8190424610367988"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}
