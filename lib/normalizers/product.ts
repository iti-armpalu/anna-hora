import type {
  Product as ShopifyProduct,
  ProductImage,
  ProductVariant,
  Metafield,
} from "@/lib/shopify/types/product";

import type {
  ProductNormalized,
  ProductVariantNormalized,
  ProductImageNormalized,
  ProductOptionNormalized,
  ProductMetafieldsNormalized,
} from "@/lib/shopify/types/product-normalized";

/* ----------------------------------------------------
 * Normalize metafields
 * ---------------------------------------------------- */
function normalizeMetafields(
  metafields: Metafield[] | undefined
): ProductMetafieldsNormalized {
  const map: Record<string, string | null> = {};

  for (const mf of metafields ?? []) {
    if (!mf || !mf.key) continue;
    map[mf.key] = mf.value ?? null;
  }

  return {
    fabricShort: map["fabric_short"] ?? null,
    fabricFull: map["fabric_full"] ?? null,
    fabricCertifications: map["fabric_certifications"] ?? null,
    descriptionCore: map["description_core"] ?? null,
    descriptionStyle: map["description_style"] ?? null,
    descriptionSensory: map["description_sensory"] ?? null,
    descriptionLifestyle: map["description_lifestyle"] ?? null,
    isNew: map["is_limited"] === "true",
    isLimited: map["is_limited"] === "true",
    isBestseller: map["is_bestseller"] === "true",
    fitNotes: map["fit_notes"] ?? null,
    careInstructions: map["care_instructions"] ?? null,
    madeIn: map["made_in"] ?? null,
    ethicalNotes: map["ethical_notes"] ?? null,
  };
}

/* ----------------------------------------------------
 * Normalize product image
 * ---------------------------------------------------- */
function normalizeImage(
  img: ProductImage | null | undefined
): ProductImageNormalized | null {
  if (!img?.url) return null;

  return {
    url: img.url,
    altText: img.altText ?? null,
  };
}

/* ----------------------------------------------------
 * Normalize product variant
 * ---------------------------------------------------- */
function normalizeVariant(variant: ProductVariant): ProductVariantNormalized {
  return {
    id: variant.id,
    title: variant.title ?? "",
    availableForSale: variant.availableForSale,
    selectedOptions: variant.selectedOptions ?? [],
    price: {
      amount: variant.price.amount,
      currencyCode: variant.price.currencyCode,
    },
  };
}

/* ----------------------------------------------------
 * Normalize a single product
 * ---------------------------------------------------- */
export function normalizeProduct(
  product: ShopifyProduct
): ProductNormalized {
  const images =
    product.images?.edges
      ?.map((e) => normalizeImage(e.node))
      .filter(Boolean) ?? [];

  const variants =
    product.variants?.edges?.map((e) => normalizeVariant(e.node)) ?? [];

  const metafields = normalizeMetafields(product.metafields);

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description ?? "",

    featuredImage: normalizeImage(product.featuredImage),
    images: images as ProductImageNormalized[],

    options:
      product.options?.map(
        (opt): ProductOptionNormalized => ({
          id: opt.id,
          name: opt.name,
          values: opt.values,
        })
      ) ?? [],

    variants,

    minPrice: product.priceRange.minVariantPrice.amount,
    maxPrice:
      product.priceRange.maxVariantPrice?.amount ??
      product.priceRange.minVariantPrice.amount,
    currencyCode: product.priceRange.minVariantPrice.currencyCode,

    metafields,
  };
}

/* ----------------------------------------------------
 * Normalize an array of products
 * ---------------------------------------------------- */
export function normalizeProducts(
  products: ShopifyProduct[] | null | undefined
): ProductNormalized[] {
  if (!products) return [];
  return products.map((p) => normalizeProduct(p));
}
