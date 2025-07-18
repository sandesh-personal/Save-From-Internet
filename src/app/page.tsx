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
      (Image) => Image.selected
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
      const imageUrls = selectedImages.map((Image) => Image.url)

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
          payload: `${selectedImages.length} savefrominternet.com - image(s) downloaded individually! 🖼️`,
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
    
<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
  <div className="max-w-6xl mx-auto py-8">
    {/* Existing Header */}
    <div ref={containerRef} className="text-center mb-8">
      <h1 className="text-4xl md:text-4xl font-extrabold text-white mb-4">
        <span className="bg-gradient-to-r from-[#25F4EE] via-pink-500 to-[#FE2C55] bg-clip-text text-transparent">
          TikTok
        </span>{" "}
        Video Downloader
      </h1>
      <p className="text-lg text-gray-300 max-w-xl mx-auto">
        Download TikTok videos, extract MP3 audio, or save images without watermarks.
      </p>
    </div>




       {/* Input Section */}
<div className="mb-8">
  <div className="max-w-2xl mx-auto">
    <div className="flex gap-2">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Paste TikTok URL here!! "
        value={state.url}
        onChange={(e) =>
          dispatch({ type: 'SET_URL', payload: e.target.value })
        }
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base"
      />

      {/* Paste Button */}
      <button
        onClick={async () => {
          try {
            const text = await navigator.clipboard.readText();
            dispatch({ type: 'SET_URL', payload: text });
          } catch (err) {
            alert('Failed to paste from clipboard.');
          }
        }}
        className="w-auto px-4 py-2 mt-1 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
      >
        Paste
      </button>
    </div>
 


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
                  <Image
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
                              <Image
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
                              (Image) => Image.selected
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
                                  (Image) => Image.selected
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

{/* FAQs Section */}
<div className="max-w-4xl mx-auto mt-12">
  <h2 className="text-2xl font-bold text-white text-center mb-6">
    Who We Are
  </h2>

  <div className="space-y-6">
    {/* How to Use SaveFromInternet.com */}
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <p className="text-white/70 text-justify text-sm">
        Welcome to SaveFromInternet.com — the easiest way to download TikTok videos fast, free, and without watermarks. 
        We built this tool to make saving content simple and hassle-free. 
        No apps, no signups, just copy the link and hit download. 
        Our team is made up of developers who care about clean design, strong privacy, and smooth performance. 
        Everything runs directly in your browser, so there’s nothing to install and no risk to your device. 
        It works well even on slower connections and supports unlimited downloads. 
        Use it responsibly. 
        Save content only if you have permission to do so. 
      </p>
        <p className="text-white/70 text-justify text-sm">
        Contact: contact@savefrominternet.com
      </p>

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
  <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-grey-500/20 rounded-full flex items-center justify-center mb-3 border border-blue-500/30 overflow-hidden">
    <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
  </div>
  <h3 className="text-white font-semibold mb-2">Unlimited Downloads</h3>
  <p className="text-white/70 text-sm">
    Download unlimited TikTok videos without any restrictions or limits.
  </p>
</div>
  </div>
</div>
</div>


 {/* Downloaders Section */}
