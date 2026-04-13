"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { Gift } from "lucide-react"
import Image from "next/image"

interface GiftGuidePageClientProps {
    product: ProductNormalized
    giftCardAmounts: number[]
}

export default function GiftGuidePageClient({ product, giftCardAmounts }: GiftGuidePageClientProps) {

    const packagingImages = [
        { src: "/packing-1.jpeg", alt: "Folded garment tied with ribbon" },
        { src: "/packing-2.jpeg", alt: "Branded box sealed with our signature sticker" },
        { src: "/packing-3.jpeg", alt: "Soft cotton dust bag" },
        { src: "/packing-4.jpeg", alt: "Finished gift presentation with tissue and a note" },
    ]

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
                                Gift cards are something we’re preparing carefully and will introduce soon. For now, we invite you to explore the pieces themselves—and the details that make them special. Each order is packed with care, so it arrives ready to give.
                            </p>

                            <Button
                                onClick={() => document.getElementById("gift-card")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                <Gift className="w-4 h-4 mr-2" />
                                Gift Cards (Coming Soon)
                            </Button>
                        </div>

                        <div className="relative">
                            <Image
                                src="/gift-guide-hero-1.png"
                                alt="A woman in a white silk lounge shirt puts on an earring, side profile."
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
                                When you can’t decide, let her choose.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative">
                                <Image
                                    src="/anna-hora-giftcard-2.webp"
                                    alt="An ANNA HORA gift card tied with a branded green satin ribbon on marble table top."
                                    width={500}
                                    height={400}
                                    className="rounded-lg"
                                />
                            </div>

                            <Card className="border-0 shadow-lg bg-white p-8">
                                <div className="space-y-5">

                                    <p className="text-stone-600 leading-relaxed">
                                        Gift cards will be digital and delivered by email at launch, with the option to add a personal message.
                                    </p>

                                    <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                                        <ul className="space-y-2 text-sm text-stone-700">
                                            <li className="flex gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-stone-400" />
                                                Multiple amounts
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-stone-400" />
                                                Optional personal message
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-stone-400" />
                                                Email delivery (instant)
                                            </li>
                                        </ul>
                                    </div>

                                    <Button disabled className="w-full opacity-60">
                                        Coming Soon
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Packaging Preview */}
            <section id="packaging" className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
                                Packaging
                                <br />
                                <em className="font-serif italic">Preview</em>
                            </h3>
                            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                                A glimpse of how we pack orders. Carefully prepared, with attention to every detail.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {packagingImages.map((img) => (
                                <div key={img.src} className="group">
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm text-stone-600">{img.alt}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
