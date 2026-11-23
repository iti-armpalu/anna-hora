import { DashList } from "@/components/common/dash-list"
import { DetailList, DetailRow } from "@/components/common/detail-list"
import { DELIVERY_REGIONS } from "@/lib/config/delivery"
import { shippingReturnsContent } from "../_data"
import { InfoSection } from "@/components/common/info-section"
import { SECTION_IDS } from "./section-ids"

export function DeliverySection() {
    const { delivery } = shippingReturnsContent

    return (
        <InfoSection
            id={SECTION_IDS.delivery}
            title={delivery.title}
            description={delivery.description}
            cta={{ text: delivery.ctaText, href: delivery.ctaHref }}
        >
            <DetailList>
                <DetailRow label={delivery.timesLabel}>
                    <span className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                        {DELIVERY_REGIONS.map(({ region, time, carriers }) => (
                            <span key={region} className="contents">
                                <span>{region}</span>
                                <span>
                                    {time} <span className="text-muted-foreground">· {carriers}</span>
                                </span>
                            </span>
                        ))}
                    </span>
                </DetailRow>
                {delivery.info.map((group) => (
                    <DetailRow key={group.name} label={group.name}>
                        <DashList items={group.items} />
                    </DetailRow>
                ))}
            </DetailList>

            <div className="flex flex-col gap-field bg-secondary p-6">
                <span className="label-uppercase">{delivery.notesTitle}</span>
                <DashList items={delivery.importantNotes} />
            </div>
        </InfoSection>
    )
}