<div className="max-w-4xl mx-auto mt-12">
  <h2 className="text-2xl font-bold text-white text-center mb-6">
    Downloaders
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

    {/* Instagram Reels Downloader Card */}
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-3 border border-red-500/30">
        <a
          href="https://grabreels.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="url(#instagramGradient)"
            className="w-5 h-5"
          >
            <defs>
              <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff0000ff" />
                <stop offset="50%" stopColor="#ffffffff" />
                <stop offset="100%" stopColor="#ff0000ff" />
              </linearGradient>
            </defs>
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.5 3a1 1 0 110 2 1 1 0 010-2zm-4.25 1.75a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
          </svg>
        </a>
      </div>
      <h3 className="text-white font-semibold mb-2">
        <a
          href="https://grabreels.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-300"
        >
          Instagram Reels Downloader
        </a>
      </h3>
      <p className="text-white/70 text-sm">
        Download Instagram reels quickly and easily.
      </p>
      
    </div>

{/* Facebook Downloader Card */}
<div className="bg-white/5 rounded-xl p-4 border border-white/10">
  <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-blue-700/20 rounded-full flex items-center justify-center mb-3 border border-blue-500/30">
    <span className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        fill="#1877F2"
        className="w-5 h-5"
      >
        <path d="M279.14 288l14.22-92.66h-88.91V127.36c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.5 0 225.36 0C141.09 0 89.53 54.42 89.53 153.55V195.3H0v92.7h89.53V512h107.8V288z"/>
      </svg>
    </span>
  </div>
  <h3 className="text-white font-semibold mb-2">
    <span className="underline text-white/90 cursor-default">Facebook Video Downloader</span>
  </h3>
  <p className="text-white/70 text-sm">
    Coming Soon!!
  </p>
</div>

{/* YouTube Downloader Card */}
<div className="bg-white/5 rounded-xl p-4 border border-white/10">
  <div className="w-10 h-10 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-full flex items-center justify-center mb-3 border border-red-600/30">
    <span className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        fill="#FF0000"
        className="w-5 h-5"
      >
        <path d="M549.7 124.1c-6.3-23.8-25-42.4-48.8-48.7C455.6 64 288 64 288 64S120.4 64 75.1 75.4C51.3 81.7 32.6 100.3 26.3 124.1 16 171.7 16 256 16 256s0 84.3 10.3 131.9c6.3 23.8 25 42.4 48.8 48.7C120.4 448 288 448 288 448s167.6 0 212.9-11.4c23.8-6.3 42.4-25 48.8-48.7C560 340.3 560 256 560 256s0-84.3-10.3-131.9zM232 334.1V177.9L358.4 256 232 334.1z"/>
      </svg>
    </span>
  </div>
  <h3 className="text-white font-semibold mb-2">
    <span className="underline text-white/90 cursor-default">YouTube Video Downloader</span>
  </h3>
  <p className="text-white/70 text-sm">
    Coming Soon!!
  </p>
</div>


  </div>
</div>






{/* FAQs Section */}
<div className="max-w-4xl mx-auto mt-12">
  <h2 className="text-2xl font-bold text-white text-center mb-6">
    Frequently Asked Questions
  </h2>

  <div className="space-y-6">
    {/* How to Use SaveFromInternet.com */}
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-semibold text-lg mb-2">
        How to Use SaveFromInternet.com
      </h3>
      <p className="text-white/70 text-justify text-sm">
        Using SaveFromInternet.com is simple. First, open TikTok and copy the link to the video you want to save. 
        Then, come to our site and paste that link into the input box at the top. 
        Click the download button, and you’ll instantly get the  video, fast, and without any watermark. 
        You don’t need to install anything or sign up. It works on mobile, tablet, or desktop. That’s it. 
        Copy, paste, download. Whether you're archiving content, editing clips, or just saving your favorites, 
        it’s the fastest way to get TikTok videos without the clutter.
      </p>
    </div>

    {/* Download High-Quality TikTok Videos */}
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-semibold text-lg mb-2">
        Download High-Quality TikTok Videos
      </h3>
      <p className="text-white/70 text-justify text-sm">
        TikTok videos should look just as good saved as they do on the app and that’s what we deliver. 
        When you use SaveFromInternet.com, you get high-quality video downloads every time. 
        We don’t compress or downgrade anything. Your videos stay crisp and smooth, perfect for editing, 
        reposting, or watching offline. Whether it's standard 720p, full HD 1080p, or better, 
        we keep the original resolution intact. No grainy replays, no pixelated mess. 
        Just clean, high-definition TikToks ready to go, with nothing lost in the process.
      </p>
    </div>

    {/* How to Download Audio from TikTok */}
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-semibold text-lg mb-2">
        How to Download Audio from TikTok
      </h3>
      <p className="text-white/70 text-justify text-sm">
        Once you paste a TikTok video link on SaveFromInternet.com, you’ll see two options: 
        a button to download the video and another to extract audio. Just click the “Extract Audio” button, 
        and we’ll process the video and give you the original sound in MP3 format. 
        No extra tools or apps needed. 
        Whether you’re looking to save music, voiceovers, or funny sounds from a clip, this option gets you clean audio, fast.
        It works for public videos with sound and doesn’t affect quality. 
        Perfect for ringtones, edits, or background tracks.
      </p>
    </div>

    {/* How to Download Photos from TikTok */}
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-semibold text-lg mb-2">
        How to Download Photos from TikTok
      </h3>
      <p className="text-white/70 text-justify text-sm">
        Copy the link of a TikTok photo post and paste it into SaveFromInternet.com. 
        If the post contains images, we’ll instantly detect them and show download options. 
        You can save each image individually, or download all of them together in a ZIP file. 
        If you only want one photo from a multi-image post, simply click on the specific image and hit download. 
        That’s it. It works smoothly on mobile and desktop, and there’s no watermark or compression added. 
        Easy and efficient, whether you're grabbing one shot or the full set.
      </p>
    </div>

        {/* What should I do if the TikTok video link isn’t working? */}
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-semibold text-lg mb-2">
        What should I do if the TikTok video link isn’t working?
      </h3>
      <p className="text-white/70 text-justify text-sm">
        If a TikTok link isn’t working, first double-check that you copied the full URL, Some apps shorten or truncate links. 
        Make sure the video is public and hasn’t been deleted by the user or TikTok. 
        If the video still won’t load, try refreshing the page or using a different browser or device. 
        Occasionally, TikTok may update its backend, which can affect how third-party tools like ours interact with their platform. 
        If none of this works, wait a bit and try again. 
        We’re constantly updating the site to stay compatible with TikTok’s system.
      </p>
</div>
        {/* Is my privacy protected when using this site? */}
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-semibold text-lg mb-2">
        Is my privacy protected when using this site?
      </h3>
      <p className="text-white/70 text-justify text-sm">
        Yes, your privacy is a priority. 
        SaveFromInternet.com doesn’t collect personal information, track user activity, or store downloaded videos. 
        Every download is processed in real time and never saved to our servers. 
        We don’t ask for your name, email, or any login details. 
        There are no background trackers monitoring what you do. 
        Since you’re not required to register or install anything, your identity remains completely anonymous. 
        We also use HTTPS to ensure a secure connection between your device and our server. 
        You can use the site confidently knowing that your activity stays private and your data isn’t being harvested or shared.
      </p>
</div>

        {/* Do I need to install software or create an account? */}
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-semibold text-lg mb-2">
        Do I need to install software or create an account?
      </h3>
      <p className="text-white/70 text-justify text-sm">
        No, you don’t need to install anything or sign up to use SaveFromInternet.com. 
        The entire process is browser-based—just paste the TikTok link, hit download, and you’re good to go. 
        There’s no app, no extensions, and no registration forms. 
        This means you can use the site instantly, on any device, without giving up personal information or cluttering your phone or computer with extra tools. 
        Whether you’re on mobile, desktop, or tablet, the download process is simple and fast. 
        We built this to be lightweight and user-friendly, so you can save videos without jumping through hoops.
      </p>
</div>

        {/* Can I download videos from private TikTok accounts? */}
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-semibold text-lg mb-2">
        Can I download videos from private TikTok accounts?
      </h3>
      <p className="text-white/70 text-justify text-sm">
        No, we can’t access or download content from private TikTok accounts. 
        SaveFromInternet.com only works with publicly available videos. 
        If a user has set their account or specific video to private, TikTok blocks third-party tools like ours from reaching that content and we respect that boundary. 
        Even if you have the link, private videos require login authentication that our site doesn’t request or store. 
        This protects users’ privacy and keeps everything above board. 
        If you’re trying to download a private video, you’ll need to ask the original creator for access or for them to send you the content directly.
      </p>
</div>

        {/* Is using SaveFromInternet.com legal? */}
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-white font-semibold text-lg mb-2">
        Is using SaveFromInternet.com legal?
      </h3>
      <p className="text-white/70 text-justify text-sm">
        Using SaveFromInternet.com to download TikTok videos is generally legal for personal use, like offline viewing or private archiving. 
        However, it becomes a legal gray area if you reupload, redistribute, or monetize downloaded content without permission from the creator. 
        TikTok’s terms of service also prohibit unauthorized downloading in some cases, so it’s important to respect the platform’s rules. 
        We encourage users to use downloads responsibly, don’t repost someone’s content as your own or use it in ways that violate copyright laws. 
        If you’re ever unsure, the safest approach is to ask for the creator’s permission before sharing or editing their video.
      </p>
</div>
      <div className="pb-5">
  {/* your page content */}
  </div>
  </div>
</div>
</div>
</div>
</div>
  )
}

