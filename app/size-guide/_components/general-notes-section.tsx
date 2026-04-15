import Link from "next/link"
import { Button } from "@/components/ui/button"
import { sizeGuideContent } from "../_data"

export function GeneralNotesSection() {
    const { generalNotes } = sizeGuideContent

    return (
        <section className="py-16 lg:py-24 bg-stone-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Fit notes */}
                        <div>
                            <h2 className="font-serif text-2xl text-stone-900 mb-4">
                                {generalNotes.fitTitle}
                            </h2>
                            <p className="text-stone-600 leading-relaxed text-pretty">
                                {generalNotes.fitDescription}
                            </p>
                        </div>

                        {/* Care */}
                        <div>
                            <h2 className="font-serif text-2xl text-stone-900 mb-4">
                                {generalNotes.careTitle}
                            </h2>
                            <p className="text-stone-600 leading-relaxed mb-6">
                                {generalNotes.careDescription}
                            </p>
                            <Button asChild variant="outline">
                                <Link href={generalNotes.careCta.href}>{generalNotes.careCta.label}</Link>
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}