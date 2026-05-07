import type { PropsWithChildren } from 'react'

const Tldr = ({ children }: PropsWithChildren) => {
  return (
    <aside className="my-8 rounded-lg border border-primary/20 bg-primary/5 px-5 py-4 text-sm leading-7">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary/70">
        TL;DR
      </div>
      <div className="[&_.mdx-p]:my-0 [&_.mdx-ul]:my-0">{children}</div>
    </aside>
  )
}

export default Tldr
