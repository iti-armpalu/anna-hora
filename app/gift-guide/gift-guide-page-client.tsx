"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/hooks/use-price"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { Gift, Heart, Star } from "lucide-react"
import Image from "next/image"
import { useMemo, useState } from "react"
import { toast } from "sonner"

interface GiftGuidePageClientProps {
    product: ProductNormalized
    giftCardAmounts: number[]
}

export default function GiftGuidePageClient({ product, giftCardAmounts }: GiftGuidePageClientProps) {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
    const [message, setMessage] = useState("")
    const { addToCart } = useCart()

    const currency = product.currencyCode
    const maxMessageLength = 200

    const selectedVariant = useMemo(() => {
        if (selectedAmount === null) return null
        return product.variants.find((v) => Number(v.price.amount) === selectedAmount) ?? null
    }, [product.variants, selectedAmount])

    const selectedAmountLabel = useMemo(() => {
        if (selectedAmount === null) return null
        return formatPrice({ amount: selectedAmount, currencyCode: currency })
    }, [currency, selectedAmount])

    async function handleAddToBag() {
        if (selectedAmount === null) {
            toast.error("Please select a gift card amount.")
            return
        }

        if (!selectedVariant) {
            toast.error("No matching variant found for selected amount.")
            return
        }

        try {
            await addToCart(selectedVariant.id, 1)
            toast.success(`Added ${product.title} (${selectedAmountLabel}) to your bag.`)
        } catch (err) {
            toast.error("Failed to add gift card to bag.")
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl lg:text-5xl font-light text-stone-800 leading-tight">
                                The Art of
                                <br />
                                <em className="font-serif italic">Giving</em>
                            </h2>

                            <p className="text-lg text-stone-600 leading-relaxed">
                                Some gifts are a moment. Others become a ritual. Right now, the simplest way to give ANNA HORA is through
                                a gift card—so she can choose what feels right, when it feels right.
                            </p>

                            <p className="text-lg text-stone-600 leading-relaxed">
                                Delivered instantly by email, with the option to add a personal message. No guessing sizes. No timing
                                stress. Just quiet, considered gifting.
                            </p>

                            <Button
                                className="bg-anna-green-950 hover:bg-stone-700 text-white"
                                onClick={() => document.getElementById("gift-card")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                <Gift className="w-4 h-4 mr-2" />
                                Shop Gift Card
                            </Button>

                            <p className="text-sm text-stone-500">
                                Physical gifts are coming—gift cards are available now.
                            </p>
                        </div>

                        <div className="relative">
                            <Image
                                src="/gift-guide-hero.jpeg"
                                alt="Elegant gift wrapping"
                                width={500}
                                height={600}
                                className="rounded-lg"
                                priority
                            />
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-stone-200 rounded-full opacity-30 -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Gift Card Section */}
            <section id="gift-card" className="py-16 lg:py-24 bg-stone-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                                The ANNA HORA
                                <br />
                                <em className="font-serif italic">Gift Card</em>
                            </h3>
                            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                                When you can’t decide, let her choose. Delivered digitally by email (gift cards are digital for now).
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative">
                                <Image src="/anna-hora-giftcard-2.webp" alt="ANNA HORA Gift Card" width={500} height={400} className="rounded-lg" />
                            </div>

                            <Card className="border-0 shadow-lg bg-white p-8">
                                <div className="space-y-6">
                                    <h4 className="text-2xl font-light text-stone-800">Create Your Gift Card</h4>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">Gift Card Amount</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {giftCardAmounts.map((amount) => (
                                                    <Button
                                                        key={amount}
                                                        variant={selectedAmount === amount ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setSelectedAmount(amount)}
                                                        className={
                                                            selectedAmount === amount
                                                                ? "bg-anna-green-800 hover:bg-stone-700 text-white"
                                                                : "border-stone-300 text-stone-700 hover:bg-stone-100"
                                                        }
                                                    >
                                                        {formatPrice({ amount, currencyCode: product.currencyCode })}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">Delivery</label>
                                            <div className="rounded-md border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                                                Digital delivery via email (instant)
                                            </div>
                                            <p className="text-xs text-stone-500 mt-2">
                                                You’ll be able to forward it, print it, or include it in a card.
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">Personal Message (Optional)</label>
                                            <div className="relative">
                                                <textarea
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value.slice(0, maxMessageLength))}
                                                    className="w-full p-3 border border-stone-300 rounded-md focus:border-stone-500 focus:outline-none resize-none"
                                                    rows={4}
                                                    maxLength={maxMessageLength}
                                                    placeholder="Add a personal touch to your gift..."
                                                />
                                                <div className="absolute bottom-3 right-3 text-xs text-stone-400">
                                                    {message.length}/{maxMessageLength}
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <Button
                                        disabled={!selectedVariant}
                                        onClick={handleAddToBag}
                                        className="w-full bg-anna-green-950 text-white hover:bg-stone-700"
                                    >
                                        {selectedVariant ? <>Add Gift Card — {selectedAmountLabel}</> : "Select Amount"}
                                    </Button>

                                    <p className="text-xs text-stone-500">
                                        Gift cards never expire and can be used across the store.
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Experience Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-8">
                            More Than a Gift,
                            <br />
                            <em className="font-serif italic">A Daily Ritual</em>
                        </h3>

                        <p className="text-xl text-stone-600 leading-relaxed mb-12">
                            A gift card is an invitation to slow down—toward softness, texture, and quiet luxury. It’s the freedom to
                            choose what she’ll reach for again and again.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-anna-cement-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Gift className="w-8 h-8 text-anna-cement-600" />
                                </div>
                                <h4 className="text-lg font-light text-stone-800 mb-2">Instant Delivery</h4>
                                <p className="text-stone-600 text-sm">Delivered by email in minutes—perfect for last-minute gifting.</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-anna-cement-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-anna-cement-600" />
                                </div>
                                <h4 className="text-lg font-light text-stone-800 mb-2">No Guesswork</h4>
                                <p className="text-stone-600 text-sm">She chooses the piece, the size, and the moment.</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-anna-cement-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-8 h-8 text-anna-cement-600" />
                                </div>
                                <h4 className="text-lg font-light text-stone-800 mb-2">Always Right</h4>
                                <p className="text-stone-600 text-sm">A considered gift that fits every season and every style.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
