// lib/shopify/types.ts

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
}

export interface OrderLineItemVariant {
  title: string | null;
  price: MoneyV2;
  image: Image | null;
}

export interface OrderLineItem {
  quantity: number;
  title: string;
  variant: OrderLineItemVariant | null;
}

export interface OrderLineItemEdge {
  node: OrderLineItem;
}

export interface ShippingAddress {
  firstName: string | null;
  lastName: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  zip: string | null;
  country: string | null;
}

export interface Order {
  id: string;
  name: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  statusUrl: string | null;

  shippingAddress: ShippingAddress | null;

  subtotalPrice: MoneyV2;
  totalPrice: MoneyV2;
  totalShippingPrice: MoneyV2;
  totalTax: MoneyV2;

  lineItems: {
    edges: OrderLineItemEdge[];
  };
}

export interface OrderEdge {
  node: Order;
}

export interface ShopifyCustomer {
  firstName: string | null;
  lastName: string | null;
  email: string;

  orders: {
    edges: OrderEdge[];
  };
}

export interface CustomerOrdersQueryResponse {
  data: {
    customer: ShopifyCustomer | null;
  };
}

///
export interface OrderItemProps {
  id: string;              // unique id for rendering
  title: string;           // product title
  variantTitle: string | null;
  quantity: number;
  price: string;           // formatted string: "£29.00"
  imageUrl: string | null;
  currency: string;        // "GBP", "EUR"
}

export interface OrderCardProps {
  id: string;
  number: number;          // orderNumber
  name: string;            // order "name" (#1001)
  processedAt: string;     // formatted date "12 Jan 2024"
  total: string;           // formatted total price
  currency: string;        // currency code

  fulfillmentStatus: string;
  financialStatus: string;

  statusUrl: string | null;

  items: OrderItemProps[];
}



///
export interface ShopifyUserError {
  field?: string[] | null;
  message: string;
}

export interface AccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface TokenCreateResponse {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: AccessToken | null;
      customerUserErrors: ShopifyUserError[];
    };
  };
}

