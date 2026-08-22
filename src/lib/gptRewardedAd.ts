/**
 * Google Publisher Tag (GPT) Web Rewarded Ads Manager
 * Compliant with Google Ad Manager & Google AdSense Web Rewarded Ads Policy
 */

type DownloadTriggerFn = () => void

interface RewardedAdConfig {
  adUnitPath: string
  fallbackTimeoutMs?: number
}

declare global {
  interface Window {
    googletag: any
  }
}

class GPTRewardedAdManager {
  private rewardedSlot: any = null
  private isAdReady = false
  private isAdDisplaying = false
  private pendingDownloadCallback: DownloadTriggerFn | null = null
  private rewardGranted = false
  private fallbackTimer: NodeJS.Timeout | null = null
  private adUnitPath = '/21775744923/rewarded_video_download'
  private fallbackTimeoutMs = 2500
  private initialized = false

  constructor(config?: Partial<RewardedAdConfig>) {
    if (config?.adUnitPath) this.adUnitPath = config.adUnitPath
    if (config?.fallbackTimeoutMs) this.fallbackTimeoutMs = config.fallbackTimeoutMs
  }

  /**
   * Initializes GPT Rewarded Out-of-Page Ad Slot
   */
  public init() {
    if (typeof window === 'undefined' || this.initialized) return
    this.initialized = true

    window.googletag = window.googletag || { cmd: [] }

    window.googletag.cmd.push(() => {
      // Define out-of-page rewarded slot
      this.rewardedSlot = window.googletag.defineOutOfPageSlot(
        this.adUnitPath,
        window.googletag.enums.OutOfPageFormat.REWARDED
      )

      if (this.rewardedSlot) {
        this.rewardedSlot.addService(window.googletag.pubads())

        // 1. Listen for ad readiness
        window.googletag.pubads().addEventListener('rewardedSlotReady', (event: any) => {
          if (event.slot === this.rewardedSlot) {
            this.isAdReady = true
            if (this.isAdDisplaying) {
              this.clearFallbackTimer()
              event.makeRewardedVisible()
            }
          }
        })

        // 2. Listen for reward granted event (user watched required duration)
        window.googletag.pubads().addEventListener('rewardedSlotGranted', (event: any) => {
          if (event.slot === this.rewardedSlot) {
            this.rewardGranted = true
          }
        })

        // 3. Listen for ad closed event (user dismissed/closed ad modal)
        window.googletag.pubads().addEventListener('rewardedSlotClosed', (event: any) => {
          if (event.slot === this.rewardedSlot) {
            this.handleAdClosed()
          }
        })

        // 4. Handle No-Fill / Empty Ad slot
        window.googletag.pubads().addEventListener('slotRenderEnded', (event: any) => {
          if (event.slot === this.rewardedSlot && event.isEmpty) {
            this.handleFallback('No-fill returned by Google')
          }
        })

        window.googletag.pubads().enableSingleRequest()
        window.googletag.enableServices()
        window.googletag.display(this.rewardedSlot)
      }
    })
  }

  /**
   * Request rewarded ad before triggering download.
   * If ad is ready -> shows ad.
   * If ad fails / ad-blocker detected / timeout -> triggers download gracefully without getting stuck.
   */
  public requestRewardedDownload(onDownloadGranted: DownloadTriggerFn) {
    this.pendingDownloadCallback = onDownloadGranted
    this.rewardGranted = false
    this.isAdDisplaying = true

    // Check if GPT is loaded and not blocked by AdBlocker
    if (!window.googletag || !window.googletag.pubadsReady) {
      this.handleFallback('GPT not available or blocked')
      return
    }

    // Set fallback timeout so user is never stuck if ad fails to render
    this.fallbackTimer = setTimeout(() => {
      this.handleFallback('Ad display timeout')
    }, this.fallbackTimeoutMs)

    window.googletag.cmd.push(() => {
      if (this.rewardedSlot && this.isAdReady) {
        this.clearFallbackTimer()
        window.googletag.pubads().refresh([this.rewardedSlot])
      }
    })
  }

  private handleAdClosed() {
    this.clearFallbackTimer()
    this.isAdDisplaying = false

    // If reward was granted, trigger download automatically!
    if (this.rewardGranted && this.pendingDownloadCallback) {
      const cb = this.pendingDownloadCallback
      this.pendingDownloadCallback = null
      cb()
    }

    // Clean up and prepare new slot for next action without memory leaks
    this.refreshSlot()
  }

  private handleFallback(reason: string) {
    this.clearFallbackTimer()
    this.isAdDisplaying = false
    console.warn(`[RewardedAdManager] Fallback triggered: ${reason}`)

    // Execute download so user is never blocked
    if (this.pendingDownloadCallback) {
      const cb = this.pendingDownloadCallback
      this.pendingDownloadCallback = null
      cb()
    }

    this.refreshSlot()
  }

  private refreshSlot() {
    this.rewardGranted = false
    this.isAdReady = false
    if (window.googletag && this.rewardedSlot) {
      window.googletag.cmd.push(() => {
        if (this.rewardedSlot) {
          window.googletag.pubads().refresh([this.rewardedSlot])
        }
      })
    }
  }

  private clearFallbackTimer() {
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer)
      this.fallbackTimer = null
    }
  }
}

export const gptRewardedAd = new GPTRewardedAdManager()
