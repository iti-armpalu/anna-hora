import Link from "next/link"
import { Button } from "@/components/ui/button"
import { silkContent } from "../_data"
import { SectionHeader } from "./section-header"
import { CareGuideStep } from "./care-guide-step"

export function CareGuideSection() {
    const { careGuide } = silkContent

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        titleTop={careGuide.headingTop}
                        titleEm={careGuide.headingEm}
                        subtitle={careGuide.intro}
                    />
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {careGuide.steps.map((step) => (
                            <CareGuideStep key={step.step} {...step} />
                        ))}
                    </div>
                    <div className="mt-12 flex justify-center">
                        <Button asChild variant="outline">
                            <Link href={careGuide.cta.href}>{careGuide.cta.label}</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}