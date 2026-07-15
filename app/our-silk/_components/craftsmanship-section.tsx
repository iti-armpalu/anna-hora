import { silkContent } from "../_data"
import { SectionHeader } from "./section-header"
import { CraftsmanshipCard } from "./craftsmanship-card"

export function CraftsmanshipSection() {
    const { craftsmanship } = silkContent

    return (
        <section className="section bg-white">
            <div className="container-site">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        titleTop={craftsmanship.headingTop}
                        titleEm={craftsmanship.headingEm}
                        subtitle={craftsmanship.intro}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {craftsmanship.cards.map((card, index) => (
                            <CraftsmanshipCard key={index} {...card} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}