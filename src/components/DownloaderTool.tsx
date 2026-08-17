'use client'

import { useReducer, useRef, useEffect, useCallback } from 'react'
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
      {/* ── SnapTik-Style Hero ── */}
      <section
        style={{ background: 'linear-gradient(135deg, #195fd7 0%, #1e6fe8 50%, #2563eb 100%)' }}
        className="relative overflow-hidden py-10 sm:py-14 lg:py-18 text-white"
      >
        <div className="absolute inset-0 overflow-hidden hidden sm:block pointer-events-none">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/4 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-300/10 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
            {t('heroTitle1')} {t('heroTitle2')}
          </h1>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-blue-100 leading-relaxed font-normal">
            {t('heroSubtitle')}
          </p>

          {/* Unified SnapTik-Style Input & Download Form */}
          <div className="mx-auto w-full max-w-2xl mt-6 sm:mt-8">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!isBusy) handleProcess()
              }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3"
            >
              <label htmlFor="tiktok-url-input" className="sr-only">
                TikTok Video URL
              </label>

              {/* White Input Pill with Paste/Clear button inside */}
              <div className="relative flex-1 flex items-center bg-white rounded-2xl shadow-2xl border border-white/40 p-1 transition-all focus-within:ring-4 focus-within:ring-white/40">
                <input
                  id="tiktok-url-input"
                  type="url"
                  inputMode="url"
                  placeholder={t('inputPlaceholder')}
                  value={state.url}
                  onChange={(e) => dispatch({ type: 'SET_URL', payload: e.target.value })}
                  className="w-full h-12 sm:h-13 bg-transparent pl-4 sm:pl-5 pr-24 text-base sm:text-lg text-slate-900 outline-none placeholder:text-slate-400 font-normal"
                  autoComplete="off"
                  aria-label="TikTok Video URL"
                />
                {state.url ? (
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'SET_URL', payload: '' })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    title="Clear input"
                    aria-label="Clear input"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const text = await navigator.clipboard.readText()
                        if (text && text.trim()) {
                          dispatch({ type: 'SET_URL', payload: text.trim() })
                          if (text.includes('tiktok.com')) {
                            handleProcess(text.trim())
                          }
                        }
                      } catch {
                        const input = containerRef.current?.querySelector('input')
                        input?.focus()
                      }
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
                    title="Paste from clipboard"
                    aria-label="Paste TikTok URL from clipboard"
                  >
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {t('btnPaste')}
                  </button>
                )}
              </div>

              {/* Primary CTA Button */}
              <button
                type="submit"
                disabled={isBusy}
                className="h-14 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-extrabold px-8 text-base sm:text-lg shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer active:scale-95 whitespace-nowrap shrink-0 border border-white/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
              >
                {state.loading ? (
                  <><SpinnerIcon className="h-5 w-5 text-blue-700" /> {t('btnProcessing')}</>
                ) : (
                  <><DownloadIcon className="h-5 w-5 text-blue-700" /> {t('btnDownload')}</>
                )}
              </button>
            </form>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-6 text-xs sm:text-sm text-blue-100 font-medium">
            {([
              t('badgeNoWatermark'),
              t('badgeHD'),
              t('badgeFree'),
              t('badgeNoApp'),
              t('badgeUnlimited'),
            ]).map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ads Section ── */}
      <div className="max-w-2xl mx-auto px-4 mt-6">
        {/* Desktop leaderboard (728×90) */}
        <div className="hidden md:block">
          <GoogleAdSense
            adSlot="9402513184"
            adFormat="auto"
            style={{ minHeight: 90 }}
            className="flex justify-center w-full"
            containerStyle="default"
          />
        </div>

        {/* Mobile ad */}
        <div className="md:hidden" style={{ minHeight: '100px' }}>
          <GoogleAdSense
            adSlot="5309301802"
            adFormat="auto"
            className="flex justify-center w-full"
            containerStyle="default"
          />
        </div>
      </div>

      {/* ── Results Section ── */}
      <div className="results-section max-w-2xl mx-auto px-4 pb-4">
        {/* Status message */}
        {state.message && (
          <div className={`p-4 rounded-xl text-center text-sm mb-4 font-medium ${
            state.message.includes('success') || state.message.includes('🎉') || state.message.includes('🎵')
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-600 border border-red-200'
          }`}>
            {state.message}
          </div>
        )}

        {/* Video metadata + download */}
        {state.videoMetadata && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl p-5 sm:p-7 space-y-5">
            {/* Metadata row */}
            <div className="flex items-start gap-4">
              {state.videoMetadata.thumbnail && (
                <div className="relative w-20 h-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={state.videoMetadata.thumbnail}
                    alt="TikTok video thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  {state.videoMetadata.duration > 0 && (
                    <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[11px] px-1.5 py-0.5 rounded font-mono font-medium">
                      {Math.floor(state.videoMetadata.duration / 60)}:{(state.videoMetadata.duration % 60).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
              )}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="text-slate-900 font-bold text-sm sm:text-base line-clamp-2 leading-snug">{state.videoMetadata.title}</p>
                <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium">@{state.videoMetadata.author}</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Ready to download in Full HD
                </span>
              </div>
            </div>

            {/* Preview toggle */}
            {state.downloadUrl && (
              <button onClick={togglePreview} className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium rounded-xl transition-all text-xs sm:text-sm border border-slate-200">
                {state.showPreview ? t('btnHidePreview') : t('btnShowPreview')}
              </button>
            )}

            {/* Video player */}
            {state.showPreview && state.downloadUrl && (
              <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
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
                <button onClick={toggleImageGallery} className="w-full py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-xl transition-all text-sm border border-blue-200">
                  {state.showImageGallery ? t('btnHideImages') : `${t('btnShowImages')} (${state.videoMetadata.images.length})`}
                </button>
                {state.showImageGallery && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="text-slate-700 text-sm font-medium">{t('labelSelectImages')}</span>
                      <div className="flex gap-2">
                        <button onClick={() => selectAllImages(true)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg">{t('btnAll')}</button>
                        <button onClick={() => selectAllImages(false)} className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg">{t('btnNone')}</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {state.videoMetadata.images.map((image, index) => (
                        <div
                          key={image.id}
                          onClick={() => toggleImageSelection(image.id)}
                          className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-150 ${image.selected ? 'ring-2 ring-blue-600 ring-offset-1' : 'hover:ring-2 hover:ring-slate-300'}`}
                        >
                          <Image src={image.thumbnail} alt={`Image ${index + 1}`} width={200} height={128} className="object-cover w-full aspect-square"
                            onError={(e) => { e.currentTarget.src = getImagePlaceholderBase64() }} />
                          <div className={`absolute inset-0 transition-all ${image.selected ? 'bg-blue-600/15' : 'hover:bg-black/10'}`} />
                          <div className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${image.selected ? 'bg-blue-600 border-blue-600' : 'border-white/70 bg-black/20'}`}>
                            {image.selected && <CheckIcon className="w-3 h-3 text-white" />}
                          </div>
                          <span className="absolute top-1.5 left-1.5 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded font-medium">{index + 1}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <input
                        type="checkbox"
                        id="downloadAsZip"
                        checked={state.downloadImagesAsZip}
                        onChange={(e) => dispatch({ type: 'SET_DOWNLOAD_IMAGES_AS_ZIP', payload: e.target.checked })}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                      <label htmlFor="downloadAsZip" className="text-slate-700 text-sm cursor-pointer font-medium">
                        {t('labelDownloadZip')}
                      </label>
                    </div>
                    <button
                      onClick={handleImageDownload}
                      disabled={state.downloadingImages || !state.videoMetadata?.images?.some((img) => img.selected)}
                      className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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

            {/* Main Action Download Buttons */}
            {(state.downloadUrl || state.audioUrl) && (
              <div className="space-y-3 pt-1">
                {state.downloadUrl && (
                  <button
                    onClick={handleVideoDownload}
                    disabled={state.downloading || state.downloadingImages}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#195fd7] to-[#1e6fe8] hover:from-[#154fb3] hover:to-[#195fd7] text-white font-bold rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/25 text-base active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {state.downloading ? <><SpinnerIcon className="h-5 w-5" /> {t('btnDownloading')}</> : <><DownloadIcon className="h-5 w-5" /> {t('btnDownloadMP4')} (No Watermark HD)</>}
                  </button>
                )}
                {state.audioUrl && (
                  <button
                    onClick={handleAudioDownload}
                    disabled={state.downloadingAudio || state.downloadingImages}
                    className="w-full py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2.5 border border-slate-200/80 active:scale-[0.99] text-sm sm:text-base disabled:opacity-50 cursor-pointer"
                  >
                    {state.downloadingAudio ? <><SpinnerIcon className="h-5 w-5" /> {t('btnExtracting')}</> : <><MusicIcon className="h-5 w-5 text-blue-600" /> {t('btnExtractMP3')} (High Quality Audio)</>}
                  </button>
                )}
              </div>
            )}

            {/* Download Another Video Link */}
            <button
              onClick={handleReset}
              type="button"
              className="w-full pt-2 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors py-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Download Another Video
            </button>

            {isBusy && (
              <p className="text-center text-xs text-slate-400">{t('msgPreparing')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
