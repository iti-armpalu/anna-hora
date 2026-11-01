import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SIZE_SEARCH_PARAM } from "@/lib/config/color-group"
import type {
    ColorSiblingNormalized,
    ColorSwatchNormalized,
} from "@/lib/shopify/types/product-normalized"

type Props = {
    siblings: ColorSiblingNormalized[]
    currentHandle: string
    selectedSize: string | null
}

const SWATCH_BASE = "relative block h-7 w-7 overflow-hidden rounded-full border border-stone-200"

function SwatchFill({ color, label }: { color: ColorSwatchNormalized | null; label: string }) {
    if (color?.imageUrl) {
        return (
            <span className={SWATCH_BASE}>
                <Image src={color.imageUrl} alt="" fill sizes="28px" className="object-cover" />
            </span>
        )
    }

    if (color?.hex) {
        // Inline style is unavoidable here: the hex comes from Shopify at runtime,
        // and Tailwind can only generate classes for values known at build time.
        return <span className={SWATCH_BASE} style={{ backgroundColor: color.hex }} />
    }

    // No swatch configured in Shopify — show the initial so the option is still usable
    return (
        <span className={cn(SWATCH_BASE, "flex items-center justify-center bg-stone-100 text-[10px] text-stone-600")}>
            {label.charAt(0)}
        </span>
    )
}

export function ColorSwatches({ siblings, currentHandle, selectedSize }: Props) {
    if (siblings.length < 2) return null

    const current = siblings.find((s) => s.handle === currentHandle)
    const currentLabel = current?.color?.name ?? current?.title

    return (
        <div className="space-y-3">
            <h2 className="text-sm font-medium text-stone-800">
                Colour{currentLabel && <span className="font-normal text-stone-500">: {currentLabel}</span>}
            </h2>
            <ul className="flex flex-wrap gap-2">
                {siblings.map((sibling) => {
                    const label = sibling.color?.name ?? sibling.title
                    const isCurrent = sibling.handle === currentHandle
                    const ringClass = cn(
                        "block rounded-full p-0.5 ring-1 transition",
                        isCurrent ? "ring-stone-900" : "ring-transparent hover:ring-stone-300",
                        !sibling.purchasable && "opacity-40"
                    )
                    const accessibleLabel = sibling.purchasable ? label : `${label} — sold out`

                    if (isCurrent) {
                        return (
                            <li key={sibling.handle}>
                                <span className={ringClass} aria-current="true" aria-label={accessibleLabel} title={label}>
                                    <SwatchFill color={sibling.color} label={label} />
                                </span>
                            </li>
                        )
                    }

                    const href = selectedSize
                        ? `/products/${sibling.handle}?${SIZE_SEARCH_PARAM}=${encodeURIComponent(selectedSize)}`
                        : `/products/${sibling.handle}`

                    return (
                        <li key={sibling.handle}>
                            <Link href={href} className={ringClass} aria-label={accessibleLabel} title={label}>
                                <SwatchFill color={sibling.color} label={label} />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
