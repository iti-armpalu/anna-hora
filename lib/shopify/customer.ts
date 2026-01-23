"use server";

import { cookies } from "next/headers";
import type { Customer } from "@/lib/shopify/types/customer-normalized";
import { normalizeCustomer } from "../normalizers/customer";

export async function getCustomer(manualToken?: string): Promise<Customer | null> {
  const cookieStore = await cookies();
  
  // Use the new cookie name
  const accessToken = manualToken || cookieStore.get("customer_session")?.value;

  if (!accessToken) return null;

  const shopId = process.env.SHOPIFY_SHOP_ID;
  // Note: This is the New Customer Account API endpoint
  const endpoint = `https://shopify.com/${shopId}/account/customer/api/2024-04/graphql`;

  const query = `
    query getCustomer {
      customer {
        id
        firstName
        lastName
        emailAddress {
          email
        }
        defaultAddress {
          address1
          city
          country
        }
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken, // The "shcat_" token is the auth header itself
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    const { data, errors } = await res.json();

    if (errors || !data?.customer) {
      console.error("[getCustomer] API Errors:", errors);
      return null;
    }

    // Pass the raw data to your existing normalizer
    // Note: Ensure your normalizeCustomer function is updated 
    // to handle 'emailAddress.email' instead of just 'email'
    return normalizeCustomer(data.customer, accessToken);
  } catch (error) {
    console.error("[getCustomer] Fetch Error:", error);
    return null;
  }
}

// "use server";
// // // NOTE: Customer data is user-specific and must never be cached

// import { cookies } from "next/headers";
// import { shopifyFetch } from "@/lib/shopify/fetch";

// import type { ShopifyCustomer, CustomerData } from "@/lib/shopify/types/customer";
// import type { Customer } from "@/lib/shopify/types/customer-normalized";

// import { GET_CUSTOMER_QUERY } from "@/lib/shopify/queries/customer";
// import { normalizeCustomer } from "../normalizers/customer";

// export async function getCustomer(): Promise<Customer | null> {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("customerAccessToken")?.value;

//   if (!accessToken) return null;


//   const res = await shopifyFetch<CustomerData>({
//     query: GET_CUSTOMER_QUERY,
//     variables: { customerAccessToken: accessToken },
//     cache: "no-store",
//   });

//   const raw: ShopifyCustomer | null = res.customer;

//   if (!raw) return null; // token expired or invalid

//   return normalizeCustomer(raw, accessToken);
// }
