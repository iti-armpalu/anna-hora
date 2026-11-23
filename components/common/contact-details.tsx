import type { ReactNode } from "react"
import { siteConfig } from "@/lib/config/site"
import { CONTACT_COPY } from "@/lib/config/contact"
import { CopyButton } from "@/components/ui/copy-button"

const LINK_CLASS = "text-foreground underline-offset-4 decoration-1 hover:underline"

function Row({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="grid grid-cols-1 gap-tight py-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
            <dt className="label-uppercase pt-0.5">{label}</dt>
            <dd className="flex flex-col gap-1 text-small text-foreground">{children}</dd>
        </div>
    )
}

/** Day → hours pairs; Saturday and Sunday merge into one line when they're the same. */
function HoursTable() {
    const { mondayFriday, saturday, sunday, timezone } = siteConfig.customerCareHours
    const rows: { days: string; hours: string }[] = [
        { days: CONTACT_COPY.weekdays, hours: mondayFriday },
        ...(saturday === sunday
            ? [{ days: CONTACT_COPY.weekend, hours: saturday }]
            : [
                { days: CONTACT_COPY.saturday, hours: saturday },
                { days: CONTACT_COPY.sunday, hours: sunday },
            ]),
    ]

    return (
        <>
            <span className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                {rows.map(({ days, hours }) => (
                    <span key={days} className="contents">
                        <span>{days}</span>
                        <span className={hours === CONTACT_COPY.closed ? "text-muted-foreground" : "tabular-nums"}>
                            {hours}
                        </span>
                    </span>
                ))}
            </span>
            <span className="mt-1 text-xs text-muted-foreground">{timezone}</span>
        </>
    )
}

type Props = {
    /** Adds the Instagram row — on the Contact page, not in policy pages */
    showSocial?: boolean
}

/**
 * Customer-care details as hairline rows. Email and phone are real links (tap to email/call on mobile),
 * with a quiet Copy action beside them for desktop.
 */
export function ContactDetails({ showSocial = false }: Props) {
    const { supportEmail, phone, phoneDisplay, social } = siteConfig

    return (
        <dl className="divide-y divide-border border-y border-border">
            <Row label={CONTACT_COPY.email}>
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <a href={`mailto:${supportEmail}`} className={LINK_CLASS}>
                        {supportEmail}
                    </a>
                    <CopyButton value={supportEmail} label="email address" />
                </span>
            </Row>

            <Row label={CONTACT_COPY.phone}>
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <a href={`tel:${phone}`} className={LINK_CLASS}>
                        {phoneDisplay}
                    </a>
                    <CopyButton value={phone} label="phone number" />
                </span>
            </Row>

            <Row label={CONTACT_COPY.hours}>
                <HoursTable />
            </Row>

            {showSocial && social.instagram && (
                <Row label={CONTACT_COPY.instagram}>
                    <a href={social.instagram.link} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                        @{social.instagram.handle}
                    </a>
                </Row>
            )}
        </dl>
    )
}
