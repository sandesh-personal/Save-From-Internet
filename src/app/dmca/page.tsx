import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DMCA Copyright Policy & Takedowns — SaveFromInternet',
  description: 'Digital Millennium Copyright Act (DMCA) policy and takedown notification procedures for SaveFromInternet.com.',
  alternates: {
    canonical: 'https://www.savefrominternet.com/dmca',
  },
}

export default function DmcaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">DMCA Copyright Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last Updated: August 26, 2026</p>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">1. Notice & Takedown Procedure</h2>
          <p><Link href="/" className="text-blue-600 underline font-semibold">SaveFromInternet.com</Link> complies with the Digital Millennium Copyright Act (17 U.S.C. § 512). As a provider of ephemeral data conversion and media retrieval utility tools, we do not host or archive video files on our infrastructure.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">2. Submitting a DMCA Notification</h2>
          <p>If you are a copyright owner or authorized representative and believe that content accessible through our utility tool infringes upon your copyright, please submit a written notification with the following information:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>The exact URL(s) of the material claimed to be infringing.</li>
            <li>Your contact information including full name, address, telephone number, and official email address.</li>
            <li>A statement that you have a good-faith belief that use of the material is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement under penalty of perjury that the information in the notification is accurate and that you are authorized to act on behalf of the copyright owner.</li>
            <li>Your physical or electronic signature.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">3. Designated Copyright Agent</h2>
          <p>Please send all DMCA notices to our designated agent via email:</p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2 font-mono text-sm">
            <p><strong>Email:</strong> dmca@savefrominternet.com</p>
            <p><strong>Attn:</strong> DMCA Copyright Compliance Officer</p>
            <p><strong>Website:</strong> https://www.savefrominternet.com</p>
          </div>
          <p className="mt-3 text-slate-600 text-xs">We process and respond to all legitimate DMCA notices within 24 to 48 business hours.</p>
        </section>
      </div>
    </div>
  )
}
