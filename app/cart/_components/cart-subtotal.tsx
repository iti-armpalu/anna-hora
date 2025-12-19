"use client";

import { formatPrice } from "@/hooks/use-price";

type CartSubtotalProps = {
  subtotal: number;
  currencyCode: string;
};

export function CartSubtotal({
  subtotal,
  currencyCode,
}: CartSubtotalProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <span className="font-serif text-lg text-stone-800">
        Subtotal
      </span>
      <span className="font-medium text-lg text-stone-800">
        {formatPrice({ amount: subtotal, currencyCode })}
      </span>
    </div>
  );
}
