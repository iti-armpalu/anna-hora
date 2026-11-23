import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashList } from "@/components/common/dash-list"
import { DetailList, DetailRow } from "@/components/common/detail-list"
import { NumberedSteps } from "@/components/common/numbered-steps"
import { shippingReturnsContent } from "../_data"
import { InfoSection } from "@/components/common/info-section"
import { SECTION_IDS } from "./section-ids"

export function ReturnsSection() {
    const { returns } = shippingReturnsContent

    return (
        <InfoSection
            id={SECTION_IDS.returns}
            title={returns.title}
            description={returns.description}
            cta={{ text: returns.ctaText, href: returns.ctaHref }}
        >
            <NumberedSteps steps={returns.steps} className="lg:grid-cols-3" />
            <Button asChild className="w-fit">
                <Link href={returns.startCta.href}>{returns.startCta.label}</Link>
            </Button>

            <div className="flex flex-col gap-field">
                <h3 className="label-uppercase mb-0">{returns.policyTitle}</h3>
                <DetailList>
                    {returns.policy.map((group) => (
                        <DetailRow key={group.name} label={group.name}>
                            <DashList items={group.items} />
                        </DetailRow>
                    ))}
                </DetailList>
            </div>
        </InfoSection>
    )
}
