'use client'
import { useEffect } from 'react'

export default function MidArticleAd() {
  useEffect(() => {
    const prose = document.querySelector('.blog-prose')
    if (!prose) return

    const headings = prose.querySelectorAll('h2')
    if (!headings.length) return

    // Pick the heading roughly halfway through the article
    const idx = Math.max(1, Math.floor(headings.length / 2))
    const target = headings[idx] ?? headings[0]

    // Avoid double-injection (React Strict Mode double-fire)
    if ((target.nextSibling as HTMLElement)?.dataset?.midAd) return

    const wrap = document.createElement('div')
    wrap.dataset.midAd = 'true'
    wrap.style.cssText = 'margin: 2rem 0;'

    const label = document.createElement('p')
    label.style.cssText =
      'font-size: 0.65rem; color: #94a3b8; text-align: center; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem;'
    label.textContent = 'Advertisement'

    const ins = document.createElement('ins')
    ins.className = 'adsbygoogle'
    ins.style.cssText = 'display: block;'
    ins.setAttribute('data-ad-client', 'ca-pub-8190424610367988')
    ins.setAttribute('data-ad-slot', '5309301802')
    ins.setAttribute('data-ad-format', 'auto')
    ins.setAttribute('data-full-width-responsive', 'true')

    wrap.appendChild(label)
    wrap.appendChild(ins)
    target.before(wrap)

    try {
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      ;(window as any).adsbygoogle.push({})
    } catch {}

    return () => { wrap.remove() }
  }, [])

  return null
}
