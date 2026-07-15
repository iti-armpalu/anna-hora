import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { getCollectionByHandle } from "@/lib/shopify"
import HeroSection from "@/components/home/hero-section"
import FeaturedCategories from "@/components/home/featured-categories"
import OurSilkSection from "@/components/home/our-silk-section"
import FeaturedProducts from "@/components/home/featured-products"
import GiftingSection from "@/components/home/gifting-section"
import NewsletterSection from "@/components/home/newsletter-section"
import { siteConfig } from "@/lib/config/site"
import type { CollectionNormalized } from "@/lib/shopify/types/collection-normalized"

export const metadata: Metadata = {
  ...pageMeta.home,
  title: {
    absolute: `Mulberry Silk Loungewear | ${siteConfig.displayName}`,
  },
}

export const revalidate = 60

const categoryHandles = ["shirts", "shorts", "trousers"]

export default async function HomePage() {
  const [featuredCollection, ...categoryCollections] = await Promise.all([
    getCollectionByHandle("featured"),
    ...categoryHandles.map((h) => getCollectionByHandle(h)),
  ])

  const featuredProducts = featuredCollection?.products ?? []

  const validCategories = categoryCollections.filter(
    (c): c is CollectionNormalized => c !== null
  )

  return (
    <>
      <HeroSection />
      <FeaturedCategories collections={validCategories} />
      <OurSilkSection />
      <FeaturedProducts products={featuredProducts} />
      <GiftingSection />
      <NewsletterSection />
    </>
  )
}