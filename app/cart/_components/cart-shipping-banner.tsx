"use client";

import { formatPrice } from "@/hooks/use-price";
import { useCartShipping } from "@/context/cart-shipping-context";

type CartShippingBannerProps = {
    subtotal: number;
};

export function CartShippingBanner({ subtotal }: CartShippingBannerProps) {
    const { threshold, currencyCode } = useCartShipping();

    const remaining = Math.max(0, threshold - subtotal);

    if (!threshold) return null;

    return (
        <div className="mb-4">
            {remaining > 0 ? (
                <p className="text-sm text-stone-600 text-center">
                    Add{" "}
                    <span className="font-medium">
                        {formatPrice({
                            amount: remaining,
                            currencyCode,
                        })}
                    </span>{" "}
                    more for free shipping
                </p>
            ) : (
                <div className="flex items-center justify-center text-sm text-emerald-700">
                    Free shipping included
                </div>
            )}
        </div>
    );
}
