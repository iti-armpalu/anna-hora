import { sizeGuideContent } from "../_data"
import { SizeTable } from "./size-table"

const EDIT_ORDER = ["signature", "silk", "core"] as const

const EDIT_LABELS: Record<typeof EDIT_ORDER[number], string> = {
    signature: "Signature Edit",
    silk: "Silk Edit",
    core: "Core Edit",
}

export function SizeTablesSection() {
    const grouped = EDIT_ORDER.map((edit) => ({
        edit,
        label: EDIT_LABELS[edit],
        categories: sizeGuideContent.sizeCategories.filter((c) => c.edit === edit),
    })).filter((g) => g.categories.length > 0)

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-24">
                    {grouped.map((group) => (
                        <div key={group.edit} className="space-y-16">
                            <h2 className="font-serif text-4xl text-stone-900 border-b border-stone-200 pb-4">
                                {group.label}
                            </h2>
                            {group.categories.map((category) => (
                                <SizeTable key={category.id} category={category} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}