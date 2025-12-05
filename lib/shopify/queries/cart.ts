export const GET_CART = /* GraphQL */ `
  query cart(
    $cartId: ID!,
    $country: CountryCode
  )
  @inContext(country: $country) {
    cart(id: $cartId) {
      id
      totalQuantity
      checkoutUrl

      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
      }

      lines(first: 20) {
        edges {
          node {
            id
            quantity

            merchandise {
              ... on ProductVariant {
                id
                title
                sku
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                image { url }
                selectedOptions { name value }
                product {
                  title
                  featuredImage { url }
                }
              }
            }

            cost {
              amountPerQuantity { amount currencyCode }
              subtotalAmount { amount currencyCode }
              totalAmount { amount currencyCode }
            }
          }
        }
      }
    }
  }
`;

export const CART_CREATE = /* GraphQL */ `
  mutation cartCreate($country: CountryCode)
  @inContext(country: $country) {
    cartCreate {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
      }
    }
  }
`;

export const CART_LINES_ADD = /* GraphQL */ `
  mutation cartLinesAdd(
    $cartId: ID!,
    $lines: [CartLineInput!]!,
    $country: CountryCode
  )
  @inContext(country: $country) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        checkoutUrl

        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }

        lines(first: 20) {
          edges {
            node {
              id
              quantity

              merchandise {
                ... on ProductVariant {
                  id
                  title
                  sku
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  image { url }
                  selectedOptions { name value }
                  product {
                    title
                    featuredImage { url }
                  }
                }
              }

              cost {
                amountPerQuantity { amount currencyCode }
                subtotalAmount { amount currencyCode }
                totalAmount { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;

export const CART_LINES_UPDATE = /* GraphQL */ `
  mutation cartLinesUpdate(
    $cartId: ID!,
    $lines: [CartLineUpdateInput!]!,
    $country: CountryCode
  )
  @inContext(country: $country) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        checkoutUrl

        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }

        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  sku
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  image { url }
                  selectedOptions { name value }
                  product {
                    title
                    featuredImage { url }
                  }
                }
              }
              cost {
                amountPerQuantity { amount currencyCode }
                subtotalAmount { amount currencyCode }
                totalAmount { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;


export const CART_LINES_REMOVE = /* GraphQL */ `
  mutation cartLinesRemove(
    $cartId: ID!,
    $lineIds: [ID!]!,
    $country: CountryCode
  )
  @inContext(country: $country) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        totalQuantity
        checkoutUrl

        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }

        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  sku
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  image { url }
                  selectedOptions { name value }
                  product {
                    title
                    featuredImage { url }
                  }
                }
              }
              cost {
                amountPerQuantity { amount currencyCode }
                subtotalAmount { amount currencyCode }
                totalAmount { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;

export const CART_BUYER_IDENTITY_UPDATE = /* GraphQL */ `
  mutation cartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
    $country: CountryCode!
  ) @inContext(country: $country) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
        checkoutUrl
        buyerIdentity {
          email
          phone
          customer {
            id
            email
            firstName
            lastName
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

