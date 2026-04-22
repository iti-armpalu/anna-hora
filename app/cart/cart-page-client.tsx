"use client"

import { useCart } from "@/context/cart-context"
import { CartEmptyState } from "./_components/cart-empty-state"
import { CartLineItem } from "./_components/cart-line-item"
import { CartSummary } from "./_components/cart-summary"

export default function CartPageClient() {
  const { cart, removeFromCart, loading } = useCart()

  if (!cart || cart.lines.length === 0) {
    return <CartEmptyState />
  }

  const currency = cart.cost.currencyCode
  const subtotal = Number(cart.cost.subtotalAmount)

  function handleCheckout() {
    if (cart?.checkoutUrl) window.location.assign(cart.checkoutUrl)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <header className="text-center mb-8 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-2">
          Your Bag
        </h1>
        <p className="text-stone-500 text-sm">
          {cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
        {/* Line items */}
        <div className="lg:col-span-2 space-y-4">
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
        </div>

        {/* Summary */}
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
  )
}