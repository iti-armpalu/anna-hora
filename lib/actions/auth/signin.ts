"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";
import type { TokenCreateData } from "@/lib/shopify/types/auth";
import { CUSTOMER_ACCESS_TOKEN_CREATE } from "@/lib/shopify/queries/auth";

import type { SigninState } from "./signin-state";
import { cartSetBuyerIdentityAction } from "../cart/cart-set-buyer-identity";

// Zod validation
const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// Server Action
export async function signinAction(
    prev: SigninState,
    formData: FormData
): Promise<SigninState> {
    const parsed = SigninSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!parsed.success) {
        return {
            ok: false,
            fieldErrors: parsed.error.flatten().fieldErrors,
            formError: "Please check your input.",
        };
    }

    const { email, password } = parsed.data;

    // Shopify login (Storefront API)
    const res = await shopifyFetch<TokenCreateData>({
        query: CUSTOMER_ACCESS_TOKEN_CREATE,
        variables: { input: { email, password } },
    });

    const { customerAccessToken, customerUserErrors } =
        res.customerAccessTokenCreate;

    // Login failed
    if (!customerAccessToken) {
        return {
            ok: false,
            formError:
                customerUserErrors[0]?.message || "Invalid email or password.",
        };
    }

    // Save token in secure HttpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("customerAccessToken", customerAccessToken.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(customerAccessToken.expiresAt),
    });


    // Attach buyer identity to cart
    try {
        await cartSetBuyerIdentityAction({
            customerAccessToken: customerAccessToken.accessToken,
            email, // from parsed.data
            // phone: customer.phone ?? undefined (only if you have it)
        });
    } catch (err) {
        console.error("Failed to attach buyer identity:", err);
        // Do NOT block login — allow user to proceed
    }


    return { ok: true };
}
