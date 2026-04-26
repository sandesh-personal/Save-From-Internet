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
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
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
