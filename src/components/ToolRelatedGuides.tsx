import Link from 'next/link'

interface Guide {
  label: string
  href: string
}

interface Props {
  guides: Guide[]
}

export default function ToolRelatedGuides({ guides }: Props) {
  if (!guides.length) return null
  return (
    <section className="bg-slate-50 py-10 px-4 border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Related Guides</h2>
        <ul className="flex flex-wrap gap-2.5">
          {guides.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-block bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/40 text-sm font-medium px-4 py-2 rounded-full transition-all shadow-xs"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
