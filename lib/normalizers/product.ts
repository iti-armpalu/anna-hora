import type {
  Product as ShopifyProduct,
  ProductImage,
  ProductVariant,
  ProductOption,
  Metafield,
} from "@/lib/shopify/types/product";
import { COLOR_GROUP_TAG_PREFIX, COLOR_OPTION_NAME } from "@/lib/config/color-group";

import { getStockStatus } from "@/lib/shopify/utils/stock-status";
import type {
  ProductNormalized,
  ProductVariantNormalized,
  ProductImageNormalized,
  ProductOptionNormalized,
  ProductMetafieldsNormalized,
  ColorSwatchNormalized,
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
    edit: map["edit"] ?? null,
    fabricShort: map["fabric_short"] ?? null,
    fabricFull: map["fabric_full"] ?? null,
    fabricCertifications: map["fabric_certifications"] ?? null,
    descriptionCore: map["description_core"] ?? null,
    descriptionStyle: map["description_style"] ?? null,
    descriptionSensory: map["description_sensory"] ?? null,
    descriptionLifestyle: map["description_lifestyle"] ?? null,
    isNew: map["is_new"] === "true",
    isLimited: map["is_limited"] === "true",
    isBestseller: map["is_bestseller"] === "true",
    fitNotes: map["fit_notes"] ?? null,
    sizeGuideId: map["size_guide_id"] ?? null,
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
    stockStatus: getStockStatus(variant),
    selectedOptions: variant.selectedOptions ?? [],
    price: {
      amount: variant.price.amount,
      currencyCode: variant.price.currencyCode,
    },
  };
}

/* ----------------------------------------------------
 * Colour: swatch from the Color option, group from tags
 * ---------------------------------------------------- */

/** Each product is one colour, so the Color option has a single value. */
export function getColorSwatch(
  options: ProductOption[] | undefined
): ColorSwatchNormalized | null {
  const colorValue = options
    ?.find((opt) => opt.name.toLowerCase() === COLOR_OPTION_NAME)
    ?.optionValues?.[0];

  if (!colorValue) return null;

  return {
    name: colorValue.name,
    hex: colorValue.swatch?.color ?? null,
    imageUrl: colorValue.swatch?.image?.previewImage?.url ?? null,
  };
}

function getColorGroup(tags: string[] | undefined): string | null {
  const groupTag = tags?.find((tag) => tag.startsWith(COLOR_GROUP_TAG_PREFIX));
  return groupTag ? groupTag.slice(COLOR_GROUP_TAG_PREFIX.length) : null;
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

    preorderLeadTimeWeeks:
      product.preorderFabric?.reference?.leadTimeWeeks?.value ?? null,

    colorGroup: getColorGroup(product.tags),
    color: getColorSwatch(product.options),
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
