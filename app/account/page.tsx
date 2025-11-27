// app/account/page.tsx (SERVER COMPONENT)

import { cookies } from "next/headers";
import { storefrontFetch } from "@/lib/shopify/storefront";

import AccountClientPage from "./account-page-client";
import { CUSTOMER_ORDERS_QUERY } from "@/lib/queries/order";
import { CustomerQueryResponse } from "@/lib/types/order";

export default async function AccountPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("customerAccessToken")?.value;

  if (!token) {
    // Middleware SHOULD prevent this, but it's good fallback
    return <div>Unauthorized. Please sign in.</div>;
  }

  const response = await storefrontFetch<CustomerQueryResponse>(
    CUSTOMER_ORDERS_QUERY,
    { token }
  );

  const customer = response.data.customer;

  if (!customer) {
    return <div>Session expired. Please sign in again.</div>;
  }

  // Pass Shopify customer data to the client component
  return (
    <AccountClientPage customer={customer} />
  );
}
