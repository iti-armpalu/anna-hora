// components/cart/CartDrawer.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { X, Gift, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"
import { useEffect } from "react"
import { formatPrice } from "@/hooks/use-price"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, loading } = useCart();

  const FREE_SHIPPING_THRESHOLD = 200;

  const totalItems = cart?.totalQuantity ?? 0;

  const subtotal = Number(cart?.cost.subtotalAmount ?? 0);
  const currencyCode = cart?.cost.currencyCode ?? "GBP";

  const needsForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);




  console.log("CartDrawer cart:", cart);

  useEffect(() => {
    console.log("🔄 Cart updated:", cart);
  }, [cart]);

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
              Your Bag {totalItems > 0 && `(${totalItems} ${totalItems === 1 ? "Item" : "Items"})`}
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* If cart is still loading */}
        {loading && (
          <div className="text-center py-8 text-stone-500">Updating...</div>
        )}

        {/* Empty state */}
        {!loading && !cart?.totalQuantity && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
            {/* <ShoppingBag className="h-16 w-16 text-stone-300 mb-4" /> */}
            <h3 className="text-lg font-serif text-stone-800 mb-2">Your bag is empty</h3>
            <p className="text-stone-600 mb-6 max-w-sm">
              Discover our collection of premium silk loungewear, crafted for moments of quiet luxury.
            </p>
            <Button onClick={onClose} className="bg-anna-green-950 hover:bg-stone-700 text-white">
              Continue Shopping
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">

          {/* Cart items */}
          {cart?.lines && cart.lines.length > 0 && (
            <div className="space-y-4 mt-6">


              {cart.lines.map((line) => {

                const lineTotal = line.cost.totalAmount;  // string
                const formattedLineTotal = formatPrice({
                  amount: lineTotal,
                  currencyCode,
                });

                return (

                  <div key={line.id} className="flex gap-4">
                    <div className="relative w-20 aspect-[3/4] flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={line.image ?? "/placeholder.svg"}
                        alt={line.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1 gap-4">
                        <h4 className="font-serif text-stone-800 text-sm leading-tight">{line.title}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-stone-400 hover:text-stone-600 -mt-1"
                          onClick={() => removeFromCart(line.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="text-xs text-stone-600 mb-2">
                        {line.size} - Test
                      </p>

                      {/* {item.stock <= 3 && (
                        <p className="text-xs text-amber-600 mb-2">Only {item.stock} left in stock</p>
                      )} */}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-stone-300 rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-none"
                            // onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          // disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                            {line.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-none"
                            // onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          // disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <span className="font-medium text-stone-800">{formattedLineTotal}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>



        {/* Drawer footer */}
        {cart && cart.lines.length > 0 && (
          <div className="border-t border-stone-200 bg-white px-6 py-4">
            <div className="mb-4">
              {needsForFreeShipping > 0 ? (
                <p className="text-sm text-stone-600 text-center">
                  Add{" "}
                  <span className="font-medium">
                    {formatPrice({ amount: needsForFreeShipping, currencyCode })}
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
                {formatPrice({ amount: subtotal, currencyCode })}
              </span>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  if (cart?.checkoutUrl) {
                    window.location.href = cart.checkoutUrl;
                  }
                }}
                className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3"
                disabled={!cart || cart.totalQuantity === 0}
              >
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
        )}
      </SheetContent>
    </Sheet >
  )
}
