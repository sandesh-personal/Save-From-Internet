'use client'

import { useState, useEffect, useCallback } from 'react'
import GoogleAdSense from '@/components/GoogleAdSense'
import { CheckIcon, XMarkIcon, SpinnerIcon } from '@/components/icons'

interface ProcessingAdModalProps {
  isOpen: boolean
  isReady: boolean
  hasError: boolean
  onClose: () => void
}

const COUNTDOWN_SEC = 5

export default function ProcessingAdModal({ isOpen, isReady, hasError, onClose }: ProcessingAdModalProps) {
  const [countdown, setCountdown] = useState(COUNTDOWN_SEC)

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
      <div className="bg-white rounded-lg w-full max-w-sm shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-black px-5 py-4 text-white text-center">
          <div className="flex items-center justify-center gap-2.5">
            {bothDone && !hasError ? (
              <CheckIcon className="w-5 h-5 flex-shrink-0" />
            ) : hasError && countdown === 0 ? (
              <XMarkIcon className="w-5 h-5 flex-shrink-0" />
            ) : (
              <SpinnerIcon className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-semibold text-base sm:text-lg leading-tight">
              {bothDone && !hasError
                ? 'Your video is ready'
                : hasError && countdown === 0
                ? 'Something went wrong'
                : countdown > 0
                ? `Preparing download — ${countdown}s`
                : 'Almost there'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-100">
          <div
            className="h-full bg-black transition-all duration-1000 ease-linear"
            style={{ width: `${Math.min(progress, bothDone ? 100 : 95)}%` }}
          />
        </div>

        {/* Ad area */}
        <div className="px-4 pt-3 pb-3 bg-slate-50 border-b border-slate-100">
          <div className="min-h-[250px] flex items-center justify-center">
            <GoogleAdSense
              adSlot="3804648444"
              adFormat="auto"
              className="w-full"
              containerStyle="none"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 py-4">
          <button
            onClick={onClose}
            disabled={!bothDone}
            className={`w-full py-3.5 rounded-xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
              bothDone && !hasError
                ? 'bg-black hover:bg-slate-800 text-white shadow-md hover:scale-[1.02] active:scale-[0.99] cursor-pointer'
                : bothDone && hasError
                ? 'bg-slate-200 text-slate-600 cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {bothDone && !hasError ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Now
              </>
            ) : bothDone && hasError ? (
              'Close & Try Again'
            ) : (
              `Please wait — ${countdown}s`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
