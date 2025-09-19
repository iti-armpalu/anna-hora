// components/header/NavDesktop.tsx (SERVER wrapper + CLIENT link)
import { NavLink } from "./nav-link"

type Item = { label: string; href: string }
export function NavDesktop({ items }: { items: readonly Item[] }) {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {items.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href} label={item.label} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
