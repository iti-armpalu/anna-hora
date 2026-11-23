import type { ReactNode } from "react"
import Link from "next/link"

type Props = {
    id: string
    title: string
    description?: string
    cta?: { text: string; href: string }
    children: ReactNode
}

/** One chapter of a long information page (FAQ-style pages) — anchor target for the "On this page" nav. */
export function InfoSection({ id, title, description, cta, children }: Props) {
    return (
        // scroll-mt keeps the heading clear of the sticky header when jumping to #id
        <section id={id} className="flex scroll-mt-[calc(var(--header-height)+2rem)] flex-col gap-block">
            <div className="flex flex-col gap-field">
                <h2 className="text-heading-md font-light mb-0">{title}</h2>
                {description && <p>{description}</p>}
            </div>
            {children}
            {cta && (
                <Link
                    href={cta.href}
                    className="w-fit text-small text-foreground underline underline-offset-4 decoration-1 transition-colors hover:text-muted-foreground"
                >
                    {cta.text}
                </Link>
            )}
        </section>
    )
}
