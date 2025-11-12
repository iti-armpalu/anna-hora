"use client"

import { useWishlist } from "@/contexts/wishlist-context"
import { toast } from "sonner"

interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  image: string
  color?: string
  size?: string
  stock?: number
  category?: string
}

export function useWishlistToggle() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const toggleWishlist = (product: WishlistItem) => {
    const isCurrentlyWishlisted = isInWishlist(product.id)

    if (isCurrentlyWishlisted) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        color: product.color || "Default",
        size: product.size,
        stock: product.stock || 10,
        category: product.category || "general",
      })
      toast.success("Added to wishlist")
    }
  }

  return {
    toggleWishlist,
    isInWishlist,
  }
}
