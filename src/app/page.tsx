'use client'

import { useReducer, useRef } from 'react'
import Image from 'next/image'
import { appReducer, initialState } from '@/lib/appReducer'
import {
  TikTokIcon,
  SpinnerIcon,
  DownloadIcon,
  MusicIcon,
  CheckIcon,
  getImagePlaceholderBase64,
} from '@/components/icons'

export default function Home() {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: state.url,
          type: state.downloadType,
        }),
      })

      const data = await response.json()

      if (data.success) {
        dispatch({
          type: 'SET_DOWNLOAD_SUCCESS',
          payload: {
            downloadUrl: data.downloadUrl,
            audioUrl: data.audioUrl,
            metadata: data.metadata,
          },
        })

        // Clear the input after successful processing
        dispatch({ type: 'SET_URL', payload: '' })

        // Scroll to results section after successful processing
        setTimeout(() => {
          if (containerRef.current) {
            const resultsSection =
              containerRef.current.querySelector('.results-section')
            if (resultsSection) {
              resultsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }
          }
        }, 500)
      } else {
        dispatch({
          type: 'SET_MESSAGE',
          payload: data.error || 'Failed to process video',
        })
      }
    } catch (err) {
      console.error('Processing error:', err)
      dispatch({
        type: 'SET_MESSAGE',
        payload: 'An error occurred while processing the video',
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const handleVideoDownload = async () => {
    if (!state.downloadUrl) return

    dispatch({ type: 'SET_DOWNLOADING', payload: true })

    try {
      const response = await fetch(state.downloadUrl)

      if (!response.ok) {
        throw new Error('Failed to download video')
      }
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `savefrominternet.com-tiktok-video-${Date.now()}.mp4`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(blobUrl)

      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Video downloaded successfully! 🎉',
      })
      // Clear the input after successful download
      dispatch({ type: 'SET_URL', payload: '' })
    } catch (error) {
      console.error('Download failed:', error)
      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Failed to download video file',
      })
    } finally {
      dispatch({ type: 'SET_DOWNLOADING', payload: false })
    }
  }

  const handleAudioDownload = async () => {
    if (!state.audioUrl) return

    dispatch({ type: 'SET_DOWNLOADING_AUDIO', payload: true })

    try {
      const response = await fetch(state.audioUrl)

      if (!response.ok) {
        throw new Error('Failed to download audio')
      }
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `savefrominternet.com-tiktok-audio-${Date.now()}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(blobUrl)

      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Audio downloaded successfully! 🎵',
      })
      // Clear the input after successful download
      dispatch({ type: 'SET_URL', payload: '' })
    } catch (error) {
      console.error('Audio download failed:', error)
      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Failed to download audio file',
      })
    } finally {
      dispatch({ type: 'SET_DOWNLOADING_AUDIO', payload: false })
    }
  }

  const handleImageDownload = async () => {
    if (!state.videoMetadata?.images) return

    const selectedImages = state.videoMetadata.images.filter(
      (img) => img.selected
    )

    if (selectedImages.length === 0) {
      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Please select at least one image to download',
      })
      return
    }

    dispatch({ type: 'SET_DOWNLOADING_IMAGES', payload: true })

    try {
      const imageUrls = selectedImages.map((img) => img.url)

      // Only create ZIP if user explicitly chose it
      if (state.downloadImagesAsZip) {
        const response = await fetch('/api/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrls,
            title: state.videoMetadata.title,
            asZip: true,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to download images as ZIP')
        }
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `savefrominternet.com-tiktok-images-${Date.now()}.zip`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(blobUrl)

        dispatch({
          type: 'SET_MESSAGE',
          payload: `${selectedImages.length} image(s) downloaded as ZIP! 🗜️`,
        })
        // Clear the input after successful download
        dispatch({ type: 'SET_URL', payload: '' })
      } else {
        // Always download images individually (regardless of count)
        const response = await fetch('/api/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrls,
            asZip: false,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get image download URLs')
        }

        const data = await response.json()

        if (!data.success || !data.images) {
          throw new Error('Invalid response from server')
        }

        // Download each image individually
        for (const imageData of data.images) {
          try {
            const imageResponse = await fetch(imageData.url)
            if (!imageResponse.ok) continue

            const blob = await imageResponse.blob()
            const blobUrl = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = blobUrl
            link.download = imageData.filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            URL.revokeObjectURL(blobUrl)

            // Small delay between downloads
            await new Promise((resolve) => setTimeout(resolve, 500))
          } catch (error) {
            console.error('Failed to download individual image:', error)
          }
        }
        dispatch({
          type: 'SET_MESSAGE',
          payload: `${selectedImages.length} image(s) downloaded individually! 🖼️`,
        })
        // Clear the input after successful download
        dispatch({ type: 'SET_URL', payload: '' })
      }
    } catch (error) {
      console.error('Image download failed:', error)
      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Failed to download images',
      })
    } finally {
      dispatch({ type: 'SET_DOWNLOADING_IMAGES', payload: false })
    }
  }

  const toggleImageGallery = () => {
    dispatch({ type: 'TOGGLE_IMAGE_GALLERY' })
  }

  const toggleImageSelection = (imageId: string) => {
    dispatch({ type: 'TOGGLE_IMAGE_SELECTION', payload: imageId })
  }

  const selectAllImages = (selected: boolean) => {
    dispatch({ type: 'SELECT_ALL_IMAGES', payload: selected })
  }

  const togglePreview = () => {
    dispatch({ type: 'TOGGLE_PREVIEW' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Save From Internet
          </h1>
          <p className="text-base text-white/70 mb-6">
            Download TikTok videos without watermarks, extract MP3 audio, or save images.
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Paste TikTok URL here..."
              value={state.url}
              onChange={(e) =>
                dispatch({ type: 'SET_URL', payload: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base"
            />
            <button
              onClick={handleProcess}
              disabled={
                state.loading ||
                state.downloading ||
                state.downloadingAudio ||
                state.downloadingImages
              }
              className="w-full mt-4 cursor-pointer py-3 px-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-base"
            >
              {state.loading ? (
                <>
                  <SpinnerIcon className="-ml-1 mr-3 h-5 w-5 text-white" />
                  Processing...
                </>
              ) : (
                'Process TikTok URL'
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          {state.message && (
            <div
              className={`max-w-2xl mx-auto p-3 rounded-xl text-center transition-all duration-300 text-base ${
                state.message.includes('success') ||
                state.message.includes('🎉') ||
                state.message.includes('🎵')
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              {state.message}
            </div>
          )}

          {!state.videoMetadata && !state.message && (
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Getting Started Card */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                    <TikTokIcon className="w-8 h-8 text-pink-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Ready to Download?
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Paste any TikTok URL above to get started. We support all
                    TikTok link formats!
                  </p>
                </div>
              </div>

              {/* How it Works */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  🚀 How it Works
                  <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Copy TikTok URL
                      </p>
                      <p className="text-white/60 text-xs">
                        From any TikTok video or image post
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Paste & Process
                      </p>
                      <p className="text-white/60 text-xs">
                        Our servers analyze the content
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Download Content
                      </p>
                      <p className="text-white/60 text-xs">
                        Video, audio, or images - your choice!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supported Formats */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  📱 Supported Links
                </h4>
                <div className="space-y-2 text-xs text-white/70">
                  <p>• https://www.tiktok.com/@user/video/...</p>
                  <p>• https://vm.tiktok.com/...</p>
                  <p>• https://m.tiktok.com/...</p>
                  <p>• https://tiktok.com/...</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  📊 Download Options
                </h4>
                <div className="space-y-2 text-xs text-white/70">
                  <p>• HD Video (no watermark)</p>
                  <p>• MP3 Audio extraction</p>
                  <p>• Image galleries (ZIP/Individual)</p>
                  <p>• Preview before download</p>
                </div>
              </div>
            </div>
          )}

          {state.videoMetadata && (
            <div className="max-w-2xl mx-auto p-4 bg-white/10 rounded-xl border border-white/20 space-y-4 mt-8">
              <div className="flex items-start space-x-3">
                {state.videoMetadata.thumbnail && (
                  <img
                    src={state.videoMetadata.thumbnail}
                    alt="Video thumbnail"
                    width={80}
                    height={80}
                    className="rounded-lg object-cover flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-base line-clamp-2">
                    {state.videoMetadata.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    by {state.videoMetadata.author}
                  </p>
                  {state.videoMetadata.duration > 0 && (
                    <p className="text-white/50 text-xs mt-1">
                      {Math.floor(state.videoMetadata.duration / 60)}:
                      {(state.videoMetadata.duration % 60)
                        .toString()
                        .padStart(2, '0')}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Preview Toggle */}
              {state.downloadUrl && (
                <button
                  onClick={togglePreview}
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center text-base"
                >
                  {state.showPreview ? '👁️ Hide Preview' : '👀 Show Preview'}
                </button>
              )}
              
              {/* Video Preview */}
              {state.showPreview && state.downloadUrl && (
                <div className="space-y-3">
                  <div className="bg-black/50 rounded-lg overflow-hidden">
                    <video
                      src={state.downloadUrl}
                      controls
                      className="w-full h-auto max-h-64 object-contain"
                      preload="metadata"
                      onError={(e) => {
                        console.error('Video preview error:', e)
                        dispatch({
                          type: 'SET_MESSAGE',
                          payload:
                            'Preview unavailable, but download should work',
                        })
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="text-white/50 text-xs text-center">
                    ⚡ Preview loaded - ready to download!
                  </p>
                </div>
              )}
              
              {/* Image Gallery */}
              {state.videoMetadata?.images &&
                state.videoMetadata.images.length > 0 && (
                  <div className="space-y-3">
                    <button
                      onClick={toggleImageGallery}
                      className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center text-base"
                    >
                      {state.showImageGallery
                        ? '🖼️ Hide Images'
                        : `🖼️ Show Images (${state.videoMetadata.images.length})`}
                    </button>

                    {state.showImageGallery && (
                      <div className="space-y-3">
                        {/* Select All Controls */}
                        <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                          <span className="text-white text-sm">
                            Select images to download:
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => selectAllImages(true)}
                              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded"
                            >
                              All
                            </button>
                            <button
                              onClick={() => selectAllImages(false)}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                            >
                              None
                            </button>
                          </div>
                        </div>

                        {/* Image Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {state.videoMetadata.images.map((image, index) => (
                            <div
                              key={image.id}
                              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                                image.selected
                                  ? 'ring-2 ring-pink-500'
                                  : 'hover:ring-2 hover:ring-white/30'
                              }`}
                              onClick={() => toggleImageSelection(image.id)}
                            >
                              <img
                                src={image.thumbnail}
                                alt={`TikTok image ${index + 1}`}
                                width={200}
                                height={128}
                                className="object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    getImagePlaceholderBase64()
                                }}
                              />

                              {/* Selection Overlay */}
                              <div
                                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                                  image.selected
                                    ? 'bg-pink-500/20'
                                    : 'bg-black/0 hover:bg-black/20'
                                }`}
                              >
                                <div
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                    image.selected
                                      ? 'bg-pink-500 border-pink-500'
                                      : 'border-white/50 hover:border-white'
                                  }`}
                                >
                                  {image.selected && (
                                    <CheckIcon className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>

                              {/* Image Number */}
                              <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Download Options */}
                        <div className="bg-white/5 rounded-lg p-3 space-y-3">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="downloadAsZip"
                              checked={state.downloadImagesAsZip}
                              onChange={(e) =>
                                dispatch({
                                  type: 'SET_DOWNLOAD_IMAGES_AS_ZIP',
                                  payload: e.target.checked,
                                })
                              }
                              className="w-4 h-4 text-pink-500 bg-white/10 border-white/30 rounded focus:ring-pink-500 focus:ring-2"
                            />
                            <label
                              htmlFor="downloadAsZip"
                              className="text-white text-sm cursor-pointer"
                            >
                              Download as ZIP file
                            </label>
                          </div>
                          <p className="text-white/60 text-xs">
                            {state.downloadImagesAsZip
                              ? '🗜️ Images will be packaged into a single ZIP file'
                              : '📸 Images will be downloaded individually'}
                          </p>
                        </div>

                        {/* Download Selected Images Button */}
                        <button
                          onClick={handleImageDownload}
                          disabled={
                            state.downloadingImages ||
                            !state.videoMetadata?.images?.some(
                              (img) => img.selected
                            )
                          }
                          className="w-full cursor-pointer py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center text-base gap-2"
                        >
                          {state.downloadingImages ? (
                            <>
                              <SpinnerIcon className="flex-shrink-0 h-4 w-4 text-white" />
                              <span>Downloading...</span>
                            </>
                          ) : (
                            <>
                              <DownloadIcon className="flex-shrink-0 h-5 w-5 text-white" />
                              <span>
                                Download Selected (
                                {state.videoMetadata?.images?.filter(
                                  (img) => img.selected
                                ).length || 0}
                                )
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              
              {/* Download Buttons */}
              {(state.downloadUrl || state.audioUrl) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {state.downloadUrl && (
                    <button
                      onClick={handleVideoDownload}
                      disabled={state.downloading || state.downloadingImages}
                      className="py-3 cursor-pointer px-4 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center text-base gap-2"
                    >
                      {state.downloading ? (
                        <>
                          <SpinnerIcon className="flex-shrink-0 h-4 w-4 text-white" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <DownloadIcon className="flex-shrink-0 h-5 w-5 text-white" />
                          <span>Video</span>
                        </>
                      )}
                    </button>
                  )}

                  {state.audioUrl && (
                    <button
                      onClick={handleAudioDownload}
                      disabled={
                        state.downloadingAudio || state.downloadingImages
                      }
                      className="py-3 cursor-pointer px-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center text-base gap-2"
                    >
                      {state.downloadingAudio ? (
                        <>
                          <SpinnerIcon className="flex-shrink-0 h-4 w-4 text-white" />
                          <span>Extracting...</span>
                        </>
                      ) : (
                        <>
                          <MusicIcon className="flex-shrink-0 h-5 w-5 text-white" />
                          <span>Extract Audio</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
              {(state.downloadUrl || state.audioUrl) && (
                <p className="text-white/50 text-xs text-center">
                  {state.downloading ||
                  state.downloadingAudio ||
                  state.downloadingImages
                    ? 'Please wait while we prepare your download...'
                    : 'Click to download your content'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full flex items-center justify-center mb-3 border border-pink-500/30">
                <TikTokIcon className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Watermark-Free</h3>
              <p className="text-white/70 text-sm">
                Download TikTok videos without any watermarks or logos
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-3 border border-green-500/30">
                <MusicIcon className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">MP3 Extraction</h3>
              <p className="text-white/70 text-sm">
                Extract high-quality MP3 audio from any TikTok video
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-3 border border-purple-500/30">
                <DownloadIcon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Image Gallery</h3>
              <p className="text-white/70 text-sm">
                Download multiple images from TikTok posts in one click
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-3 border border-yellow-500/30">
                <CheckIcon className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Easy to Use</h3>
              <p className="text-white/70 text-sm">
                Simple interface that works on all devices
              </p>
            </div>
          </div>
    
        </div>
      </div>
    </div>
    
  )
}