'use client'

import { useEffect, useRef } from 'react'

interface GoogleAdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'banner'
  style?: React.CSSProperties
  className?: string
}

export default function GoogleAdSense({ 
  adSlot, 
  adFormat = 'auto',
  style = {},
  className = ''
}: GoogleAdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const adLoadedRef = useRef(false)
  const retryCountRef = useRef(0)

  useEffect(() => {
    const loadAd = () => {
      try {
        // Ensure adsbygoogle is properly initialized
        if (typeof window !== 'undefined' && adRef.current && !adLoadedRef.current) {
          // Initialize adsbygoogle if it doesn't exist
          if (!(window as any).adsbygoogle) {
            (window as any).adsbygoogle = []
          }
          
          // Ensure adsbygoogle is an array
          if (!Array.isArray((window as any).adsbygoogle)) {
            (window as any).adsbygoogle = []
          }

          const container = adRef.current
          const rect = container.getBoundingClientRect()
          
          // More strict width checking - ensure container is actually visible
          if (rect.width > 50 && rect.height > 50 && rect.top >= 0) {
            adLoadedRef.current = true
            retryCountRef.current = 0
            
            // Safely push to adsbygoogle array
            try {
              (window as any).adsbygoogle.push({})
            } catch (pushError) {
              console.error('AdSense push error:', pushError)
              adLoadedRef.current = false
            }
          } else {
            // Retry with exponential backoff, max 5 attempts
            if (retryCountRef.current < 5) {
              retryCountRef.current++
              const delay = Math.min(100 * Math.pow(2, retryCountRef.current - 1), 1000)
              setTimeout(loadAd, delay)
            } else {
              console.warn('AdSense: Container not ready after 5 attempts, skipping ad load')
            }
          }
        }
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }

    // Reset retry count when component mounts
    retryCountRef.current = 0

    // Add a longer delay to ensure DOM is fully rendered and CSS is applied
    const timer = setTimeout(() => {
      loadAd()
    }, 200)

    // Set up a resize observer to reload ads when container size changes
    if (adRef.current && typeof window !== 'undefined' && 'ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver((entries) => {
        // Only reload if ad hasn't been loaded yet and container has proper size
        if (!adLoadedRef.current) {
          const entry = entries[0]
          if (entry.contentRect.width > 50 && entry.contentRect.height > 50) {
            loadAd()
          }
        }
      })
      
      resizeObserver.observe(adRef.current)
      
      return () => {
        clearTimeout(timer)
        resizeObserver.disconnect()
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [adSlot])

  return (
    <div 
      ref={adRef}
      className={`ad-container ${className}`} 
      style={{ 
        minHeight: '100px',
        minWidth: '320px',
        width: '100%',
        display: 'block',
        ...style 
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8190424610367988"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
} 