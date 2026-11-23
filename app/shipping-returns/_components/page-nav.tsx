import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OnThisPage } from "@/components/common/on-this-page"
import { shippingReturnsContent } from "../_data"
import { SECTION_IDS } from "./section-ids"

export function PageNav() {
    const { nav, faq } = shippingReturnsContent

    return (
        <OnThisPage
            title={nav.title}
            links={[
                { id: SECTION_IDS.delivery, label: nav.delivery },
                { id: SECTION_IDS.returns, label: nav.returns },
                { id: SECTION_IDS.help, label: nav.help },
            ]}
        >
            <span className="text-small text-foreground">{faq.title}</span>
            <p className="text-small">{faq.description}</p>
            <Button asChild variant="outline" className="w-fit">
                <Link href={faq.cta.href}>{faq.cta.label}</Link>
            </Button>
        </OnThisPage>
    )
}
