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
                inStock: variant.availableForSale,
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

    const isOutOfStock = !!selectedVariant && !selectedVariant.availableForSale

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
        toast.success(`${product.title} added to bag • Size ${selectedSize}`)
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
                        <p className="text-stone-500 italic leading-relaxed text-sm">
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
                            {sizes.map(({ size, inStock }) => (
                                <Button
                                    key={size}
                                    onClick={() => inStock ? setSelectedSize(size) : undefined}
                                    disabled={!inStock}
                                    variant={selectedSize === size ? "default" : "outline"}
                                    className={!inStock ? "opacity-40 cursor-not-allowed line-through" : ""}
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                        {product.metafields.fitNotes && (
                            <p className="text-xs text-stone-400 leading-relaxed">
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
                        <Button
                            size="lg"
                            onClick={handleAddToBag}
                            className="w-full"
                            disabled={!selectedVariant || isOutOfStock}
                        >
                            {!selectedVariant
                                ? "Select a size"
                                : isOutOfStock
                                    ? "Currently Out of Stock"
                                    : `Add to Bag – ${formattedPrice}`}
                        </Button>
                    )}

                    <CustomerAssurance />
                    <ProductDetailsAccordion product={product} />
                </div>
            </div>
        </div>
    )
}