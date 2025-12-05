// lib/shopify/types/cart-normalized.ts

export interface CartLine {
    id: string;
    quantity: number;
  
    title: string;
    variantId: string;
  
    size: string | null;
    image: string | null;
  
    cost: {
      amountPerQuantity: string;   // "29.00"
      subtotalAmount: string;      // "58.00"
      totalAmount: string;         // "58.00"
      currencyCode: string;        // "GBP"
    };
  }
  
  export interface Cart {
    id: string;
    totalQuantity: number;
    checkoutUrl: string;
  
    cost: {
      subtotalAmount: string;
      totalAmount: string;
      currencyCode: string;
    };
  
    lines: CartLine[];
  }
  