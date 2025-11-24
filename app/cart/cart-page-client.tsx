"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/hooks/use-price";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { X, Minus, Plus, ShoppingBag, Gift } from "lucide-react";

export default function CartPageClient() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const FREE_SHIPPING_THRESHOLD = 200; // TEMP — can be dynamic later

  // If cart not loaded yet
  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading bag...
      </div>
    );
  }

  const isEmpty = cart.lines.length === 0;

  const subtotal = parseFloat(cart.cost.subtotalAmount);
  const currency = cart.cost.currencyCode;

  const formattedSubtotal = formatPrice({
    amount: subtotal,
    currencyCode: currency,
  });

  const needsForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {isEmpty ? (
        /* -------------------------
           EMPTY CART
        ------------------------- */
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 text-stone-300 mx-auto mb-6" />

          <h2 className="text-2xl font-serif text-stone-800 mb-4">
            Your bag is empty
          </h2>

          <p className="text-stone-600 mb-8 max-w-md mx-auto">
            Discover our collection of premium silk loungewear, crafted for moments of quiet luxury.
          </p>

          <Link href="/shop">
            <Button className="bg-stone-800 hover:bg-stone-700 text-white px-8">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        /* -------------------------
           CART PAGE WITH ITEMS
        ------------------------- */
        <div className="container mx-auto px-4 lg:px-8 py-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-4">
              Your Bag
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Your curated selection—ready to be wrapped in silk ribbon.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* -------------------------
                LEFT COLUMN — ITEMS
            ------------------------- */}
            <div className="lg:col-span-2 space-y-8">
              {cart.lines.map((line) => {
                const lineTotalFormatted = formatPrice({
                  amount: line.cost.totalAmount,
                  currencyCode: line.cost.currencyCode,
                });

                return (
                  <Card key={line.id} className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                      <div className="flex gap-6">

                        {/* Product Image */}
                        <div className="relative w-32 h-40 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={line.image ?? "/placeholder.svg"}
                            alt={line.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">

                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-serif text-xl text-stone-800 mb-1">
                                {line.title}
                              </h3>
                              <p className="text-sm text-stone-600 mb-2">
                                Size: {line.size}
                              </p>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-stone-400 hover:text-stone-600"
                              onClick={() => removeFromCart(line.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Quantity + Price */}
                          <div className="flex items-center justify-between mt-4">

                            {/* Quantity */}
                            <div className="flex items-center border border-stone-300 rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-none"
                                onClick={() =>
                                  updateQuantity(line.id, line.quantity - 1)
                                }
                                disabled={line.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>

                              <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                                {line.quantity}
                              </span>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-none"
                                onClick={() =>
                                  updateQuantity(line.id, line.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Line Price */}
                            <span className="font-medium text-xl text-stone-800">
                              {lineTotalFormatted}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* -------------------------
                RIGHT COLUMN — SUMMARY
            ------------------------- */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm bg-white sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl text-stone-800 mb-6">
                    Order Summary
                  </h3>

                  {/* Subtotal */}
                  <div className="flex justify-between mb-4">
                    <span className="text-stone-600">Subtotal</span>
                    <span className="font-medium text-stone-800">
                      {formattedSubtotal}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between mb-4">
                    <span className="text-stone-600">Shipping</span>
                    <span className="font-medium text-stone-800">
                      Calculated at checkout
                    </span>
                  </div>

                  {/* Free Shipping Message */}
                  {needsForFreeShipping > 0 ? (
                    <p className="text-sm text-stone-600 mb-4 p-3 bg-stone-100 rounded-md">
                      Add{" "}
                      <span className="font-medium">
                        {formatPrice({
                          amount: needsForFreeShipping,
                          currencyCode: currency,
                        })}
                      </span>{" "}
                      more for free shipping
                    </p>
                  ) : (
                    <p className="text-sm text-emerald-700 mb-4 p-3 bg-emerald-50 rounded-md flex items-center">
                      <Gift className="h-4 w-4 mr-2" /> Free shipping included
                    </p>
                  )}

                  <Separator className="mb-6" />

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-serif text-lg text-stone-800">
                      Total
                    </span>
                    <span className="font-medium text-xl text-stone-800">
                      {formattedSubtotal}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={() => {
                      if (cart?.checkoutUrl) {
                        window.location.href = cart.checkoutUrl;
                      }
                    }}
                    className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3 mt-4"
                    size="lg"
                    disabled={!cart || cart.totalQuantity === 0}
                  >
                    Proceed to Checkout
                  </Button>


                  <p className="text-xs text-stone-500 text-center">
                    Sustainable gift wrapping available at checkout.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
