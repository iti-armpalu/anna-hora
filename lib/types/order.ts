// lib/shopify/types.ts

export interface CustomerOrderLineItem {
    title: string;
  }
  
  export interface CustomerOrderLineItemEdge {
    node: CustomerOrderLineItem;
  }
  
  export interface CustomerOrder {
    name: string;
    processedAt: string;
    fulfillmentStatus: string;
    financialStatus: string | null;
    lineItems: {
      edges: CustomerOrderLineItemEdge[];
    };
  }
  
  export interface CustomerOrderEdge {
    node: CustomerOrder;
  }
  
  export interface ShopifyCustomer {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    orders: {
      edges: CustomerOrderEdge[];
    };
  }
  
  export interface CustomerQueryResponse {
    data: {
      customer: ShopifyCustomer | null;
    };
  }


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
  
  