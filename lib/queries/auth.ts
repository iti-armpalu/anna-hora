export const CUSTOMER_ACCESS_TOKEN_CREATE = `
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

export const CUSTOMER_PASSWORD_UPDATE_MUTATION = `
  mutation customerUpdatePassword(
    $customerAccessToken: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    customerUpdatePassword(
      customerAccessToken: $customerAccessToken
      password: $password
      passwordConfirm: $passwordConfirm
    ) {
      customerUserErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;
