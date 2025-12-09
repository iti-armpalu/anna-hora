'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/hooks/use-price";
import { ProductNormalized } from "@/lib/shopify/types/product-normalized";
import { Gift, Heart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";


interface GiftGuidePageClientProps {
    product: ProductNormalized;
    giftCardAmounts: number[];
}

export default function GiftGuidePageClient({
    product,
    giftCardAmounts,
}: GiftGuidePageClientProps) {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [giftCardType, setGiftCardType] = useState("digital")

    const { addToCart } = useCart();

    const currency = product.currencyCode;

    // SAFE + CLEAN: compute selected variant once
    const selectedVariant =
        selectedAmount !== null
            ? product.variants.find(
                (v) => Number(v.price.amount) === selectedAmount
            )
            : null;

    const selectedAmountLabel =
        selectedAmount !== null
            ? formatPrice({
                amount: selectedAmount,
                currencyCode: currency,
            })
            : null;

    async function handleAddToBag() {
        // Correct null check
        if (selectedAmount === null) {
            toast.error("Please select a gift card amount.");
            return;
        }

        if (!selectedVariant) {
            toast.error("No matching variant found for selected amount.");
            return;
        }

        // Correct field = id, not variantId
        const variantId = selectedVariant.id;

        try {
            await addToCart(variantId, 1);

            toast.success(
                `Added ${product.title} (${selectedAmountLabel}) to your bag.`
            );
        } catch (err) {
            toast.error("Failed to add gift card to bag.");
            console.error(err);
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
                                {`Some gifts are forgotten within days. Others become treasured rituals, woven into the fabric of daily
                  life. When you give Anna Hora, you're not just giving a beautiful piece—you're giving moments of quiet
                  luxury, mornings made more beautiful, and the daily reminder that she deserves the finest.`}
                            </p>
                            <p className="text-lg text-stone-600 leading-relaxed">
                                Each piece arrives wrapped in our signature packaging, ready to create a moment of pure joy for someone
                                special.
                            </p>
                            <Button className="bg-stone-800 hover:bg-stone-700 text-white">
                                <Gift className="w-4 h-4 mr-2" />
                                Start Gifting
                            </Button>
                        </div>
                        <div className="relative">
                            <Image
                                src="/placeholder.svg"
                                alt="Elegant gift wrapping"
                                width={500}
                                height={600}
                                className="rounded-lg"
                            />
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-stone-200 rounded-full opacity-30 -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Gift Card Section */}
            <section className="py-16 lg:py-24 bg-stone-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                                The ANNA HORA
                                <br />
                                <em className="font-serif italic">Gift Card</em>
                            </h3>
                            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                                {`When you can't decide, let her choose. Our gift card — wrapped in silk, delivered
                  with care.`}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative">
                                <Image
                                    src="/anna-hora-giftcard-2.webp"
                                    alt=" Gift Card"
                                    width={500}
                                    height={400}
                                    className="rounded-lg"
                                />
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
                                                                ? "bg-stone-800 hover:bg-stone-700 text-white"
                                                                : "border-stone-300 text-stone-700 hover:bg-stone-100"
                                                        }
                                                    >
                                                        {amount}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">Delivery Method</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Button
                                                    variant={giftCardType === "digital" ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setGiftCardType("digital")}
                                                    className={
                                                        giftCardType === "digital"
                                                            ? "bg-stone-800 hover:bg-stone-700 text-white"
                                                            : "border-stone-300 text-stone-700 hover:bg-stone-100"
                                                    }
                                                >
                                                    Digital
                                                </Button>
                                                <Button
                                                    variant={giftCardType === "physical" ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setGiftCardType("physical")}
                                                    className={
                                                        giftCardType === "physical"
                                                            ? "bg-stone-800 hover:bg-stone-700 text-white"
                                                            : "border-stone-300 text-stone-700 hover:bg-stone-100"
                                                    }
                                                >
                                                    Physical
                                                </Button>
                                            </div>
                                            <p className="text-xs text-stone-500 mt-2">
                                                {giftCardType === "digital"
                                                    ? "Delivered instantly via email with a personalized message"
                                                    : "Beautiful card posted in premium gift packaging"}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                                Personal Message (Optional)
                                            </label>
                                            <textarea
                                                className="w-full p-3 border border-stone-300 rounded-md focus:border-stone-500 focus:outline-none resize-none"
                                                rows={3}
                                                placeholder="Add a personal touch to your gift..."
                                            />
                                        </div>
                                    </div>

                                    {/* Add to Cart button */}
                                    <Button
                                        disabled={!selectedVariant}
                                        onClick={handleAddToBag}
                                        className="w-full bg-stone-800 text-white hover:bg-stone-700"
                                    >
                                        {selectedVariant ? (
                                            <>Send Gift Card - {selectedAmountLabel}</>
                                        ) : (
                                            "Select Amount"
                                        )}
                                    </Button>

                                    {/* <Button size="lg" className="w-full bg-stone-800 hover:bg-stone-700 text-white">
                                        <Gift className="w-4 h-4 mr-2" />
                                        Send Gift Card - ${giftCardAmount}
                                    </Button> */}
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
                            {`When you give Anna Hora, you're giving more than beautiful loungewear. You're giving the ritual of
                slipping into something exquisite, the daily reminder to slow down and savor quiet moments, and the
                confidence that comes from wearing something truly special—even when no one else will see it.`}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Gift className="w-8 h-8 text-stone-600" />
                                </div>
                                <h4 className="text-lg font-light text-stone-800 mb-2">Premium Packaging</h4>
                                <p className="text-stone-600 text-sm">
                                    Every gift arrives in our signature packaging with handwritten notes
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-stone-600" />
                                </div>
                                <h4 className="text-lg font-light text-stone-800 mb-2">Thoughtful Curation</h4>
                                <p className="text-stone-600 text-sm">Each piece is chosen for its ability to create moments of joy</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-8 h-8 text-stone-600" />
                                </div>
                                <h4 className="text-lg font-light text-stone-800 mb-2">Lasting Beauty</h4>
                                <p className="text-stone-600 text-sm">
                                    Gifts that become more precious with time, not forgotten with trends
                                </p>
                            </div>
                        </div>

                        {/* <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3">
                Explore All Gifts
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button> */}
                    </div>
                </div>
            </section>
        </div>

    );
}
