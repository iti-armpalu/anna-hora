"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CartSubtotal } from "./cart-subtotal"
import { CartCheckoutNote } from "./cart-checkout-note"

type CartDrawerFooterProps = {
    subtotal: number
    currencyCode: string
    totalQuantity: number
    checkoutUrl?: string
    onClose: () => void
}

export function CartDrawerFooter({
    subtotal,
    currencyCode,
    totalQuantity,
    checkoutUrl,
    onClose,
}: CartDrawerFooterProps) {
    const handleCheckout = () => {
        if (!checkoutUrl) return
        window.location.assign(checkoutUrl)
    }

    return (
        <div className="border-t border-stone-200 bg-white px-6 py-4">
            <CartSubtotal subtotal={subtotal} currencyCode={currencyCode} />
            <div className="space-y-3">
                <Button
                    onClick={handleCheckout}
                    disabled={totalQuantity === 0}
                    className="w-full"
                >
                    Proceed to Checkout
                </Button>
                <Button asChild variant="outline" className="w-full">
                    <Link href="/cart" onClick={onClose}>
                        View Full Cart
                    </Link>
                </Button>
                <CartCheckoutNote />
            </div>
        </div>
    )
}