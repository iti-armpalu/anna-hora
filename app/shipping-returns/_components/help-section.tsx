import { ContactDetails } from "@/components/common/contact-details"
import { shippingReturnsContent } from "../_data"
import { PolicySection } from "./policy-section"
import { SECTION_IDS } from "./section-ids"

export function HelpSection() {
    const { help } = shippingReturnsContent

    return (
        <PolicySection id={SECTION_IDS.help} title={help.title} description={help.description}>
            <p className="text-small text-foreground">{help.resolution}</p>
            <ContactDetails />
        </PolicySection>
    )
}
