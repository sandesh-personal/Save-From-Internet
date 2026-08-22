'use client'

import { Suspense } from 'react'
import DownloaderTool from '@/components/DownloaderTool'
import GoogleAdSense from '@/components/GoogleAdSense'
import AllToolsLinks from '@/components/AllToolsLinks'
import RelatedBlogs from '@/components/RelatedBlogs'
import { FilmIcon, CheckCircleIcon } from '@/components/icons'
import { useLanguage } from '@/contexts/LanguageContext'
import { instagramReelContentData } from '@/lib/platformTranslations'

export default function InstagramReelContent() {
  const { lang } = useLanguage()
  const data = instagramReelContentData[lang] || instagramReelContentData.en

  return (
    <div className="bg-white min-h-screen">
      {/* Interactive Tool */}
      <Suspense fallback={null}>
        <DownloaderTool
          initialPlatform="instagram-video"
          customTitle={data.heroTitle}
          customSubtitle={data.heroSubtitle}
          customPlaceholder={data.placeholder}
          themeColor="black"
        />
      </Suspense>

      {/* ── Section 1: Intro About Card (Solid Black Theme) ── */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs p-6 sm:p-10">
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black text-white mb-4 sm:mb-5 shadow-xs">
                <FilmIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                {data.heroTitle} — Full HD 1080p
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                {data.heroSubtitle}
              </p>

              {/* 3 Value Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-slate-100 pt-8">
                {data.valuePillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-black text-white shrink-0 mt-0.5">
                      <CheckCircleIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{pillar.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad Unit */}
      <div className="flex justify-center py-6 px-4 max-w-5xl mx-auto">
        <GoogleAdSense
          adSlot="5309301802"
          adFormat="auto"
          className="flex justify-center w-full"
          containerStyle="default"
        />
      </div>

      {/* ── Section 2: Step-by-Step Tutorial ── */}
      <section id="how-to" className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              {data.howToTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              {data.howToSubtitle}
            </p>
          </div>

          <ol className="grid gap-6 grid-cols-1 sm:grid-cols-3 list-none p-0 m-0">
            {data.steps.map((step, idx) => (
              <li key={idx} className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col items-center text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white text-base font-bold mb-4 shadow-sm">
                  {idx + 1}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Section 3: Features Grid ── */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              {data.featuresTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              {data.featuresSubtitle}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((feature, idx) => (
              <div key={idx} className="group relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs transition-all duration-200 hover:border-black hover:shadow-md">
                <div className="mb-3.5 inline-flex rounded-xl bg-black p-3 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-1.5 text-base sm:text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Interactive FAQ Accordions ── */}
      <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              {data.faqTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              {data.faqSubtitle}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {data.faqs.map(({ q, a }, idx) => (
              <details
                key={idx}
                className="group overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-200"
              >
                <summary className="flex w-full cursor-pointer items-center justify-between px-5 sm:px-6 py-4 text-left transition hover:bg-slate-50 min-h-[48px] list-none [&::-webkit-details-marker]:hidden select-none">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 pr-4 leading-snug">
                    {q}
                  </h3>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-slate-100 px-5 sm:px-6 py-4 text-sm text-slate-600 leading-relaxed">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Related Guides & Articles ── */}
      <RelatedBlogs
        platform="instagram-video"
        title="Related Instagram Reels Guides"
        subtitle="Explore our helpful tutorials on saving Instagram Reels, carousels, and stories."
      />

      {/* ── Section 6: All Free Tools Links Grid ── */}
      <AllToolsLinks />
    </div>
  )
}
