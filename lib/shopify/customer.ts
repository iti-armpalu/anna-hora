"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";
import { CustomerData, ShopifyCustomer } from "./types/customer";
import { GET_CUSTOMER_QUERY } from "../queries/customer";

/**
 * Fetch the authenticated Shopify customer.
 * Returns `ShopifyCustomer | null`.
 */
export async function getCustomer(): Promise<ShopifyCustomer | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("customerAccessToken")?.value;

  if (!token) return null;

  // shopifyFetch returns ONLY the inner "data" object
  const res = await shopifyFetch<CustomerData>({
    query: GET_CUSTOMER_QUERY,
    variables: { token },
  });

  // Shopify returns `customer: null` if token is invalid / expired
  if (!res.customer) return null;

  return res.customer;
}
