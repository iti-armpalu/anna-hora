// lib/actions/auth/signin.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateCodeChallenge } from "@/lib/actions/auth/pkce";
import { AuthActionState } from "./auth-state";

export async function signinAction(
    prevState: AuthActionState,
    formData: FormData
): Promise<AuthActionState> {
    const email = formData.get("email") as string;

    console.log("--- [DEBUG] signinAction Started ---");
    console.log("Input Email:", email);

    if (!email) {
        return {
            ok: false,
            formError: "Please enter a valid email.",
        };
    }

    let authUrl = "";

    try {
        // 1. Generate PKCE Security Keys
        const verifier = generateCodeVerifier();
        const challenge = await generateCodeChallenge(verifier);
        const state = Math.random().toString(36).substring(2);

        console.log("PKCE Verifier Generated:", verifier);
        console.log("PKCE Challenge Generated:", challenge);
        console.log("State Parameter:", state);

        // 2. Save Verifier in a Temporary Cookie
        const cookieStore = await cookies();
        cookieStore.set("shopify_verifier", verifier, { 
            httpOnly: true, 
            secure: true,
            sameSite: "lax",
            path: "/" 
        });

        // 3. Environment Variables Check
        const shopId = process.env.SHOPIFY_SHOP_ID;
        const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

        console.log("Env Check - Shop ID:", shopId);
        console.log("Env Check - Client ID:", clientId);
        console.log("Env Check - Base URL:", baseUrl);

        if (!shopId || !clientId || !baseUrl) {
            throw new Error("Missing environment variables. Check SHOPIFY_SHOP_ID, NEXT_PUBLIC_SHOPIFY_CLIENT_ID, and NEXT_PUBLIC_BASE_URL.");
        }

        // 4. Build the Auth URL
        // We use a clean string for scopes to avoid "Invalid Scope" errors
        const scopes = ["openid", "email", "customer-account-api:full"].join(" ");
        // const scopes = ["openid"].join(" ");
        
        const url = new URL(`https://shopify.com/${shopId}/auth/oauth/authorize`);
        url.searchParams.set("client_id", clientId);
        url.searchParams.set("scope", scopes);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("redirect_uri", `${baseUrl}/api/auth/callback`);
        url.searchParams.set("state", state);
        url.searchParams.set("code_challenge", challenge);
        url.searchParams.set("code_challenge_method", "S256");
        url.searchParams.set("login_hint", email);

        authUrl = url.toString();
        console.log("--- [FINAL AUTH URL] ---");
        console.log(authUrl);
        console.log("-------------------------");

    } catch (error: any) {
        console.error("--- [DEBUG] signinAction Error ---");
        console.error(error.message);
        
        return {
            ok: false,
            formError: error.message || "An unexpected error occurred. Check server logs.",
        };
    }

    // Redirect MUST happen outside the try/catch block
    redirect(authUrl);
}



// "use server";

// import { z } from "zod";
// import { cookies } from "next/headers";
// import { shopifyFetch } from "@/lib/shopify/fetch";
// import type { TokenCreateData } from "@/lib/shopify/types/auth";
// import { CUSTOMER_ACCESS_TOKEN_CREATE } from "@/lib/shopify/queries/auth";

// import { AuthActionState } from "./auth-state";
// import { cartSetBuyerIdentityAction } from "../cart/cart-set-buyer-identity";


// // Zod validation
// const SigninSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6),
// });

// // Server Action
// export async function signinAction(
//     prev: AuthActionState,
//     formData: FormData
// ): Promise<AuthActionState> {
//     const parsed = SigninSchema.safeParse({
//         email: formData.get("email"),
//         password: formData.get("password"),
//     });

//     if (!parsed.success) {
//         return {
//             ok: false,
//             fieldErrors: parsed.error.flatten().fieldErrors,
//             formError: "Please check your input.",
//         };
//     }

//     const { email, password } = parsed.data;

//     // Shopify login (Storefront API)
//     const res = await shopifyFetch<TokenCreateData>({
//         query: CUSTOMER_ACCESS_TOKEN_CREATE,
//         variables: { input: { email, password } },
//     });

//     const { customerAccessToken, customerUserErrors } =
//         res.customerAccessTokenCreate;

//     // Login failed
//     if (!customerAccessToken) {
//         return {
//             ok: false,
//             formError:
//                 customerUserErrors[0]?.message || "Invalid email or password.",
//         };
//     }

//     // Save token in secure HttpOnly cookie
//     const cookieStore = await cookies();
//     cookieStore.set("customerAccessToken", customerAccessToken.accessToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "strict",
//         path: "/",
//         expires: new Date(customerAccessToken.expiresAt),
//     });


//     // Attach buyer identity to cart
//     try {
//         await cartSetBuyerIdentityAction({
//             customerAccessToken: customerAccessToken.accessToken,
//             email, // from parsed.data
//             // phone: customer.phone ?? undefined (only if you have it)
//         });
//     } catch (err) {
//         console.error("Failed to attach buyer identity:", err);
//         // Do NOT block login — allow user to proceed
//     }


//     return { ok: true };
// }
