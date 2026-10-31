// lib/shopify/types/product-normalized.ts

/**
 * Normalized image shape for frontend usage.
 * No edges, no undefined.
 */
export interface ProductImageNormalized {
  url: string;
  altText: string | null;
}

/**
 * Derived from Shopify's availableForSale + currentlyNotInStock.
 * - in_stock:  physical stock available
 * - preorder:  no stock, but still sellable (made to order from leftover fabric)
 * - sold_out:  not sellable
 */
export type VariantStockStatus = "in_stock" | "preorder" | "sold_out";

/**
 * Normalized product variant shape.
 */
export interface ProductVariantNormalized {
  id: string;
  title: string;
  stockStatus: VariantStockStatus;
  selectedOptions: { name: string; value: string }[];
  price: {
    amount: string;        // "120.00"
    currencyCode: string;  // "GBP"
  };
}

/**
 * Normalized product option shape.
 */
export interface ProductOptionNormalized {
  id: string;
  name: string;
  values: string[];
}

/**
 * Normalized metafields we care about for product listing / PDP.
 * You can expand this as needed.
 */
export interface ProductMetafieldsNormalized {
  edit: string | null;
  fabricShort: string | null;
  fabricFull: string | null;
  fabricCertifications: string | null;
  descriptionCore: string | null;
  descriptionStyle: string | null;
  descriptionSensory: string | null;
  descriptionLifestyle: string | null;
  isNew: boolean;
  isLimited: boolean;
  isBestseller: boolean;
  fitNotes: string | null;
  sizeGuideId: string | null;
  careInstructions: string | null;
  madeIn: string | null;
  ethicalNotes: string | null;
}

/**
 * The main normalized Product type used by your app.
 * This is what components, loaders, and context should consume.
 */
export interface ProductNormalized {
  id: string;
  handle: string;
  title: string;
  description: string;

  featuredImage: ProductImageNormalized | null;
  images: ProductImageNormalized[];

  options: ProductOptionNormalized[];
  variants: ProductVariantNormalized[];

  // Price range for cards / PDP
  minPrice: string;        // "120.00"
  maxPrice: string;        // "140.00"
  currencyCode: string;    // "GBP"

  metafields: ProductMetafieldsNormalized;

  /** e.g. "3–4" (weeks). Only populated on the PDP; null when not linked to a fabric. */
  preorderLeadTimeWeeks: string | null;
}
