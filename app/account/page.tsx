// app/account/page.tsx (SERVER)
import { requireAuth } from "@/lib/auth/requireAuth";
import { customerAccountGraphql } from "@/lib/shopify/customer-account-graphql";
import { CUSTOMER_PROFILE_QUERY, CUSTOMER_ORDERS_QUERY } from "@/lib/shopify/queries/customer";
import AccountClientPage from "./account-page-client";

type ProfileRes = {
  customer: {
    displayName: string;
    emailAddress?: { emailAddress: string } | null;
    phoneNumber?: { phoneNumber: string } | null;
  };
};

type OrdersRes = {
  customer: {
    orders: {
      nodes: Array<{
        id: string;
        name: string;
        processedAt: string;
        fulfillmentStatus: string;
        financialStatus?: string | null;
        totalPrice: { amount: string; currencyCode: string };
        statusPageUrl?: string | null;
      }>;
    };
  };
};

export type AccountVM = {
  displayName: string;
  email: string | null;
  phone: string | null;
  orders: OrdersRes["customer"]["orders"]["nodes"];
};

export default async function AccountPage() {
  await requireAuth();

  const [profile, orders] = await Promise.all([
    customerAccountGraphql<ProfileRes>(CUSTOMER_PROFILE_QUERY),
    customerAccountGraphql<OrdersRes>(CUSTOMER_ORDERS_QUERY, { first: 20 }),
  ]);

  const customer = profile.customer;

  const vm: AccountVM = {
    displayName: customer.displayName,
    email: customer.emailAddress?.emailAddress ?? null,
    phone: customer.phoneNumber?.phoneNumber ?? null,
    orders: orders.customer.orders.nodes,
  };

  return <AccountClientPage customer={vm} />;
}
