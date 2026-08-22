import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'About SaveFromInternet — Who Built It and Why | SaveFromInternet',
  description: 'SaveFromInternet.com is built and maintained by Sandy, an indie developer. Read the story of why it was built, what makes it different, and how to get in touch.',
  alternates: { canonical: 'https://www.savefrominternet.com/about' },
  openGraph: {
    title: 'About SaveFromInternet — Built by Sandy',
    description: 'The story behind SaveFromInternet.com — a free TikTok downloader built by indie developer Sandy.',
    url: 'https://www.savefrominternet.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-black py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-extrabold text-3xl mx-auto mb-6 shadow-sm">
            S
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">Hi, I&apos;m Sandy</h1>
          <p className="text-slate-300 font-bold mb-4 text-sm sm:text-base">Founder &amp; Developer, SaveFromInternet.com</p>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            I built SaveFromInternet because I was frustrated that every video downloader was either covered in intrusive popups, broken, or added a watermark. So I made one that just works.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The Story</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                I started SaveFromInternet.com in 2024 as a side project. I needed to download a video for a presentation and spent 20 minutes clicking through sketchy sites full of fake download buttons and pop-ups. I thought — this should take 10 seconds, not 20 minutes.
              </p>
              <p>
                So I built it myself. A clean, fast downloader that handles videos, audio, and photo carousels without watermarks, without an app, and without making you click through five fake buttons.
              </p>
              <p>
                Since then it&apos;s grown to serve users across the world daily. I also built <a href="https://www.grabreels.com" target="_blank" rel="noopener noreferrer" className="text-black hover:underline font-bold">GrabReels.com</a> — the same idea but for Instagram Reels and carousels.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What I Built</h2>
            <ul className="space-y-3 text-slate-600">
              {[
                { name: 'SaveFromInternet.com', desc: 'Free video downloader — TikTok, Instagram, Twitter, Facebook, MP3 audio, photo carousels, no watermark' },
                { name: 'GrabReels.com', desc: 'Free Instagram Reel and carousel downloader' },
              ].map(({ name, desc }) => (
                <li key={name} className="flex items-start gap-3">
                  <span className="text-black font-bold mt-0.5">→</span>
                  <span><strong className="text-slate-900 font-bold">{name}</strong> — {desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How it actually works</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                When you tap a social platform&apos;s own Save button, their servers don&apos;t send you the original file.
                They run it through a transcoding pipeline that composites their logo and creator overlay
                into every frame, then send you that watermarked copy. The original file — the one
                streamed to your phone when you watch a video — has no watermark at all.
              </p>
              <p>
                SaveFromInternet fetches from that CDN endpoint directly, which looks identical to a
                normal stream request. You get the original file at the original quality. That&apos;s the
                whole trick. There&apos;s no AI removal, no cropping, no quality tradeoff.
              </p>
              <p>
                Everything on this site is built and maintained by me. When platforms change their
                API, I update the parser. When something breaks at 2am, I fix it. No team, no
                outsourcing — just one developer keeping it working.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="py-8 px-4 border-b border-slate-100 max-w-5xl mx-auto flex justify-center">
        <GoogleAdSense
          adSlot="3804648444"
          adFormat="auto"
          className="flex justify-center w-full"
          containerStyle="default"
        />
      </div>

      {/* Values */}
      <section className="py-14 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">What SaveFromInternet Stands For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: 'Free — no catch', desc: 'No subscription, no account, no "premium" tier to unlock HD. Every feature works for free, always.' },
              { title: 'Original file, always', desc: 'You get the same file streamed to phones — not a re-encoded copy, not a cropped version. The original.' },
              { title: 'Nothing is stored', desc: 'Your URL is processed and the file is returned. We don\'t log URLs, save files, or sell any data.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <div className="font-bold text-slate-900 mb-2">{title}</div>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 px-4 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
          <div className="space-y-4 text-slate-600">
            <p>
              <strong className="text-slate-800">Technical issues or bug reports:</strong>{' '}
              <a href="mailto:support@savefrominternet.com" className="text-black hover:underline font-bold">
                support@savefrominternet.com
              </a>
            </p>
            <p>
              <strong className="text-slate-800">Business &amp; partnerships:</strong>{' '}
              <a href="mailto:contact@savefrominternet.com" className="text-black hover:underline font-bold">
                contact@savefrominternet.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Try the Tool</h2>
          <p className="text-slate-500 mb-6">Paste any link and download in seconds — free, no watermark, no app.</p>
          <Link
            href="/"
            className="inline-block bg-black hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            Download Videos Free
          </Link>
        </div>

        <div className="mt-10 max-w-5xl mx-auto flex justify-center">
          <GoogleAdSense
            adSlot="2491566773"
            adFormat="auto"
            className="flex justify-center w-full"
            containerStyle="default"
          />
        </div>
      </section>
    </div>
  )
}
