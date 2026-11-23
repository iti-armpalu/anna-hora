import { ContactDetails } from "@/components/common/contact-details"
import { shippingReturnsContent } from "../_data"
import { InfoSection } from "@/components/common/info-section"
import { SECTION_IDS } from "./section-ids"

export function HelpSection() {
    const { help } = shippingReturnsContent

    return (
        <InfoSection id={SECTION_IDS.help} title={help.title} description={help.description}>
            <p className="text-small text-foreground">{help.resolution}</p>
            <ContactDetails />
        </InfoSection>
    )
}
