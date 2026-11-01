"use client"

import { WishlistButton } from "../wishlist-button"
import ProductImageCarousel from "./product-image-carousel"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { formatPrice } from "@/hooks/use-price"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { isPurchasable } from "@/lib/shopify/utils/stock-status"
import { SIZE_SEARCH_PARAM } from "@/lib/config/color-group"

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
        purchasable: variantForSize ? isPurchasable(variantForSize.stockStatus) : false,
        variantId: variantForSize?.id ?? null,
      }
    })
    : []

  const isCompact = density === "compact"
  const productHref = `/products/${product.handle}`

  return (
    <div className={cn("relative flex flex-col h-full group", className)}>

      {/* Image */}
      <div className="relative overflow-hidden mb-3">
        {/* Wishlist — stopPropagation in WishlistButton so it doesn't navigate */}
        <div className="absolute top-3 right-3 z-20">
          <WishlistButton product={product} />
        </div>
        {/* Carousel prev/next already have stopPropagation */}
        <Link
          href={productHref}
          prefetch={false}
          className="block w-full h-full"
          aria-hidden="true"
          tabIndex={-1}
        >
          <ProductImageCarousel product={product} />
        </Link>

        {/*
          Sizes reveal on hover (and on keyboard focus within the card).
          Tailwind v4 only applies hover on devices that support it, so on touch
          screens this stays hidden — size choice happens on the product page there.
        */}
        {sizes.length > 0 && (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-center justify-center gap-x-4 gap-y-1",
              "bg-background/90 backdrop-blur-sm px-3 py-3",
              "translate-y-full opacity-0 transition-all duration-300 ease-out",
              "group-hover:translate-y-0 group-hover:opacity-100",
              "group-focus-within:translate-y-0 group-focus-within:opacity-100"
            )}
          >
            {sizes.map(({ size, purchasable, variantId }) =>
              purchasable ? (
                <Link
                  key={variantId ?? size}
                  href={`${productHref}?${SIZE_SEARCH_PARAM}=${encodeURIComponent(size)}`}
                  prefetch={false}
                  aria-label={`${product.title}, size ${size}`}
                  className="text-xs uppercase tracking-wide text-foreground underline-offset-4 hover:underline"
                >
                  {size}
                </Link>
              ) : (
                <span
                  key={variantId ?? size}
                  aria-label={`Size ${size}, sold out`}
                  className="text-xs uppercase tracking-wide text-muted-foreground/60 line-through"
                >
                  {size}
                </span>
              )
            )}
          </div>
        )}
      </div>

      {/* Info — fixed rows (fabric · title · price) so every card in a row lines up */}
      <Link
        href={productHref}
        prefetch={false}
        className="flex flex-col flex-1 gap-1"
      >
        {/* Always rendered so cards without a fabric keep the same height */}
        <p className="text-xs uppercase tracking-wide text-muted-foreground truncate min-h-[1lh]">
          {fabric}
        </p>

        <h3
          className={cn(
            "font-normal text-foreground line-clamp-2 mb-0 transition-colors group-hover:text-muted-foreground",
            isCompact ? "text-xs sm:text-small" : "text-small"
          )}
        >
          {product.title}
        </h3>

        <p
          className={cn(
            "mt-auto pt-2 text-foreground",
            isCompact ? "text-xs sm:text-small" : "text-small"
          )}
        >
          {price}
        </p>
      </Link>
    </div>
  )
}
