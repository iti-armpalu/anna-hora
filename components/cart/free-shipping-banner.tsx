import { Gift } from "lucide-react"
import { Money } from "./money";

export function FreeShippingBanner({ subtotal, threshold }: { subtotal: number; threshold: number }) {
  const delta = threshold - subtotal
  return delta > 0 ? (
    <p className="text-sm text-stone-600 mb-4 p-3 bg-stone-100 rounded-md">
      Add <span className="font-medium"><Money amount={delta} /></span> more for free shipping
    </p>
  ) : (
    <div className="flex items-center justify-center text-sm text-emerald-700 mb-4">
      <Gift className="h-4 w-4 mr-2" aria-hidden="true" />
      Free shipping included
    </div>
  )
}
