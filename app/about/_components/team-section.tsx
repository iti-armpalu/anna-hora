import { aboutContent } from "../_data"
import { SectionTitle } from "./section-title"
import Image from "next/image"

export function TeamSection() {
    const { team } = aboutContent

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6 order-2 lg:order-1">
                        <SectionTitle
                            as="h2"
                            titleLines={team.titleLines}
                            className="text-3xl lg:text-4xl font-light text-stone-800 leading-tight"
                        />
                        {team.paragraphs.map((p) => (
                            <p key={p.slice(0, 40)} className="text-stone-600 leading-relaxed">
                                {p}
                            </p>
                        ))}
                    </div>

                    <div className="relative order-1 lg:order-2">
                        <Image
                            src={team.image.src}
                            alt={team.image.alt}
                            width={350}
                            height={500}
                            className="rounded-lg mx-auto"
                            sizes="(min-width:1024px) 500px, 90vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}