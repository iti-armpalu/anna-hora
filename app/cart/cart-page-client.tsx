// app/cart/CartPageClient.tsx (or wherever this lives)
"use client";

import { useMemo, useCallback } from "react";

import { useCart } from "@/context/cart-context";

import { CartEmptyState } from "./_components/cart-empty-state";
import { CartLineItem } from "./_components/cart-line-item";
import { CartSummary } from "./_components/cart-summary";

export default function CartPageClient() {
  const { cart, removeFromCart, loading } = useCart();

  /* -------------------------
       Loading / No Cart
    ------------------------- */
  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-600">
        Loading bag…
      </div>
    );
  }

  const isEmpty = cart.lines.length === 0;

  /* -------------------------
       Derived Values
    ------------------------- */
  const currency = cart.cost.currencyCode;

  const subtotal = useMemo(
    () => Number(cart.cost.subtotalAmount),
    [cart.cost.subtotalAmount]
  );

  /* -------------------------
       Handlers
    ------------------------- */
  const handleCheckout = useCallback(() => {
    if (cart.checkoutUrl) {
      window.location.assign(cart.checkoutUrl);
    }
  }, [cart.checkoutUrl]);

  /* -------------------------
       Empty Cart
    ------------------------- */
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-stone-50">
        <CartEmptyState />
      </div>
    );
  }

  /* -------------------------
       Cart With Items
    ------------------------- */
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-4">
            Your Bag
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Your curated selection—ready to be wrapped in silk ribbon.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <section className="lg:col-span-2 space-y-8">
            {cart.lines.map((line) => (
              <CartLineItem
                key={line.id}
                variant="page"
                id={line.id}
                title={line.title}
                image={line.image}
                size={line.size}
                quantity={line.quantity}
                totalAmount={Number(line.cost.totalAmount)}
                currencyCode={line.cost.currencyCode}
                loading={loading}
                onRemove={removeFromCart}
              />
            ))}
          </section>

          <aside className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              currencyCode={currency}
              totalQuantity={cart.totalQuantity}
              onCheckout={handleCheckout}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}