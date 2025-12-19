"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";

import { CartLineItem } from "./_components/cart-line-item";
import { CartDrawerFooter } from "./_components/cart-drawer-footer";
import { CartDrawerEmpty } from "./_components/cart-drawer-empty";


type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, loading } = useCart();

  const subtotal = Number(cart?.cost.subtotalAmount ?? 0);
  const currencyCode = cart?.cost.currencyCode ?? "GBP";

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:w-[480px] bg-stone-50 p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b bg-white">
          <SheetTitle className="text-xl font-serif text-stone-800">
            Your Bag {cart?.totalQuantity ? `(${cart.totalQuantity})` : ""}
          </SheetTitle>
        </SheetHeader>

        {!cart || cart.totalQuantity === 0 ? (
          <CartDrawerEmpty onClose={onClose} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.lines.map((line) => (
                <CartLineItem
                  key={line.id}
                  variant="drawer"
                  id={line.id}
                  title={line.title}
                  image={line.image}
                  size={line.size}
                  quantity={line.quantity}
                  totalAmount={Number(line.cost.totalAmount)}
                  currencyCode={currencyCode}
                  loading={loading}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <CartDrawerFooter
              subtotal={subtotal}
              currencyCode={currencyCode}
              totalQuantity={cart.totalQuantity}
              checkoutUrl={cart.checkoutUrl}
              onClose={onClose}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
