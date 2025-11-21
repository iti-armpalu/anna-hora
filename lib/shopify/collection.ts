// lib/shopify/product.ts
import { COLLECTION_BY_HANDLE_QUERY, COLLECTIONS_QUERY } from "@/lib/queries/collection";
import { shopifyFetch } from "@/lib/shopify/fetch";
import { ShopifyCollection } from "../types/collection";

// --------------------------------------------------
// Fetch ALL collections
// --------------------------------------------------
export async function getCollections() {

  const res = await shopifyFetch<{
    collections: {
      edges: { node: ShopifyCollection }[]
    }
  }>({
    query: COLLECTIONS_QUERY,
    variables: { first: 20 },
  });

  const collections =
    res?.collections?.edges?.map((edge) => edge.node) ?? [];

  // Filter out Shopify's default "frontpage" collection
  const filtered = collections.filter(
    (c) => c.handle !== "frontpage"
  );

  return filtered;
}


// --------------------------------------------------
// Fetch a SINGLE collection
// --------------------------------------------------
export async function getCollectionByHandle(handle: string) {

  console.log("Fetching collection:", handle);

  const res = await shopifyFetch<{
    collection: ShopifyCollection | null;
  }>({
    query: COLLECTION_BY_HANDLE_QUERY,
    variables: { handle, first: 50 },
  });

  console.log("Collection response:", res);

  return res.collection ?? null;
}