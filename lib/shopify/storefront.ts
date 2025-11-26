// lib/shopify/storefront.ts
export async function storefrontFetch<T>(
    query: string,
    variables?: Record<string, any>
  ): Promise<T> {
    const endpoint = `https://${process.env.SHOPIFY_STORE_URL}/api/2025-10/graphql.json`;
  
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_API_KEY!,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error(`Storefront API error: ${res.status}`);
    }
  
    return res.json() as Promise<T>;
  }
  