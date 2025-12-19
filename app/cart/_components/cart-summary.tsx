"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { CartShippingBanner } from "./cart-shipping-banner";
import { CartSubtotal } from "./cart-subtotal";
import { CartCheckoutNote } from "./cart-checkout-note";

type CartSummaryProps = {
  subtotal: number;
  currencyCode: string;
  totalQuantity: number;
  onCheckout: () => void;
};

export function CartSummary({
  subtotal,
  currencyCode,
  totalQuantity,
  onCheckout,
}: CartSummaryProps) {
  return (
    <Card className="border-0 shadow-sm bg-white sticky top-24">
      <CardContent className="p-6">
        <h3 className="font-serif text-xl text-stone-800 mb-6">
          Order Summary
        </h3>

        {/* Shipping incentive (geo-based) */}
        <CartShippingBanner subtotal={subtotal} />

        <Separator className="mb-4" />

        {/* Cart totals (Shopify-based) */}
        <CartSubtotal
          subtotal={subtotal}
          currencyCode={currencyCode}
        />

        <Button
          onClick={onCheckout}
          disabled={totalQuantity === 0}
          className="w-full bg-stone-800 hover:bg-stone-700 text-white mt-4"
          size="lg"
        >
          Proceed to Checkout
        </Button>

        <CartCheckoutNote />
      </CardContent>
    </Card>
  );
}
