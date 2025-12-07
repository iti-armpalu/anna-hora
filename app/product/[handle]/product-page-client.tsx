'use client'

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/hooks/use-price";
// import { WishlistButton } from "@/components/wishlist-button";
import { useState } from "react";
import { toast } from "sonner";
import { ProductGallery } from "./_components/product-gallery";
import { ProductDetailsAccordion } from "./_components/product-detail-accordion";
import { CustomerAssurance } from "./_components/customer-assurance";
import { ProductNormalized, ProductVariantNormalized } from "@/lib/shopify/types/product-normalized";

export const revalidate = 60; // ISR every 60 seconds

interface Props {
    product: ProductNormalized;
}

export default function ProductPageClient({ product }: Props) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    let selectedVariant: ProductVariantNormalized | null = null;

    // --- Add to Bag handler ---
    async function handleAddToBag() {
        // console.log("Add to Bag clicked");

        if (!selectedSize) {
            toast.error("Please select a size before adding to bag.");
            return;
        }

        const selected = sizes.find((s) => s.size === selectedSize);

        if (!selected?.variantId) {
            toast.error("Selected size is not available.");
            return;
        }

        await addToCart(selected.variantId, 1);

        toast.success(
            `${product.title} (Size: ${selectedSize}!`
        );
    }

    const sizeOption = product.options.find(
        (opt) => opt.name.toLowerCase() === "size"
    );

    const sizes = sizeOption
        ? sizeOption.values.map((size) => {
            // Find the variant corresponding to this size
            const variantForSize = product.variants.find((variant) =>
                variant.selectedOptions.some(
                    (opt) =>
                        opt.name.toLowerCase() === "size" &&
                        opt.value.toLowerCase() === size.toLowerCase()
                )
            );

            return {
                size,
                inStock: variantForSize?.availableForSale ?? false,
                variantId: variantForSize?.id ?? null,
            };
        })
        : [];




    // Get the price from the selected variant:
    if (selectedSize) {
        selectedVariant =
            product.variants.find((variant) =>
                variant.selectedOptions.some(
                    (opt) =>
                        opt.name.toLowerCase() === "size" &&
                        opt.value.toLowerCase() === selectedSize.toLowerCase()
                )
            ) ?? null; // ← converts undefined -> null
    }

    // const basePrice =
    //     selectedVariant?.node.price?.amount ??
    //     product.priceRange.minVariantPrice?.amount ??
    //     "0";

    // const currency =
    //     selectedVariant?.node.price?.currencyCode ??
    //     product.priceRange.minVariantPrice?.currencyCode ??
    //     "GBP";

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

    // const total = Number(basePrice) * quantity;

    // const formattedTotal = formatPrice({
    //     amount: total,
    //     currencyCode: currency
    // });

    const images = product.images;

    // const fabric = product.metafields.fabric;
    // const sensoryDescription = product.metafields.sensoryDescription;
    const lifestyleDescription = product.metafields.lifestyleDescription;
    const styleDescription = product.metafields.styleDescription;


    return (
        <div className="min-h-screen">

            {/* Main Product Section */}
            <div className="container mx-auto py-12">
                {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-12"> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Gallery */}
                    {/* <div className="lg:col-span-3"> */}
                    <div>
                        <ProductGallery images={images} />
                    </div>

                    {/* <div className="lg:col-span-2"> */}
                    <div>
                        {/* Product Info */}
                        <div className="space-y-8">
                            {/* Product Header */}
                            <div className="space-y-4">
                                <h1 className="text-3xl lg:text-4xl font-light text-stone-800 font-serif">{product.title}</h1>
                                <p className="text-lg text-stone-600 italic">{product.description}</p>
                                <div className="flex items-center space-x-4">
                                    <p className="text-xl font-medium text-stone-800">
                                        {formattedPrice}
                                    </p>
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-stone-800">Size</h3>

                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {sizes.map(({ size, inStock, variantId }) => (
                                        <Button
                                            key={variantId}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (inStock) {
                                                    setSelectedSize(size);
                                                }
                                            }}
                                            variant={selectedSize === variantId ? "default" : "outline"}
                                            disabled={!inStock}
                                            className={`${selectedSize === size
                                                ? "bg-stone-800 text-white"
                                                : inStock
                                                    ? "bg-white text-stone-800 border-stone-300"
                                                    : "bg-stone-100 text-stone-400 border-stone-200 line-through cursor-not-allowed opacity-60"
                                                }
                                        `}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Bag */}
                            <div className="space-y-4">

                                <div className="space-y-3">
                                    <Button
                                        size="lg"
                                        onClick={handleAddToBag}
                                        className="w-full bg-stone-800 hover:bg-stone-700 text-white py-4"
                                    >
                                        Add to Bag – {formattedPrice}
                                    </Button>
                                    {/* <WishlistButton
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        originalPrice: product.originalPrice,
                                        image: product.images[0],
                                        color: product.colors.find((c) => c.id === selectedColor)?.name || "Default",
                                        size: selectedSize,
                                        stock: 10,
                                        category: "robes",
                                    }}
                                    variant="full"
                                    size="lg"
                                    className="w-full"
                                /> */}
                                </div>
                            </div>

                            {/* Customer Assurance */}
                            <CustomerAssurance />

                            {/* Product Description */}
                            <div className="pt-8 space-y-6 border-t border-stone-200">
                                <h2 className="text-2xl font-light text-stone-800 font-serif">For mornings when the world can wait</h2>
                                <div className="space-y-4 text-stone-600 leading-relaxed">
                                    {/* <p>{sensoryDescription}</p> */}
                                    <p>{lifestyleDescription}</p>
                                    <p>{styleDescription}</p>
                                </div>
                            </div>
                            {/* Product Details Accordion */}
                            <div className="border-t border-stone-200 pt-8">
                                <ProductDetailsAccordion product={product} />
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
