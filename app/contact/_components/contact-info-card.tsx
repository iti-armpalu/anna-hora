import { Mail, Phone, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CopyButton } from "@/components/ui/copy-button"
import { siteConfig } from "@/lib/config/site"
import { contactContent } from "../_data"
import type { ReactNode } from "react"

function ContactInfo({
    icon,
    label,
    content,
}: {
    icon: ReactNode
    label: string
    content: ReactNode
}) {
    return (
        <div className="flex items-start space-x-3">
            {icon}
            <div>
                <p className="text-sm text-stone-600 mb-1">{label}</p>
                {content}
            </div>
        </div>
    )
}

export function ContactInfoCard() {
    const { getInTouch } = contactContent

    return (
        <Card className="border-stone-200 shadow-sm py-0">
            <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-4">{getInTouch.title}</h3>
                <div className="space-y-4">
                    <ContactInfo
                        icon={<Mail className="w-5 h-5 text-stone-600 mt-0.5" />}
                        label={getInTouch.labels.email}
                        content={<CopyButton value={siteConfig.supportEmail} />}
                    />
                    <ContactInfo
                        icon={<Phone className="w-5 h-5 text-stone-600 mt-0.5" />}
                        label={getInTouch.labels.phone}
                        content={<CopyButton value={siteConfig.phone} />}
                    />
                    <ContactInfo
                        icon={<Clock className="w-5 h-5 text-stone-600 mt-0.5" />}
                        label={getInTouch.labels.hours}
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