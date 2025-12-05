import type {
    ShopifyCart,
    ShopifyCartLineNode,
    ShopifySelectedOption,
  } from "@/lib/shopify/types/cart";
  
  import type { Cart, CartLine } from "@/lib/shopify/types/cart-normalized";
  
  /**
   * Normalize one cart line.
   */
  function normalizeCartLine(line: ShopifyCartLineNode): CartLine {
    // Find size variant if available
    const sizeOption =
      line.merchandise?.selectedOptions?.find(
        (opt: ShopifySelectedOption) =>
          opt.name.toLowerCase() === "size"
      )?.value ?? null;
  
    return {
      id: line.id,
      quantity: line.quantity,
  
      title: line.merchandise?.product?.title ?? "",
      variantId: line.merchandise?.id ?? "",
  
      size: sizeOption,
      image:
        line.merchandise?.image?.url ??
        line.merchandise?.product?.featuredImage?.url ??
        null,
  
      cost: {
        amountPerQuantity: line.cost.amountPerQuantity.amount,
        subtotalAmount: line.cost.subtotalAmount.amount,
        totalAmount: line.cost.totalAmount.amount,
        currencyCode: line.cost.totalAmount.currencyCode,
      },
    };
  }
  
  /**
   * Normalize the entire Shopify cart → Cart
   */
  export function normalizeCart(shopifyCart: ShopifyCart): Cart {
    return {
      id: shopifyCart.id,
      totalQuantity: shopifyCart.totalQuantity,
      checkoutUrl: shopifyCart.checkoutUrl,
  
      cost: {
        subtotalAmount: shopifyCart.cost.subtotalAmount.amount,
        totalAmount: shopifyCart.cost.totalAmount.amount,
        currencyCode: shopifyCart.cost.subtotalAmount.currencyCode,
      },
  
      lines: shopifyCart.lines.edges.map((edge) =>
        normalizeCartLine(edge.node)
      ),
    };
  }
  