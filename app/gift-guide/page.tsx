import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { getGiftCardProduct } from "@/lib/shopify/product"
import { getGiftCardAmounts } from "@/lib/shopify/utils/gift-card"
import { GiftGuideHero } from "./_components/gift-guide-hero"
import { GiftCardSection } from "./_components/gift-card-section"
import { PackagingSection } from "./_components/packaging-section"
import { GiftGuideClosingSection } from "./_components/closing-section"

export const metadata: Metadata = pageMeta.giftGuide
export const revalidate = 3600

export default async function GiftGuidePage() {
  const giftCardProduct = await getGiftCardProduct()
  const giftCardAmounts = giftCardProduct ? getGiftCardAmounts(giftCardProduct) : []
  const startingAmount = giftCardAmounts[0] ?? null

  return (
    <>
      <GiftGuideHero />
      <GiftCardSection startingAmount={startingAmount} />
      <PackagingSection />
      <GiftGuideClosingSection />
    </>
  )
}