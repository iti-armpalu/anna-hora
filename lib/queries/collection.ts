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
  query CollectionByHandle($handle: String!, $first: Int!, $country: CountryCode) 
  @inContext(country: $country) 
  {
    collection(handle: $handle) {
      id
      title
      handle

      products(first: $first) {
        nodes {
          id
          handle
          title
          description

          featuredImage {
            url
            altText
          }

          images(first: 8) {
            edges {
              node {
                url
                altText
              }
            }
          }

          options {
            id
            name
            values
          }

          variants(first: 100) {
            edges {
              node {
                id
                title
                availableForSale
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }

          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }

          metafields(
            identifiers: [
              { namespace: "custom", key: "bestseller" },
              { namespace: "custom", key: "limited" },
              { namespace: "custom", key: "new" },
              { namespace: "custom", key: "fabric" },
            ]
          ) {
            key
            value
          }

        }
      }
    }
  }
`;
