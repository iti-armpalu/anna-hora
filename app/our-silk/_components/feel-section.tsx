import Image from "next/image"
import { SectionHeader } from "@/components/common/section-header"
import { silkContent } from "../_data"

export function FeelSection() {
    const { feel } = silkContent

    return (
        <section className="section-lg">
            <div className="container-site max-w-5xl">
                <SectionHeader titleTop={feel.headingTop} titleEm={feel.headingEm} />
                <div className="grid grid-cols-1 items-center gap-block md:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col gap-field">
                        {feel.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="text-heading-sm">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                        <Image
                            src={feel.media.image}
                            alt={feel.media.alt}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
