"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuantitySelector } from "./quantity-selector"
import { formatPrice } from "@/hooks/use-price"

export type CartLineItemVariant = "page" | "drawer"

type CartLineItemProps = {
  variant: CartLineItemVariant
  id: string
  title: string
  image?: string | null
  size?: string | null
  quantity: number
  totalAmount: number
  currencyCode: string
  loading: boolean
  onRemove: (id: string) => void
}

export function CartLineItem({
  variant,
  id,
  title,
  image,
  size,
  quantity,
  totalAmount,
  currencyCode,
  loading,
  onRemove,
}: CartLineItemProps) {
  const isDrawer = variant === "drawer"

  const formattedTotal = formatPrice({ amount: totalAmount, currencyCode })

  return (
    <div className={`${isDrawer ? "" : "bg-white rounded-xl p-4 sm:p-6 shadow-sm"}`}>
      <div className="flex gap-4">
        {/* Image */}
        <div className={`relative overflow-hidden rounded-lg shrink-0 ${isDrawer ? "w-20 aspect-[3/4]" : "w-24 sm:w-32 aspect-[3/4]"
          }`}>
          <Image
            src={image ?? "/placeholder.svg"}
            alt={title}
            fill
            sizes={isDrawer ? "80px" : "(max-width: 640px) 96px, 128px"}
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className={`font-serif text-stone-800 leading-tight ${isDrawer ? "text-sm" : "text-base sm:text-lg"
              }`}>
              {title}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Remove ${title} from cart`}
              className="h-6 w-6 text-stone-400 hover:text-stone-600 shrink-0"
              onClick={() => onRemove(id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          {size && (
            <p className="text-xs sm:text-sm text-stone-500 mb-3">
              Size: {size}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto">
            <QuantitySelector
              value={quantity}
              lineId={id}
              variant={isDrawer ? "compact" : "default"}
              loading={loading}
            />
            <span className={`font-medium text-stone-800 ${isDrawer ? "text-sm" : "text-base sm:text-lg"
              }`}>
              {formattedTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}