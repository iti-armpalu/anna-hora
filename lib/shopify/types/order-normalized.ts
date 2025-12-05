import type { Address } from "./address-normalized";

export interface OrderItem {
  title: string;
  variantTitle: string | null;
  quantity: number;

  price: string;      
  currency: string;   
  imageUrl: string | null;
}

export interface Order {
  id: string;
  name: string;
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
