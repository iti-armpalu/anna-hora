import { SectionHeader } from "@/components/common/section-header"
import { silkContent } from "../_data"
import { BenefitCard } from "./benefit-card"

export function BenefitsSection() {
    const { benefits } = silkContent

    return (
        <section className="section">
            <div className="container-site max-w-4xl">
                <SectionHeader
                    titleTop={benefits.headingTop}
                    titleEm={benefits.headingEm}
                    subtitle={benefits.intro}
                />
                {/*
                  Hairline grid that works for any number of items: rows divided by borders,
                  and on desktop a vertical rule between the two columns.
                */}
                <ul className="grid grid-cols-1 border-t border-border md:grid-cols-2">
                    {benefits.items.map((item) => (
                        <li
                            key={item.title}
                            className="border-b border-border py-block md:odd:border-r md:odd:pr-12 md:even:pl-12"
                        >
                            <BenefitCard {...item} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
