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
   * Normalized product variant shape.
   */
  export interface ProductVariantNormalized {
    id: string;
    title: string;
    availableForSale: boolean;
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
    bestseller: boolean;
    limited: boolean;
    new: boolean;
    fabric: string | null;
  
    sensoryDescription: string | null;
    lifestyleDescription: string | null;
    styleDescription: string | null;
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
  }
  