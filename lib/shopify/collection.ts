import { COLLECTION_BY_HANDLE_QUERY, COLLECTIONS_QUERY } from "@/lib/shopify/queries/collection";
import { shopifyFetch } from "@/lib/shopify/fetch";
import { ShopifyCollection } from "./types/collection";
import { Product } from "./types/product";
import { normalizeCollection, normalizeCollections } from "../normalizers/collection";

// --------------------------------------------------
// Fetch ALL collections — normalized
// --------------------------------------------------
export async function getCollections() {

  const res = await shopifyFetch<{
    collections: {
      edges: { node: ShopifyCollection }[]
    }
  }>({
    query: COLLECTIONS_QUERY,
    variables: { first: 20 },
    revalidate: 300,
  });

  // Filter out Shopify's default "frontpage" collection
  const collections = res.collections.edges
    .map((e) => e.node)
    .filter((c) => c.handle !== "frontpage");


  return normalizeCollections(collections);
}


// --------------------------------------------------
// Fetch a SINGLE collection — normalized
// --------------------------------------------------
export async function getCollectionByHandle(handle: string) {
  const { collection } = await shopifyFetch<{
    collection: ShopifyCollection & {
      products: {
        nodes: Product[];
        pageInfo: {
          hasNextPage: boolean;
          endCursor: string | null;
        };
      }
    }
  }>({
    query: COLLECTION_BY_HANDLE_QUERY,
    variables: { handle, first: 24 },
    revalidate: 300,
  });

  if (!collection) return null;

  return normalizeCollection(collection);
}
