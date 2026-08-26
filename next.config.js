/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: [
    "192.168.1.97",
    "192.168.1.111",
    "192.168.1.*",
    "localhost:3000",
    "127.0.0.1:3000",
  ],
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
      // Instagram & Facebook CDN domains
      { protocol: "https", hostname: "*.fbcdn.net", pathname: "/**" },
      { protocol: "https", hostname: "*.cdninstagram.com", pathname: "/**" },
      { protocol: "https", hostname: "*.instagram.com", pathname: "/**" },
      { protocol: "https", hostname: "*.facebook.com", pathname: "/**" },
      // Twitter / X CDN domains
      { protocol: "https", hostname: "*.twimg.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      // Security headers on everything
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
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
        source: '/x-downloader',
        destination: '/twitter-video-downloader',
        permanent: true,
      },
      {
        source: '/x-downloader/:path*',
        destination: '/twitter-video-downloader',
        permanent: true,
      },
      {
        source: '/blog/youtube-to-mp4-free',
        destination: '/tiktok-video-downloader',
        permanent: true,
      },
      {
        source: '/blog/youtube-video-downloader-free',
        destination: '/tiktok-video-downloader',
        permanent: true,
      },
      {
        source: '/blog/youtube-shorts-to-mp3-free',
        destination: '/tiktok-to-mp3',
        permanent: true,
      },
      {
        source: '/blog/youtube-to-mp3-free',
        destination: '/tiktok-to-mp3',
        permanent: true,
      },
      {
        source: '/blog/youtube-shorts-downloader-save-videos-without-watermark',
        destination: '/tiktok-downloader-without-watermark',
        permanent: true,
      },
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
      {
        source: '/shorts',
        destination: '/tiktok-video-downloader',
        permanent: true,
      },
      {
        source: '/shorts/:path*',
        destination: '/tiktok-video-downloader',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
