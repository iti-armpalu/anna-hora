import type { ProductNormalized } from "@/lib/shopify/types/product-normalized";

export function getGiftCardAmounts(product: ProductNormalized): number[] {
  return product.variants
    .map((variant) => Number(variant.price.amount))
    .filter((value) => !Number.isNaN(value))
    .sort((a, b) => a - b);
}
