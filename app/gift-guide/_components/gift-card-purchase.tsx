"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/hooks/use-price"
import type { ProductNormalized, ProductVariantNormalized } from "@/lib/shopify/types/product-normalized"
import { giftGuideContent } from "../_data"

/** The only interactive part of the gift card section — amount picker and add to bag. */
export function GiftCardPurchase({ giftCardProduct }: { giftCardProduct: ProductNormalized }) {
    const { purchase } = giftGuideContent.giftCard
    const { addToCart, loading: isAdding } = useCart()
    const [selectedVariant, setSelectedVariant] = useState<ProductVariantNormalized | null>(null)

    const variants = [...giftCardProduct.variants].sort(
        (a, b) => Number(a.price.amount) - Number(b.price.amount)
    )
    const formattedPrice = selectedVariant ? formatPrice(selectedVariant.price) : null

    async function handleAddToBag(): Promise<void> {
        if (!selectedVariant || !formattedPrice) return

        // addToCart never throws — failures come back as { ok: false, error }
        const result = await addToCart(selectedVariant.id, 1)
        if (!result.ok) {
            toast.error(result.error)
            return
        }
        toast.success(purchase.addedToast(formattedPrice))
    }

    return (
        <div className="flex flex-col gap-block">
            <div className="flex flex-col gap-field">
                <span className="label-uppercase">{purchase.amountLabel}</span>
                <div className="grid grid-cols-3 gap-2">
                    {variants.map((variant) => {
                        const isSelected = selectedVariant?.id === variant.id
                        return (
                            <Button
                                key={variant.id}
                                variant={isSelected ? "default" : "outline"}
                                aria-pressed={isSelected}
                                onClick={() => setSelectedVariant(variant)}
                                // Prices are figures, not labels — keep them out of the uppercase tracking
                                className="px-0 normal-case tracking-normal text-small"
                            >
                                {formatPrice(variant.price)}
                            </Button>
                        )
                    })}
                </div>
            </div>

            <div className="flex flex-col gap-field">
                <Button
                    size="lg"
                    className="w-full"
                    disabled={!selectedVariant || isAdding}
                    aria-busy={isAdding}
                    onClick={handleAddToBag}
                >
                    {!selectedVariant
                        ? purchase.selectPrompt
                        : isAdding
                            ? purchase.adding
                            : `${purchase.ctaLabel} – ${formattedPrice}`}
                </Button>
                <p className="text-xs text-muted-foreground">{purchase.deliveryNote}</p>
            </div>
        </div>
    )
}
