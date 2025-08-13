'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GoogleAdSense from './GoogleAdSense'

interface PageTransitionAdProps {
  targetPath: string
  children: React.ReactNode
  adSlot: string
  showAdDuration?: number // How long to show the ad before allowing navigation
  className?: string
}

export default function PageTransitionAd({ 
  targetPath, 
  children, 
  adSlot, 
  showAdDuration = 3000, // 3 seconds default
  className = ''
}: PageTransitionAdProps) {
  const [showAd, setShowAd] = useState(false)
  const [canNavigate, setCanNavigate] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (showAd) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev >= showAdDuration / 1000) {
            setCanNavigate(true)
            return prev
          }
          return prev + 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [showAd, showAdDuration])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowAd(true)
    setCountdown(0)
    setCanNavigate(false)
  }

  const handleNavigate = () => {
    if (canNavigate) {
      router.push(targetPath)
    }
  }

  const handleSkipAd = () => {
    setCanNavigate(true)
    setCountdown(showAdDuration / 1000)
  }

  if (showAd) {
    return (
      <div className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 ${className}`}>
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 max-w-2xl w-full border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Ad Break</h2>
            <p className="text-white/70">
              {canNavigate 
                ? "You can now continue to the page" 
                : `Please wait ${Math.ceil(showAdDuration / 1000) - countdown} seconds to continue`
              }
            </p>
          </div>

          {/* Ad Display */}
          <div className="mb-6">
            <GoogleAdSense
              adSlot={adSlot}
              adFormat="auto"
              containerStyle="none"
              showLabel={false}
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center space-x-4">
            {!canNavigate && (
              <button
                onClick={handleSkipAd}
                className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Skip Ad
              </button>
            )}
            
            <button
              onClick={handleNavigate}
              disabled={!canNavigate}
              className={`px-6 py-2 rounded-lg transition-colors ${
                canNavigate
                  ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canNavigate ? 'Continue to Page' : 'Please Wait...'}
            </button>
          </div>

          {/* Countdown Bar */}
          <div className="mt-4">
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-violet-500 h-2 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${Math.min(100, (countdown / (showAdDuration / 1000)) * 100)}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  )
}
