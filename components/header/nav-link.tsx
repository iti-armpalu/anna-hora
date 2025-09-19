// components/header/NavLink.tsx (CLIENT for active state only)
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={
        isActive
          ? "text-stone-900 font-medium"
          : "text-stone-600 hover:text-stone-900 transition-colors"
      }
    >
      {label}
    </Link>
  )
}
