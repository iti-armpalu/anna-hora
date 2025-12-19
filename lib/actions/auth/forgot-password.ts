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
    await shopifyFetch<CustomerRecoverData>({
      query: CUSTOMER_RECOVER_MUTATION,
      variables: { email },
    });

    // 🔒 Always return success to prevent account enumeration
    return {
      ok: true,
    };
  } catch (err) {
    console.error("forgotPasswordAction error:", err);

    // Only fail on actual transport / server errors
    return {
      ok: false,
      formError: "Something went wrong. Please try again later.",
    };
  }
}
