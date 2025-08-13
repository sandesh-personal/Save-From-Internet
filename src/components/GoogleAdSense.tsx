'use client'

import { useEffect, useRef, useState } from 'react'

interface GoogleAdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'banner'
  style?: React.CSSProperties
  className?: string
  showLabel?: boolean
  labelText?: string
  containerStyle?: 'default' | 'minimal' | 'none'
}

export default function GoogleAdSense({ 
  adSlot, 
  adFormat = 'auto',
  style = {},
  className = '',
  showLabel = true,
  labelText = 'Sponsored',
  containerStyle = 'default'
}: GoogleAdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const adLoadedRef = useRef(false)
  const retryCountRef = useRef(0)
  const [adError, setAdError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Function to wait for AdSense to be ready
  const waitForAdSense = (): Promise<boolean> => {
    return new Promise((resolve) => {
      let attempts = 0
      const maxAttempts = 50 // 5 seconds max wait
      
      const check = () => {
        attempts++
        if ((window as any).adsbygoogle && Array.isArray((window as any).adsbygoogle)) {
          resolve(true)
        } else if (attempts >= maxAttempts) {
          console.error('AdSense script failed to load within timeout')
          resolve(false)
        } else {
          setTimeout(check, 100)
        }
      }
      check()
    })
  }

  useEffect(() => {
    const checkVisibility = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
        const hasSize = rect.width > 100 && rect.height > 100
        
        // Debug logging
        console.log('AdSense Debug:', {
          adSlot,
          rect: { width: rect.width, height: rect.height, top: rect.top, bottom: rect.bottom },
          isInViewport,
          hasSize,
          windowSize: { width: window.innerWidth, height: window.innerHeight }
        })
        
        if (isInViewport && hasSize) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }

    // Check visibility immediately and on scroll/resize
    checkVisibility()
    window.addEventListener('scroll', checkVisibility)
    window.addEventListener('resize', checkVisibility)

    return () => {
      window.removeEventListener('scroll', checkVisibility)
      window.removeEventListener('resize', checkVisibility)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const loadAd = async () => {
      try {
        if (typeof window !== 'undefined' && adRef.current && !adLoadedRef.current) {
          // Wait for AdSense script to be ready
          const isReady = await waitForAdSense()
          if (!isReady) {
            console.error('AdSense script failed to load')
            setAdError(true)
            return
          }
          
          const container = adRef.current
          const rect = container.getBoundingClientRect()
          
          // Debug logging for ad loading
          console.log('AdSense Load Attempt:', {
            adSlot,
            containerRect: { width: rect.width, height: rect.height, top: rect.top },
            containerStyles: {
              width: container.style.width,
              height: container.style.height,
              display: container.style.display,
              visibility: container.style.visibility
            }
          })
          
          // Strict size checking with higher thresholds
          if (rect.width > 100 && rect.height > 100 && rect.top >= 0) {
            // Force container dimensions
            container.style.width = '100%'
            container.style.minWidth = '320px'
            container.style.height = 'auto'
            container.style.minHeight = '100px'
            container.style.display = 'block'
            container.style.visibility = 'visible'
            
            adLoadedRef.current = true
            retryCountRef.current = 0
            
            // Safely push to adsbygoogle array
            try {
              (window as any).adsbygoogle.push({})
              console.log('AdSense ad loaded successfully for slot:', adSlot)
            } catch (pushError) {
              console.error('AdSense push error:', pushError)
              adLoadedRef.current = false
              setAdError(true)
            }
          } else {
            // Retry with exponential backoff, max 5 attempts
            if (retryCountRef.current < 5) {
              retryCountRef.current++
              const delay = Math.min(200 * Math.pow(2, retryCountRef.current - 1), 2000)
              setTimeout(loadAd, delay)
            } else {
              console.warn('AdSense: Container not ready after 5 attempts, skipping ad load')
              setAdError(true)
            }
          }
        }
      } catch (error) {
        console.error('AdSense error:', error)
        setAdError(true)
      }
    }

    // Reset retry count when component mounts or adSlot changes
    adLoadedRef.current = false
    retryCountRef.current = 0
    setAdError(false)

    // Add a longer delay to ensure DOM is fully rendered and CSS is applied
    const timer = setTimeout(() => {
      loadAd()
    }, 500)

    // Set up a resize observer to reload ads when container size changes
    if (adRef.current && typeof window !== 'undefined' && 'ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver((entries) => {
        // Only reload if ad hasn't been loaded yet and container has proper size
        if (!adLoadedRef.current) {
          const entry = entries[0]
          if (entry.contentRect.width > 100 && entry.contentRect.height > 100) {
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
  }, [adSlot, isVisible])

  // If ad failed to load, show a fallback
  if (adError) {
    return (
      <div className={`ad-fallback ${className}`} style={style}>
        <div className="bg-white/5 rounded-xl p-4 border border-white/20 text-center">
          <p className="text-white/50 text-sm">Ad could not be loaded</p>
        </div>
      </div>
    )
  }

  const getContainerClasses = () => {
    switch (containerStyle) {
      case 'minimal':
        return 'bg-white/5 rounded-xl p-4 border border-white/20'
      case 'none':
        return ''
      default:
        return 'bg-white/5 rounded-xl p-4 border border-white/20'
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`ad-container ${getContainerClasses()} ${className}`} 
      style={{
        ...style,
        minHeight: '120px',
        minWidth: '320px',
        width: '100%',
        display: 'block',
        visibility: 'visible'
      }}
    >
      {showLabel && (
        <h3 className="text-white font-semibold text-center mb-3">{labelText}</h3>
      )}
      <div 
        ref={adRef}
        className="ad-content"
        style={{ 
          minHeight: '100px',
          minWidth: '320px',
          width: '100%',
          height: 'auto',
          display: 'block',
          visibility: 'visible',
          position: 'relative'
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ 
            display: 'block',
            width: '100%',
            height: 'auto',
            minHeight: '100px',
            minWidth: '320px'
          }}
          data-ad-client="ca-pub-8190424610367988"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
} 