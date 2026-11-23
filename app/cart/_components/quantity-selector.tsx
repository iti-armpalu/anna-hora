"use client"

import { Minus, Plus } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/context/cart-context"
import { cartContent } from "../_data"

type Props = {
  lineId: string
  value: number
}

const STEP_BUTTON =
  "flex size-8 items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent"

/** Quantity stepper for a cart line. Distinguishes a stock limit from a failed request. */
export function QuantitySelector({ lineId, value }: Props) {
  const { updateQuantity, loading } = useCart()

  async function changeTo(quantity: number): Promise<void> {
    const result = await updateQuantity(lineId, quantity)
    if (result.success) return
    // Shopify capped the line below what was asked → stock limit; otherwise the request failed
    if (result.quantity !== quantity && result.quantity === value) toast.info(cartContent.errors.maxQuantity)
    else toast.error(cartContent.errors.update)
  }

  return (
    <div className="flex items-center border border-input">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={loading || value <= 1}
        onClick={() => changeTo(value - 1)}
        className={STEP_BUTTON}
      >
        <Minus className="size-3" />
      </button>
      <span className="min-w-8 text-center text-small tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={loading}
        onClick={() => changeTo(value + 1)}
        className={STEP_BUTTON}
      >
        <Plus className="size-3" />
      </button>
    </div>
  )
}
