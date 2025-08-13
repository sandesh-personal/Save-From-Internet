// Ad configuration for SaveFromInternet.com
// Replace these ad slot IDs with your actual AdSense ad unit IDs

export const AD_SLOTS = {
  // Main page ads
  MAIN_TOP: '5309301802',           // Top ad on main page
  MAIN_SUCCESS: '3804648444',       // Ad after successful video processing
  MAIN_BOTTOM: '2491566773',        // Bottom ad on main page

  // Blog page ads
  BLOG_TOP: '5309301802',           // Top ad on blog listing page
  BLOG_INLINE: '3804648444',        // Inline ads between blog posts
  BLOG_BOTTOM: '2491566773',        // Bottom ad on blog listing page

  // Blog post ads
  POST_TOP: '5309301802',           // Top ad on individual blog posts
  POST_MIDDLE: '3804648444',        // Middle ad on blog posts
  POST_BOTTOM: '2491566773',        // Bottom ad on blog posts

  // Other page ads
  PAGE_TOP: '5309301802',           // Top ad on other pages (FAQ, About, etc.)
  PAGE_MIDDLE: '3804648444',        // Middle ad on other pages
  PAGE_BOTTOM: '2491566773',        // Bottom ad on other pages

  // Page transition ads (ads before navigating to other pages)
  TRANSITION: '5309301802',         // Ad shown before page navigation
} as const;

// Ad placement configuration
export const AD_PLACEMENTS = {
  // Main page
  MAIN: {
    top: AD_SLOTS.MAIN_TOP,
    success: AD_SLOTS.MAIN_SUCCESS,
    bottom: AD_SLOTS.MAIN_BOTTOM,
  },

  // Blog listing page
  BLOG_LIST: {
    top: AD_SLOTS.BLOG_TOP,
    inline: AD_SLOTS.BLOG_INLINE,
    bottom: AD_SLOTS.BLOG_BOTTOM,
    inlineFrequency: 3, // Show inline ad after every 3rd blog post
  },

  // Individual blog posts
  BLOG_POST: {
    top: AD_SLOTS.POST_TOP,
    middle: AD_SLOTS.POST_MIDDLE,
    bottom: AD_SLOTS.POST_BOTTOM,
  },

  // Other pages (FAQ, About, Privacy, etc.)
  OTHER_PAGES: {
    top: AD_SLOTS.PAGE_TOP,
    middle: AD_SLOTS.PAGE_MIDDLE,
    bottom: AD_SLOTS.PAGE_BOTTOM,
  },

  // Page transitions
  TRANSITION: {
    adSlot: AD_SLOTS.TRANSITION,
    duration: 3000, // 3 seconds
  },
} as const;

// Ad display settings
export const AD_SETTINGS = {
  // Default ad format
  defaultFormat: 'auto' as const,
  
  // Container styles
  containerStyles: {
    default: 'bg-white/5 rounded-xl p-4 border border-white/20',
    minimal: 'bg-white/5 rounded-xl p-2 border border-white/10',
    none: '',
  } as const,

  // Label settings
  labels: {
    default: 'Sponsored',
    custom: 'Advertisement',
    none: '',
  } as const,

  // Responsive settings
  responsive: {
    minHeight: '100px',
    minWidth: '320px',
    fullWidth: true,
  } as const,
} as const;

// Helper function to get ad slot by type
export function getAdSlot(type: keyof typeof AD_SLOTS): string {
  return AD_SLOTS[type];
}

// Helper function to get ad placement config
export function getAdPlacement(page: keyof typeof AD_PLACEMENTS) {
  return AD_PLACEMENTS[page];
}

// Helper function to get ad settings
export function getAdSettings() {
  return AD_SETTINGS;
}
