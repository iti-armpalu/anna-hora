import type { ReactNode } from "react"

type Props = {
    label: string
    /** Current choice shown next to the label, e.g. the colour name */
    value?: string | null
    /** Optional control on the right of the label row, e.g. the size guide link */
    action?: ReactNode
    children: ReactNode
}

/**
 * Labelled option block on the PDP (Colour, Size, …). The label row has a fixed
 * height so an action like "Size guide" can't change the label → control spacing —
 * every option group on the page reads with the same rhythm.
 */
export function OptionGroup({ label, value, action, children }: Props) {
    return (
        <div className="flex flex-col gap-field">
            <div className="flex h-5 items-center justify-between">
                <h2 className="label-uppercase mb-0">
                    {label}
                    {value && (
                        <span className="ml-2 normal-case tracking-normal font-normal text-foreground">{value}</span>
                    )}
                </h2>
                {action}
            </div>
            {children}
        </div>
    )
}
