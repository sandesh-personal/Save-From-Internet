import type { Metadata } from 'next'
import Link from 'next/link'
import GoogleAdSense from '@/components/GoogleAdSense'

export const metadata: Metadata = {
  title: 'Privacy Policy | SaveFromInternet',
  description: 'Privacy Policy for SaveFromInternet.com — how we collect, use, and protect your data.',
  alternates: { canonical: 'https://www.savefrominternet.com/privacy-policy' },
  openGraph: { title: 'Privacy Policy | SaveFromInternet', url: 'https://www.savefrominternet.com/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
            <strong>Save From Internet</strong> respects your privacy and is committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard any data you provide when using our services.
            We do not collect personal data unless you voluntarily provide it via contact or support requests.
          </p>
        </div>

        {/* Top Ad */}
        <div className="py-2">
          <GoogleAdSense
            adSlot="5309301802"
            adFormat="auto"
            className="flex justify-center w-full"
            containerStyle="default"
          />
        </div>

        <div className="space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Information We Collect</h2>
            <p className="leading-relaxed mb-3">
              Our website does not require registration or collect personal information to download content.
              However, to maintain security and optimize performance, we may log non-personal technical telemetry:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>IP addresses for server security and rate limiting</li>
              <li>Browser type, device model, and OS version</li>
              <li>Essential cookies for interface language preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">How We Use Your Information</h2>
            <p className="leading-relaxed">
              The data collected is used solely to maintain and improve the service, prevent automated abuse,
              and respond to user inquiries. We do not sell, rent, or trade your personal data with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Third-Party Services &amp; Advertising</h2>
            <p className="leading-relaxed">
              Our platform does not host copyrighted multimedia and does not control external services like TikTok.
              We partner with Google AdSense to serve non-intrusive advertisements that keep this tool 100% free for all users.
            </p>
          </section>

          <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Contact Us</h2>
            <p className="text-sm text-slate-600">
              If you have any questions or privacy requests, please reach out to our team at{' '}
              <a href="mailto:support@savefrominternet.com" className="text-blue-600 font-bold hover:underline">
                support@savefrominternet.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
