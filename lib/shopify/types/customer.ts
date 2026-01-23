// lib/shopify/types/customer.ts

import type { ShopifyAddress } from "./address";
import type { ShopifyOrder } from "./order";
import type { Edge } from "./graphql";

export interface ShopifyCustomer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  // email: string;
  // NEW: Email is now an object
  emailAddress: {
    email: string;
  };
  phone: string;

  defaultAddress: ShopifyAddress | null;

  addresses: {
    edges: Edge<ShopifyAddress>[];
  };

  orders: {
    edges: Edge<ShopifyOrder>[];
  };
}

export interface CustomerData {
  customer: ShopifyCustomer | null;
}
