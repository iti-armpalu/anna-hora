"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/hooks/use-price"
import { toast } from "sonner"
import type {
    ProductNormalized,
    ProductVariantNormalized,
} from "@/lib/shopify/types/product-normalized"

import { ProductGallery } from "./_components/product-gallery"
import { SizeGuideDialog } from "./_components/size-guide-dialog"
import { CustomerAssurance } from "./_components/customer-assurance"
import { ProductDetailsAccordion } from "./_components/product-detail-accordion"
import ProductImageCarousel from "@/components/shop/product-image-carousel"
import { WishlistButton } from "@/components/wishlist-button"
import { PREORDER_COPY, getPreorderShippingText } from "@/lib/config/preorder"

interface Props {
    product: ProductNormalized
    shippingCountry: string
    canShip: boolean
}

export default function ProductPageClient({
    product,
    shippingCountry,
    canShip,
}: Props) {
    const { addToCart } = useCart()
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [showSizeGuide, setShowSizeGuide] = useState(false)

    // Size → variant map
    const sizeMap = useMemo(() => {
        const map = new Map<string, ProductVariantNormalized>()
        for (const variant of product.variants) {
            const sizeOpt = variant.selectedOptions.find(
                (opt) => opt.name.toLowerCase() === "size"
            )
            if (sizeOpt) map.set(sizeOpt.value, variant)
        }
        return map
    }, [product.variants])

    const sizes = useMemo(
        () =>
            Array.from(sizeMap.entries()).map(([size, variant]) => ({
                size,
                status: variant.stockStatus,
            })),
        [sizeMap]
    )

    const selectedVariant = selectedSize ? sizeMap.get(selectedSize) ?? null : null
    const sizeGuideId = product.metafields.sizeGuideId?.trim().toLowerCase() ?? null

    const formattedPrice = formatPrice({
        amount: selectedVariant ? selectedVariant.price.amount : product.minPrice,
        currencyCode: selectedVariant
            ? selectedVariant.price.currencyCode
            : product.currencyCode,
    })

    const isPreorder = selectedVariant?.stockStatus === "preorder"

    async function handleAddToBag() {
        if (!selectedVariant) {
            toast.error("Please select a size before adding to bag.")
            return
        }
        if (!canShip) {
            toast.error(`We don't ship to ${shippingCountry}.`)
            return
        }
        await addToCart(selectedVariant.id, 1)
        toast.success(
            `${product.title} added to bag • Size ${selectedSize}${isPreorder ? ` (${PREORDER_COPY.buttonLabel.toLowerCase()})` : ""}`
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-12">

                {/* Gallery */}
                <div className="hidden md:block">
                    <ProductGallery images={product.images} />
                </div>
                <div className="md:hidden">
                    <ProductImageCarousel product={product} />
                </div>

                {/* Product info */}
                <div className="flex flex-col gap-8 lg:sticky lg:top-24 lg:h-fit">

                    {/* Title & price */}
                    <div className="space-y-2">
                        <h1 className="text-2xl lg:text-3xl font-light font-serif leading-tight text-stone-900">
                            {product.title}
                        </h1>
                        <p className="text-stone-500 leading-relaxed text-sm">
                            {product.description}
                        </p>
                        <p className="text-xl font-medium text-stone-900 pt-1">
                            {formattedPrice}
                        </p>
                    </div>

                    {/* Size */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium text-stone-800">Size</h2>
                            <SizeGuideDialog
                                open={showSizeGuide}
                                onOpenChange={setShowSizeGuide}
                                sizeGuideId={sizeGuideId}
                            />
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {sizes.map(({ size, status }) => {
                                const isSoldOut = status === "sold_out"
                                return (
                                    <Button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        disabled={isSoldOut}
                                        aria-label={status === "preorder" ? `${size}, ${PREORDER_COPY.sizeBadge}` : size}
                                        variant={selectedSize === size ? "default" : "outline"}
                                        className={isSoldOut ? "opacity-40 cursor-not-allowed line-through" : ""}
                                    >
                                        {size}
                                    </Button>
                                )
                            })}
                        </div>
                        {isPreorder && (
                            <div className="border border-stone-200 bg-stone-50 px-4 py-3 space-y-1">
                                <p className="text-sm font-medium text-stone-800">
                                    {PREORDER_COPY.buttonLabel} · {getPreorderShippingText(product.preorderLeadTimeWeeks)}
                                </p>
                                <p className="text-xs text-stone-500">{PREORDER_COPY.explainer}</p>
                            </div>
                        )}
                        {product.metafields.fitNotes && (
                            <p className="text-xs text-stone-400">
                                {product.metafields.fitNotes}
                            </p>
                        )}
                    </div>

                    {/* Add to bag */}
                    {!canShip ? (
                        <p className="text-sm text-stone-500">
                            We don't ship to your country yet — hopefully soon.
                        </p>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                onClick={handleAddToBag}
                                className="flex-1"
                                disabled={!selectedVariant}
                            >
                                {!selectedVariant
                                    ? "Select a size"
                                    : isPreorder
                                        ? `${PREORDER_COPY.buttonLabel} – ${formattedPrice}`
                                        : `Add to Bag – ${formattedPrice}`}
                            </Button>
                            <WishlistButton product={product} />
                        </div>
                    )}

                    <CustomerAssurance />
                    <ProductDetailsAccordion product={product} />
                </div>
            </div>
        </div>
    )
}