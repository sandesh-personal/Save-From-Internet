'use client'

import { useReducer, useRef } from 'react'
import Image from 'next/image'
import { appReducer, initialState } from '@/lib/appReducer'
import {
  SpinnerIcon,
  DownloadIcon,
  MusicIcon,
  CheckIcon,
  getImagePlaceholderBase64,
} from '@/components/icons'

export default function DownloaderTool() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleProcess = async () => {
    if (!state.url.trim()) {
      dispatch({ type: 'SET_MESSAGE', payload: 'Please enter a TikTok URL' })
      return
    }
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'RESET_DOWNLOAD_STATE' })
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: state.url, type: state.downloadType }),
      })
      const data = await response.json()
      if (data.success) {
        dispatch({ type: 'SET_DOWNLOAD_SUCCESS', payload: { downloadUrl: data.downloadUrl, audioUrl: data.audioUrl, metadata: data.metadata } })
        dispatch({ type: 'SET_URL', payload: '' })
        setTimeout(() => {
          if (containerRef.current) {
            const r = containerRef.current.querySelector('.results-section')
            if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 400)
      } else {
        dispatch({ type: 'SET_MESSAGE', payload: data.error || 'Failed to process video' })
      }
    } catch {
      dispatch({ type: 'SET_MESSAGE', payload: 'An error occurred while processing the video' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const handleVideoDownload = async () => {
    if (!state.downloadUrl) return
    dispatch({ type: 'SET_DOWNLOADING', payload: true })
    try {
      const response = await fetch(state.downloadUrl)
      if (!response.ok) throw new Error()
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `savefrominternet.com-tiktok-${Date.now()}.mp4`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
      dispatch({ type: 'SET_MESSAGE', payload: 'Video downloaded successfully! 🎉' })
      dispatch({ type: 'SET_URL', payload: '' })
    } catch {
      dispatch({ type: 'SET_MESSAGE', payload: 'Failed to download video file' })
    } finally {
      dispatch({ type: 'SET_DOWNLOADING', payload: false })
    }
  }

  const handleAudioDownload = async () => {
    if (!state.audioUrl) return
    dispatch({ type: 'SET_DOWNLOADING_AUDIO', payload: true })
    try {
      const response = await fetch(state.audioUrl)
      if (!response.ok) throw new Error()
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `savefrominternet.com-tiktok-audio-${Date.now()}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
      dispatch({ type: 'SET_MESSAGE', payload: 'Audio downloaded successfully! 🎵' })
      dispatch({ type: 'SET_URL', payload: '' })
    } catch {
      dispatch({ type: 'SET_MESSAGE', payload: 'Failed to download audio file' })
    } finally {
      dispatch({ type: 'SET_DOWNLOADING_AUDIO', payload: false })
    }
  }

  const handleImageDownload = async () => {
    if (!state.videoMetadata?.images) return
    const selectedImages = state.videoMetadata.images.filter((img) => img.selected)
    if (selectedImages.length === 0) {
      dispatch({ type: 'SET_MESSAGE', payload: 'Please select at least one image to download' })
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
      dispatch({ type: 'SET_MESSAGE', payload: 'Failed to download images' })
    } finally {
      dispatch({ type: 'SET_DOWNLOADING_IMAGES', payload: false })
    }
  }

  const toggleImageGallery = () => dispatch({ type: 'TOGGLE_IMAGE_GALLERY' })
  const toggleImageSelection = (id: string) => dispatch({ type: 'TOGGLE_IMAGE_SELECTION', payload: id })
  const selectAllImages = (selected: boolean) => dispatch({ type: 'SELECT_ALL_IMAGES', payload: selected })
  const togglePreview = () => dispatch({ type: 'TOGGLE_PREVIEW' })

  const isBusy = state.loading || state.downloading || state.downloadingAudio || state.downloadingImages

  return (
    <div ref={containerRef}>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-rose-50/60 via-white to-white text-center pt-14 pb-8 px-4">
        <div className="inline-flex items-center gap-2 bg-white text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-rose-100 shadow-sm">
          <span>✨</span> 100% Free · No Watermark · No Sign-up
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
          TikTok{' '}
          <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
            Video Downloader
          </span>
        </h1>

        <h2 className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto mb-7 font-normal leading-relaxed">
          Download TikTok videos without watermark 2026 in HD. Extract MP3 audio &amp; save image galleries. Works on all devices.
        </h2>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-500">
          {['No Watermark', 'HD Quality', '100% Free', 'No App Needed', 'Unlimited Downloads'].map((badge) => (
            <span key={badge} className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* ── Input Card ── */}
      <div className="max-w-2xl mx-auto px-4 -mt-2 mb-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-5">
          {/* URL row */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Paste TikTok link here... (tiktok.com, vm.tiktok.com)"
              value={state.url}
              onChange={(e) => dispatch({ type: 'SET_URL', payload: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && !isBusy && handleProcess()}
              className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent text-sm sm:text-base transition-all"
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
              className="shrink-0 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all text-sm border border-slate-200 active:scale-95"
            >
              Paste
            </button>
          </div>

          {/* Main CTA */}
          <button
            onClick={handleProcess}
            disabled={isBusy}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold rounded-xl transition-all duration-200 text-base sm:text-lg shadow-lg shadow-rose-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            {state.loading ? (
              <><SpinnerIcon className="h-5 w-5" /> Processing...</>
            ) : (
              <><DownloadIcon className="h-5 w-5" /> Download TikTok Video</>
            )}
          </button>

          <p className="text-center text-xs text-slate-400 mt-3">
            Supports all TikTok URL formats · Video · Audio · Images
          </p>
        </div>
      </div>

      {/* ── Results / Empty State ── */}
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

        {/* Empty state — 3-step guide */}
        {!state.videoMetadata && !state.message && (
          <div className="grid grid-cols-3 gap-2 mt-2 mb-6">
            {[
              { icon: '📋', step: '1. Copy URL', hint: 'From TikTok app' },
              { icon: '⚙️', step: '2. Paste & Process', hint: 'Click Download button' },
              { icon: '⬇️', step: '3. Save File', hint: 'Video, MP3 or Images' },
            ].map(({ icon, step, hint }) => (
              <div key={step} className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-2xl mb-1">{icon}</div>
                <p className="text-xs font-semibold text-slate-700">{step}</p>
                <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">{hint}</p>
              </div>
            ))}
          </div>
        )}

        {/* Video metadata + download */}
        {state.videoMetadata && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-5 space-y-4">
            {/* Metadata row */}
            <div className="flex items-start gap-3">
              {state.videoMetadata.thumbnail && (
                <Image
                  src={state.videoMetadata.thumbnail}
                  alt="TikTok video thumbnail"
                  width={72}
                  height={72}
                  className="rounded-xl object-cover flex-shrink-0 border border-slate-100"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 font-semibold text-sm line-clamp-2 leading-snug">{state.videoMetadata.title}</p>
                <p className="text-slate-500 text-xs mt-1">@{state.videoMetadata.author}</p>
                {state.videoMetadata.duration > 0 && (
                  <p className="text-slate-400 text-xs mt-0.5">
                    {Math.floor(state.videoMetadata.duration / 60)}:{(state.videoMetadata.duration % 60).toString().padStart(2, '0')}
                  </p>
                )}
              </div>
            </div>

            {/* Preview toggle */}
            {state.downloadUrl && (
              <button onClick={togglePreview} className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-all text-sm border border-slate-200">
                {state.showPreview ? '▲ Hide Preview' : '▼ Show Preview'}
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
                <button onClick={toggleImageGallery} className="w-full py-2.5 px-4 bg-violet-50 hover:bg-violet-100 text-violet-700 font-semibold rounded-xl transition-all text-sm border border-violet-200">
                  {state.showImageGallery ? '🖼️ Hide Images' : `🖼️ Show ${state.videoMetadata.images.length} Images`}
                </button>
                {state.showImageGallery && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="text-slate-700 text-sm font-medium">Select images:</span>
                      <div className="flex gap-2">
                        <button onClick={() => selectAllImages(true)} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg">All</button>
                        <button onClick={() => selectAllImages(false)} className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg">None</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {state.videoMetadata.images.map((image, index) => (
                        <div
                          key={image.id}
                          onClick={() => toggleImageSelection(image.id)}
                          className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-150 ${image.selected ? 'ring-2 ring-rose-500 ring-offset-1' : 'hover:ring-2 hover:ring-slate-300'}`}
                        >
                          <Image src={image.thumbnail} alt={`Image ${index + 1}`} width={200} height={128} className="object-cover w-full aspect-square"
                            onError={(e) => { e.currentTarget.src = getImagePlaceholderBase64() }} />
                          <div className={`absolute inset-0 transition-all ${image.selected ? 'bg-rose-500/15' : 'hover:bg-black/10'}`} />
                          <div className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${image.selected ? 'bg-rose-500 border-rose-500' : 'border-white/70 bg-black/20'}`}>
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
                        className="w-4 h-4 accent-rose-500 rounded"
                      />
                      <label htmlFor="downloadAsZip" className="text-slate-700 text-sm cursor-pointer">
                        Download as ZIP file
                      </label>
                    </div>
                    <button
                      onClick={handleImageDownload}
                      disabled={state.downloadingImages || !state.videoMetadata?.images?.some((img) => img.selected)}
                      className="w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state.downloadingImages ? (
                        <><SpinnerIcon className="h-4 w-4" /> Downloading...</>
                      ) : (
                        <><DownloadIcon className="h-4 w-4" /> Download {state.videoMetadata?.images?.filter((img) => img.selected).length || 0} Image(s)</>
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
                    className="py-3.5 px-4 bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {state.downloading ? <><SpinnerIcon className="h-4 w-4" /> Downloading...</> : <><DownloadIcon className="h-4 w-4" /> Download MP4</>}
                  </button>
                )}
                {state.audioUrl && (
                  <button
                    onClick={handleAudioDownload}
                    disabled={state.downloadingAudio || state.downloadingImages}
                    className="py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {state.downloadingAudio ? <><SpinnerIcon className="h-4 w-4" /> Extracting...</> : <><MusicIcon className="h-4 w-4" /> Extract MP3</>}
                  </button>
                )}
              </div>
            )}

            {isBusy && (
              <p className="text-center text-xs text-slate-400">Preparing your download, please wait...</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
