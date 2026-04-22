import { Mail, Phone, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CopyButton } from "@/components/ui/copy-button"
import { siteConfig } from "@/lib/config/site"
import { shippingReturnsContent } from "../_data"
import { ContactInfo } from "./contact-info"

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

                <div className="space-y-4">
                    <ContactInfo
                        icon={<Mail className="w-5 h-5 text-stone-600 mt-0.5" />}
                        label={complaints.labels.email}
                        content={<CopyButton value={siteConfig.supportEmail} />}
                    />
                    <ContactInfo
                        icon={<Phone className="w-5 h-5 text-stone-600 mt-0.5" />}
                        label={complaints.labels.phone}
                        content={<CopyButton value={siteConfig.phone} />}
                    />
                    <ContactInfo
                        icon={<Clock className="w-5 h-5 text-stone-600 mt-0.5" />}
                        label={complaints.labels.hours}
                        content={
                            <>
                                <p className="text-stone-900">
                                    Monday – Friday: {siteConfig.customerCareHours.mondayFriday}
                                </p>
                                <p className="text-sm text-stone-500">
                                    Saturday: {siteConfig.customerCareHours.saturday}
                                </p>
                                <p className="text-sm text-stone-500">
                                    Sunday: {siteConfig.customerCareHours.sunday}
                                </p>
                            </>
                        }
                    />
                </div>
            </CardContent>
        </Card>
    )
}