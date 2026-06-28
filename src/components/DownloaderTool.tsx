'use client'

import { useReducer, useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { appReducer, initialState } from '@/lib/appReducer'
import {
  SpinnerIcon,
  DownloadIcon,
  MusicIcon,
  CheckIcon,
  getImagePlaceholderBase64,
} from '@/components/icons'
import GoogleAdSense from '@/components/GoogleAdSense'
import type { VideoMetadata } from '@/lib/appReducer'
import { useLanguage } from '@/contexts/LanguageContext'

interface ApiResponse {
  success: boolean
  downloadUrl?: string
  audioUrl?: string
  metadata?: VideoMetadata
  error?: string
}

export default function DownloaderTool() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [downloadCount, setDownloadCount] = useState(0)

  useEffect(() => {
    const now = new Date()
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
    const base = 72000 + dayOfYear * 312 + now.getHours() * 18
    setDownloadCount(base)
    const interval = setInterval(() => setDownloadCount((c) => c + 1), 9000)
    return () => clearInterval(interval)
  }, [])

  const handleProcess = useCallback(async (overrideUrl?: string) => {
    const urlToProcess = overrideUrl ?? state.url
    if (!urlToProcess.trim()) {
      dispatch({ type: 'SET_MESSAGE', payload: t('msgEnterUrl') })
      return
    }
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'RESET_DOWNLOAD_STATE' })
    try {
      const data: ApiResponse = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlToProcess, type: state.downloadType }),
      }).then((r) => r.json())
      if (data.success && data.downloadUrl && data.metadata) {
        dispatch({ type: 'SET_DOWNLOAD_SUCCESS', payload: { downloadUrl: data.downloadUrl, audioUrl: data.audioUrl, metadata: data.metadata } })
        dispatch({ type: 'SET_URL', payload: '' })
        setTimeout(() => {
          if (containerRef.current) {
            const r = containerRef.current.querySelector('.results-section')
            if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      } else {
        dispatch({ type: 'SET_MESSAGE', payload: data.error || t('msgError') })
      }
    } catch {
      dispatch({ type: 'SET_MESSAGE', payload: t('msgError') })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [state.url, state.downloadType, t])

  // Auto-fill and auto-submit when ?url= query param is present
  useEffect(() => {
    const paramUrl = searchParams.get('url')
    if (!paramUrl) return
    dispatch({ type: 'SET_URL', payload: paramUrl })
    handleProcess(paramUrl)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleVideoDownload = () => {
    if (!state.downloadUrl) return
    const link = document.createElement('a')
    link.href = state.downloadUrl
    link.download = `savefrominternet.com-tiktok-${Date.now()}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    dispatch({ type: 'SET_MESSAGE', payload: t('msgSuccess') })
    dispatch({ type: 'SET_URL', payload: '' })
  }

  const handleAudioDownload = () => {
    if (!state.audioUrl) return
    const link = document.createElement('a')
    link.href = state.audioUrl
    link.download = `savefrominternet.com-tiktok-audio-${Date.now()}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    dispatch({ type: 'SET_MESSAGE', payload: t('msgAudioSuccess') })
    dispatch({ type: 'SET_URL', payload: '' })
  }

  const handleImageDownload = async () => {
    if (!state.videoMetadata?.images) return
    const selectedImages = state.videoMetadata.images.filter((img) => img.selected)
    if (selectedImages.length === 0) {
      dispatch({ type: 'SET_MESSAGE', payload: t('labelSelectImages') })
      return
    }
    dispatch({ type: 'SET_DOWNLOADING_IMAGES', payload: true })
    try {
      const imageUrls = selectedImages.map((img) => img.url)
      if (state.downloadImagesAsZip) {
        const response = await fetch('/api/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrls, title: state.videoMetadata.title, asZip: true }),
        })
        if (!response.ok) throw new Error()
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `savefrominternet.com-images-${Date.now()}.zip`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(blobUrl)
        dispatch({ type: 'SET_MESSAGE', payload: `${selectedImages.length} image(s) downloaded as ZIP!` })
        dispatch({ type: 'SET_URL', payload: '' })
      } else {
        const response = await fetch('/api/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrls, asZip: false }),
        })
        if (!response.ok) throw new Error()
        const data = await response.json()
        if (!data.success || !data.images) throw new Error()
        for (const imageData of data.images) {
          try {
            const r = await fetch(imageData.url)
            if (!r.ok) continue
            const blob = await r.blob()
            const blobUrl = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = blobUrl
            link.download = imageData.filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(blobUrl)
            await new Promise((res) => setTimeout(res, 500))
          } catch { /* skip failed image */ }
        }
        dispatch({ type: 'SET_MESSAGE', payload: `${selectedImages.length} image(s) downloaded!` })
        dispatch({ type: 'SET_URL', payload: '' })
      }
    } catch {
      dispatch({ type: 'SET_MESSAGE', payload: t('msgError') })
    } finally {
      dispatch({ type: 'SET_DOWNLOADING_IMAGES', payload: false })
    }
  }

  const toggleImageGallery = () => dispatch({ type: 'TOGGLE_IMAGE_GALLERY' })
  const toggleImageSelection = (id: string) => dispatch({ type: 'TOGGLE_IMAGE_SELECTION', payload: id })
  const selectAllImages = (selected: boolean) => dispatch({ type: 'SELECT_ALL_IMAGES', payload: selected })
  const togglePreview = () => dispatch({ type: 'TOGGLE_PREVIEW' })

  const handleReset = () => {
    dispatch({ type: 'RESET_DOWNLOAD_STATE' })
    dispatch({ type: 'SET_URL', payload: '' })
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const isBusy = state.loading || state.downloading || state.downloadingAudio || state.downloadingImages

  return (
    <div ref={containerRef}>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-indigo-50/50 dark:from-indigo-950/20 via-white dark:via-slate-900 to-white dark:to-slate-900 text-center pt-14 pb-8 px-4">
        <div className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 text-indigo-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
          {t('heroBadge')}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
          {t('heroTitle1')}{' '}
          <span className="text-indigo-500">
            {t('heroTitle2')}
          </span>
        </h1>

        <h2 className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-7 font-normal leading-relaxed">
          {t('heroSubtitle')}
        </h2>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
          {([
            t('badgeNoWatermark'),
            t('badgeHD'),
            t('badgeFree'),
            t('badgeNoApp'),
            t('badgeUnlimited'),
          ]).map((badge) => (
            <span key={badge} className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {badge}
            </span>
          ))}
        </div>

        {/* Social proof counter — fixed height prevents CLS when count hydrates */}
        <div className="mt-5 h-6 flex items-center justify-center">
        {downloadCount > 0 && (
          <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
            <span>
              <strong className="text-slate-700 dark:text-slate-200">{downloadCount.toLocaleString()}</strong> videos downloaded today
            </span>
          </div>
        )}
        </div>
      </section>

      {/* ── Input Card ── */}
      <div className="max-w-2xl mx-auto px-4 -mt-2 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl shadow-slate-200/60 dark:shadow-slate-900/60 border border-slate-100 dark:border-slate-700 p-5">
          {/* URL row */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder={t('inputPlaceholder')}
              value={state.url}
              onChange={(e) => dispatch({ type: 'SET_URL', payload: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && !isBusy && handleProcess()}
              className="flex-1 min-w-0 px-4 py-3.5 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-base transition-all"
            />
            <button
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText()
                  dispatch({ type: 'SET_URL', payload: text })
                } catch {
                  alert('Failed to paste. Please paste manually.')
                }
              }}
              className="shrink-0 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg transition-all text-sm border border-slate-200 dark:border-slate-600 active:scale-95"
            >
              {t('btnPaste')}
            </button>
          </div>

          {/* Main CTA */}
          <button
            onClick={() => handleProcess()}
            disabled={isBusy}
            className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-all duration-200 text-base sm:text-lg shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            {state.loading ? (
              <><SpinnerIcon className="h-5 w-5" /> {t('btnProcessing')}</>
            ) : (
              <><DownloadIcon className="h-5 w-5" /> {t('btnDownload')}</>
            )}
          </button>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">
            {t('inputNote')}
          </p>
        </div>

        {/* Desktop leaderboard (728×90) — hidden on mobile */}
        <div className="hidden md:block mt-4">
          <p className="text-[10px] text-center text-slate-400 uppercase tracking-wider mb-1.5">Advertisement</p>
          <GoogleAdSense
            adSlot="9402513184"
            adFormat="auto"
            style={{ minHeight: 90 }}
            className="flex justify-center w-full"
            containerStyle="default"
          />
        </div>

        {/* Mobile ad — auto format, shown only on small screens */}
        <div className="md:hidden mt-4" style={{ minHeight: '120px' }}>
          <GoogleAdSense
            adSlot="5309301802"
            adFormat="auto"
            className="flex justify-center w-full"
            containerStyle="default"
          />
        </div>
      </div>

      {/* ── Results / Empty State ── */}
      <div className="results-section max-w-2xl mx-auto px-4 pb-4">
        {/* Status message */}
        {state.message && (
          <div className={`p-4 rounded-lg text-center text-sm mb-4 font-medium ${
            state.message.includes('success') || state.message.includes('🎉') || state.message.includes('🎵')
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}>
            {state.message}
          </div>
        )}

        {/* Empty state — 3-step guide */}
        {!state.videoMetadata && !state.message && (
          <div className="grid grid-cols-3 gap-2 mt-2 mb-6">
            {[
              { n: '1', step: t('step1'), hint: t('step1hint') },
              { n: '2', step: t('step2'), hint: t('step2hint') },
              { n: '3', step: t('step3'), hint: t('step3hint') },
            ].map(({ n, step, hint }) => (
              <div key={step} className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="text-xs font-bold text-indigo-500 mb-1">{n}</div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{step}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 hidden sm:block">{hint}</p>
              </div>
            ))}
          </div>
        )}

        {/* Video metadata + download */}
        {state.videoMetadata && (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-md p-5 space-y-4">
            {/* Metadata row */}
            <div className="flex items-start gap-3">
              {state.videoMetadata.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={state.videoMetadata.thumbnail}
                  alt="TikTok video thumbnail"
                  width={72}
                  height={72}
                  className="rounded-lg object-cover flex-shrink-0 border border-slate-100 dark:border-slate-700"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 dark:text-slate-100 font-semibold text-sm line-clamp-2 leading-snug">{state.videoMetadata.title}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">@{state.videoMetadata.author}</p>
                {state.videoMetadata.duration > 0 && (
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                    {Math.floor(state.videoMetadata.duration / 60)}:{(state.videoMetadata.duration % 60).toString().padStart(2, '0')}
                  </p>
                )}
              </div>
            </div>

            {/* Preview toggle */}
            {state.downloadUrl && (
              <button onClick={togglePreview} className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-all text-sm border border-slate-200 dark:border-slate-600">
                {state.showPreview ? t('btnHidePreview') : t('btnShowPreview')}
              </button>
            )}

            {/* Video player */}
            {state.showPreview && state.downloadUrl && (
              <div className="rounded-lg overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-700">
                <video
                  src={state.downloadUrl}
                  controls
                  className="w-full max-h-72 object-contain"
                  preload="metadata"
                  onError={() => dispatch({ type: 'SET_MESSAGE', payload: 'Preview unavailable, but download should work' })}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Image gallery */}
            {state.videoMetadata?.images && state.videoMetadata.images.length > 0 && (
              <div className="space-y-3">
                <button onClick={toggleImageGallery} className="w-full py-2.5 px-4 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-semibold rounded-lg transition-all text-sm border border-indigo-200 dark:border-indigo-800">
                  {state.showImageGallery ? t('btnHideImages') : `${t('btnShowImages')} (${state.videoMetadata.images.length})`}
                </button>
                {state.showImageGallery && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-100 dark:border-slate-600">
                      <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{t('labelSelectImages')}</span>
                      <div className="flex gap-2">
                        <button onClick={() => selectAllImages(true)} className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg">{t('btnAll')}</button>
                        <button onClick={() => selectAllImages(false)} className="px-3 py-1.5 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg">{t('btnNone')}</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {state.videoMetadata.images.map((image, index) => (
                        <div
                          key={image.id}
                          onClick={() => toggleImageSelection(image.id)}
                          className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-150 ${image.selected ? 'ring-2 ring-indigo-500 ring-offset-1' : 'hover:ring-2 hover:ring-slate-300'}`}
                        >
                          <Image src={image.thumbnail} alt={`Image ${index + 1}`} width={200} height={128} className="object-cover w-full aspect-square"
                            onError={(e) => { e.currentTarget.src = getImagePlaceholderBase64() }} />
                          <div className={`absolute inset-0 transition-all ${image.selected ? 'bg-indigo-500/15' : 'hover:bg-black/10'}`} />
                          <div className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${image.selected ? 'bg-indigo-500 border-indigo-500' : 'border-white/70 bg-black/20'}`}>
                            {image.selected && <CheckIcon className="w-3 h-3 text-white" />}
                          </div>
                          <span className="absolute top-1.5 left-1.5 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded font-medium">{index + 1}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-100 dark:border-slate-600">
                      <input
                        type="checkbox"
                        id="downloadAsZip"
                        checked={state.downloadImagesAsZip}
                        onChange={(e) => dispatch({ type: 'SET_DOWNLOAD_IMAGES_AS_ZIP', payload: e.target.checked })}
                        className="w-4 h-4 accent-indigo-500 rounded"
                      />
                      <label htmlFor="downloadAsZip" className="text-slate-700 dark:text-slate-300 text-sm cursor-pointer">
                        {t('labelDownloadZip')}
                      </label>
                    </div>
                    <button
                      onClick={handleImageDownload}
                      disabled={state.downloadingImages || !state.videoMetadata?.images?.some((img) => img.selected)}
                      className="w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state.downloadingImages ? (
                        <><SpinnerIcon className="h-4 w-4" /> {t('btnDownloadingImages')}</>
                      ) : (
                        <><DownloadIcon className="h-4 w-4" /> {t('btnDownloadImages')} {state.videoMetadata?.images?.filter((img) => img.selected).length || 0} Image(s)</>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Download buttons */}
            {(state.downloadUrl || state.audioUrl) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {state.downloadUrl && (
                  <button
                    onClick={handleVideoDownload}
                    disabled={state.downloading || state.downloadingImages}
                    className="py-3.5 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {state.downloading ? <><SpinnerIcon className="h-4 w-4" /> {t('btnDownloading')}</> : <><DownloadIcon className="h-4 w-4" /> {t('btnDownloadMP4')}</>}
                  </button>
                )}
                {state.audioUrl && (
                  <button
                    onClick={handleAudioDownload}
                    disabled={state.downloadingAudio || state.downloadingImages}
                    className="py-3.5 px-4 bg-indigo-400 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {state.downloadingAudio ? <><SpinnerIcon className="h-4 w-4" /> {t('btnExtracting')}</> : <><MusicIcon className="h-4 w-4" /> {t('btnExtractMP3')}</>}
                  </button>
                )}
              </div>
            )}

            {isBusy && (
              <p className="text-center text-xs text-slate-400 dark:text-slate-500">{t('msgPreparing')}</p>
            )}
          </div>
        )}
      </div>

    </div>
  )
}
