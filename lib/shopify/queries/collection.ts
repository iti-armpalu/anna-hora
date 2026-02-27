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
      description
      handle
      image {
        url
        altText
      }

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
              { namespace: "custom", key: "fabric_short" },
              { namespace: "custom", key: "fabric_full" },
              { namespace: "custom", key: "fabric_certifications" },
              { namespace: "custom", key: "description_core" },
              { namespace: "custom", key: "description_style" },
              { namespace: "custom", key: "description_sensory" },
              { namespace: "custom", key: "description_lifestyle" },
              { namespace: "custom", key: "is_new" },
              { namespace: "custom", key: "is_limited" },
              { namespace: "custom", key: "is_bestseller" },
              { namespace: "custom", key: "fit_notes" },
              { namespace: "custom", key: "care_instructions" },
              { namespace: "custom", key: "made_in" },
              { namespace: "custom", key: "ethical_notes" },
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
