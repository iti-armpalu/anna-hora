"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@/context/wishlist-context"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { isPurchasable } from "@/lib/shopify/utils/stock-status"

type WishlistButtonProps = {
  product: ProductNormalized
  /**
   * overlay — bare icon on top of product imagery (cards); a secondary action that
   *           shouldn't compete with the photo
   * inline  — bordered square beside Add to Bag, matching its 48px height
   */
  variant?: "overlay" | "inline"
}

function getPrimaryImage(product: ProductNormalized): string {
  return (
    product.featuredImage?.url ??
    product.images[0]?.url ??
    "/placeholder.svg"
  )
}

export function WishlistButton({ product, variant = "overlay" }: WishlistButtonProps) {
  const { isInWishlist, add, remove } = useWishlist()

  const wishlistId = product.id
  const active = isInWishlist(wishlistId)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (active) {
      remove(wishlistId)
    } else {
      add({
        id: wishlistId,
        handle: product.handle,
        title: product.title,
        price: product.minPrice,
        currencyCode: product.currencyCode,
        image: getPrimaryImage(product),
        images: product.images,
        sizes: product.options
          .find((opt) => opt.name.toLowerCase() === "size")
          ?.values.map((size) => {
            const variant = product.variants.find((v) =>
              v.selectedOptions.some(
                (opt) => opt.name.toLowerCase() === "size" && opt.value === size
              )
            )
            return { size, inStock: variant ? isPurchasable(variant.stockStatus) : false }
          }) ?? [],
        // metafields use null for missing values; wishlist item uses undefined
        fabricShort: product.metafields.fabricShort ?? undefined,
        size: undefined,
      })
    }
  }

  return (
    <Button
      size="icon"
      variant={variant === "inline" ? "outline" : "ghost"}
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={cn(
        "transition-transform duration-200 active:scale-95",
        variant === "inline"
          ? "size-12"
          // Soft white glow keeps the bare icon legible on darker photos without a background box
          : "hover:bg-transparent [filter:drop-shadow(0_0_3px_rgb(255_255_255/0.7))]"
      )}
    >
      <Heart
        strokeWidth={variant === "inline" ? 1.5 : 1.25}
        className={cn(
          "h-5 w-5 stroke-foreground transition-colors duration-200",
          active ? "fill-foreground" : "fill-transparent"
        )}
      />
    </Button>
  )
}