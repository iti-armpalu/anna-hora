import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/common/section-header"
import { silkContent } from "../_data"
import { NumberedSteps } from "@/components/common/numbered-steps"

export function CareGuideSection() {
    const { careGuide } = silkContent

    return (
        <section className="section">
            <div className="container-site">
                <SectionHeader titleTop={careGuide.headingTop} titleEm={careGuide.headingEm} subtitle={careGuide.intro} />
                <NumberedSteps steps={careGuide.steps} className="lg:grid-cols-4" />
                <div className="mt-12 flex justify-center">
                    <Button asChild variant="outline">
                        <Link href={careGuide.cta.href}>{careGuide.cta.label}</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
