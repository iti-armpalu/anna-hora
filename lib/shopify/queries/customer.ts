// Customer Account API queries (for Shopify Customer Accounts / OIDC).
// These are NOT Storefront API "classic customer" queries.

export const CUSTOMER_PROFILE_QUERY = /* GraphQL */ `
  query CustomerProfile {
    customer {
      id
      firstName
      lastName
      displayName
      emailAddress {
        emailAddress
      }
      phoneNumber {
        phoneNumber
      }
    }
  }
`;

export const CUSTOMER_UPDATE_MUTATION = /* GraphQL */ `
  mutation CustomerUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        firstName
        lastName
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;



export const CUSTOMER_ORDERS_QUERY = /* GraphQL */ `
  query CustomerOrders($first: Int!) {
    customer {
      orders(first: $first, reverse: true) {
        nodes {
          id
          name
          processedAt
          financialStatus
          fulfillmentStatus
          totalPrice {
            amount
            currencyCode
          }
          # Optional: official Shopify-hosted status link
          statusPageUrl
        }
      }
    }
  }
`;

export const ORDER_DETAILS_QUERY = /* GraphQL */ `
  query OrderDetails($id: ID!, $lineItemsFirst: Int!) {
    order(id: $id) {
      id
      name
      processedAt
      financialStatus
      fulfillmentStatus
      totalPrice {
        amount
        currencyCode
      }

      # Needed to disable/label returned items in UI
      returns(first: 20) {
        nodes {
          id
          status
          returnLineItems(first: 100) {
            nodes {
              quantity
              lineItem {
                id
              }
            }
          }
        }
      }

      lineItems(first: $lineItemsFirst) {
        nodes {
          id
          name
          title
          quantity

          # ✅ Needed to prevent invalid return quantities
          refundableQuantity

          variantTitle
          variantOptions {
            name
            value
          }

          price {
            amount
            currencyCode
          }

          currentTotalPrice {
            amount
            currencyCode
          }

          image {
            url
            altText
          }
        }
      }
    }
  }
`;
