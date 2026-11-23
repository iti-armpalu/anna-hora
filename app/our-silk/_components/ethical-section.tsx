import Image from "next/image"
import { SectionHeader } from "@/components/common/section-header"
import { DashList } from "@/components/common/dash-list"
import { silkContent } from "../_data"

export function EthicalSection() {
    const { sourcing } = silkContent

    return (
        <section className="section bg-secondary">
            <div className="container-site grid max-w-5xl grid-cols-1 items-center gap-block md:grid-cols-2 lg:gap-16">
                <div className="flex flex-col gap-block">
                    <div className="flex flex-col gap-field">
                        <SectionHeader titleTop={sourcing.headingTop} titleEm={sourcing.headingEm} align="left" />
                        {sourcing.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="text-heading-sm">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-col gap-field">
                        <h3 className="label-uppercase mb-0">{sourcing.commitmentsTitle}</h3>
                        <DashList items={sourcing.commitments} />
                    </div>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <Image
                        src={sourcing.image}
                        alt={sourcing.imageAlt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    )
}
