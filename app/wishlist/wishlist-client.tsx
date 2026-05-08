"use client"

import Link from "next/link"
import { useWishlist } from "@/context/wishlist-context"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/shop/product-card"
import type { ProductNormalized } from "@/lib/shopify/types/product-normalized"

function wishlistItemToProduct(item: ReturnType<typeof useWishlist>["items"][number]): ProductNormalized {
    return {
        id: item.id,
        handle: item.handle,
        title: item.title,
        description: "",
        minPrice: item.price,
        currencyCode: item.currencyCode,
        featuredImage: { url: item.image, altText: item.title },
        images: item.images,
        options: item.sizes.length > 0
            ? [{ name: "Size", values: item.sizes.map((s) => s.size) }]
            : [],
        variants: item.sizes.map((s, i) => ({
            id: `${item.id}-${i}`,
            title: s.size,
            availableForSale: s.inStock,
            price: { amount: item.price, currencyCode: item.currencyCode },
            selectedOptions: [{ name: "Size", value: s.size }],
        })),
        metafields: {
            fabricShort: item.fabricShort,
        },
    } as unknown as ProductNormalized
}

export default function WishlistClient() {
    const { items, clear } = useWishlist()
    const hasItems = items.length > 0

    return (
        <div className="bg-stone-50">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
                        Your Wishlist
                    </h1>
                    <p className="text-stone-600 max-w-xl mx-auto text-sm leading-relaxed">
                        Save your favourite pieces.{" "}
                        <Link href="/signin" className="underline underline-offset-4 hover:text-stone-800 transition-colors">
                            Sign in
                        </Link>
                        {" "}to keep them safe across all devices.
                    </p>
                </div>

                {/* Empty state */}
                {!hasItems && (
                    <div className="text-center py-24">
                        <h2 className="text-2xl font-light text-stone-800 mb-4">
                            Your wishlist is empty
                        </h2>
                        <p className="text-stone-600 mb-8 max-w-md mx-auto text-sm">
                            Explore our collection and save the pieces you love.
                        </p>
                        <Button asChild>
                            <Link href="/shop">Explore the Collection</Link>
                        </Button>
                    </div>
                )}

                {/* Items */}
                {hasItems && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-sm text-stone-600">
                                {items.length} {items.length === 1 ? "piece" : "pieces"} saved
                            </p>
                            <button
                                onClick={() => confirm("Clear your wishlist?") && clear()}
                                className="text-xs text-stone-500 hover:text-stone-800 underline transition-colors"
                            >
                                Clear all
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                            {items.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    product={wishlistItemToProduct(item)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}