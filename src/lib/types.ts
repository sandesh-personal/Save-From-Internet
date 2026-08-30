export type SupportedPlatform = 'tiktok' | 'facebook' | 'instagram' | 'twitter' | 'tiktok-mp3' | 'tiktok-photo' | 'instagram-video' | 'instagram-post'

export interface ImageData {
  id: string
  url: string
  thumbnail: string
}

export interface VideoQualityOption {
  quality: string
  url: string
  resolution?: string
  needsAudioMerge?: boolean
}

export interface VideoData {
  id: string
  title: string
  url: string
  thumbnail: string
  duration: number
  author: string
  description: string
  downloadUrl: string
  audioUrl?: string
  images?: ImageData[]
  isPhotoCarousel?: boolean
  platform?: SupportedPlatform
  qualities?: VideoQualityOption[]
}

export interface ProcessedVideo {
  id: string
  url: string
  size?: number
  format: string
  quality?: string
  watermarkRemoved: boolean
}

export interface AudioData {
  id: string
  url: string
  size?: number
  format: string
  quality?: string
  duration: number
  title: string
  author: string
}

export interface DownloadResponse {
  success: boolean
  message: string
  downloadUrl?: string
  audioUrl?: string
  video?: ProcessedVideo
  audio?: AudioData
}
