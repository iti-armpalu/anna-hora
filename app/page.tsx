import { getCollectionByHandle } from "@/lib/shopify"
import { getGiftCardAmounts } from "@/lib/shopify/utils/gift-card"
import { getGiftCardProduct } from "@/lib/shopify/product"
import NewsletterSection from "@/components/home/newsletter-section"
import HeroSection from "@/components/home/hero-section"
import FeaturedCategories from "@/components/home/featured-categories"
import OurSilkSection from "@/components/home/our-silk-selection"
import GiftingSection from "@/components/home/gifting-section"
import FeaturedProducts from "@/components/home/featured-products"

export default async function HomePage() {

  const featuredCollection = await getCollectionByHandle("Featured");
  const featuredProducts = featuredCollection?.products ?? [];

  const categoryHandles = ["Shirts", "Shorts", "Trousers"];

  const categoryCollections = (
    await Promise.all(categoryHandles.map((h) => getCollectionByHandle(h)))
  ).filter(Boolean);


  const giftCardProduct = await getGiftCardProduct();
  const giftCardAmounts = giftCardProduct ? getGiftCardAmounts(giftCardProduct) : [];
  const startingAmount = giftCardAmounts[0] ?? null;

  return (
    <>
      <HeroSection />
      <FeaturedCategories collections={categoryCollections} />
      <OurSilkSection />
      <FeaturedProducts products={featuredProducts} />
      <GiftingSection startingAmount={startingAmount} currencyCode={giftCardProduct?.currencyCode} />
      <NewsletterSection />
    </>
  )
}
