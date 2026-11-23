import Link from "next/link"
import { Button } from "@/components/ui/button"
import { shippingReturnsContent } from "../_data"
import { SECTION_IDS } from "./section-ids"

/** Sticky in-page navigation plus the FAQ shortcut. */
export function PageNav() {
    const { nav, faq } = shippingReturnsContent
    const links = [
        { id: SECTION_IDS.delivery, label: nav.delivery },
        { id: SECTION_IDS.returns, label: nav.returns },
        { id: SECTION_IDS.help, label: nav.help },
    ]

    return (
        <aside className="flex flex-col gap-block lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
            <nav aria-label={nav.title} className="hidden flex-col gap-field lg:flex">
                <span className="label-uppercase">{nav.title}</span>
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

            <div className="flex flex-col gap-field border-t border-border pt-block">
                <span className="text-small text-foreground">{faq.title}</span>
                <p className="text-small">{faq.description}</p>
                <Button asChild variant="outline" className="w-fit">
                    <Link href={faq.cta.href}>{faq.cta.label}</Link>
                </Button>
            </div>
        </aside>
    )
}
