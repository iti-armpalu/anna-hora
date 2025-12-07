import { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { getGiftCardProduct } from "@/lib/shopify/product"
import GiftGuidePageClient from "./gift-guide-page-client"

export function getGiftCardAmounts(product: ProductNormalized): number[] {
  return product.variants
    .map((variant) => Number(variant.price.amount))
    .filter((value) => !Number.isNaN(value))
    .sort((a, b) => a - b);
}

export default async function GiftGuidePage() {
  const product = await getGiftCardProduct();

  if (!product) {
    return <div>No gift card product found.</div>;
  }

  const giftCardAmounts = getGiftCardAmounts(product);


  return (
    <GiftGuidePageClient
      product={product}
      giftCardAmounts={giftCardAmounts}
    />
  )
}
