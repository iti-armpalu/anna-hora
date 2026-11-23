import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/hooks/use-price"
import type { Cart } from "@/lib/shopify/types/cart-normalized"
import { cartContent } from "../_data"

type Props = {
  cart: Cart
  /** Extra actions under the checkout button, e.g. "View bag" in the drawer */
  children?: ReactNode
}

/** Subtotal, checkout and the checkout note — shared by the bag page summary and the drawer footer. */
export function CartCheckout({ cart, children }: Props) {
  return (
    <div className="flex flex-col gap-field">
      <div className="flex items-baseline justify-between">
        <span className="label-uppercase">{cartContent.subtotal}</span>
        <span className="text-heading-sm tabular-nums text-foreground">
          {formatPrice({ amount: cart.cost.subtotalAmount, currencyCode: cart.cost.currencyCode })}
        </span>
      </div>
      {/* A real link to Shopify checkout: works before JS loads and needs no click handler */}
      <Button asChild size="lg" className="w-full">
        <a href={cart.checkoutUrl}>{cartContent.checkout}</a>
      </Button>
      {children}
      <p className="text-xs text-muted-foreground">{cartContent.checkoutNote}</p>
    </div>
  )
}
