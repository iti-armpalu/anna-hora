import type { ShopifyOrder, ShopifyOrderItem } from "@/lib/shopify/types/order";
import type { Address } from "./address";
import { normalizeAddress } from "./address";


// -------------------------
// Internal normalized types
// -------------------------
export interface OrderItem {
  title: string;
  variantTitle: string | null;
  quantity: number;

  price: string;      // raw amount "29.00"
  currency: string;   // "GBP"
  
  imageUrl: string | null;
}

export interface Order {
  id: string;
  name: string;              // "#1001"
  orderNumber: number;
  processedAt: string;

  financialStatus: string;
  fulfillmentStatus: string;
  statusUrl: string | null;

  shippingAddress: Address | null;

  subtotalPrice: string;
  totalPrice: string;
  totalShippingPrice: string;
  totalTax: string;

  currency: string;

  items: OrderItem[];
}

// -------------------------
// Normalizer
// -------------------------
export function normalizeOrder(order: ShopifyOrder): Order {
  const currency = order.totalPrice.currencyCode;

  const items: OrderItem[] = order.lineItems.edges.map(({ node }: { node: ShopifyOrderItem }) => ({
    title: node.title,
    variantTitle: node.variant?.title ?? null,
    quantity: node.quantity,

    price: node.variant?.price.amount ?? "0.00",
    currency: node.variant?.price.currencyCode ?? currency,

    imageUrl: node.variant?.image?.url ?? null,
  }));

  return {
    id: order.id,
    name: order.name,
    orderNumber: order.orderNumber,
    processedAt: order.processedAt,

    financialStatus: order.financialStatus,
    fulfillmentStatus: order.fulfillmentStatus,
    statusUrl: order.statusUrl,

    shippingAddress: normalizeAddress(order.shippingAddress),

    subtotalPrice: order.subtotalPrice.amount,
    totalPrice: order.totalPrice.amount,
    totalShippingPrice: order.totalShippingPrice.amount,
    totalTax: order.totalTax.amount,

    currency,

    items,
  };
}
