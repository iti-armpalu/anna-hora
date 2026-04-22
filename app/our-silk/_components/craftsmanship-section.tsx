import { silkContent } from "../_data"
import { SectionHeader } from "./section-header"
import { CraftsmanshipCard } from "./craftsmanship-card"

export function CraftsmanshipSection() {
    const { craftsmanship } = silkContent

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        titleTop={craftsmanship.headingTop}
                        titleEm={craftsmanship.headingEm}
                        subtitle={craftsmanship.intro}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {craftsmanship.cards.map((card) => (
                            <CraftsmanshipCard key={card.title} {...card} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}