export interface ImageData {
  id: string
  url: string
  thumbnail: string
  selected: boolean
}

export interface VideoQualityOption {
  quality: string
  url: string
  resolution?: string
  needsAudioMerge?: boolean
}

export interface VideoMetadata {
  title: string
  author: string
  duration: number
  thumbnail: string
  platform?: string
  isPhotoCarousel?: boolean
  images?: ImageData[]
}

export interface AppState {
  url: string
  loading: boolean
  downloading: boolean
  downloadingAudio: boolean
  downloadingImages: boolean
  message: string
  downloadUrl: string
  audioUrl: string
  qualities: VideoQualityOption[]
  platform: string
  videoMetadata: VideoMetadata | null
  showPreview: boolean
  showImageGallery: boolean
  downloadType: 'video' | 'audio' | 'images'
  downloadImagesAsZip: boolean
}

export type AppAction =
  | { type: 'SET_URL'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DOWNLOADING'; payload: boolean }
  | { type: 'SET_DOWNLOADING_AUDIO'; payload: boolean }
  | { type: 'SET_DOWNLOADING_IMAGES'; payload: boolean }
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'SET_DOWNLOAD_URL'; payload: string }
  | { type: 'SET_AUDIO_URL'; payload: string }
  | { type: 'SET_VIDEO_METADATA'; payload: VideoMetadata | null }
  | { type: 'SET_QUALITIES'; payload: VideoQualityOption[] }
  | { type: 'SET_PLATFORM'; payload: string }
  | { type: 'SET_SHOW_PREVIEW'; payload: boolean }
  | { type: 'TOGGLE_IMAGE_GALLERY' }
  | { type: 'TOGGLE_IMAGE_SELECTION'; payload: string }
  | { type: 'SELECT_ALL_IMAGES'; payload: boolean }
  | { type: 'SET_DOWNLOAD_TYPE'; payload: 'video' | 'audio' | 'images' }
  | { type: 'SET_DOWNLOAD_IMAGES_AS_ZIP'; payload: boolean }
  | { type: 'RESET_STATE' }
  | { type: 'RESET_DOWNLOAD_STATE' }
  | {
      type: 'SET_DOWNLOAD_SUCCESS'
      payload: {
        downloadUrl: string
        metadata: VideoMetadata
        audioUrl?: string
        qualities?: VideoQualityOption[]
        platform?: string
      }
    }

export const initialState: AppState = {
  url: '',
  loading: false,
  downloading: false,
  downloadingAudio: false,
  downloadingImages: false,
  message: '',
  downloadUrl: '',
  audioUrl: '',
  qualities: [],
  platform: '',
  videoMetadata: null,
  showPreview: false,
  showImageGallery: false,
  downloadType: 'video',
  downloadImagesAsZip: false,
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_DOWNLOADING':
      return { ...state, downloading: action.payload }

    case 'SET_DOWNLOADING_AUDIO':
      return { ...state, downloadingAudio: action.payload }

    case 'SET_DOWNLOADING_IMAGES':
      return { ...state, downloadingImages: action.payload }

    case 'SET_MESSAGE':
      return { ...state, message: action.payload }

    case 'SET_DOWNLOAD_URL':
      return { ...state, downloadUrl: action.payload }

    case 'SET_AUDIO_URL':
      return { ...state, audioUrl: action.payload }

    case 'SET_VIDEO_METADATA':
      return { ...state, videoMetadata: action.payload }

    case 'SET_QUALITIES':
      return { ...state, qualities: action.payload || [] }

    case 'SET_PLATFORM':
      return { ...state, platform: action.payload }

    case 'SET_SHOW_PREVIEW':
      return { ...state, showPreview: action.payload }

    case 'TOGGLE_IMAGE_GALLERY':
      return { ...state, showImageGallery: !state.showImageGallery }

    case 'TOGGLE_IMAGE_SELECTION':
      if (!state.videoMetadata?.images) return state
      return {
        ...state,
        videoMetadata: {
          ...state.videoMetadata,
          images: state.videoMetadata.images.map((img: ImageData) =>
            img.id === action.payload ? { ...img, selected: !img.selected } : img
          ),
        },
      }

    case 'SELECT_ALL_IMAGES':
      if (!state.videoMetadata?.images) return state
      return {
        ...state,
        videoMetadata: {
          ...state.videoMetadata,
          images: state.videoMetadata.images.map((img: ImageData) => ({
            ...img,
            selected: action.payload,
          })),
        },
      }

    case 'SET_DOWNLOAD_TYPE':
      return { ...state, downloadType: action.payload }

    case 'SET_DOWNLOAD_IMAGES_AS_ZIP':
      return { ...state, downloadImagesAsZip: action.payload }

    case 'RESET_STATE':
      return initialState

    case 'RESET_DOWNLOAD_STATE':
      return {
        ...state,
        downloading: false,
        downloadingAudio: false,
        downloadingImages: false,
        message: '',
        downloadUrl: '',
        audioUrl: '',
        qualities: [],
        videoMetadata: null,
        showPreview: false,
        showImageGallery: false,
        downloadType: 'video',
        downloadImagesAsZip: false,
      }

    case 'SET_DOWNLOAD_SUCCESS':
      return {
        ...state,
        message: 'Content processed successfully!',
        downloadUrl: action.payload.downloadUrl,
        audioUrl: action.payload.audioUrl || '',
        qualities: action.payload.qualities || [],
        platform: action.payload.platform || '',
        videoMetadata: action.payload.metadata,
        showPreview: true,
      }

    default:
      return state
  }
}
