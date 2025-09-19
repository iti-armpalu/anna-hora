import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

export function EmptyState({
  title,
  description,
  icon,
  cta,
  className = "",
}: {
  title: string
  description?: string
  icon?: ReactNode
  cta?: { href: string; label: string }
  className?: string
}) {
  return (
    <div className={`max-w-md mx-auto text-center ${className}`}>
      {icon ? <div className="mx-auto mb-6">{icon}</div> : null}
      <h2 className="text-2xl font-serif text-stone-800 mb-4">{title}</h2>
      {description && <p className="text-stone-600 mb-8">{description}</p>}
      {cta && (
        <Link href={cta.href}>
          <Button className="bg-stone-800 hover:bg-stone-700 text-white px-8">
            {cta.label}
          </Button>
        </Link>
      )}
    </div>
  )
}
