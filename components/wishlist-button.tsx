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
      size={variant === "inline" ? "icon" : "icon-sm"}
      variant={variant === "inline" ? "outline" : "ghost"}
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={cn(
        "transition-transform duration-200 active:scale-95",
        variant === "inline"
          ? "size-12"
          // Frosted square: enough contrast on any photo while letting the image show through
          : "bg-background/50 backdrop-blur-md hover:bg-background/70"
      )}
    >
      <Heart
        strokeWidth={1.5}
        className={cn(
          "stroke-foreground transition-colors duration-200",
          variant === "inline" ? "h-5 w-5" : "h-4 w-4",
          active ? "fill-foreground" : "fill-transparent"
        )}
      />
    </Button>
  )
}