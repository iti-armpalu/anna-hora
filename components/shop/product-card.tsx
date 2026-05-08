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

  const isCompact = density === "compact"

  return (
    <div className={cn("relative flex flex-col h-full group overflow-hidden", className)}>

      {/* Image */}
      <div className="relative overflow-hidden mb-3">
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

          {/* Fabric + sizes */}
          <div className={cn(
            "mt-2 flex",
            isCompact ? "flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 mb-2 sm:mb-1" : "flex-row items-center gap-3"
          )}>
            {fabric && (
              <p className={cn(
                "text-stone-400 shrink-0",
                isCompact ? "text-[10px] sm:text-xs" : "text-xs"
              )}>
                {fabric}
              </p>
            )}
            {sizes.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">

                <span className={cn(
                  "text-stone-300 text-xs",
                  isCompact ? "hidden sm:block" : "block"
                )}>·</span>

                {sizes.map(({ size, inStock, variantId }) => (
                  <span
                    key={variantId}
                    className={cn(
                      "text-stone-400",
                      isCompact ? "text-[10px] sm:text-xs" : "text-xs",
                      !inStock && "line-through opacity-30"
                    )}
                  >
                    {size}
                  </span>
                ))}
              </div>
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