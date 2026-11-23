import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/common/section-header"
import { silkContent } from "../_data"
import { CareGuideStep } from "./care-guide-step"

export function CareGuideSection() {
    const { careGuide } = silkContent

    return (
        <section className="section">
            <div className="container-site">
                <SectionHeader titleTop={careGuide.headingTop} titleEm={careGuide.headingEm} subtitle={careGuide.intro} />
                <ol className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
                    {careGuide.steps.map((step) => (
                        <CareGuideStep key={step.step} {...step} />
                    ))}
                </ol>
                <div className="mt-12 flex justify-center">
                    <Button asChild variant="outline">
                        <Link href={careGuide.cta.href}>{careGuide.cta.label}</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
