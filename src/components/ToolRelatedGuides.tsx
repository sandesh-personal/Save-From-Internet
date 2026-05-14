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
    <section className="bg-slate-50 dark:bg-slate-800/50 py-10 px-4 border-t border-slate-100 dark:border-slate-700/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Related Guides</h2>
        <ul className="flex flex-wrap gap-2">
          {guides.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-500 hover:border-indigo-300 dark:hover:border-indigo-700 text-sm font-medium px-4 py-2 rounded-full transition-colors"
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
