import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us — SaveFromInternet',
  description: 'Get in touch with the SaveFromInternet support and development team for inquiries, bug reports, or feedback.',
  alternates: {
    canonical: 'https://www.savefrominternet.com/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-slate-800">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Contact Us</h1>
      <p className="text-base text-slate-600 mb-8">
        Have questions, feedback, or need technical assistance? We are here to help.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="font-bold text-slate-900 text-base mb-1">General Support & Inquiries</h3>
          <p className="text-xs text-slate-500 mb-3">For general questions, bug reports, and suggestions:</p>
          <a href="mailto:contact@savefrominternet.com" className="text-blue-600 font-semibold text-sm hover:underline">
            contact@savefrominternet.com
          </a>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="font-bold text-slate-900 text-base mb-1">Legal & DMCA</h3>
          <p className="text-xs text-slate-500 mb-3">For copyright inquiries and formal notices:</p>
          <a href="mailto:dmca@savefrominternet.com" className="text-blue-600 font-semibold text-sm hover:underline">
            dmca@savefrominternet.com
          </a>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="font-bold text-slate-900 text-lg">Frequently Answered Questions</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Before contacting us, please check our <Link href="/faq" className="text-blue-600 font-semibold underline">FAQ Page</Link> for answers to common questions about downloading formats, iPhone camera roll saving, and video quality settings.
        </p>
      </div>
    </div>
  )
}
