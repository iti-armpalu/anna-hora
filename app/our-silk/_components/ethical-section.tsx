import Image from "next/image"
import { silkContent } from "../_data"
import { SectionHeader } from "./section-header"

export function EthicalSection() {
    const { sourcing } = silkContent

    return (
        <section className="section bg-stone-50">
            <div className="container-site">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="space-y-6">
                            <SectionHeader
                                titleTop={sourcing.headingTop}
                                titleEm={sourcing.headingEm}
                                as="h2"
                                align="left"
                            />
                            {sourcing.paragraphs.map((p, index) => (
                                <p key={index} className="text-heading-sm leading-relaxed">
                                    {p}
                                </p>
                            ))}
                            <div className="pt-4">
                                <h3 className="mb-3">
                                    {sourcing.commitmentsTitle}
                                </h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    {sourcing.commitments.map((c, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="w-2 h-2 bg-muted-foreground rounded-full mt-2 mr-3 shrink-0" />
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="relative aspect-[5/6]">
                            <Image
                                src={sourcing.image}
                                alt={sourcing.imageAlt}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 50vw, 100vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}