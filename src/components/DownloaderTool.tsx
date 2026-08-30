'use client'

import { useReducer, useRef, useEffect, useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { appReducer, initialState } from '@/lib/appReducer'
import {
  SpinnerIcon,
  DownloadIcon,
  MusicIcon,
  CheckIcon,
  CopyIcon,
  getImagePlaceholderBase64,
} from '@/components/icons'
import GoogleAdSense from '@/components/GoogleAdSense'
import { gptRewardedAd } from '@/lib/gptRewardedAd'
import type { VideoMetadata, VideoQualityOption } from '@/lib/appReducer'
import { useLanguage } from '@/contexts/LanguageContext'
import { detectPlatform } from '@/lib/validator'
import type { SupportedPlatform } from '@/lib/types'

const PLATFORM_DESTINATIONS: Record<'tiktok' | 'instagram' | 'facebook' | 'twitter', {
  name: string
  route: string
  actionLabel: string
}> = {
  instagram: {
    name: 'Instagram Reel',
    route: '/instagram-reel-downloader',
    actionLabel: 'Go to Instagram Reels Downloader',
  },
  tiktok: {
    name: 'TikTok Video',
    route: '/tiktok-video-downloader',
    actionLabel: 'Go to TikTok Downloader',
  },
  facebook: {
    name: 'Facebook Video',
    route: '/facebook-video-downloader',
    actionLabel: 'Go to Facebook Downloader',
  },
  twitter: {
    name: 'Twitter (X) Video',
    route: '/twitter-video-downloader',
    actionLabel: 'Go to Twitter Downloader',
  },
}

interface ApiResponse {
  success: boolean
  downloadUrl?: string
  audioUrl?: string
  qualities?: VideoQualityOption[]
  platform?: string
  metadata?: VideoMetadata
  error?: string
}

type VideoQualityTier = 'best' | '1080p' | '720p'
type AudioQualityTier = 'best' | '192kbps' | '128kbps'

interface DownloaderToolProps {
  initialPlatform?: SupportedPlatform
  customTitle?: string
  customSubtitle?: string
  customPlaceholder?: string
  themeColor?: 'blue' | 'black'
}

export default function DownloaderTool({
  initialPlatform,
  customTitle,
  customSubtitle,
  customPlaceholder,
  themeColor,
}: DownloaderToolProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const containerRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Video Quality selector state: best, 1080p, 720p, 360p
  const [selectedVideoQuality, setSelectedVideoQuality] = useState<VideoQualityTier>('best')

  // Audio Quality selector state: best (320kbps), 192kbps, 128kbps
  const [selectedAudioQuality, setSelectedAudioQuality] = useState<AudioQualityTier>('best')

  // Real-time processing progress bar state
  const [processProgress, setProcessProgress] = useState<number>(0)
  const [processStage, setProcessStage] = useState<string>('')

  // Real-time download / rendering progress bar state
  const [isDownloadingMedia, setIsDownloadingMedia] = useState<boolean>(false)
  const [downloadProgress, setDownloadProgress] = useState<number>(0)
  const [downloadStage, setDownloadStage] = useState<string>('')

  // Copy caption state
  const [isCaptionCopied, setIsCaptionCopied] = useState<boolean>(false)

  const handleCopyCaption = async (text: string) => {
    if (!text) return
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setIsCaptionCopied(true)
      setTimeout(() => setIsCaptionCopied(false), 2000)
    } catch {
      // ignore copy fallback
    }
  }

  // Initialize GPT Web Rewarded Ad Slot on component mount
  useEffect(() => {
    gptRewardedAd.init()
  }, [])

  // Detected active platform from input URL or props
  const currentDetectedPlatform = useMemo(() => {
    return detectPlatform(state.url) || initialPlatform || 'tiktok'
  }, [state.url, initialPlatform])

  const isBlackTheme = themeColor !== 'blue'

  const currentFamily = useMemo(() => {
    if (!initialPlatform) return null
    if (initialPlatform.includes('instagram') || initialPlatform.includes('instagr.am')) return 'instagram'
    if (initialPlatform.includes('facebook') || initialPlatform.includes('fb.watch') || initialPlatform.includes('fb.me')) return 'facebook'
    if (initialPlatform.includes('twitter') || initialPlatform.includes('x.com')) return 'twitter'
    if (initialPlatform.includes('tiktok')) return 'tiktok'
    return null
  }, [initialPlatform])

  const detectedFamily = useMemo(() => {
    if (!state.url.trim()) return null
    const p = detectPlatform(state.url)
    if (!p) return null
    if (p.includes('instagram') || p.includes('instagr.am')) return 'instagram'
    if (p.includes('facebook') || p.includes('fb.watch') || p.includes('fb.me')) return 'facebook'
    if (p.includes('twitter') || p.includes('x.com')) return 'twitter'
    if (p.includes('tiktok')) return 'tiktok'
    return null
  }, [state.url])

  const mismatchInfo = useMemo(() => {
    if (!detectedFamily || !currentFamily || detectedFamily === currentFamily) return null
    return PLATFORM_DESTINATIONS[detectedFamily]
  }, [detectedFamily, currentFamily])

  const platformDisplayName = useMemo(() => {
    switch (currentDetectedPlatform) {
      case 'facebook':
        return 'Facebook'
      case 'instagram':
      case 'instagram-video':
      case 'instagram-post':
        return 'Instagram'
      case 'twitter':
        return 'Twitter'
      case 'tiktok':
      case 'tiktok-mp3':
      case 'tiktok-photo':
      default:
        return 'TikTok'
    }
  }, [currentDetectedPlatform])

  const handleProcess = useCallback(async (overrideUrl?: string) => {
    const urlToProcess = overrideUrl ?? state.url
    if (!urlToProcess.trim()) {
      dispatch({ type: 'SET_MESSAGE', payload: t('msgEnterUrl') })
      return
    }
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'RESET_DOWNLOAD_STATE' })

    setProcessProgress(15)
    setProcessStage('Connecting to media servers...')
    const progressTimer = setInterval(() => {
      setProcessProgress((prev) => {
        if (prev < 35) {
          setProcessStage('Locating high-definition 1080p stream...')
          return prev + 6
        } else if (prev < 70) {
          setProcessStage('Extracting video & audio channels...')
          return prev + 4
        } else if (prev < 92) {
          setProcessStage('Processing & finalizing quality options...')
          return prev + 2
        }
        return prev
      })
    }, 250)

    try {
      const data: ApiResponse = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlToProcess.trim(), type: state.downloadType }),
      }).then((r) => r.json())

      clearInterval(progressTimer)
      setProcessProgress(100)
      setProcessStage('Ready!')

      if (data.success && (data.downloadUrl || (data.metadata?.images && data.metadata.images.length > 0)) && data.metadata) {
        dispatch({
          type: 'SET_DOWNLOAD_SUCCESS',
          payload: {
            downloadUrl: data.downloadUrl || '',
            audioUrl: data.audioUrl,
            qualities: data.qualities,
            platform: data.platform || currentDetectedPlatform,
            metadata: data.metadata,
          },
        })
        setTimeout(() => {
          if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 150)
      } else {
        dispatch({ type: 'SET_MESSAGE', payload: data.error || t('msgError') })
      }
    } catch {
      clearInterval(progressTimer)
      dispatch({ type: 'SET_MESSAGE', payload: t('msgError') })
    } finally {
      clearInterval(progressTimer)
      setTimeout(() => {
        setProcessProgress(0)
        setProcessStage('')
      }, 500)
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [state.url, state.downloadType, currentDetectedPlatform, t])

  // Pre-fill (but never auto-submit) when ?url= query param is present, e.g.
  // from the cross-platform redirect below. Auto-submitting here meant that
  // if a mobile browser restored this exact URL on relaunch, the same video
  // would silently reprocess without the user asking for it.
  useEffect(() => {
    const paramUrl = searchParams.get('url')
    if (!paramUrl) return
    dispatch({ type: 'SET_URL', payload: paramUrl })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // If the browser restores this page from the back-forward cache (e.g.
  // reopening the app/tab after it was backgrounded), start fresh instead of
  // showing whatever was processed last time.
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        dispatch({ type: 'RESET_STATE' })
      }
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  const triggerActualDownload = async (targetUrl: string, filename: string) => {
    if (!targetUrl) return

    setIsDownloadingMedia(true)
    setDownloadProgress(20)
    setDownloadStage('Connecting to media stream...')

    try {
      // 1. If it's our internal API proxy, fetch as Blob to guarantee 100% full file download with zero 0-byte issues
      if (targetUrl.startsWith('/api/')) {
        setDownloadProgress(40)
        setDownloadStage('Downloading file...')

        const response = await fetch(targetUrl)
        if (!response.ok) {
          throw new Error(`Stream returned status ${response.status}`)
        }

        const contentLength = +(response.headers.get('content-length') || 0)
        let blob: Blob

        if (response.body && contentLength > 0) {
          const reader = response.body.getReader()
          let receivedLength = 0
          const chunks: Uint8Array[] = []

          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            if (value) {
              chunks.push(value)
              receivedLength += value.length
              const pct = Math.min(95, Math.round(40 + (receivedLength / contentLength) * 55))
              setDownloadProgress(pct)
              setDownloadStage(`Downloading (${Math.round((receivedLength / 1024 / 1024) * 10) / 10} MB)...`)
            }
          }
          blob = new Blob(chunks, { type: response.headers.get('content-type') || 'video/mp4' })
        } else {
          blob = await response.blob()
        }

        if (blob.size === 0) {
          throw new Error('Received 0 bytes from source')
        }

        setDownloadProgress(100)
        setDownloadStage('Saving file...')

        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = blobUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()

        setTimeout(() => {
          try {
            document.body.removeChild(link)
            URL.revokeObjectURL(blobUrl)
          } catch { /* ignore */ }
        }, 10000)
      } else {
        // Direct link fallback
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = targetUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
          try {
            document.body.removeChild(link)
          } catch { /* ignore */ }
        }, 1000)
      }
    } catch (err) {
      console.warn('Blob download failed, falling back to direct navigation:', err)
      window.location.href = targetUrl
    } finally {
      setTimeout(() => {
        setIsDownloadingMedia(false)
        setDownloadProgress(0)
        setDownloadStage('')
      }, 1500)
    }
  }

  const resolveQualityByTier = (tier: VideoQualityTier): VideoQualityOption | undefined => {
    if (!state.qualities || state.qualities.length === 0) {
      return undefined
    }
    if (tier === 'best' || tier === '1080p') {
      const best = state.qualities.find((q) =>
        q.quality.toLowerCase().includes('4k') ||
        q.quality.toLowerCase().includes('best') ||
        q.quality.toLowerCase().includes('original') ||
        q.quality.includes('1080') ||
        q.quality.toLowerCase().includes('hd') ||
        q.resolution?.includes('1080')
      )
      return best || state.qualities[0]
    }
    if (tier === '720p') {
      const q720 = state.qualities.find((q) =>
        q.quality.includes('720') ||
        q.quality.toLowerCase().includes('sd') ||
        q.quality.toLowerCase().includes('standard') ||
        q.resolution?.includes('720')
      )
      return q720 || state.qualities[state.qualities.length - 1]
    }
    return undefined
  }

  const handleVideoDownload = () => {
    const matched = resolveQualityByTier(selectedVideoQuality)
    let targetUrl = matched?.url || state.downloadUrl || ''
    if (!targetUrl) return
    const platform = state.platform || currentDetectedPlatform || 'video'
    const filename = `savefrominternet.com-${platform}-${selectedVideoQuality}-${Date.now()}.mp4`

    // Guarantee that targetUrl always routes through our proxy so headers force real MP4 attachment download
    if (!targetUrl.startsWith('/api/video')) {
      targetUrl = `/api/video?url=${encodeURIComponent(targetUrl)}&platform=${platform}&quality=${selectedVideoQuality}`
      // Some platforms (e.g. Facebook) only expose HD/4K as a video-only
      // stream with a separate audio track — merge them via the proxy's
      // FFmpeg pipeline so the downloaded file actually has sound.
      if (matched?.needsAudioMerge && state.audioUrl) {
        targetUrl += `&audioUrl=${encodeURIComponent(state.audioUrl)}`
      }
    } else if (!targetUrl.includes('quality=')) {
      targetUrl += `&quality=${selectedVideoQuality}`
    }

    triggerActualDownload(targetUrl, filename)
  }

  const handleAudioDownload = () => {
    let rawAudio = state.audioUrl || state.downloadUrl
    if (!rawAudio) return

    // Avoid broken TikWM /video/music/ endpoint
    if (rawAudio.includes('/video/music/') && state.downloadUrl) {
      rawAudio = state.downloadUrl
    }

    // If wrapped in /api/video?url=..., extract the inner direct CDN stream URL
    if (rawAudio.includes('url=')) {
      try {
        const dummyUrl = new URL(rawAudio, window.location.origin)
        const inner = dummyUrl.searchParams.get('audioUrl') || dummyUrl.searchParams.get('url')
        if (inner) {
          rawAudio = inner
        }
      } catch { /* ignore */ }
    }

    const platform = state.platform || currentDetectedPlatform || 'audio'
    const filename = `savefrominternet.com-${platform}-audio-${selectedAudioQuality}-${Date.now()}.mp3`
    const targetUrl = `/api/audio?url=${encodeURIComponent(rawAudio)}&quality=${selectedAudioQuality}&platform=${platform}`

    triggerActualDownload(targetUrl, filename)
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
        triggerActualDownload(blobUrl, `savefrominternet.com-images-${Date.now()}.zip`)
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60000)
        dispatch({ type: 'SET_MESSAGE', payload: `${selectedImages.length} image(s) downloaded as ZIP!` })
      } else {
        for (let i = 0; i < selectedImages.length; i++) {
          const img = selectedImages[i]
          const filename = `savefrominternet.com-image-${i + 1}-${Date.now()}.jpg`
          const targetUrl = `/api/images?url=${encodeURIComponent(img.url)}&filename=${encodeURIComponent(filename)}`
          triggerActualDownload(targetUrl, filename)
          if (selectedImages.length > 1) {
            await new Promise((res) => setTimeout(res, 1200))
          }
        }
        dispatch({ type: 'SET_MESSAGE', payload: `${selectedImages.length} image(s) downloaded!` })
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

  const handleReset = () => {
    dispatch({ type: 'RESET_DOWNLOAD_STATE' })
    dispatch({ type: 'SET_URL', payload: '' })
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handlePaste = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.readText === 'function') {
        const clipText = await navigator.clipboard.readText()
        if (clipText && clipText.trim()) {
          const clean = clipText.trim()
          dispatch({ type: 'SET_URL', payload: clean })
          if (inputRef.current) {
            inputRef.current.value = clean
            inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
            inputRef.current.focus()
          }
          return
        }
      }
    } catch (err) {
      console.warn('Clipboard readText error:', err)
    }

    // Direct fallback: focus input so user can paste immediately
    if (inputRef.current) {
      inputRef.current.focus()
      try {
        document.execCommand('paste')
      } catch {}
    }
  }

  const isBusy = state.loading || state.downloading || state.downloadingAudio || state.downloadingImages

  const resolvedPlaceholder =
    customPlaceholder || `Paste ${platformDisplayName} video link here...`

  return (
    <div ref={containerRef} className="w-full bg-white">
      {/* ── Hero Section (Solid Flat Black on Twitter, Royal Blue on others) ── */}
      <section className={`${isBlackTheme ? 'bg-black' : 'bg-[#195fd7]'} text-white py-12 sm:py-16 px-4 transition-colors`}>
        <div className="mx-auto max-w-4xl text-center">
          {/* Header Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            {customTitle || `${t('heroTitle1')} ${t('heroTitle2')}`}
          </h1>
          {/* Subtitle */}
          <p className={`text-sm sm:text-base ${isBlackTheme ? 'text-slate-300' : 'text-blue-100'} font-normal max-w-2xl mx-auto mb-8 sm:mb-10`}>
            {customSubtitle || t('heroSubtitle')}
          </p>

          {/* ── Input Bar (Solid Flat White with Paste Icon) ── */}
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (isBusy) return
                if (!state.url.trim()) {
                  dispatch({ type: 'SET_MESSAGE', payload: t('msgEnterUrl') })
                  return
                }
                if (mismatchInfo) {
                  router.push(`${mismatchInfo.route}?url=${encodeURIComponent(state.url.trim())}`)
                  return
                }
                handleProcess()
              }}
              className="flex flex-col sm:flex-row gap-3 items-stretch"
            >
              {/* White Input Bar with Integrated Paste / Clear Button */}
              <div className="relative flex-1 flex items-center bg-white rounded-xl shadow-md border border-slate-200 h-14 sm:h-16 px-3.5 sm:px-5">
                <input
                  ref={inputRef}
                  id="media-url-input"
                  type="url"
                  inputMode="url"
                  placeholder={resolvedPlaceholder}
                  value={state.url}
                  onChange={(e) => dispatch({ type: 'SET_URL', payload: e.target.value })}
                  className="w-full h-full bg-transparent pr-24 text-[16px] sm:text-base text-slate-900 placeholder:text-slate-400 font-normal outline-none"
                  autoComplete="off"
                  aria-label={`${platformDisplayName} Video URL`}
                />

                {/* Paste / Clear Button with text label */}
                {state.url ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      dispatch({ type: 'SET_URL', payload: '' })
                      if (inputRef.current) {
                        inputRef.current.value = ''
                        inputRef.current.focus()
                      }
                    }}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-600 hover:text-slate-900 font-semibold text-xs sm:text-sm rounded-lg border border-slate-300 transition-all flex items-center gap-1 cursor-pointer shadow-2xs active:scale-95 select-none"
                    title="Clear input"
                    aria-label="Clear input"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{t('btnClear')}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900 font-bold text-xs sm:text-sm rounded-lg border border-slate-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 select-none"
                    title="Paste URL from clipboard"
                    aria-label="Paste URL from clipboard"
                  >
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 11l-3 3m0 0l3 3m-3-3h6" />
                    </svg>
                    <span>{t('btnPaste')}</span>
                  </button>
                )}
              </div>

              {/* White Action Download Button */}
              <button
                type="submit"
                disabled={isBusy}
                className={`h-14 sm:h-16 px-6 sm:px-8 bg-white hover:bg-slate-100 ${isBlackTheme ? 'text-black' : 'text-[#195fd7]'} font-bold text-sm sm:text-base rounded-xl shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-75 whitespace-nowrap shrink-0`}
              >
                {state.loading ? (
                  <><SpinnerIcon className={`h-5 w-5 ${isBlackTheme ? 'text-black' : 'text-[#195fd7]'}`} /> {t('btnProcessing')}</>
                ) : mismatchInfo ? (
                  <span className="flex items-center gap-1.5">{mismatchInfo.actionLabel} →</span>
                ) : (
                  t('btnDownload')
                )}
              </button>
            </form>

            {/* ── Simple Plain Black Processing Progress Bar ── */}
            {state.loading && (
              <div className="max-w-xl mx-auto mt-6 bg-white rounded-xl p-4 sm:p-5 text-slate-900 shadow-md border border-slate-200">
                <div className="flex items-center justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-800">Processing video...</span>
                  <span className="font-bold text-black font-mono text-base">{processProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-200 ease-out"
                    style={{ width: `${processProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Feature Badges */}
            <div className={`flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-7 text-xs sm:text-sm ${isBlackTheme ? 'text-slate-300' : 'text-blue-100'} font-medium`}>
              {[
                t('badgeHD'),
                t('badgeNoWatermark'),
                t('badgeFree'),
                t('badgeUnlimited'),
              ].map((badge, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Simple Plain Black Download Progress Bar ── */}
      {isDownloadingMedia && (
        <div className="max-w-2xl mx-auto px-4 mt-6">
          <div className="bg-white text-slate-900 rounded-xl border border-slate-300 p-4 sm:p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-slate-800">Preparing download...</span>
              <span className="font-mono text-black font-bold text-base">{downloadProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-200 ease-out"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Status Message Display (Errors only) ── */}
      {state.message && !isDownloadingMedia && !state.message.includes('success') && !state.message.includes('🎉') && !state.message.includes('downloaded') && (
        <div className="max-w-2xl mx-auto px-4 mt-6">
          <div className="p-4 rounded-xl text-center text-sm font-medium border bg-red-50 text-red-800 border-red-200">
            {state.message}
          </div>
        </div>
      )}

      {/* ── Post-Process Results (Clean White & Slate Theme, Strict Hierarchy) ── */}
      {state.videoMetadata && (
        <div ref={resultsRef} className="results-section max-w-3xl mx-auto px-4 py-8 sm:py-10 space-y-6">
          {/* Main Clean White Results Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-slate-900 shadow-sm">
            {/* 1. Heading & Creator Profile Bar */}
            <div className="border-b border-slate-200 pb-4 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                {t('videoReady')}
              </h2>
              {/* Creator Info Bar */}
              <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 text-white shadow-2xs ${isBlackTheme ? 'bg-black' : 'bg-[#195fd7]'}`}>
                    {state.videoMetadata.author ? state.videoMetadata.author.replace('@', '').charAt(0).toUpperCase() : '👤'}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Creator / Channel</span>
                    <p className="text-sm font-extrabold text-slate-900 truncate">
                      {state.videoMetadata.author ? (state.videoMetadata.author.startsWith('@') ? state.videoMetadata.author : `@${state.videoMetadata.author}`) : '@creator'}
                    </p>
                  </div>
                </div>
                {state.videoMetadata.duration > 0 && (
                  <span className="px-2.5 py-1 bg-white text-slate-800 font-mono font-bold text-xs rounded-lg border border-slate-200 shadow-2xs whitespace-nowrap">
                    ⏱️ {Math.floor(state.videoMetadata.duration / 60)}:{String(Math.floor(state.videoMetadata.duration % 60)).padStart(2, '0')}
                  </span>
                )}
              </div>
            </div>

            {/* 2. Caption / Title Card with Copy Caption Button */}
            <div className="text-xs sm:text-sm bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="block text-slate-900 font-bold text-sm">{t('labelTitle')}</span>
                {state.videoMetadata.title && (
                  <button
                    type="button"
                    onClick={() => handleCopyCaption(state.videoMetadata?.title || '')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-black hover:bg-slate-800 rounded-lg transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 select-none shrink-0"
                    title="Copy Caption / Title"
                  >
                    {isCaptionCopied ? (
                      <>
                        <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-3.5 h-3.5 text-white" />
                        <span>Copy Caption</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="max-h-56 overflow-y-auto pr-1 select-text">
                <p className="text-slate-700 font-normal leading-relaxed text-xs sm:text-sm whitespace-pre-line">
                  {state.videoMetadata.title || 'Social Video Post'}
                </p>
              </div>
            </div>

            {/* 3. Thumbnail / Media Preview (Always Loaded for Every Video or Photo) */}
            {(state.videoMetadata.thumbnail || (state.videoMetadata.images && state.videoMetadata.images.length > 0)) && (
              <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={state.videoMetadata.thumbnail || (state.videoMetadata.images && state.videoMetadata.images[0]?.thumbnail) || ''}
                  alt={state.videoMetadata.title || 'Media thumbnail preview'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (state.videoMetadata?.images && state.videoMetadata.images[0]?.url) {
                      e.currentTarget.src = state.videoMetadata.images[0].url
                    } else {
                      e.currentTarget.style.display = 'none'
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3.5 text-xs text-white font-bold flex items-center gap-1.5 drop-shadow">
                  <CheckIcon className="w-4 h-4 text-emerald-400" />
                  Verified Media Ready
                </div>
              </div>
            )}

            {/* 4. Photo Carousel Section (Rendered UPPER than Audio when photos exist) */}
            {state.videoMetadata?.images && state.videoMetadata.images.length > 0 && (
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="text-slate-900 text-sm font-bold">
                    {t('labelSelectImages')} ({state.videoMetadata.images.length} {state.videoMetadata.images.length === 1 ? 'Photo' : 'Photos'})
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => selectAllImages(true)} className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition cursor-pointer">{t('btnAll')}</button>
                    <button onClick={() => selectAllImages(false)} className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-300 transition cursor-pointer">{t('btnNone')}</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {state.videoMetadata.images.map((image, index) => (
                    <div
                      key={image.id}
                      onClick={() => toggleImageSelection(image.id)}
                      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${image.selected ? `ring-2 ${isBlackTheme ? 'ring-black' : 'ring-[#195fd7]'} ring-offset-2 ring-offset-white` : 'opacity-80 hover:opacity-100'}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.thumbnail}
                        alt={`Image ${index + 1}`}
                        loading="lazy"
                        className="object-cover w-full aspect-square bg-slate-100"
                        onError={(e) => { e.currentTarget.src = getImagePlaceholderBase64() }}
                      />
                      <div className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${image.selected ? (isBlackTheme ? 'bg-black border-black' : 'bg-[#195fd7] border-[#195fd7]') : 'border-white/60 bg-black/40'}`}>
                        {image.selected && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                      <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[11px] px-1.5 py-0.5 rounded font-medium">{index + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <input
                    type="checkbox"
                    id="downloadAsZip"
                    checked={state.downloadImagesAsZip}
                    onChange={(e) => dispatch({ type: 'SET_DOWNLOAD_IMAGES_AS_ZIP', payload: e.target.checked })}
                    className={`w-4 h-4 ${isBlackTheme ? 'accent-black' : 'accent-[#195fd7]'} rounded cursor-pointer`}
                  />
                  <label htmlFor="downloadAsZip" className="text-slate-700 text-sm cursor-pointer font-medium">
                    {t('labelDownloadZip')}
                  </label>
                </div>
                <button
                  onClick={handleImageDownload}
                  disabled={state.downloadingImages || !state.videoMetadata?.images?.some((img) => img.selected)}
                  className={`w-full h-13 ${isBlackTheme ? 'bg-black hover:bg-slate-800' : 'bg-[#195fd7] hover:bg-[#1550b8]'} text-white font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm active:scale-[0.99]`}
                >
                  {state.downloadingImages ? (
                    <><SpinnerIcon className="h-5 w-5 text-white" /> {t('btnDownloadingImages')}</>
                  ) : (
                    <><DownloadIcon className="h-5 w-5 text-white" /> {state.downloadImagesAsZip ? 'Download All as ZIP' : 'Download Selected'}</>
                  )}
                </button>
              </div>
            )}

            {/* 5. Video Quality Options & Download Button (Only for Video Posts & Reels, NEVER for Photo Carousels) */}
            {(!state.videoMetadata?.images || state.videoMetadata.images.length === 0) && (
              <div className="space-y-3 pt-2">
                <label className="block text-sm font-bold text-slate-900">
                  {t('labelQuality')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(
                    [
                      { id: 'best', label: 'Best (4K Quality)', isAdRequired: true },
                      { id: '1080p', label: '1080p Full HD', isAdRequired: true },
                      { id: '720p', label: '720p HD', isAdRequired: false },
                    ] as const
                  ).map((tier) => (
                    <label
                      key={tier.id}
                      onClick={() => setSelectedVideoQuality(tier.id)}
                      className={`flex flex-col items-center justify-center gap-1 py-3.5 px-3 rounded-xl border text-sm cursor-pointer transition-all select-none ${
                        selectedVideoQuality === tier.id
                          ? (isBlackTheme ? 'bg-slate-100 border-black text-black ring-1 ring-black font-bold shadow-xs' : 'bg-blue-50 border-[#195fd7] text-[#195fd7] ring-1 ring-[#195fd7] font-bold shadow-xs')
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="video-quality"
                          value={tier.id}
                          checked={selectedVideoQuality === tier.id}
                          onChange={() => setSelectedVideoQuality(tier.id)}
                          className={`w-3.5 h-3.5 ${isBlackTheme ? 'accent-black' : 'accent-[#195fd7]'} cursor-pointer`}
                        />
                        <span className="font-semibold">{tier.label}</span>
                      </div>
                      {tier.isAdRequired && (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {t('watchAd')}
                        </span>
                      )}
                    </label>
                  ))}
                </div>

                {/* Video Download CTA Button */}
                <button
                  onClick={handleVideoDownload}
                  disabled={state.downloading || state.downloadingImages}
                  className={`w-full h-13 ${isBlackTheme ? 'bg-black hover:bg-slate-800' : 'bg-[#195fd7] hover:bg-[#1550b8]'} text-white font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-50`}
                >
                  <DownloadIcon className="h-5 w-5 text-white" /> {t('btnDownload')}
                </button>
              </div>
            )}

            {/* 6. Audio Options Section (Extract MP3 from Videos and Photo Sounds) */}
            {(state.audioUrl || state.downloadUrl) && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <label className="block text-sm font-bold text-slate-900">
                  {t('labelAudioQuality')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(
                    [
                      { id: 'best', label: 'Best Audio (320kbps)', isAdRequired: true },
                      { id: '192kbps', label: 'High Quality (192kbps)', isAdRequired: true },
                      { id: '128kbps', label: 'Standard (128kbps)', isAdRequired: false },
                    ] as const
                  ).map((tier) => (
                    <label
                      key={tier.id}
                      onClick={() => setSelectedAudioQuality(tier.id)}
                      className={`flex flex-col items-center justify-center gap-1 py-3 px-3 rounded-xl border text-sm cursor-pointer transition-all select-none ${
                        selectedAudioQuality === tier.id
                          ? (isBlackTheme ? 'bg-slate-100 border-black text-black ring-1 ring-black font-bold shadow-xs' : 'bg-blue-50 border-[#195fd7] text-[#195fd7] ring-1 ring-[#195fd7] font-bold shadow-xs')
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="audio-quality"
                          value={tier.id}
                          checked={selectedAudioQuality === tier.id}
                          onChange={() => setSelectedAudioQuality(tier.id)}
                          className={`w-3.5 h-3.5 ${isBlackTheme ? 'accent-black' : 'accent-[#195fd7]'} cursor-pointer`}
                        />
                        <span>{tier.label}</span>
                      </div>
                      {tier.isAdRequired && (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {t('watchAd')}
                        </span>
                      )}
                    </label>
                  ))}
                </div>

                {/* Audio Download Button */}
                <button
                  onClick={handleAudioDownload}
                  disabled={state.downloadingAudio || state.downloadingImages}
                  className="w-full h-12 bg-black hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-50"
                >
                  <MusicIcon className="h-4 w-4 text-white" /> {t('btnExtractMP3')}
                </button>
              </div>
            )}

            {/* Standard Google AdSense Advertisement Unit */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[250px] flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">Advertisement</span>
              <GoogleAdSense
                adSlot="5309301802"
                adFormat="auto"
                className="flex justify-center w-full"
                containerStyle="default"
                minHeight={250}
              />
            </div>

            {/* 5. Download Another Button */}
            <button
              onClick={handleReset}
              type="button"
              className="w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-slate-300 active:scale-[0.99] cursor-pointer"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t('btnDownloadAnother')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}



