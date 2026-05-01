import Image from "next/image"
import { silkContent } from "../_data"
import { SectionHeader } from "./section-header"

export function FeelSection() {
    const { feel } = silkContent

    return (
        <section className="py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader titleTop={feel.headingTop} titleEm={feel.headingEm} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            {feel.paragraphs.map((p) => (
                                <p key={p.slice(0, 40)} className="text-lg text-stone-600 leading-relaxed">
                                    {p}
                                </p>
                            ))}
                        </div>
                        <div className="relative">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src={feel.media.image}
                                    alt={feel.media.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 50vw, 90vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}