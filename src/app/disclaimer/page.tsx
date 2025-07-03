import Link from 'next/link'

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col flex-grow min-h-[calc(100vh-4rem)] p-8"> {/* padding added inside */}
      <div className="max-w-4xl mx-auto flex flex-col ">
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

        <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>
        <p className="text-white/80 leading-relaxed text-lg">
          The content provided on <strong>Save From Internet</strong> is for general informational purposes only.
          We do not host or store any video, audio, or image files on our servers. All media remains the property
          of its respective owners. Users are solely responsible for how they use the downloaded content.
          This tool is made to help users who upload TikToks on their own accounts, allowing them to download their
          own videos without watermarks. <strong>Save From Internet</strong> is not affiliated with TikTok or any
          other platform. Use of this service is at your own risk, and we are not responsible for any misuse or
          copyright violations.
        </p>
      </div>
    </div>
  )
}
