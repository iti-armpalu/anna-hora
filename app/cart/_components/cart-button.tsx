"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function CartButton() {
  const { cart, loading, open } = useCart();

  const qty = cart?.totalQuantity ?? 0;

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Open cart${qty ? `, ${qty} items` : ""}`}
        onClick={open}
      >
        <ShoppingBag className="h-5 w-5" />

        {qty > 0 && (
          <span
            className="
              absolute -right-2 -top-2
              min-w-[1.25rem] h-5 px-1
              rounded-full
              bg-anna-green-950 text-white
              text-xs font-semibold
              flex items-center justify-center
              ring-2 ring-white
            "
          >
            {qty > 99 ? "99+" : qty}
          </span>
        )}

        {loading && qty === 0 ? (
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-stone-400" />
        ) : null}
      </Button>
    </div>
  );
}
