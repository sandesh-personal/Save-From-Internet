import Link from 'next/link'

const downloaders = [
  { label: 'TikTok Video Downloader', href: '/tiktok-video-downloader' },
  { label: 'TikTok to MP3', href: '/tiktok-to-mp3' },
  { label: 'TikTok Photo Downloader', href: '/tiktok-photo-downloader' },
  { label: 'No Watermark Download', href: '/tiktok-downloader-without-watermark' },
  { label: 'Save TikTok Video', href: '/save-tiktok-video' },
]

const guides = [
  { label: 'How to Download TikTok', href: '/how-to-download-tiktok-videos' },
  { label: 'Download on iPhone', href: '/tiktok-video-downloader-iphone' },
  { label: 'Download on Android', href: '/tiktok-video-downloader-android' },
  { label: 'Download on PC / Mac', href: '/tiktok-video-downloader-pc' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
]

const legal = [
  { label: 'About Us', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo-final.png" alt="Save From Internet" className="h-8 w-auto object-contain brightness-0 invert" />
              <span className="font-extrabold text-white text-base">Save From Internet</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Free TikTok video downloader. Download without watermark in HD — no app, no account, unlimited downloads.
            </p>
            <p className="text-slate-500 text-xs mt-4">contact@savefrominternet.com</p>
          </div>

          {/* Downloaders */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Downloaders</h3>
            <ul className="space-y-2.5">
              {downloaders.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-rose-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Guides</h3>
            <ul className="space-y-2.5">
              {guides.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-rose-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + CTA */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Company</h3>
            <ul className="space-y-2.5 mb-6">
              {legal.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-rose-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="inline-block px-5 py-2.5 bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-rose-900/30"
            >
              ⬇ Download TikTok Now
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © 2026 SaveFromInternet.com — Free TikTok Video Downloader. Not affiliated with TikTok or ByteDance Ltd.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-slate-300 transition-colors">Disclaimer</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
