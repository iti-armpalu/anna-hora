"use client"

import { Button } from "@/components/ui/button"
import { CartSubtotal } from "./cart-subtotal"
import { CartCheckoutNote } from "./cart-checkout-note"

type CartSummaryProps = {
  subtotal: number
  currencyCode: string
  totalQuantity: number
  onCheckout: () => void
}

export function CartSummary({
  subtotal,
  currencyCode,
  totalQuantity,
  onCheckout,
}: CartSummaryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-24">
      <h2 className="font-serif text-xl text-stone-800 mb-6">
        Order Summary
      </h2>

      <CartSubtotal subtotal={subtotal} currencyCode={currencyCode} />

      <div className="border-t border-stone-100 pt-4 mt-2">
        <Button
          onClick={onCheckout}
          disabled={totalQuantity === 0}
          className="w-full"
          size="lg"
        >
          Proceed to Checkout
        </Button>
        <CartCheckoutNote />
      </div>
    </div>
  )
}