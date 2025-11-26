// lib/shopify/queries/customer/account.ts

export const CUSTOMER_ACCOUNT_QUERY = `
  query CustomerAccount {
    customer {
      id
      displayName
      emailAddress {
        emailAddress
      }
      phoneNumber {
        phoneNumber
      }
      defaultAddress {
        id
        address1
        address2
        city
        country
        zip
      }
    }
  }
`;
