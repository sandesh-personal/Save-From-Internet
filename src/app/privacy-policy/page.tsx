import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto flex flex-col">
        <div className="text-center mb-6 md:mb-8">
          <Link href="/">
            <div className="inline-block cursor-pointer">
              <div className="flex justify-center mb-4" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                Save From Internet
              </h1>
            </div>
          </Link>
          <p className="text-sm md:text-base text-white/70 mb-4">
            Download TikTok videos without watermarks, extract MP3 audio, or save images.
          </p>
        </div>

        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-white/80 leading-relaxed text-lg mb-6">
          <strong>Save From Internet</strong> respects your privacy and is committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and safeguard any data you provide when using our services.
          We do not collect personal data unless you voluntarily provide it via contact or support requests.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="text-white/80 leading-relaxed text-lg mb-4">
          Our website does not require registration or collect personal information to download content.
          However, to improve user experience and support services, we may collect non-personal data such as:
        </p>
        <ul className="list-disc list-inside mb-6 text-white/80">
          <li>IP addresses for security and abuse prevention</li>
          <li>Usage data to analyze and optimize site performance</li>
          <li>Cookies to enhance site functionality (if applicable)</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="text-white/80 leading-relaxed text-lg mb-6">
          The data collected is used solely to maintain and improve the service, prevent fraudulent use,
          and respond to user inquiries. We do not share, sell, or rent your personal information to third parties.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
        <p className="text-white/80 leading-relaxed text-lg mb-6">
          Our platform does not host any content and does not control third-party platforms like TikTok.
          We are not responsible for the privacy policies or practices of these external services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact for Support</h2>
        <p className="text-white/80 leading-relaxed text-lg mb-2">
          If you experience any issues or problems while downloading content, please contact our support team at{' '}
          <a href="mailto:support@savefrominternet.com" className="underline hover:text-blue-400">
            support@savefrominternet.com
          </a>. We are committed to helping resolve any difficulties promptly.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Business Inquiries</h2>
        <p className="text-white/80 leading-relaxed text-lg">
          For partnership opportunities or other general questions, please reach out to{' '}
          <a href="mailto:contact@savefrominternet.com" className="underline hover:text-blue-400">
            contact@savefrominternet.com
          </a>.
        </p>
      </div>
    </div>
  )
}
