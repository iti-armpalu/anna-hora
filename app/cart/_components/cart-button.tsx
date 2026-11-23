"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

const MAX_BADGE = 99

export function CartButton() {
  const { cart, open } = useCart()
  const quantity = cart?.totalQuantity ?? 0

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={open}
      aria-label={quantity ? `Open bag, ${quantity} ${quantity === 1 ? "item" : "items"}` : "Open bag"}
      className="relative"
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
      {quantity > 0 && (
        // Square brand-green count, same as the shop's active-filter count
        <span
          aria-hidden="true"
          className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center bg-primary px-1 text-2xs leading-none text-primary-foreground tabular-nums"
        >
          {quantity > MAX_BADGE ? `${MAX_BADGE}+` : quantity}
        </span>
      )}
    </Button>
  )
}
