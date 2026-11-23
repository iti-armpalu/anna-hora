import type { ReactNode } from "react"

/** Hairline-divided label/value rows — the site's pattern for facts (contact details, delivery, policy). */
export function DetailList({ children }: { children: ReactNode }) {
  return <dl className="divide-y divide-border border-y border-border">{children}</dl>
}

export function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-tight py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
      <dt className="label-uppercase pt-0.5">{label}</dt>
      <dd className="flex flex-col gap-1 text-small text-foreground">{children}</dd>
    </div>
  )
}
