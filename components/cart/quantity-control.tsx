"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuantityControlProps {
  quantity: number
  min?: number
  max?: number
  onChange: (next: number) => void
  label?: string // for a11y (e.g. "Midnight Silk Robe")
}

export function QuantityControl({
  quantity,
  min = 1,
  max = Infinity,
  onChange,
  label = "quantity",
}: QuantityControlProps) {
  const decrease = () => onChange(Math.max(min, quantity - 1))
  const increase = () => onChange(Math.min(max, quantity + 1))

  return (
    <div className="flex items-center border border-stone-300 rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-none"
        onClick={decrease}
        disabled={quantity <= min}
        aria-label={`Decrease ${label}`}
      >
        <Minus className="h-3 w-3" aria-hidden="true" />
      </Button>

      <span
        className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center"
        aria-live="polite"
      >
        {quantity}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-none"
        onClick={increase}
        disabled={quantity >= max}
        aria-label={`Increase ${label}`}
      >
        <Plus className="h-3 w-3" aria-hidden="true" />
      </Button>
    </div>
  )
}
