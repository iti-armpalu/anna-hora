export const CUSTOMER_ADD_ADDRESS = `
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const CUSTOMER_UPDATE_ADDRESS = `
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      customerAccessToken: $customerAccessToken
      id: $id
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const CUSTOMER_DELETE_ADDRESS = `
  mutation customerAddressDelete(
    $customerAccessToken: String!
    $id: ID!
  ) {
    customerAddressDelete(
      customerAccessToken: $customerAccessToken
      id: $id
    ) {
      deletedCustomerAddressId
      customerUserErrors {
        message
      }
    }
  }
`;

export const CUSTOMER_SET_DEFAULT_ADDRESS = `
  mutation customerDefaultAddressUpdate(
    $customerAccessToken: String!
    $addressId: ID!
  ) {
    customerDefaultAddressUpdate(
      customerAccessToken: $customerAccessToken
      addressId: $addressId
    ) {
      customer {
        defaultAddress {
          id
        }
        addresses(first: 10) {
            edges {
                node {
                    id
                }
            }
        }
      }
      customerUserErrors {
        message
      }
    }
  }
`;
