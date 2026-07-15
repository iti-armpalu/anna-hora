import Image from "next/image"
import { silkContent } from "../_data"
import { SectionHeader } from "./section-header"

export function FeelSection() {
    const { feel } = silkContent

    return (
        <section className="section-lg">
            <div className="container-site">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader titleTop={feel.headingTop} titleEm={feel.headingEm} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="space-y-6">
                            {feel.paragraphs.map((p, index) => (
                                <p key={index} className="text-heading-sm leading-relaxed">
                                    {p}
                                </p>
                            ))}
                        </div>
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <Image
                                src={feel.media.image}
                                alt={feel.media.alt}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 50vw, 90vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}