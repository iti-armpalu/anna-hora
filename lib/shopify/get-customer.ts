import { cookies } from "next/headers";
import { validateShopifyIdToken } from "./validate-id-token";

export async function getCustomer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_customer_token")?.value;

  if (!token) return null;

  try {
    const payload = await validateShopifyIdToken(token);

    // Shopify's ID token contains:
    // - sub (customer id)
    // - email
    // - email_verified
    // - name
    // - given_name
    // - family_name

    return {
      id: payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified,
      name: payload.name,
      firstName: payload.given_name,
      lastName: payload.family_name,
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
