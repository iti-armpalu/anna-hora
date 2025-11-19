"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
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

interface WishlistButtonProps {
  product: WishlistItem
  variant?: "icon" | "full"
  size?: "sm" | "default" | "lg"
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

export function WishlistButton({
  product,
  variant = "icon",
  size = "default",
  className = "",
  onClick,
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const isWishlisted = isInWishlist(product.id)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (onClick) {
      onClick(e)
    }

    if (isWishlisted) {
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

  if (variant === "icon") {
    return (
      <Button
        size="icon"
        variant="secondary"
        onClick={handleToggle}
        className={`bg-white/90 hover:bg-white ${className}`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-stone-600"}`} />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleToggle}
      className={`border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent ${className}`}
    >
      <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
      {isWishlisted ? "Remove from" : "Add to"} Wishlist
    </Button>
  )
}
