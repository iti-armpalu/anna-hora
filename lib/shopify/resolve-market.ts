import { getAvailableCountries } from "./queries/localization";

const DEFAULT_MARKET_COUNTRY = "CZ";

export async function resolveMarketCountry(
  shippingCountry: string
): Promise<string> {
  const availableCountries = await getAvailableCountries();

  if (availableCountries.includes(shippingCountry)) {
    return shippingCountry;
  }

  return DEFAULT_MARKET_COUNTRY;
}