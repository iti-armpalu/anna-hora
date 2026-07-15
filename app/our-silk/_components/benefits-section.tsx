import { silkContent } from "../_data"
import { SectionHeader } from "./section-header"
import { BenefitCard } from "./benefit-card"

export function BenefitsSection() {
    const { benefits } = silkContent
    const [first, second, third, fourth] = benefits.items

    return (
        <section className="section">
            <div className="container-site">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        titleTop={benefits.headingTop}
                        titleEm={benefits.headingEm}
                        subtitle={benefits.intro}
                    />

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_3rem_1fr] gap-8 md:gap-x-0">
                            <BenefitCard {...first} />
                            <div aria-hidden="true" className="hidden md:block w-px bg-border justify-self-center" />
                            <BenefitCard {...second} />
                        </div>

                        <div aria-hidden="true" className="hidden md:block h-px bg-border" />

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_3rem_1fr] gap-8 md:gap-x-0">
                            <BenefitCard {...third} />
                            <div aria-hidden="true" className="hidden md:block w-px bg-border justify-self-center" />
                            <BenefitCard {...fourth} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}