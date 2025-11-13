// lib/queries/products.ts
// Stores the raw GraphQL query used by the fetchers.
// GraphQL

export const PRODUCTS_QUERY = `
  query ProductsWithVariants($first: Int! = 12) {
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

      featuredImage { url altText }
      options {
        name
        values
      }
    
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
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
`
