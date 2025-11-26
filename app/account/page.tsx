// app/account/page.tsx
import { getCustomer } from "@/lib/shopify/get-customer";

export default async function AccountPage() {
  const customer = await getCustomer();

  if (!customer) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {customer.firstName}</h1>
      <p>Email: {customer.email}</p>
    </div>
  );
}
