import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { getGiftCardProduct } from "@/lib/shopify/product"
import { GiftGuideHero } from "./_components/gift-guide-hero"
import { GiftCardSection } from "./_components/gift-card-section"
import { PackagingSection } from "./_components/packaging-section"

export const metadata: Metadata = pageMeta.giftGuide
export const revalidate = 3600

export default async function GiftGuidePage() {
  const giftCardProduct = await getGiftCardProduct()

  return (
    <>
      <GiftGuideHero />
      <GiftCardSection giftCardProduct={giftCardProduct} />
      <PackagingSection />
    </>
  )
}