"use server";

import { z } from "zod";
import { cookies } from "next/headers";

import { shopifyFetch } from "@/lib/shopify/fetch";
import type { ShopifyUserError, TokenCreateData } from "@/lib/shopify/types/auth";
import type { ShopifyCustomer } from "@/lib/shopify/types/customer";
import { CUSTOMER_CREATE_MUTATION } from "@/lib/shopify/queries/customer";
import { CUSTOMER_ACCESS_TOKEN_CREATE } from "@/lib/shopify/queries/auth";

import { SignupState } from "./signup-state";

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

interface CustomerCreateData {
  customerCreate: {
    customer: ShopifyCustomer | null;
    customerUserErrors: ShopifyUserError[];
  };
}

// Server Action
export async function signupAction(
  prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  // 1) Parse form data
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  };

  const parsed = SignupSchema.safeParse(raw);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      ok: false,
      fieldErrors,
      formError: "Please fix the errors and try again.",
    };
  }

  const { email, password, firstName, lastName } = parsed.data;

  // 2) Create Shopify customer
  const createRes = await shopifyFetch<CustomerCreateData>({
    query: CUSTOMER_CREATE_MUTATION,
    variables: { input: { email, password, firstName, lastName } },
  });

  const { customer, customerUserErrors } = createRes.customerCreate;

  if (customerUserErrors.length > 0) {
    return {
      ok: false,
      formError: customerUserErrors.map((e) => e.message).join("\n"),
    };
  }

  if (!customer) {
    return {
      ok: false,
      formError: "Customer creation failed.",
    };
  }

  // 3) Auto-login: create access token
  const tokenRes = await shopifyFetch<TokenCreateData>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE,
    variables: { input: { email, password } },
  });

  const {
    customerAccessToken,
    customerUserErrors: tokenErrors,
  } = tokenRes.customerAccessTokenCreate;

  if (!customerAccessToken) {
    return {
      ok: false,
      formError:
        tokenErrors[0]?.message ?? "Token creation failed. Please try signing in.",
    };
  }

  // 4) Save token in secure HttpOnly cookie
  const cookieStore = await cookies();

  cookieStore.set("customerAccessToken", customerAccessToken.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(customerAccessToken.expiresAt),
  });

  // Server action just returns success; redirect is handled client-side for now
  return { ok: true };
}
