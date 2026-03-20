import { SHOPIFY_CONFIG, SHOPIFY_ENDPOINT } from "../config";

const DEFAULT_MARKET_COUNTRY = "CZ";

type LocalizationResponse = {
  data?: {
    localization: {
      availableCountries: {
        isoCode: string;
        name: string;
      }[];
    };
  };
  errors?: { message: string }[];
};

const LOCALIZATION_QUERY = `
  query GetLocalization {
    localization {
      availableCountries {
        isoCode
        name
      }
    }
  }
`;

export async function getAvailableCountries(): Promise<string[]> {
  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.publicAccessToken,
    },
    body: JSON.stringify({
      query: LOCALIZATION_QUERY,
      variables: {},
    }),
    cache: "force-cache",
    next: { revalidate: 60 * 60 },
  });

  const json = (await res.json()) as LocalizationResponse;

  if (!res.ok) {
    console.error("[Shopify localization HTTP error]", res.status, json);
    return [DEFAULT_MARKET_COUNTRY];
  }

  if (json.errors?.length) {
    console.error("[Shopify localization GraphQL errors]", json.errors);
    return [DEFAULT_MARKET_COUNTRY];
  }

  return (
    json.data?.localization.availableCountries.map((country) => country.isoCode) ??
    [DEFAULT_MARKET_COUNTRY]
  );
}