"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/hooks/use-price"
import { toast } from "sonner"
import { giftGuideContent } from "../_data"
import type { ProductNormalized, ProductVariantNormalized } from "@/lib/shopify/types/product-normalized"

interface GiftCardSectionProps {
    giftCardProduct: ProductNormalized | null
}

export function GiftCardSection({ giftCardProduct }: GiftCardSectionProps) {
    const { giftCard } = giftGuideContent
    const { addToCart } = useCart()

    const [selectedVariant, setSelectedVariant] = useState<ProductVariantNormalized | null>(null)
    const [loading, setLoading] = useState(false)

    const variants = giftCardProduct
        ? [...giftCardProduct.variants].sort(
            (a, b) => Number(a.price.amount) - Number(b.price.amount)
        )
        : []

    const formattedPrice = selectedVariant
        ? formatPrice({
            amount: selectedVariant.price.amount,
            currencyCode: selectedVariant.price.currencyCode,
        })
        : null

    async function handleAddToCart() {
        if (!selectedVariant) {
            toast.error("Please select an amount first.")
            return
        }

        setLoading(true)
        try {
            await addToCart(selectedVariant.id, 1)
            const formattedAmount = formatPrice({
                amount: selectedVariant.price.amount,
                currencyCode: selectedVariant.price.currencyCode,
            })
            toast.success(`Gift card added to bag • ${formattedAmount}`)
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="gift-card" className="py-16 lg:py-24 bg-stone-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">

                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                            {giftCard.titleTop}
                            <br />
                            <em className="font-serif italic">{giftCard.titleEm}</em>
                        </h2>
                        <p className="text-lg text-stone-600 max-w-2xl mx-auto">{giftCard.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                        {/* Image */}
                        <div className="relative min-h-[200px]">
                            <Image
                                src={giftCard.image.src}
                                alt={giftCard.image.alt}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 500px, 90vw"
                            />
                        </div>

                        {/* Card */}
                        <Card className="border-0 shadow-lg bg-white p-8 flex flex-col justify-center">
                            <div className="space-y-6">

                                {/* Amount selector */}
                                {giftCardProduct ? (
                                    <>
                                        <div className="space-y-3">
                                            <p className="text-sm font-medium text-stone-800">Select amount</p>
                                            <div className="grid grid-cols-3 gap-2">
                                                {variants.map((variant) => {
                                                    const label = formatPrice({
                                                        amount: variant.price.amount,
                                                        currencyCode: variant.price.currencyCode,
                                                    })
                                                    const isSelected = selectedVariant?.id === variant.id

                                                    return (
                                                        <Button
                                                            key={variant.id}
                                                            variant={isSelected ? "default" : "outline"}
                                                            onClick={() => setSelectedVariant(variant)}
                                                            className="text-sm"
                                                        >
                                                            {label}
                                                        </Button>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Button
                                                className="w-full"
                                                disabled={!selectedVariant || loading}
                                                onClick={handleAddToCart}
                                            >
                                                {!selectedVariant
                                                    ? "Select an amount"
                                                    : loading
                                                        ? "Adding..."
                                                        : `${giftCard.ctaLabel} – ${formattedPrice}`}
                                            </Button>
                                            <p className="text-xs text-stone-400 text-center leading-relaxed">
                                                Delivered to your inbox after purchase, yours to forward or share. Physical gift cards are available upon request.
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <Button disabled className="w-full opacity-60">
                                        Currently unavailable
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}