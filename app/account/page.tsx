import { cookies } from "next/headers";
import {
  getCustomer,
} from "@/lib/shopify/customers";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_customer_access_token")?.value;

  console.log("ACCOUNT PAGE TOKEN:", token);

  if (!token) {
    console.error("NO TOKEN FOUND ON ACCOUNT PAGE");
    redirect("/signin");
  }

  try {
    const customer = await getCustomer(token);
    console.log("CUSTOMER DATA:", customer);
    return (
      <div>
        <h1>Welcome, {customer.displayName}</h1>
      </div>
    );
  } catch (err) {
    console.error("ERROR IN getCustomer:", err);
    throw err;
  }
}
