import { silkContent } from "../_data"
import { SectionHeader } from "./section-header"
import { BenefitCard } from "./benefit-card"

export function BenefitsSection() {
    const { benefits } = silkContent

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        titleTop={benefits.headingTop}
                        titleEm={benefits.headingEm}
                        subtitle={benefits.intro}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefits.items.map((benefit) => (
                            <BenefitCard key={benefit.title} {...benefit} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}