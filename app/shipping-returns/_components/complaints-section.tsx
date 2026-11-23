import { Card, CardContent } from "@/components/ui/card"
import { shippingReturnsContent } from "../_data"
import { ContactDetails } from "@/components/common/contact-details"

export function ComplaintsSection() {
    const { complaints } = shippingReturnsContent

    return (
        <Card className="border-stone-200 shadow-sm">
            <CardContent className="p-8">
                <h2 className="font-serif text-2xl text-stone-900 mb-6">
                    {complaints.title}
                </h2>
                <p className="mb-6 leading-relaxed text-stone-600">
                    {complaints.description}
                </p>

                <ContactDetails />
            </CardContent>
        </Card>
    )
}