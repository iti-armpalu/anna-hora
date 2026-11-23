import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { getGiftCardProduct } from "@/lib/shopify/product"
import type { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { GiftGuideHero } from "./_components/gift-guide-hero"
import { GiftCardSection } from "./_components/gift-card-section"
import { PackagingSection } from "./_components/packaging-section"
import { GiftGuideClosingSection } from "./_components/closing-section"

export const metadata: Metadata = pageMeta.giftGuide

/** If the gift card can't be loaded, the page still renders and the section shows an "unavailable" note. */
async function getGiftCardProductSafe(): Promise<ProductNormalized | null> {
  try {
    return await getGiftCardProduct()
  } catch (err: unknown) {
    console.error("getGiftCardProduct failed:", err instanceof Error ? err.message : err)
    return null
  }
}

export default async function GiftGuidePage() {
  const giftCardProduct = await getGiftCardProductSafe()

  return (
    <>
      <GiftGuideHero />
      <GiftCardSection giftCardProduct={giftCardProduct} />
      <PackagingSection />
      <GiftGuideClosingSection />
    </>
  )
}
