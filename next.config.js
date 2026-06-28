/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "savefrominternet.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
      // tikwm thumbnails
      { protocol: "https", hostname: "www.tikwm.com", pathname: "/**" },
      // TikTok CDN domains (thumbnails from RapidAPI and tikwm)
      { protocol: "https", hostname: "*.tiktokcdn-eu.com", pathname: "/**" },
      { protocol: "https", hostname: "*.tiktokcdn-us.com", pathname: "/**" },
      { protocol: "https", hostname: "*.tiktokv.com", pathname: "/**" },
      { protocol: "https", hostname: "*.tiktok.com", pathname: "/**" },
      { protocol: "https", hostname: "p16-common-sign.tiktokcdn-eu.com", pathname: "/**" },
      { protocol: "https", hostname: "p19-common-sign.tiktokcdn-us.com", pathname: "/**" },
      { protocol: "https", hostname: "p16-common-sign.tiktokcdn-us.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      // Security headers on everything
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // API routes: never cache, no indexing
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      // Blog posts: Cloudflare edge cache 24h, browser no-cache (content may update)
      {
        source: "/blog/:slug*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800" },
        ],
      },
      // Tool & landing pages: Cloudflare edge cache 1h
      {
        source: "/(tiktok-video-downloader|tiktok-to-mp3|tiktok-photo-downloader|tiktok-downloader-without-watermark|tiktok-video-downloader-iphone|tiktok-video-downloader-android|tiktok-video-downloader-pc|instagram-reel-downloader|save-tiktok-video|how-to-download-tiktok-videos|faq|about|privacy-policy|disclaimer)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      // Homepage: Cloudflare edge cache 1h
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      // Public images: long cache (these are versioned by filename)
      {
        source: "/(.*\\.(?:jpg|jpeg|png|svg|webp|avif|gif|ico))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" },
        ],
      },
      // Static assets — immutable long cache
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          { key: "Content-Type", value: "image/x-icon" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/blog/how-to-download-tiktok-videos-without-watermark-2025',
        destination: '/blog/download-tiktok-videos-without-watermark-2025',
        permanent: true,
      },
      {
        source: '/blog/best-tiktok-video-downloaders-for-iphone-2025-guide',
        destination: '/tiktok-video-downloader-iphone',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
