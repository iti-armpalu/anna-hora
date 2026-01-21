

// lib/queries/product.ts
// Stores the raw GraphQL query used by the fetchers.
// GraphQL

export const PRODUCTS_QUERY = `
  query ProductsWithVariants($first: Int!, $after: String, $country: CountryCode, $query: String)
  @inContext(country: $country) 
  {
    products(first: $first, after: $after, query: $query) {

      pageInfo {
        hasNextPage
        endCursor
      }

      nodes {
        id
        handle
        title
        description


          featuredImage {
          url
          altText
        }

        images(first: 5) {
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
            { namespace: "custom", key: "is_new" },
            { namespace: "custom", key: "is_limited" },
            { namespace: "custom", key: "is_bestseller" },
          ]
        ) {
          key
          value
        }
          
      }
    }
  }
`;



export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!, $country: CountryCode)
  @inContext(country: $country) 
  {
    product(handle: $handle) {
      id
      handle
      title
      description

      images(first: 8) {
        edges {
          node {
            url
            altText
          }
        }
      }

      featuredImage {
        url
        altText
      }

      options {
        id
        name
        values
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

      variants(first: 100) {
        edges {
          node {
            id
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
`;

