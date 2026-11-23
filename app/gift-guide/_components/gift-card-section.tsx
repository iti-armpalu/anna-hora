import Image from "next/image"
import type { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { SectionHeader } from "@/components/common/section-header"
import { DashList } from "@/components/common/dash-list"
import { giftGuideContent } from "../_data"
import { GiftCardPurchase } from "./gift-card-purchase"

/** Server shell — only the purchase controls ship as client JS. */
export function GiftCardSection({ giftCardProduct }: { giftCardProduct: ProductNormalized | null }) {
    const { giftCard } = giftGuideContent

    return (
        <section id="gift-card" className="section bg-secondary scroll-mt-[var(--header-height)]">
            <div className="container-site">
                <SectionHeader titleTop={giftCard.titleTop} titleEm={giftCard.titleEm} subtitle={giftCard.subtitle} />

                <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-block lg:grid-cols-2 lg:gap-16">
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                        <Image
                            src={giftCard.image.src}
                            alt={giftCard.image.alt}
                            fill
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-block">
                        <div className="flex flex-col gap-field">
                            <p className="text-muted-foreground">{giftCard.description}</p>
                            <DashList items={giftCard.features} />
                        </div>

                        {giftCardProduct ? (
                            <GiftCardPurchase giftCardProduct={giftCardProduct} />
                        ) : (
                            <p className="border border-border px-4 py-3 text-small text-muted-foreground">
                                {giftCard.purchase.unavailable}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
