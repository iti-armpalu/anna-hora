import { SectionHeader } from "@/components/common/section-header"
import { silkContent } from "../_data"
import { CraftsmanshipCard } from "./craftsmanship-card"

export function CraftsmanshipSection() {
    const { craftsmanship } = silkContent

    return (
        <section className="section bg-secondary">
            <div className="container-site">
                <SectionHeader
                    titleTop={craftsmanship.headingTop}
                    titleEm={craftsmanship.headingEm}
                    subtitle={craftsmanship.intro}
                />
                <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {craftsmanship.cards.map((card) => (
                        <CraftsmanshipCard key={card.title} {...card} />
                    ))}
                </div>
            </div>
        </section>
    )
}
