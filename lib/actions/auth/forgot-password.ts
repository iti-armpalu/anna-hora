"use server";

import { z } from "zod";
import { shopifyFetch } from "@/lib/shopify/fetch";
import { CUSTOMER_RECOVER_MUTATION } from "../../shopify/queries/auth";
import type { AuthActionState } from "./auth-state";

// -------------------------------------
// Zod schema
// -------------------------------------
const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

// -------------------------------------
// Shopify response type
// -------------------------------------
interface CustomerRecoverData {
  customerRecover: {
    customerUserErrors: { message: string }[];
  };
}

// -------------------------------------
// Server Action
// -------------------------------------
export async function forgotPasswordAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
      formError: "Please enter a valid email address.",
    };
  }

  const { email } = parsed.data;

  try {
    const data = await shopifyFetch<CustomerRecoverData>({
      query: CUSTOMER_RECOVER_MUTATION,
      variables: { email },
    });

    const errors = data.customerRecover.customerUserErrors;

    // 🔒 Prevent account enumeration:
    // Always respond with success if request was accepted
    if (errors.length > 0) {
      return {
        ok: false,
        formError: errors[0].message,
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("forgotPasswordAction error:", err);

    return {
      ok: false,
      formError: "Something went wrong. Please try again later.",
    };
  }
}
