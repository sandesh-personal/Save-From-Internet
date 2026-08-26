import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — SaveFromInternet',
  description: 'Read the terms and conditions governing the use of SaveFromInternet.com video and media downloading services.',
  alternates: {
    canonical: 'https://www.savefrominternet.com/terms-of-service',
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
      <p className="text-sm text-slate-500 mb-8">Last Updated: August 26, 2026</p>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>By accessing or using <Link href="/" className="text-blue-600 underline font-semibold">SaveFromInternet.com</Link> (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the Service immediately.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">2. Permitted Personal Use</h2>
          <p>SaveFromInternet is an online media utility tool intended exclusively for personal, non-commercial archiving, offline backup, and educational use. Users are responsible for ensuring that their use of downloaded content complies with applicable copyright laws in their respective jurisdictions.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">3. Intellectual Property Rights & DMCA</h2>
          <p>SaveFromInternet respects the intellectual property rights of creators and content owners. We do not host, store, or archive copyrighted media files on our servers. All media streams are processed ephemerally on-the-fly directly from public content delivery networks (CDNs). For copyright inquiries or takedown requests, please visit our <Link href="/dmca" className="text-blue-600 underline font-semibold">DMCA Policy</Link>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">4. Prohibited Conduct</h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Download content that infringes upon third-party copyrights or trademarks without authorization.</li>
            <li>Redistribute, resell, or commercially exploit downloaded media without the creator&apos;s explicit permission.</li>
            <li>Circumvent technological measures designed to protect private, paid, or access-restricted content.</li>
            <li>Abuse, overload, or launch automated scraping/DoS attacks against the Service&apos;s servers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">5. Disclaimer of Warranties</h2>
          <p>The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied. SaveFromInternet does not guarantee uninterrupted, secure, or error-free operation.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">6. Contact Us</h2>
          <p>If you have any questions regarding these Terms, please contact us at <Link href="/contact" className="text-blue-600 underline font-semibold">contact@savefrominternet.com</Link>.</p>
        </section>
      </div>
    </div>
  )
}
