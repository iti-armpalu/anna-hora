"use client"

import { ShoppingBag } from "lucide-react"
import { useMemo, useState } from "react"

import { useCart } from "@/contexts/cart-context"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/cart/common/empty-state"
import { CartLineItem } from "@/components/cart/cart-line-item"
import { RecommendedItemCard } from "@/components/cart/recommended-item-card"
import { OrderSummary } from "@/components/cart/order-summary"
import { PRICING } from "@/config/pricing"
import { recommendedItems } from "@/data/recommended"


export default function CartPageClient() {
    const { cartItems, updateQuantity, removeItem, subtotal } = useCart()

    // Local UI state (non-cart)
    const [discountCode, setDiscountCode] = useState("")
    const [giftWrapping, setGiftWrapping] = useState(false)
    const [giftNote, setGiftNote] = useState("")

    const shippingCost =
        subtotal === 0 || subtotal >= PRICING.FREE_SHIPPING_THRESHOLD
            ? 0
            : PRICING.SHIPPING_FEE

    const giftWrappingCost = giftWrapping ? PRICING.GIFT_WRAP_FEE : 0

    const total = useMemo(
        () => subtotal + shippingCost + giftWrappingCost,
        [subtotal, shippingCost, giftWrappingCost]
    )

    const handleApplyDiscount = (code: string) => {
        // TODO: integrate with backend/rules
        console.log("Apply discount code:", code)
    }

    const handleAddRecommended = (item: typeof recommendedItems[number]) => {
        // TODO: addItem(...) via cart context
        console.log("Add recommended:", item)
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-stone-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <EmptyState
                        title="Your bag is empty"
                        description="Discover our collection of premium silk loungewear, crafted for moments of quiet luxury."
                        icon={<ShoppingBag className="h-24 w-24 text-stone-300" aria-hidden="true" />}
                        cta={{ href: "/shop", label: "Continue Shopping" }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Intro */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-4">Your Bag</h2>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Your curated selection—ready to be wrapped in silk ribbon.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                            {cartItems.map((item) => (
                                <Card key={item.id} className="border-0 shadow-sm bg-white">
                                    <CardContent className="p-6">
                                        <CartLineItem
                                            item={item}
                                            onRemove={removeItem}
                                            onQuantityChange={updateQuantity}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Recommendations */}
                        <div className="mt-12">
                            <h3 className="font-serif text-2xl text-stone-800 mb-6">You may also like</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {recommendedItems.map((rec) => (
                                    <RecommendedItemCard
                                        key={rec.id}
                                        name={rec.name}
                                        price={rec.price}
                                        image={rec.image}
                                        subtitle={rec.subtitle}
                                        onAdd={() => handleAddRecommended(rec)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <OrderSummary
                            subtotal={subtotal}
                            shippingCost={shippingCost}
                            freeShippingThreshold={PRICING.FREE_SHIPPING_THRESHOLD}
                            giftWrapping={giftWrapping}
                            onGiftWrappingChange={setGiftWrapping}
                            giftNote={giftNote}
                            onGiftNoteChange={setGiftNote}
                            discountCode={discountCode}
                            onDiscountCodeChange={setDiscountCode}
                            onApplyDiscount={handleApplyDiscount}
                            total={total}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
