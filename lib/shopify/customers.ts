import { customerAccountRequest } from "@/lib/shopify/customer-api";
import { CUSTOMER_ACCOUNT_QUERY } from "../queries/customer/account";



// Types
export type ShopifyCustomer = {
  id: string;
  displayName: string;
  emailAddress: { emailAddress: string } | null;
  phoneNumber: { phoneNumber: string } | null;
  defaultAddress: {
    id: string;
    address1: string | null;
    address2: string | null;
    city: string | null;
    country: string | null;
    zip: string | null;
  } | null;
};

// export type ShopifyCustomerOrder = {
//   id: string;
//   name: string;
//   processedAt: string;
//   financialStatus: string;
//   fulfillmentStatus: string;
//   statusUrl: string;
//   totalPrice: {
//     amount: string;
//     currencyCode: string;
//   };
// };

// export type ShopifyCustomerAddress = {
//   id: string;
//   address1: string | null;
//   address2: string | null;
//   city: string | null;
//   country: string | null;
//   zip: string | null;
//   name: string | null;
//   phone: string | null;
// };

// --------------------------------------------------
// Fetch logged-in customer profile
// --------------------------------------------------
export async function getCustomer(accessToken: string) {
  const res = await customerAccountRequest<{
    customer: ShopifyCustomer;
  }>(accessToken, CUSTOMER_ACCOUNT_QUERY);

  return res.customer ?? null;
}

// --------------------------------------------------
// Fetch logged-in customer's orders
// --------------------------------------------------
// export async function getCustomerOrders(accessToken: string, first = 20) {
//   const res = await customerAccountRequest<{
//     customer: { orders: { nodes: ShopifyCustomerOrder[] } };
//   }>(accessToken, CUSTOMER_ORDERS_QUERY, { first });

//   return res.customer?.orders?.nodes ?? [];
// }

// --------------------------------------------------
// Fetch logged-in customer's addresses
// --------------------------------------------------
// export async function getCustomerAddresses(accessToken: string, first = 20) {
//   const res = await customerAccountRequest<{
//     customer: { addresses: { nodes: ShopifyCustomerAddress[] } };
//   }>(accessToken, CUSTOMER_ADDRESSES_QUERY, { first });

//   return res.customer?.addresses?.nodes ?? [];
// }
