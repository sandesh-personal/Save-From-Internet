'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSGuide, setShowIOSGuide] = useState(false)

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope)
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err)
        })
    }

    // 2. Check if already installed
    if (typeof window !== 'undefined') {
      const isRunningStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      setIsStandalone(isRunningStandalone)

      // Check iOS
      const ua = window.navigator.userAgent.toLowerCase()
      const isIosDevice = /iphone|ipad|ipod/.test(ua)
      setIsIOS(isIosDevice)

      // Check dismissal state in session/local
      const dismissed = localStorage.getItem('sfi_pwa_dismissed')
      if (dismissed && Date.now() - parseInt(dismissed, 10) < 86400000 * 3) {
        setIsDismissed(true)
      }
    }

    // 3. Listen for BeforeInstallPrompt event (Chrome, Edge, Android)
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // 4. Listen for manual install trigger from Header
    const handleTriggerHeaderInstall = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            setDeferredPrompt(null)
          }
        })
      } else if (isIOS) {
        setShowIOSGuide(true)
      } else {
        alert('To install: click the Install icon in your browser address bar or menu.')
      }
    }

    window.addEventListener('trigger-pwa-install', handleTriggerHeaderInstall)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('trigger-pwa-install', handleTriggerHeaderInstall)
    }
  }, [deferredPrompt, isIOS])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
      }
    } else if (isIOS) {
      setShowIOSGuide(true)
    }
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    try {
      localStorage.setItem('sfi_pwa_dismissed', Date.now().toString())
    } catch {}
  }

  // Don't show if already running inside installed standalone app or dismissed
  if (isStandalone || isDismissed) {
    return null
  }

  return (
    <>
      {/* Floating Bottom App Install Banner */}
      {(deferredPrompt || isIOS) && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 flex items-center justify-between gap-3.5 backdrop-blur-md bg-opacity-95">
            <div className="flex items-center gap-3 min-w-0">
              <Image
                src="/logo-final.png"
                width={360}
                height={360}
                alt="SaveFromInternet Icon"
                className="w-10 h-10 rounded-xl object-contain bg-white p-1 shrink-0 shadow-xs"
              />
              <div className="min-w-0">
                <h4 className="font-extrabold text-sm text-white tracking-tight truncate">
                  Install SaveFromInternet
                </h4>
                <p className="text-xs text-slate-300 truncate">
                  Fast 1-tap HD video & audio downloads
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstallClick}
                type="button"
                className="px-3.5 py-2 bg-[#195fd7] hover:bg-[#1550b8] text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Install App
              </button>
              <button
                onClick={handleDismiss}
                type="button"
                aria-label="Dismiss banner"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Safari Install Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image src="/logo-final.png" width={360} height={360} alt="App Logo" className="w-8 h-8 rounded-lg object-contain" />
                <h3 className="font-bold text-base text-slate-900">Install on iPhone / iPad</h3>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Install the web app to your Home Screen for instant access without app store downloads:
            </p>

            <ol className="text-xs text-slate-700 space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                <span>Tap the <strong>Share</strong> button (box with upward arrow) at bottom of Safari.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                <span>Scroll down and tap <strong>Add to Home Screen</strong>.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                <span>Tap <strong>Add</strong> in top right corner.</span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  )
}
