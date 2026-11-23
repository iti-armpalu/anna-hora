import type { ReactNode } from "react"

export interface PageSectionLink {
  id: string
  label: string
}

type Props = {
  title: string
  links: PageSectionLink[]
  /** Help block under the links, e.g. an FAQ or contact shortcut */
  children?: ReactNode
}

/** Sticky "On this page" sidebar for long information pages. The link list is desktop-only. */
export function OnThisPage({ title, links, children }: Props) {
  return (
    <aside className="flex flex-col gap-block lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
      {links.length > 0 && (
        <nav aria-label={title} className="hidden flex-col gap-field lg:flex">
          <span className="label-uppercase">{title}</span>
          <ul className="flex flex-col gap-tight">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="text-small text-foreground transition-colors hover:text-muted-foreground">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {children && <div className="flex flex-col gap-field border-t border-border pt-block">{children}</div>}
    </aside>
  )
}
