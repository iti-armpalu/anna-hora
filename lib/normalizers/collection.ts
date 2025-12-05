import type { ShopifyCollection } from "@/lib/shopify/types/collection";
import type { CollectionNormalized } from "@/lib/shopify/types/collection-normalized";

import { normalizeProducts } from "@/lib/normalizers/product";

/* ----------------------------------------------------
 * Normalize a single collection
 * ---------------------------------------------------- */
export function normalizeCollection(
  collection: ShopifyCollection
): CollectionNormalized {
  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,

    // Normalize the products inside the collection
    products: normalizeProducts(collection.products?.nodes ?? []),
  };
}

/* ----------------------------------------------------
 * Normalize an array of collections
 * ---------------------------------------------------- */
export function normalizeCollections(
  collections: ShopifyCollection[] | null | undefined
): CollectionNormalized[] {
  if (!collections) return [];
  return collections.map((c) => normalizeCollection(c));
}
