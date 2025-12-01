export const GET_CUSTOMER_QUERY = `
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

            addresses(first: 10) {
                edges {
                    node {
                        id
                        firstName
                        lastName
                        address1
                        address2
                        city
                        province
                        zip
                        country
                        phone
                    }
                }
            }
            defaultAddress {
            id
            }

        }
    }
`;


export const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_UPDATE_MUTATION = `
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
      customer {
        id
        firstName
        lastName
        email
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;
