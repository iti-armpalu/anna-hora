import { ProductNormalized } from "@/lib/shopify/types/product-normalized";

/* -------------------------------------------------------
 * Helpers
 * ----------------------------------------------------- */

export const sortAlpha = (arr: string[]) =>
  [...arr].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );

export const sortSizes = (sizes: string[]) => {
  const SIZE_ORDER = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  return [...sizes].sort((a, b) => {
    const aIndex = SIZE_ORDER.indexOf(a.toUpperCase());
    const bIndex = SIZE_ORDER.indexOf(b.toUpperCase());

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    return a.localeCompare(b);
  });
};

/* -------------------------------------------------------
 * Types
 * ----------------------------------------------------- */

export interface FilterData {
  sizes: string[];
  colors: string[];
  fabrics: string[];
}

/* -------------------------------------------------------
 * Build filter data from products
 * ----------------------------------------------------- */

export function buildFilterData(
  products: ProductNormalized[]
): FilterData {
  const sizeSet = new Set<string>();
  const colorSet = new Set<string>();
  const fabricSet = new Set<string>();

  for (const product of products) {
    /* -----------------------------
     * SIZE (available variants only)
     * ----------------------------- */
    for (const variant of product.variants) {
      if (!variant.availableForSale) continue;

      const sizeOpt = variant.selectedOptions.find(
        (opt) => opt.name.toLowerCase() === "size"
      );

      if (sizeOpt?.value) {
        sizeSet.add(sizeOpt.value);
      }
    }

    /* -----------------------------
     * COLOR
     * ----------------------------- */
    for (const opt of product.options) {
      if (opt.name.toLowerCase() === "color") {
        opt.values.forEach((v) => colorSet.add(v));
      }
    }

    /* -----------------------------
     * FABRIC
     * ----------------------------- */
    if (product.metafields.fabricShort) {
      fabricSet.add(product.metafields.fabricShort);
    }
  }

  return {
    sizes: sortSizes(Array.from(sizeSet)),
    colors: sortAlpha(Array.from(colorSet)),
    fabrics: sortAlpha(Array.from(fabricSet)),
  };
}