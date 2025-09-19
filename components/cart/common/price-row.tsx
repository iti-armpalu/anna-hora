import type { ReactNode } from "react"

export function PriceRow({
  label,
  children,
  strong,
}: {
  label: string
  children: ReactNode
  strong?: boolean
}) {
  return (
    <div className="flex justify-between items-center mb-4">
      <span className={strong ? "font-serif text-lg text-stone-800" : "text-stone-600"}>
        {label}
      </span>
      <span className={strong ? "font-medium text-xl text-stone-800" : "font-medium text-stone-800"}>
        {children}
      </span>
    </div>
  )
}
