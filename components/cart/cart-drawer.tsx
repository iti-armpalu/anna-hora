// components/cart/CartDrawer.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { X, Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { Money } from "./money"
import { QuantityControl } from "./quantity-control"



interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

// Static example recommendations (move to real data later)
const RECOMMENDED = [
  {
    id: 4,
    name: "Silk Hair Scrunchie",
    price: 28,
    image: "/placeholder.svg?height=80&width=60&text=Silk scrunchie",
  },
  {
    id: 5,
    name: "Lavender Sleep Spray",
    price: 35,
    image: "/placeholder.svg?height=80&width=60&text=Sleep spray",
  },
] as const

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, totalItems, subtotal, updateQuantity, removeItem } = useCart()

  const FREE_SHIPPING_THRESHOLD = 200
  const needsForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  const handleRecommendedAdd = (item: (typeof RECOMMENDED)[number]) => {
    // TODO: integrate with context addItem()
    // addItem({ id: item.id, ... })
    console.log("Add recommended item:", item)
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <SheetContent className="w-full sm:w-[480px] bg-stone-50 p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-serif text-stone-800">
              Your Bag
              {totalItems > 0 && ` (${totalItems} ${totalItems === 1 ? "Item" : "Items"})`}
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Empty state */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
            {/* Keep your original icon if you prefer */}
            <svg viewBox="0 0 24 24" className="h-16 w-16 text-stone-300 mb-4" aria-hidden="true">
              <path
                d="M6 6h15l-1.5 9h-12L6 6zm0 0L4 3H2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <h3 className="text-lg font-serif text-stone-800 mb-2">Your bag is empty</h3>
            <p className="text-stone-600 mb-6 max-w-sm">
              Discover our collection of premium silk loungewear, crafted for moments of quiet luxury.
            </p>
            <Button onClick={onClose} className="bg-stone-800 hover:bg-stone-700 text-white">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        priority={false}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-serif text-stone-800 text-sm leading-tight">
                          {item.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-stone-400 hover:text-stone-600 -mt-1"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <X className="h-3 w-3" aria-hidden="true" />
                        </Button>
                      </div>

                      <p className="text-xs text-stone-600 mb-2">
                        {item.color} • {item.size}
                      </p>

                      {item.stock <= 3 && (
                        <p className="text-xs text-amber-600 mb-2">
                          Only {item.stock} left in stock
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <QuantityControl
                          quantity={item.quantity}
                          min={1}
                          max={item.stock}
                          onChange={(next) => updateQuantity(item.id, next)}
                          label={item.name}
                        />

                        <span className="font-medium text-stone-800">
                          <Money amount={item.price * item.quantity} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              {RECOMMENDED.length > 0 && (
                <div className="mt-8 pt-6 border-t border-stone-200">
                  <h4 className="font-serif text-stone-800 mb-4">You may also like</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {RECOMMENDED.map((rec) => (
                      <div key={rec.id} className="border border-stone-200 rounded-lg p-3 bg-white">
                        <div className="relative w-full aspect-[3/4] mb-2 overflow-hidden rounded-md">
                          <Image
                            src={rec.image || "/placeholder.svg"}
                            alt={rec.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 480px) 45vw, 200px"
                          />
                        </div>
                        <h5 className="text-xs font-medium text-stone-800 mb-1 leading-tight">
                          {rec.name}
                        </h5>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-stone-600">
                            <Money amount={rec.price} />
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-xs border-stone-300 bg-transparent"
                            onClick={() => handleRecommendedAdd(rec)}
                            aria-label={`Add ${rec.name} to bag`}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer footer */}
            <div className="border-t border-stone-200 bg-white px-6 py-4">
              <div className="mb-4">
                {needsForFreeShipping > 0 ? (
                  <p className="text-sm text-stone-600 text-center">
                    Add{" "}
                    <span className="font-medium">
                      <Money amount={needsForFreeShipping} />
                    </span>{" "}
                    more for free shipping
                  </p>
                ) : (
                  <div className="flex items-center justify-center text-sm text-emerald-700">
                    <Gift className="h-4 w-4 mr-2" aria-hidden="true" />
                    Free shipping included
                  </div>
                )}
              </div>

              <Separator className="mb-4" />

              <div className="flex justify-between items-center mb-4">
                <span className="font-serif text-lg text-stone-800">Subtotal</span>
                <span className="font-medium text-lg text-stone-800">
                  <Money amount={subtotal} />
                </span>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3" size="lg">
                  Proceed to Checkout
                </Button>
                <Link href="/cart" onClick={onClose}>
                  <Button
                    variant="outline"
                    className="w-full border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                    size="lg"
                  >
                    View Full Bag
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-stone-500 text-center mt-3">
                Almost yours—silk has been treasured for centuries for its softness and longevity.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
