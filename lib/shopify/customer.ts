"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import type { ShopifyCustomer, CustomerData } from "@/lib/shopify/types/customer";
import type { Customer } from "@/lib/shopify/types/customer-normalized";

import { GET_CUSTOMER_QUERY } from "@/lib/shopify/queries/customer";
import { normalizeCustomer } from "../normalizers/customer";

export async function getCustomer(): Promise<Customer | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("customerAccessToken")?.value;

  console.log("[getCustomer] token =", accessToken);

  if (!accessToken) return null;

  console.log("[getCustomer] Fetching customer...");

  const res = await shopifyFetch<CustomerData>({
    query: GET_CUSTOMER_QUERY,
    variables: { customerAccessToken: accessToken },
  });

  const raw: ShopifyCustomer | null = res.customer;

  if (!raw) return null; // token expired or invalid

  return normalizeCustomer(raw, accessToken);
}
