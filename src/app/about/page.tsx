import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto flex flex-col">

        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-white/80 leading-relaxed text-lg mb-6">
          <strong>Save From Internet</strong> is a free platform designed to let users download
          videos, audio, and images from social media platforms like TikTok. Our goal is to
          provide a fast, secure, and watermark-free experience to help creators and users access
          content offline without restrictions.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="text-white/80 leading-relaxed text-lg mb-2">
          For technical issues or problems you encounter while using the website, please reach out to our support team at{' '}
          <a href="mailto:support@savefrominternet.com" className="underline hover:text-blue-400">
            support@savefrominternet.com
          </a>. We are here to help troubleshoot and resolve any difficulties you might be facing.
        </p>
        <p className="text-white/80 leading-relaxed text-lg">
          For business inquiries, partnership opportunities, or other general concerns, contact us at{' '}
          <a href="mailto:contact@savefrominternet.com" className="underline hover:text-blue-400">
            contact@savefrominternet.com
          </a>. We welcome collaborations and want to ensure all your questions are answered.
        </p>
      </div>
    </div>
  )
}
