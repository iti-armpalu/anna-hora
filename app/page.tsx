
import AsSeenIn from "@/components/press/as-seen-in"
import { getCollectionByHandle } from "@/lib/shopify"
import { getGiftCardAmounts } from "@/lib/shopify/utils/gift-card"
import { getGiftCardProduct } from "@/lib/shopify/product"
import NewsletterSection from "@/components/common/newsletter-section"
import HeroSection from "@/components/hero-section"
import FeaturedCategories from "@/components/featured-categories"
import OurSilkSection from "@/components/our-silk-selection"
import GiftingSection from "@/components/gifting-section"
import FeaturedProducts from "@/components/featured-products"

export default async function HomePage() {

  const featuredCollection = await getCollectionByHandle("Featured");
  const featuredProducts = featuredCollection?.products ?? [];

  // const giftCardProduct = await getGiftCardProduct();

  // if (!giftCardProduct) {
  //   return <div>No gift card product found.</div>;
  // }

  // const giftCardAmounts = giftCardProduct ? getGiftCardAmounts(giftCardProduct) : [];
  // const startingAmount = giftCardAmounts[0] ?? null;

  return (
    <div>

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Our Silk Section */}
      <OurSilkSection />

      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />

      {/* Gift Guide Section */}
      {/* <GiftingSection startingAmount={startingAmount} currencyCode={giftCardProduct?.currencyCode} /> */}

      {/* As Seen In Section */}
      <AsSeenIn />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  )
}
