"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { cartContent } from "./_data"
import { CartLineItem } from "./_components/cart-line-item"
import { CartCheckout } from "./_components/cart-checkout"
import { CartEmpty } from "./_components/cart-empty"

/** Site-wide bag drawer, mounted once in the root layout and driven by cart context. */
export function GlobalCartDrawer() {
  const { cart, isOpen, close } = useCart()
  const hasItems = Boolean(cart && cart.totalQuantity > 0)

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="flex items-baseline gap-3 text-heading-sm font-light">
            {cartContent.title}
            {cart && hasItems && (
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {cartContent.itemCount(cart.totalQuantity)}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cart && hasItems ? (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6 py-block">
              {cart.lines.map((line) => (
                <CartLineItem key={line.id} line={line} variant="drawer" />
              ))}
            </ul>
            <div className="border-t border-border px-6 py-block">
              <CartCheckout cart={cart}>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/cart" onClick={close}>
                    {cartContent.viewBag}
                  </Link>
                </Button>
              </CartCheckout>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center">
            <CartEmpty onContinue={close} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
