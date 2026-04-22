import Image from "next/image"
import { silkContent } from "../_data"
import { SectionHeader } from "./section-header"

export function SourcingSection() {
    const { sourcing } = silkContent

    return (
        <section className="py-16 lg:py-24 bg-stone-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <SectionHeader
                                titleTop={sourcing.headingTop}
                                titleEm={sourcing.headingEm}
                                as="h2"
                            />
                            {sourcing.paragraphs.map((p) => (
                                <p key={p.slice(0, 40)} className="text-lg text-stone-600 leading-relaxed">
                                    {p}
                                </p>
                            ))}
                            <div className="pt-4">
                                <h3 className="font-medium text-stone-800 mb-3">
                                    {sourcing.commitmentsTitle}
                                </h3>
                                <ul className="space-y-2 text-stone-600">
                                    {sourcing.commitments.map((c) => (
                                        <li key={c} className="flex items-start">
                                            <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 shrink-0" />
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src={sourcing.image}
                                alt={sourcing.imageAlt}
                                width={500}
                                height={600}
                                className="rounded-lg"
                                sizes="(min-width: 1024px) 500px, 90vw"
                            />
                            <div className="absolute -top-8 -left-8 w-24 h-24 bg-stone-200 rounded-full opacity-30 -z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}