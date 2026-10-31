import type { VariantStockStatus } from "@/lib/shopify/types/product-normalized";

/** In stock or pre-order — anything the customer can add to the bag. */
export function isPurchasable(status: VariantStockStatus): boolean {
  return status !== "sold_out";
}
