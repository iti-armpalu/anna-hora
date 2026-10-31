// lib/preorder/admin-queries.ts — Admin API GraphQL used by the fabric stock logic

// Which leftover fabric each product uses, and how much one item consumes
export const PRODUCTS_FABRIC_QUERY = /* GraphQL */ `
  query ProductsFabric($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        fabric: metafield(namespace: "custom", key: "preorder_fabric") {
          reference {
            ... on Metaobject { id }
          }
        }
      }
    }
  }
`;

// A fabric's remaining amount plus every product linked to it
export const FABRIC_WITH_PRODUCTS_QUERY = /* GraphQL */ `
  query FabricWithProducts($id: ID!) {
    metaobject(id: $id) {
      id
      remainingCm: field(key: "remaining_cm") { value }
      referencedBy(first: 50) {
        nodes {
          referencer {
            ... on Product {
              id
              cmPerItem: metafield(namespace: "custom", key: "fabric_cm_per_item") { value }
              variants(first: 100) {
                nodes { id inventoryPolicy }
              }
            }
          }
        }
      }
    }
  }
`;

export const FABRIC_UPDATE_MUTATION = /* GraphQL */ `
  mutation FabricUpdate($id: ID!, $remainingCm: String!) {
    metaobjectUpdate(id: $id, metaobject: { fields: [{ key: "remaining_cm", value: $remainingCm }] }) {
      userErrors { field message }
    }
  }
`;

export const VARIANTS_POLICY_MUTATION = /* GraphQL */ `
  mutation VariantsPolicy($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkUpdate(productId: $productId, variants: $variants) {
      userErrors { field message }
    }
  }
`;

export const ORDER_TAGS_ADD_MUTATION = /* GraphQL */ `
  mutation OrderTagsAdd($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) {
      userErrors { field message }
    }
  }
`;
