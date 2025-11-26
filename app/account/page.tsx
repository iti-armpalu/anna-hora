import { cookies } from "next/headers";
import {
  getCustomer,
} from "@/lib/shopify/customers";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_customer_access_token")?.value;

  if (!token) {
    redirect("/auth/customer/login");
  }

  const customer = await getCustomer(token);

  return (
    <div>
      <h1>Welcome, {customer.displayName}</h1>
    </div>
  );
}
