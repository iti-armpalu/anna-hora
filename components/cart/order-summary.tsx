"use client"

import { Gift } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PriceRow } from "./common/price-row"
import { Money } from "./money"
import { FreeShippingBanner } from "./free-shipping-banner"
import { DiscountForm } from "./discount-form"


type OrderSummaryProps = {
  subtotal: number
  shippingCost: number
  freeShippingThreshold: number
  giftWrapping: boolean
  onGiftWrappingChange: (v: boolean) => void
  giftNote: string
  onGiftNoteChange: (v: string) => void
  discountCode: string
  onDiscountCodeChange: (v: string) => void
  onApplyDiscount?: (code: string) => void
  total: number
}

export function OrderSummary({
  subtotal,
  shippingCost,
  freeShippingThreshold,
  giftWrapping,
  onGiftWrappingChange,
  giftNote,
  onGiftNoteChange,
  discountCode,
  onDiscountCodeChange,
  onApplyDiscount,
  total,
}: OrderSummaryProps) {
  return (
    <Card className="border-0 shadow-sm bg-white sticky top-24">
      <CardContent className="p-6">
        <h3 className="font-serif text-xl text-stone-800 mb-6">Order Summary</h3>

        <PriceRow label="Subtotal">
          <Money amount={subtotal} />
        </PriceRow>

        <PriceRow label="Shipping">
          {shippingCost === 0 ? "Free" : <Money amount={shippingCost} />}
        </PriceRow>

        <FreeShippingBanner subtotal={subtotal} threshold={freeShippingThreshold} />

        {/* Gift Wrapping */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <Checkbox
              id="gift-wrapping"
              checked={giftWrapping}
              onCheckedChange={(v) => onGiftWrappingChange(Boolean(v))}
            />
            <label htmlFor="gift-wrapping" className="text-sm text-stone-700 flex items-center">
              <Gift className="h-4 w-4 mr-2" aria-hidden="true" />
              Add gift wrapping (+<Money amount={15} />)
            </label>
          </div>

          {giftWrapping && (
            <div className="ml-7">
              <Input
                placeholder="Add a personal note (optional)"
                value={giftNote}
                onChange={(e) => onGiftNoteChange(e.target.value)}
                className="text-sm border-stone-300"
              />
            </div>
          )}
        </div>

        {/* Discount Code */}
        <div className="mb-6">
          <DiscountForm
            code={discountCode}
            onChange={onDiscountCodeChange}
            onApply={(code) => onApplyDiscount?.(code)}
          />
        </div>

        <Separator className="mb-6" />

        <PriceRow label="Total" strong>
          <Money amount={total} />
        </PriceRow>

        <Button className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3 mb-4" size="lg">
          Proceed to Checkout
        </Button>

        <p className="text-xs text-stone-500 text-center">
          Want to add a finishing touch? Gift wrapping available at checkout.
        </p>
      </CardContent>
    </Card>
  )
}
