

// lib/queries/product.ts
// Stores the raw GraphQL query used by the fetchers.
// GraphQL

export const PRODUCTS_QUERY = `
  query ProductsWithVariants($first: Int! = 12, $country: CountryCode)
  @inContext(country: $country) 
  {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description

        images(first: 5) {
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

        metafields(identifiers: [
          { namespace: "custom", key: "bestseller" },
          { namespace: "custom", key: "limited" },
          { namespace: "custom", key: "new" }
        ]) {
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
          { namespace: "custom", key: "bestseller" },
          { namespace: "custom", key: "limited" },
          { namespace: "custom", key: "new" },
          { namespace: "custom", key: "sensory_description" },
          { namespace: "custom", key: "lifestyle_description" },
          { namespace: "custom", key: "style_description" }
        ]
      ) {
        key
        value
      }
    }
  }
`;

