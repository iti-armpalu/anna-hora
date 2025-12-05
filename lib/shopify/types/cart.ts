// type CartLine = {
//     id: string;
//     quantity: number;
//     title: string;
//     variantId: string;
//     image?: string;
//     size?: string | null;
  
//     cost: {
//       amountPerQuantity: string;
//       subtotalAmount: string;
//       totalAmount: string;
//       currencyCode: string;
//     };
//   };
  
//   type CartType = {
//     id: string;
//     totalQuantity: number;
//     checkoutUrl: string;
//     cost: {
//       subtotalAmount: string;
//       totalAmount: string;
//       currencyCode: string;
//     };
//     lines: CartLine[];
//   };
  
//   type ShopifyCartLineEdge = {
//     node: {
//       id: string;
//       quantity: number;
//       merchandise?: {
//         id: string;
//         product?: {
//           title?: string;
//           featuredImage?: { url?: string };
//         };
//         image?: { url?: string };
//         selectedOptions?: { name: string; value: string }[];
//       };
//       cost: {
//         amountPerQuantity: { amount: string; currencyCode: string };
//         subtotalAmount: { amount: string; currencyCode: string };
//         totalAmount: { amount: string; currencyCode: string };
//       };
//     };
//   };
  
//   type ShopifySelectedOption = {
//     name: string;
//     value: string;
//   };

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
  
  export interface ShopifyCartLineNode {
    id: string;
    quantity: number;
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
  