import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'About SaveFromInternet — Built by Sandy | Free TikTok Downloader',
  description: 'SaveFromInternet.com is built by Sandy, an indie developer who created a free, no-watermark TikTok downloader used by millions. Learn the story behind the tool.',
  alternates: { canonical: 'https://www.savefrominternet.com/about' },
  openGraph: {
    title: 'About SaveFromInternet — Built by Sandy',
    description: 'The story behind SaveFromInternet.com — a free TikTok downloader built by indie developer Sandy.',
    url: 'https://www.savefrominternet.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-900">

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50/50 dark:from-slate-800 to-white dark:to-slate-900 py-16 px-4 text-center border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-lg shadow-indigo-500/25">
            S
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Hi, I&apos;m Sandy</h1>
          <p className="text-indigo-500 font-semibold mb-4">Founder &amp; Developer, SaveFromInternet.com</p>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            I built SaveFromInternet because I was frustrated that every TikTok downloader was either covered in ads, broken, or added a watermark. So I made one that just works.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Story</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                I started SaveFromInternet.com in 2024 as a side project. I needed to download a TikTok video for a presentation and spent 20 minutes clicking through sketchy sites full of fake download buttons and pop-ups. I thought — this should take 10 seconds, not 20 minutes.
              </p>
              <p>
                So I built it myself. A clean, fast downloader that handles TikTok videos, audio, and photo carousels without watermarks, without an app, and without making you click through five fake buttons.
              </p>
              <p>
                Since then it&apos;s grown to serve users across the world daily. I also built <a href="https://www.grabreels.com" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline font-semibold">GrabReels.com</a> — the same idea but for Instagram Reels and carousels.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What I Built</h2>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              {[
                { name: 'SaveFromInternet.com', desc: 'Free TikTok downloader — videos, MP3 audio, photo carousels, no watermark' },
                { name: 'GrabReels.com', desc: 'Free Instagram Reel and carousel downloader' },
              ].map(({ name, desc }) => (
                <li key={name} className="flex items-start gap-3">
                  <span className="text-indigo-500 font-bold mt-0.5">→</span>
                  <span><strong className="text-slate-800 dark:text-slate-200">{name}</strong> — {desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">My Background</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                I&apos;m an indie developer with experience in web APIs, multimedia processing, and building tools people actually use. I work across the full stack — from API design and server infrastructure to the frontend experience.
              </p>
              <p>
                Everything on SaveFromInternet is built, maintained, and improved by me. When something breaks, I fix it. When a new TikTok format comes out, I update the parser. No outsourced team — just fast iteration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="py-8 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <p className="text-[10px] text-center text-slate-400 uppercase tracking-wider mb-2">Advertisement</p>
        <GoogleAdSense
          adSlot="3804648444"
          adFormat="auto"
          className="flex justify-center"
          containerStyle="default"
        />
      </div>

      {/* Values */}
      <section className="py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">What SaveFromInternet Stands For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: 'Free — Always', desc: 'No paywalls, no subscriptions, no account required. Every feature is free.' },
              { title: 'No Watermarks', desc: 'The video you download is the original file. Clean, no TikTok branding added.' },
              { title: 'Privacy First', desc: 'We don\'t store your URLs or downloads. Nothing is logged or sold.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 border border-slate-100 dark:border-slate-700/50 text-center">
                <div className="font-bold text-slate-900 dark:text-white mb-2">{title}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 px-4 border-b border-slate-100 dark:border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              <strong className="text-slate-800 dark:text-slate-200">Technical issues or bug reports:</strong>{' '}
              <a href="mailto:support@savefrominternet.com" className="text-indigo-500 hover:underline">
                support@savefrominternet.com
              </a>
            </p>
            <p>
              <strong className="text-slate-800 dark:text-slate-200">Business &amp; partnerships:</strong>{' '}
              <a href="mailto:contact@savefrominternet.com" className="text-indigo-500 hover:underline">
                contact@savefrominternet.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Try the Tool</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Paste any TikTok link and download in seconds — free, no watermark, no app.</p>
          <Link
            href="/"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all"
          >
            Download TikTok Videos — Free
          </Link>
        </div>

        <div className="mt-10">
          <GoogleAdSense
            adSlot="2491566773"
            adFormat="auto"
            className="flex justify-center"
            containerStyle="default"
          />
        </div>
      </section>
    </div>
  )
}
