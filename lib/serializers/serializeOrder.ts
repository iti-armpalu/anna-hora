
import { ShopifyOrder } from "../shopify/types";
import { formatMoney } from "../utils/format-money";
import { OrderCardProps, OrderItemProps } from "./order";

export function serializeOrder(order: ShopifyOrder): OrderCardProps {
  const currency = order.totalPrice.currencyCode;

  const items: OrderItemProps[] = order.lineItems.edges.map(({ node }) => {
    const price = node.variant?.price.amount ?? "0.00";
    const currency = node.variant?.price.currencyCode ?? "GBP";

    return {
      id: crypto.randomUUID(),
      title: node.title,
      variantTitle: node.variant?.title ?? null,
      quantity: node.quantity,
      price: formatMoney(price, currency),
      imageUrl: node.variant?.image?.url ?? null,
      currency,
    };
  });

  return {
    id: order.id,
    name: order.name,
    number: order.orderNumber,
    processedAt: new Date(order.processedAt).toLocaleDateString("en-GB"),
    total: formatMoney(order.totalPrice.amount, currency),
    currency,

    fulfillmentStatus: order.fulfillmentStatus,
    financialStatus: order.financialStatus,

    statusUrl: order.statusUrl,

    items,
  };
}
