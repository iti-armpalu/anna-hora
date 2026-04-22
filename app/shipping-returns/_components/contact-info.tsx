import type { ReactNode } from "react"

interface ContactInfoProps {
    icon: ReactNode
    label: string
    content: ReactNode
}

export function ContactInfo({ icon, label, content }: ContactInfoProps) {
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