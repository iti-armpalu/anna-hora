"use client";

type PriceArgs = {
  amount: string | number;
  currencyCode?: string;
};

export function formatPrice({ amount, currencyCode = "GBP" }: PriceArgs) {
  // Convert Shopify's string amount → number
  const value =
    typeof amount === "string" ? parseFloat(amount) : amount;

  // If parsing failed, fallback safely
  const numeric = isNaN(value) ? 0 : value;

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  }).format(numeric);
}
