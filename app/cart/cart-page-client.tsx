"use client"

import { useCart } from "@/context/cart-context"
import { cartContent } from "./_data"
import { CartLineItem } from "./_components/cart-line-item"
import { CartCheckout } from "./_components/cart-checkout"
import { CartEmpty } from "./_components/cart-empty"

export default function CartPageClient() {
  const { cart } = useCart()

  if (!cart || cart.lines.length === 0) {
    return <CartEmpty />
  }

  return (
    <div className="container-site py-8 lg:py-12">
      <header className="mb-block flex items-baseline gap-3">
        <h1 className="text-heading-md font-light mb-0">{cartContent.title}</h1>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          {cartContent.itemCount(cart.totalQuantity)}
        </span>
      </header>

      <div className="grid grid-cols-1 gap-block lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <ul className="divide-y divide-border border-t border-border pt-block">
          {cart.lines.map((line) => (
            <CartLineItem key={line.id} line={line} variant="page" />
          ))}
        </ul>

        <aside className="flex flex-col gap-field self-start bg-secondary p-6 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
          <h2 className="label-uppercase mb-0">{cartContent.summaryTitle}</h2>
          <CartCheckout cart={cart} />
        </aside>
      </div>
    </div>
  )
}
