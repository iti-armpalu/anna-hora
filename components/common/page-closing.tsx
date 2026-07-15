import Link from "next/link"
import { Button } from "@/components/ui/button"

export interface CTA {
    label: string
    href: string
    variant: "primary" | "outline"
}

export interface ClosingContent {
    heading: string
    headingEm: string
    description?: string
    ctas: CTA[]
}

const ctaVariantMap: Record<CTA["variant"], "default" | "outline"> = {
    primary: "default",
    outline: "outline",
}

export function PageClosing({ closing }: { closing: ClosingContent }) {
    return (
        <section className="section-lg">
            <div className="container-site">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="mb-6">
                        {closing.heading}{" "}
                        <em>{closing.headingEm}</em>
                    </h2>

                    {closing.description && (
                        <p className="text-heading-sm leading-relaxed mb-8">
                            {closing.description}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {closing.ctas.map((cta, index) => (
                            <Button key={index} asChild variant={ctaVariantMap[cta.variant]}>
                                <Link href={cta.href}>{cta.label}</Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}