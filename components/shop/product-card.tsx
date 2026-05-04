"use client"

import { WishlistButton } from "../wishlist-button"
import ProductImageCarousel from "./product-image-carousel"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { formatPrice } from "@/hooks/use-price"
import Link from "next/link"
import { cn } from "@/lib/utils"

type GridDensity = "comfortable" | "compact"

type ProductCardProps = {
  product: ProductNormalized
  className?: string
  density?: GridDensity
}

export function ProductCard({
  product,
  className,
  density = "comfortable",
}: ProductCardProps) {
  const price = formatPrice({
    amount: product.minPrice,
    currencyCode: product.currencyCode,
  })

  const fabric = product.metafields.fabricShort

  const sizeOption = product.options.find(
    (opt) => opt.name.toLowerCase() === "size"
  )

  const sizes = sizeOption
    ? sizeOption.values.map((size) => {
      const variantForSize = product.variants.find((variant) =>
        variant.selectedOptions.some(
          (opt) => opt.name.toLowerCase() === "size" && opt.value === size
        )
      )
      return {
        size,
        inStock: variantForSize?.availableForSale ?? false,
        variantId: variantForSize?.id ?? null,
      }
    })
    : []

  return (
    <div className={cn("relative flex flex-col h-full group overflow-hidden", className)}>

      {/* Image */}
      <div className="relative overflow-hidden mb-3 aspect-[3/4]">
        {/* Wishlist — stopPropagation in WishlistButton so it doesn't navigate */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton product={product} />
        </div>
        {/* Carousel prev/next already have stopPropagation */}
        <Link
          href={`/products/${product.handle}`}
          prefetch={false}
          className="block w-full h-full"
          aria-hidden="true"
          tabIndex={-1}
        >
          <ProductImageCarousel product={product} />
        </Link>
      </div>

      {/* Info */}
      <Link
        href={`/products/${product.handle}`}
        prefetch={false}
        className="flex flex-col flex-1"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 mt-2">
            <p className="text-xs text-stone-400">{fabric}</p>
            {sizes.length > 0 && (
              <>
                <span className="text-xs text-stone-300">•</span>
                <div className="flex items-center gap-3 flex-wrap">
                  {sizes.map(({ size, inStock, variantId }) => (
                    <span
                      key={variantId}
                      className={cn(
                        "text-xs text-stone-400",
                        !inStock && "line-through opacity-40"
                      )}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <h3 className={cn(
            "font-medium text-stone-800 group-hover:text-stone-600 transition-colors",
            density === "comfortable" ? "text-base" : "text-sm"
          )}>
            {product.title} 
          </h3>
        </div>

        <div className="mt-auto pt-2">
          <p className={cn(
            "font-medium text-stone-800",
            density === "comfortable" ? "text-base" : "text-sm"
          )}>
            {price}
          </p>
        </div>
      </Link>
    </div>
  )
}