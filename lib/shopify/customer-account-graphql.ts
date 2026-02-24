import "server-only";
import { cookies } from "next/headers";

type Discovery = {
  graphql_api: string;
};

const SHOP_DOMAIN = process.env.SHOP_STOREFRONT_DOMAIN!;

async function getGraphqlEndpoint(): Promise<string> {
  const res = await fetch(`https://${SHOP_DOMAIN}/.well-known/customer-account-api`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Customer Account API discovery failed: ${res.status}`);

  const json = (await res.json()) as Discovery;
  if (!json.graphql_api) throw new Error("Discovery missing graphql_api");

  return json.graphql_api;
}

export async function customerAccountGraphql<TData>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<TData> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("shopify_access_token")?.value;

  if (!accessToken) {
    throw new Error("Not authenticated: missing shopify_access_token");
  }

  const endpoint = await getGraphqlEndpoint();

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Customer Account API expects the raw access token in Authorization
      Authorization: accessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || json?.errors) {
    throw new Error(JSON.stringify(json?.errors ?? json));
  }

  return json.data as TData;
}
