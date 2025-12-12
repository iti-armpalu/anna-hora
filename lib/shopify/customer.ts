"use server";
// // NOTE: Customer data is user-specific and must never be cached

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import type { ShopifyCustomer, CustomerData } from "@/lib/shopify/types/customer";
import type { Customer } from "@/lib/shopify/types/customer-normalized";

import { GET_CUSTOMER_QUERY } from "@/lib/shopify/queries/customer";
import { normalizeCustomer } from "../normalizers/customer";

export async function getCustomer(): Promise<Customer | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("customerAccessToken")?.value;

  if (!accessToken) return null;


  const res = await shopifyFetch<CustomerData>({
    query: GET_CUSTOMER_QUERY,
    variables: { customerAccessToken: accessToken },
    cache: "no-store",
  });

  const raw: ShopifyCustomer | null = res.customer;

  if (!raw) return null; // token expired or invalid

  return normalizeCustomer(raw, accessToken);
}
