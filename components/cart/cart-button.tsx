// components/header/CartButton.tsx (CLIENT)
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { CartDrawer } from "@/components/cart/cart-drawer"

export function CartButton() {
  const [open, setOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open cart"
        onClick={() => setOpen(true)}
      >
        <ShoppingBag className="h-5 w-5" />
      </Button>
      {totalItems > 0 && (
        <span
          className="pointer-events-none absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-anna-green-950 text-white text-xs"
          aria-live="polite"
        >
          {totalItems}
        </span>
      )}
      <CartDrawer isOpen={open} onClose={() => setOpen(false)} />
    </div>
  )
}
