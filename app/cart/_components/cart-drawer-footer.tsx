"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CartShippingBanner } from "./cart-shipping-banner";
import { CartSubtotal } from "./cart-subtotal";
import { CartCheckoutNote } from "./cart-checkout-note";

type CartDrawerFooterProps = {
    subtotal: number;
    currencyCode: string;
    totalQuantity: number;
    checkoutUrl?: string;
    onClose: () => void;
};

export function CartDrawerFooter({
    subtotal,
    currencyCode,
    totalQuantity,
    checkoutUrl,
    onClose,
}: CartDrawerFooterProps) {

    const handleCheckout = () => {
        if (!checkoutUrl) return;
        window.location.assign(checkoutUrl);
    };

    return (
        <div className="border-t border-stone-200 bg-white px-6 py-4">
            <CartShippingBanner subtotal={subtotal} />

            <Separator className="mb-4" />

            <CartSubtotal
                subtotal={subtotal}
                currencyCode={currencyCode}
            />

            <div className="space-y-3">
                <Button
                    onClick={handleCheckout}
                    disabled={totalQuantity === 0}
                    className="w-full bg-stone-800 hover:bg-stone-700 text-white"
                >
                    Proceed to Checkout
                </Button>

                <Link href="/cart" onClick={onClose}>
                    <Button variant="outline" className="w-full">
                        View Full Cart
                    </Button>
                </Link>
                <CartCheckoutNote />
            </div>
        </div>
    );
}
