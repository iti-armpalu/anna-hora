"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/hooks/use-price";
import { toast } from "sonner";

import { ProductGallery } from "./_components/product-gallery";
import { ProductDetailsAccordion } from "./_components/product-detail-accordion";
import { CustomerAssurance } from "./_components/customer-assurance";

import {
    ProductNormalized,
    ProductVariantNormalized,
} from "@/lib/shopify/types/product-normalized";

interface Props {
    product: ProductNormalized;
    freeShipping: {
        country: string;
        threshold: number;
        currency: string;
    };
}

export default function ProductPageClient({
    product,
    freeShipping,
}: Props) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // -------------------------------------------------
    // Build SIZE → VARIANT map once
    // -------------------------------------------------
    const sizeMap = useMemo(() => {
        const map = new Map<string, ProductVariantNormalized>();

        for (const variant of product.variants) {
            const sizeOpt = variant.selectedOptions.find(
                (opt) => opt.name.toLowerCase() === "size"
            );

            if (sizeOpt) {
                map.set(sizeOpt.value, variant);
            }
        }

        return map;
    }, [product.variants]);

    const sizes = useMemo(() => {
        return Array.from(sizeMap.entries()).map(([size, variant]) => ({
            size,
            inStock: variant.availableForSale,
            variantId: variant.id,
        }));
    }, [sizeMap]);

    const selectedVariant = selectedSize
        ? sizeMap.get(selectedSize) ?? null
        : null;

    // -------------------------------------------------
    // Price
    // -------------------------------------------------
    const basePrice = selectedVariant
        ? selectedVariant.price.amount
        : product.minPrice;

    const currency = selectedVariant
        ? selectedVariant.price.currencyCode
        : product.currencyCode;

    const formattedPrice = formatPrice({
        amount: basePrice,
        currencyCode: currency,
    });

    // -------------------------------------------------
    // Add to Cart
    // -------------------------------------------------
    async function handleAddToBag() {
        if (!selectedVariant) {
            toast.error("Please select a size before adding to bag.");
            return;
        }

        await addToCart(selectedVariant.id, 1);

        toast.success(
            `${product.title} (Size: ${selectedSize}) added to your bag`
        );
    }

    // -------------------------------------------------
    // Render
    // -------------------------------------------------
    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Gallery */}
                    <ProductGallery images={product.images} />

                    {/* Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-3xl lg:text-4xl font-light font-serif">
                                {product.title}
                            </h1>
                            <p className="text-lg text-stone-600 italic">
                                {product.description}
                            </p>
                            <p className="text-xl font-medium">{formattedPrice}</p>
                        </div>

                        {/* Size */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium">Size</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {sizes.map(({ size, inStock }) => (
                                    <Button
                                        key={size}
                                        disabled={!inStock}
                                        onClick={() => inStock && setSelectedSize(size)}
                                        variant={
                                            selectedSize === size ? "default" : "outline"
                                        }
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Bag */}
                        <Button
                            size="lg"
                            onClick={handleAddToBag}
                            className="w-full"
                        >
                            Add to Bag – {formattedPrice}
                        </Button>

                        <CustomerAssurance freeShipping={freeShipping} />

                        {/* Description */}
                        <div className="pt-8 border-t">
                            <h2 className="text-2xl font-light font-serif">
                                For mornings when the world can wait
                            </h2>
                            <div className="mt-4 space-y-4 text-stone-600">
                                <p>{product.metafields.lifestyleDescription}</p>
                                <p>{product.metafields.styleDescription}</p>
                            </div>
                        </div>

                        <ProductDetailsAccordion product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
