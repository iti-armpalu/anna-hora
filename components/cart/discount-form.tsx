"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DiscountForm({
  code, onChange, onApply,
}: {
  code: string
  onChange: (v: string) => void
  onApply: (v: string) => void
}) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Discount code"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="border-stone-300"
      />
      <Button
        type="button"
        variant="outline"
        className="border-stone-300 text-stone-700 bg-transparent"
        onClick={() => onApply(code)}
        aria-label="Apply discount code"
      >
        Apply
      </Button>
    </div>
  )
}
