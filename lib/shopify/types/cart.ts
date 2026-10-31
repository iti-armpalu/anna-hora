// lib/shopify/types/cart.ts
export interface ShopifyMoneyV2 {
    amount: string;
    currencyCode: string;
  }
  
  export interface ShopifyCartCost {
    subtotalAmount: ShopifyMoneyV2;
    totalAmount: ShopifyMoneyV2;
  }
  
  export interface ShopifySelectedOption {
    name: string;
    value: string;
  }
  
  export interface ShopifyProductVariant {
    id: string;
    title?: string;
    sku?: string | null;
    image?: { url?: string } | null;
    selectedOptions?: ShopifySelectedOption[];
    product?: {
      title?: string;
      featuredImage?: { url?: string } | null;
    };
  }
  
  export interface ShopifyCartLineCost {
    amountPerQuantity: ShopifyMoneyV2;
    subtotalAmount: ShopifyMoneyV2;
    totalAmount: ShopifyMoneyV2;
  }
  
  export interface ShopifyCartAttribute {
    key: string;
    value: string | null;
  }

  export interface ShopifyCartLineNode {
    id: string;
    quantity: number;
    attributes: ShopifyCartAttribute[];
    merchandise?: ShopifyProductVariant;
    cost: ShopifyCartLineCost;
  }
  
  export interface ShopifyCartLineEdge {
    node: ShopifyCartLineNode;
  }
  
  export interface ShopifyCart {
    id: string;
    totalQuantity: number;
    checkoutUrl: string;
    cost: ShopifyCartCost;
    lines: {
      edges: ShopifyCartLineEdge[];
    };
  }
  