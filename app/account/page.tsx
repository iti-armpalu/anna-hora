import { CUSTOMER_ORDERS_QUERY } from "@/lib/queries/order";
import { storefrontFetch } from "@/lib/shopify/storefront";
import { CustomerQueryResponse } from "@/lib/types/order";
import { cookies } from "next/headers";



export default async function AccountPage() {
  const cookieStore = await cookies()
  // 1. Read Shopify Customer Access Token from HttpOnly cookie
  const token = cookieStore.get("customerAccessToken")?.value;

  if (!token) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-2">Unauthorized</h1>
        <p>You must be logged in to view your account.</p>
      </div>
    );
  }

  // 2. Fetch typed customer data from Shopify
  const response = await storefrontFetch<CustomerQueryResponse>(
    CUSTOMER_ORDERS_QUERY,
    { token }
  );

  const customer = response.data.customer;

  // 3. Token is invalid or expired
  if (!customer) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-2">Session Expired</h1>
        <p>Your login session has expired. Please log in again.</p>
      </div>
    );
  }

  // 4. Render customer account page — fully type-safe
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">
          Hello {customer.firstName ?? "there"}!
        </h1>
        {customer.email && (
          <p className="text-gray-600 text-sm">{customer.email}</p>
        )}
      </div>

      <section>
        <h2 className="text-xl font-medium mb-4">Your Orders</h2>

        {customer.orders.edges.length === 0 ? (
          <p className="text-gray-600">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {customer.orders.edges.map(({ node: order }) => (
              <div
                key={order.name}
                className="border rounded-md p-4 bg-white shadow-sm"
              >
                <p className="font-medium text-lg">{order.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.processedAt).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span className="font-medium">{order.fulfillmentStatus}</span>
                </p>

                <ul className="mt-2 text-sm text-gray-700 list-disc pl-4">
                  {order.lineItems.edges.map(({ node: item }) => (
                    <li key={item.title}>{item.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
