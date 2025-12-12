// BASE threshold in shop currency (GBP)
const BASE_THRESHOLD_GBP = 500;

// Static FX table (should match Shopify Markets fixed FX or adjustments)
export const FX_RATES: Record<string, number> = {
  GB: 1,
  EU: 1.16,
  AE: 4.65,
  US: 1.27,
  CZ: 29.0,
};

// Market-specific rounding rules
export const ROUNDING_RULES: Record<string, number> = {
  GB: 1,
  EU: 10,
  AE: 50,
  US: 10,
  CZ: 10,
};

function convertAndRound(baseAmount: number, market: string): number {
  const fx = FX_RATES[market];
  const roundTo = ROUNDING_RULES[market];

  if (!fx) throw new Error(`Missing FX rate for market: ${market}`);
  if (!roundTo) throw new Error(`Missing rounding rule for market: ${market}`);

  const converted = baseAmount * fx;
  return Math.round(converted / roundTo) * roundTo;
}

// Final dynamic thresholds used everywhere
export const FREE_SHIPPING_THRESHOLD: Record<string, number> = {
  GB: BASE_THRESHOLD_GBP,
  EU: convertAndRound(BASE_THRESHOLD_GBP, "EU"),
  AE: convertAndRound(BASE_THRESHOLD_GBP, "AE"),
  US: convertAndRound(BASE_THRESHOLD_GBP, "US"),
  CZ: convertAndRound(BASE_THRESHOLD_GBP, "CZ"),
};
