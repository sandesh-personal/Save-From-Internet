import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    name: "Save From Internet - TikTok Video Downloader",
    short_name: "TikTok Downloader",
    description: "Download TikTok videos without watermarks in high quality. Fast, free TikTok video downloader for PC, iPhone, Android.",
    icons: [
      {
        src: "/favicon-final.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable"
      },
      {
        src: "/apple-touch-icon-final.svg",
        sizes: "180x180",
        type: "image/svg+xml"
      },
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon"
      }
    ],
    theme_color: "#ff0050",
    background_color: "#000000",
    display: "standalone",
    start_url: "https://www.savefrominternet.com/",
    orientation: "portrait",
    scope: "/",
    lang: "en"
  }

  return new NextResponse(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
