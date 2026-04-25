'use client'

import { useState, useEffect, useCallback } from 'react'
import GoogleAdSense from '@/components/GoogleAdSense'

interface ProcessingAdModalProps {
  isOpen: boolean
  isReady: boolean       // true when API call + 5s timer both done
  hasError: boolean      // true when API returned an error
  onClose: () => void    // called when user clicks the CTA button
}

const COUNTDOWN_SEC = 5

export default function ProcessingAdModal({ isOpen, isReady, hasError, onClose }: ProcessingAdModalProps) {
  const [countdown, setCountdown] = useState(COUNTDOWN_SEC)

  /* Reset + start countdown every time the modal opens */
  useEffect(() => {
    if (!isOpen) {
      setCountdown(COUNTDOWN_SEC)
      return
    }
    setCountdown(COUNTDOWN_SEC)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isOpen])

  /* Auto-close 600ms after both ready and countdown done */
  useEffect(() => {
    if (isReady && countdown === 0 && isOpen) {
      const t = setTimeout(onClose, 600)
      return () => clearTimeout(t)
    }
  }, [isReady, countdown, isOpen, onClose])

  if (!isOpen) return null

  const bothDone = isReady && countdown === 0
  const progress = ((COUNTDOWN_SEC - countdown) / COUNTDOWN_SEC) * 100

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">

        {/* Header strip */}
        <div className="bg-gradient-to-r from-rose-500 to-violet-600 px-5 py-4 text-white text-center">
          <div className="flex items-center justify-center gap-2.5">
            {bothDone && !hasError ? (
              <span className="text-2xl">✅</span>
            ) : hasError && countdown === 0 ? (
              <span className="text-2xl">❌</span>
            ) : (
              <svg className="w-5 h-5 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            <span className="font-extrabold text-base sm:text-lg leading-tight">
              {bothDone && !hasError
                ? 'Your video is ready!'
                : hasError && countdown === 0
                ? 'Something went wrong'
                : countdown > 0
                ? `Preparing download… ${countdown}s`
                : 'Almost there…'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-violet-600 transition-all duration-1000 ease-linear"
            style={{ width: `${Math.min(progress, bothDone ? 100 : 95)}%` }}
          />
        </div>

        {/* Ad area */}
        <div className="px-5 pt-4 pb-2 min-h-[120px] flex items-center justify-center bg-slate-50 border-b border-slate-100">
          <GoogleAdSense
            adSlot="3804648444"
            adFormat="auto"
            className="flex justify-center w-full"
            containerStyle="default"
          />
        </div>

        {/* CTA */}
        <div className="px-5 py-4">
          <button
            onClick={onClose}
            disabled={!bothDone}
            className={`w-full py-3.5 rounded-xl font-extrabold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
              bothDone && !hasError
                ? 'bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.99]'
                : bothDone && hasError
                ? 'bg-slate-200 text-slate-600 cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {bothDone && !hasError ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Now
              </>
            ) : bothDone && hasError ? (
              'Close & Try Again'
            ) : (
              `Please wait… ${countdown}s`
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-2">
            Ad helps keep this tool 100% free
          </p>
        </div>
      </div>
    </div>
  )
}
