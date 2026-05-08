"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@/context/wishlist-context"
import { Button } from "./ui/button"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"

type WishlistButtonProps = {
  product: ProductNormalized
}

function getPrimaryImage(product: ProductNormalized): string {
  return (
    product.featuredImage?.url ??
    product.images[0]?.url ??
    "/placeholder.svg"
  )
}

export function WishlistButton({ product }: WishlistButtonProps) {
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
            return { size, inStock: variant?.availableForSale ?? false }
          }) ?? [],
        fabricShort: product.metafields.fabricShort,
        size: undefined,
      })
    }
  }

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className="bg-white/90 hover:bg-white hover:shadow-md active:scale-95 transition-all duration-200"
    >
      <Heart
        className={`h-5 w-5 transition-transform duration-200 ${active
            ? "fill-red-500 stroke-red-500 scale-110"
            : "stroke-stone-700"
          }`}
      />
    </Button>
  )
}