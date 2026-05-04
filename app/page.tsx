import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { getCollectionByHandle } from "@/lib/shopify"
import { getGiftCardProduct } from "@/lib/shopify/product"
import HeroSection from "@/components/home/hero-section"
import FeaturedCategories from "@/components/home/featured-categories"
import OurSilkSection from "@/components/home/our-silk-selection"
import FeaturedProducts from "@/components/home/featured-products"
import GiftingSection from "@/components/home/gifting-section"
import NewsletterSection from "@/components/home/newsletter-section"
import { siteConfig } from "@/lib/config/site"

export const metadata: Metadata = {
  ...pageMeta.home,
  title: {
    absolute: `Mulberry Silk Loungewear | ${siteConfig.displayName}`,
  },
}

export const revalidate = 60

export default async function HomePage() {
  const categoryHandles = ["shirts", "shorts", "trousers"]

  const [featuredCollection, categoryCollections, giftCardProduct] = await Promise.all([
    getCollectionByHandle("featured"),
    Promise.all(categoryHandles.map((h) => getCollectionByHandle(h))).then((r) =>
      r.filter(Boolean)
    ),
    getGiftCardProduct(),
  ])

  const featuredProducts = featuredCollection?.products ?? []

  return (
    <>
      <HeroSection />
      <FeaturedCategories collections={categoryCollections} />
      <OurSilkSection />
      <FeaturedProducts products={featuredProducts} />
      <GiftingSection />
      <NewsletterSection />
    </>
  )
}