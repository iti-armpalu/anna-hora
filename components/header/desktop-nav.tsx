// components/header/NavDesktop.tsx (SERVER wrapper + CLIENT link)
import { NavLink } from "./nav-link"

type Item = { label: string; href: string }

export function DesktopNav({ items }: { items: readonly Item[] }) {
  return (
    <ul className="flex items-center gap-8">
      {items.map((item) => (
        <li key={item.href}>
          <NavLink href={item.href} label={item.label} />
        </li>
      ))}
    </ul>
  )
}