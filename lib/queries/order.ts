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


export const CREATE_CUSTOMER_TOKEN = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        message
      }
    }
  }
`;
