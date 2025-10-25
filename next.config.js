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
    ],
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/manifest.json",
      headers: [
        {
          key: "Content-Type",
          value: "application/manifest+json",
        },
        {
          key: "Cache-Control",
          value: "public, max-age=3600",
        },
      ],
    },
    {
      source: "/favicon.ico",
      headers: [
        {
          key: "Content-Type",
          value: "image/x-icon",
        },
        {
          key: "Cache-Control",
          value: "public, max-age=86400",
        },
      ],
    },
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'savefrominternet.com',
          },
        ],
        destination: 'https://www.savefrominternet.com/:path*',
        permanent: true,
      },
      // Redirect HTTP to HTTPS
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.savefrominternet.com',
          },
        ],
        destination: 'https://www.savefrominternet.com/:path*',
        permanent: true,
      },
      // Blog redirect
      {
        source: '/blog/how-to-download-tiktok-videos-without-watermark-2025',
        destination: '/blog/download-tiktok-videos-without-watermark-2025',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;