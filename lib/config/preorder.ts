/**
 * Cart line attribute key for pre-order lines. Shopify shows it on checkout, the order,
 * and the confirmation email; the order webhook uses it to deduct fabric. Do not rename
 * without updating the webhook.
 */
export const PREORDER_LINE_ATTRIBUTE_KEY = "Pre-order";

export const PREORDER_COPY = {
  buttonLabel: "Pre-order",
  sizeBadge: "Pre-order",
  fallbackShipping: "Made to order",
  shipsIn: (weeks: string): string => `Ships in ${weeks} weeks`,
  explainer:
    "Made to order from our remaining fabric. Paid in full today.",
} as const;

export function getPreorderShippingText(leadTimeWeeks: string | null): string {
  return leadTimeWeeks
    ? PREORDER_COPY.shipsIn(leadTimeWeeks)
    : PREORDER_COPY.fallbackShipping;
}
