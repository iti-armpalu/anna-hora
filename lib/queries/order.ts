export const CUSTOMER_ORDERS_QUERY = `
  query getCustomerData($token: String!) {
    customer(customerAccessToken: $token) {
      firstName
      lastName
      email

      orders(first: 20) {
        edges {
          node {
            id
            name
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            statusUrl

            shippingAddress {
              firstName
              lastName
              address1
              address2
              city
              province
              zip
              country
            }

            subtotalPrice {
              amount
              currencyCode
            }

            totalPrice {
              amount
              currencyCode
            }

            totalShippingPrice {
              amount
              currencyCode
            }

            totalTax {
              amount
              currencyCode
            }

            lineItems(first: 20) {
              edges {
                node {
                  quantity
                  title
                  variant {
                    title
                    price {
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
