// lib/shopify/types/order.ts

import type { MoneyV2, ProductImage } from "./product";
import type { ShopifyAddress } from "./address";
import type { Edge } from "./graphql";

// -------------------------------
// Order Line Item Variant
// -------------------------------
export interface ShopifyOrderItemVariant {
  title: string | null;
  price: MoneyV2;
  image: ProductImage | null;
}

// -------------------------------
// Order Line Item
// -------------------------------
export interface ShopifyOrderItem {
  quantity: number;
  title: string;
  variant: ShopifyOrderItemVariant | null;
}

// -------------------------------
// Shopify Order
// -------------------------------
export interface ShopifyOrder {
  id: string;
  name: string;                // "#1001"
  orderNumber: number;         // 1001

  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  statusUrl: string | null;

  shippingAddress: ShopifyAddress | null;

  subtotalPrice: MoneyV2;
  totalPrice: MoneyV2;
  totalShippingPrice: MoneyV2;
  totalTax: MoneyV2;

  lineItems: {
    edges: Edge<ShopifyOrderItem>[];
  };
}
