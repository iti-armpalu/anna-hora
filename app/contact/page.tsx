import type { Metadata } from "next"
import Link from "next/link"
import { pageMeta } from "@/lib/config/metadata"
import { Button } from "@/components/ui/button"
import { ContactDetails } from "@/components/common/contact-details"
import { contactContent } from "./_data"

export const metadata: Metadata = pageMeta.contact

export default function ContactPage() {
    const { header, faq } = contactContent

    return (
        // Desktop: fill the screen below the header and centre the content, so the footer starts below the fold
        <div className="container-site grid grid-cols-1 content-center gap-block py-12 lg:min-h-[calc(100dvh-var(--header-height))] lg:grid-cols-2 lg:items-center lg:gap-24 lg:py-16">
            <header className="flex flex-col gap-field lg:max-w-md">
                <h1 className="text-heading-lg font-light text-balance mb-0">{header.title}</h1>
                <p className="text-muted-foreground">{header.description}</p>

                <div className="mt-block flex flex-col gap-field">
                    <p className="text-small text-foreground">{faq.title}</p>
                    <p className="text-small">{faq.description}</p>
                    <Button asChild variant="outline" className="w-fit">
                        <Link href={faq.ctaHref}>{faq.ctaText}</Link>
                    </Button>
                </div>
            </header>

            <ContactDetails showSocial />
        </div>
    )
}
