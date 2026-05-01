import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { giftGuideContent } from "../_data"

interface GiftCardSectionProps {
    startingAmount: number | null
}

export function GiftCardSection({ startingAmount }: GiftCardSectionProps) {
    const { giftCard } = giftGuideContent

    return (
        <section id="gift-card" className="py-16 lg:py-24 bg-stone-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                            {giftCard.titleTop}
                            <br />
                            <em className="font-serif italic">{giftCard.titleEm}</em>
                        </h2>
                        <p className="text-lg text-stone-600 max-w-2xl mx-auto">{giftCard.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <Image
                                src={giftCard.image.src}
                                alt={giftCard.image.alt}
                                width={500}
                                height={400}
                                sizes="(min-width: 1024px) 500px, 90vw"
                            />
                        </div>

                        <Card className="border-0 shadow-lg bg-white p-8">
                            <div className="space-y-5">
                                <p className="text-stone-600 leading-relaxed">{giftCard.description}</p>

                                <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                                    <ul className="space-y-2 text-sm text-stone-700">
                                        {giftCard.features.map((feature) => (
                                            <li key={feature} className="flex gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button disabled className="w-full opacity-60">
                                    {giftCard.ctaLabel}
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}