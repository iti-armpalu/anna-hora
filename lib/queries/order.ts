export const CUSTOMER_ORDERS_QUERY = `
  query getCustomerData($token: String!) {
    customer(customerAccessToken: $token) {
      firstName
      lastName
      email
      orders(first: 20) {
        edges {
          node {
            name
            processedAt
            fulfillmentStatus
            financialStatus
            lineItems(first: 10) {
              edges {
                node {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;
