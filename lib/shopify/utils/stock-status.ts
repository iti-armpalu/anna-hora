import type { ProductVariant } from "@/lib/shopify/types/product";
import type { VariantStockStatus } from "@/lib/shopify/types/product-normalized";

type StockFlags = Pick<ProductVariant, "availableForSale" | "currentlyNotInStock">;

/** Single source of truth for turning Shopify's stock flags into a status. */
export function getStockStatus(variant: StockFlags): VariantStockStatus {
  if (!variant.availableForSale) return "sold_out";
  return variant.currentlyNotInStock ? "preorder" : "in_stock";
}

/** In stock or pre-order — anything the customer can add to the bag. */
export function isPurchasable(status: VariantStockStatus): boolean {
  return status !== "sold_out";
}
