"use client"

import Image from "next/image"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/hooks/use-price"
import { PREORDER_COPY } from "@/lib/config/preorder"
import type { CartLine } from "@/lib/shopify/types/cart-normalized"
import { cartContent } from "../_data"
import { QuantitySelector } from "./quantity-selector"

type Props = {
  line: CartLine
  variant: "page" | "drawer"
}

/** One bag row — same structure in the drawer and on the bag page, only the image size differs. */
export function CartLineItem({ line, variant }: Props) {
  const { removeFromCart, loading } = useCart()
  const isDrawer = variant === "drawer"

  async function handleRemove(): Promise<void> {
    const result = await removeFromCart(line.id)
    if (!result.ok) toast.error(cartContent.errors.remove)
  }

  return (
    <li className="flex gap-4 py-block first:pt-0">
      <div className={cn("relative aspect-[4/5] shrink-0 overflow-hidden bg-secondary", isDrawer ? "w-20" : "w-24 sm:w-32")}>
        {line.image && (
          <Image
            src={line.image}
            alt={line.title}
            fill
            sizes={isDrawer ? "80px" : "(min-width: 640px) 128px, 96px"}
            className="object-cover"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-tight">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-small font-normal text-foreground mb-0">{line.title}</h3>
          <span className="text-small tabular-nums text-foreground">
            {formatPrice({ amount: line.cost.totalAmount, currencyCode: line.cost.currencyCode })}
          </span>
        </div>

        {line.size && <span className="text-xs text-muted-foreground">{cartContent.size(line.size)}</span>}
        {line.preorderNote && (
          <span className="text-xs text-muted-foreground">
            {PREORDER_COPY.buttonLabel} · {line.preorderNote}
          </span>
        )}

        <div className="mt-auto flex items-center justify-between pt-tight">
          <QuantitySelector lineId={line.id} value={line.quantity} />
          <button
            type="button"
            onClick={handleRemove}
            disabled={loading}
            aria-label={`${cartContent.remove} ${line.title}`}
            className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground disabled:opacity-40"
          >
            {cartContent.remove}
          </button>
        </div>
      </div>
    </li>
  )
}
