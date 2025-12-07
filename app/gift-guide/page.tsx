import { getGiftCardProduct } from "@/lib/shopify/product"
import GiftGuidePageClient from "./gift-guide-page-client"
import { getGiftCardAmounts } from "@/lib/shopify/utils/gift-card";

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
