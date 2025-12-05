import { NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";

import { shopifyFetch } from "@/lib/shopify/fetch";


import type { ShopifyUserError } from "@/lib/shopify/types/auth";
import type { ShopifyCustomer } from "@/lib/shopify/types/customer";
import type { TokenCreateData } from "@/lib/shopify/types/auth";
import { CUSTOMER_CREATE_MUTATION } from "@/lib/shopify/queries/customer";
import { CUSTOMER_ACCESS_TOKEN_CREATE } from "@/lib/shopify/queries/auth";

// -------------------------------------
// Zod schema for request body
// -------------------------------------
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

// -------------------------------------
// POST /api/auth/signup
// -------------------------------------
export async function POST(req: Request) {
  const json = await req.json();
  const parsed = SignupSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password, firstName, lastName } = parsed.data;

  // -------------------------------------
  // 1. Create Shopify customer
  // -------------------------------------
  const createRes = await shopifyFetch<CustomerCreateData>({
    query: CUSTOMER_CREATE_MUTATION,
    variables: {
      input: { email, password, firstName, lastName },
    },
  });

  const { customer, customerUserErrors } = createRes.customerCreate;

  // Customer creation errors (email already taken, invalid fields, etc.)
  if (customerUserErrors.length > 0) {
    return NextResponse.json(
      { errors: customerUserErrors.map((e) => e.message) },
      { status: 400 }
    );
  }

  // If no customer returned → fail
  if (!customer) {
    return NextResponse.json(
      { error: "Customer creation failed." },
      { status: 500 }
    );
  }

  // -------------------------------------
  // 2. Auto login: create access token
  // -------------------------------------
  const tokenRes = await shopifyFetch<TokenCreateData>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE,
    variables: {
      input: { email, password },
    },
  });

  const {
    customerAccessToken,
    customerUserErrors: tokenErrors,
  } = tokenRes.customerAccessTokenCreate;

  if (!customerAccessToken) {
    return NextResponse.json(
      {
        errors:
          tokenErrors.length > 0
            ? tokenErrors.map((e) => e.message)
            : ["Token creation failed"],
      },
      { status: 401 }
    );
  }

  // -------------------------------------
  // 3. Save token in secure HttpOnly cookie
  // -------------------------------------
  const cookieStore = await cookies();

  cookieStore.set(
    "customerAccessToken",
    customerAccessToken.accessToken,
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(customerAccessToken.expiresAt),
    }
  );

  return NextResponse.json({ success: true });
}





// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { storefrontFetch } from "@/lib/shopify/storefront";
// import { z } from "zod";
// import { CUSTOMER_CREATE_MUTATION } from "@/lib/queries/customer";
// import { CUSTOMER_ACCESS_TOKEN_CREATE } from "@/lib/queries/auth";


// const SignupSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
//   firstName: z.string().optional(),
//   lastName: z.string().optional(),
// });

// type SignupInput = z.infer<typeof SignupSchema>;


// interface ShopifyUserError {
//   field: string[] | null;
//   message: string;
// }

// interface CustomerCreateResponse {
//   data: {
//     customerCreate: {
//       customer: {
//         id: string;
//         email: string;
//       } | null;
//       customerUserErrors: ShopifyUserError[];
//     };
//   };
// }

// interface TokenResponse {
//   data: {
//     customerAccessTokenCreate: {
//       customerAccessToken:
//       | {
//         accessToken: string;
//         expiresAt: string;
//       }
//       | null;
//       customerUserErrors: ShopifyUserError[];
//     };
//   };
// }

// // -----------------------------
// // 4. API Route (POST)
// // -----------------------------
// export async function POST(req: Request) {
//   const json = await req.json();
//   const parseResult = SignupSchema.safeParse(json);

//   if (!parseResult.success) {
//     return NextResponse.json(
//       { errors: parseResult.error.flatten().fieldErrors },
//       { status: 400 }
//     );
//   }

//   const { email, password, firstName, lastName } = parseResult.data;

//   const createResult = await storefrontFetch<CustomerCreateResponse>(
//     CUSTOMER_CREATE_MUTATION,
//     { input: { email, password, firstName, lastName } }
//   );

//   const userErrors = createResult.data.customerCreate.customerUserErrors;

//   if (userErrors.length > 0) {
//     return NextResponse.json({ errors: userErrors }, { status: 400 });
//   }

//   const tokenResult = await storefrontFetch<TokenResponse>(CUSTOMER_ACCESS_TOKEN_CREATE, {
//     input: { email, password },
//   });

//   const token =
//     tokenResult.data.customerAccessTokenCreate.customerAccessToken;

//   if (!token) {
//     return NextResponse.json(
//       {
//         error:
//           tokenResult.data.customerAccessTokenCreate.customerUserErrors[0]
//             ?.message ?? "Token creation failed",
//       },
//       { status: 401 }
//     );
//   }

//   const cookieStore = await cookies();

//   cookieStore.set("customerAccessToken", token.accessToken, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//     expires: new Date(token.expiresAt),
//     path: "/",
//   });

//   return NextResponse.json({ success: true });
// }
