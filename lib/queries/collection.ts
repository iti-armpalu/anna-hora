// lib/queries/collections.ts

/* ----------------------------------------
   Fetch ALL collections (for menu / filters)
---------------------------------------- */
export const COLLECTIONS_QUERY = /* GraphQL */ `
  query GetCollections($first: Int!) {
  collections(first: $first) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
  }
`;

/* ----------------------------------------
   Fetch ONE collection by handle
   (for /collections/[handle] pages)
---------------------------------------- */
export const COLLECTION_BY_HANDLE_QUERY = /* GraphQL */ `
  query CollectionByHandle($handle: String!, $first: Int!) {
  collection(handle: $handle) {
    id
    title
    handle
    description
    products(first: $first) {
      nodes {
        id
        title
        handle
      }
    }
  }
  }
`;
