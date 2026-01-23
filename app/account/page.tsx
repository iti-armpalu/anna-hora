// app/account/page.tsx (SERVER COMPONENT)
import { redirect } from "next/navigation";
import { getCustomer } from "@/lib/shopify/customer";
import AccountClientPage from "./account-page-client";

export default async function AccountPage() {
  const customer = await getCustomer();

  if (!customer) {
    // Middleware will usually redirect already, but just in case
    // redirect("/signin");
  }

  // Pass Shopify customer data to the client component
  return (
    <AccountClientPage customer={customer} />
  );
}
