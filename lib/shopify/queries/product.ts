// lib/shopify/queries/product.ts

// Leftover-fabric metaobject linked to a product; null when the product has no pre-order fabric
const PREORDER_FABRIC_FIELD = /* GraphQL */ `
  preorderFabric: metafield(namespace: "custom", key: "preorder_fabric") {
    reference {
      ... on Metaobject {
        leadTimeWeeks: field(key: "lead_time_weeks") {
          value
        }
      }
    }
  }
`;

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
              currentlyNotInStock
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
            { namespace: "custom", key: "edit" },
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
            currentlyNotInStock
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
          { namespace: "custom", key: "edit" },
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
          { namespace: "custom", key: "size_guide_id" },
          { namespace: "custom", key: "care_instructions" },
          { namespace: "custom", key: "made_in" },
          { namespace: "custom", key: "ethical_notes" },
        ]
      ) {
        key
        value
      }

      ${PREORDER_FABRIC_FIELD}
    }
  }
`;


// Fresh stock check for a single variant at add-to-bag time
export const VARIANT_STOCK_QUERY = /* GraphQL */ `
  query VariantStock($variantId: ID!, $country: CountryCode)
  @inContext(country: $country) {
    node(id: $variantId) {
      ... on ProductVariant {
        availableForSale
        currentlyNotInStock
        product {
          ${PREORDER_FABRIC_FIELD}
        }
      }
    }
  }
`;
