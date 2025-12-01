import { NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";


import { shopifyFetch } from "@/lib/shopify/fetch";
import type { TokenCreateData } from "@/lib/shopify/types/auth";
import { CUSTOMER_ACCESS_TOKEN_CREATE } from "@/lib/queries/auth";

// -------------------------------------
// Zod schema
// -------------------------------------
const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = SigninSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  // -------------------------------------
  // 1. Shopify login request
  // -------------------------------------
  const res = await shopifyFetch<TokenCreateData>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE,
    variables: {
      input: { email, password },
    },
  });

  // Because shopifyFetch RETURNS res.data directly,
  // res = TokenCreateData (NOT GraphQLResponse<TokenCreateData>)
  const { customerAccessTokenCreate } = res;

  const { customerAccessToken, customerUserErrors } =
    customerAccessTokenCreate;

  // Invalid credentials
  if (!customerAccessToken) {
    return NextResponse.json(
      {
        errors:
          customerUserErrors.length > 0
            ? customerUserErrors.map((e) => e.message)
            : ["Invalid email or password"],
      },
      { status: 401 }
    );
  }

  // -------------------------------------
  // 2. Write secure auth cookie
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

  return NextResponse.json({ success: true }, { status: 200 });
}





// import { NextResponse } from "next/server";
// import { z } from "zod";
// import { cookies } from "next/headers";
// import { CUSTOMER_ACCESS_TOKEN_CREATE } from "@/lib/queries/auth";
// import { shopifyFetch } from "@/lib/shopify";
// import { GraphQLResponse, TokenCreateData } from "@/lib/shopify/types";



// // 1. Validate incoming form data
// const SigninSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// });
// type SigninInput = z.infer<typeof SigninSchema>;

// export async function POST(req: Request) {
//   const json = await req.json();
//   const parsed = SigninSchema.safeParse(json);

//   if (!parsed.success) {
//     return NextResponse.json(
//       { errors: parsed.error.flatten().fieldErrors },
//       { status: 400 }
//     );
//   }

//   const { email, password } = parsed.data;

//   // 2. Request a new customer access token from Shopify
//   const res = await shopifyFetch<GraphQLResponse<TokenCreateData>>({
//     query: CUSTOMER_ACCESS_TOKEN_CREATE,
//     variables: {
//       input: { email, password },
//     },
//   });

//   const tokenResult =
//     res.data.customerAccessTokenCreate.customerAccessToken;

//   const userErrors =
//     res.data.customerAccessTokenCreate.customerUserErrors;

//   if (!tokenResult) {
//     return NextResponse.json(
//       {
//         errors:
//           userErrors.length > 0
//             ? userErrors.map((e) => e.message)
//             : ["Invalid email or password."],
//       },
//       { status: 401 }
//     );
//   }

//   const cookieStore = await cookies();

//   // 3. Store token in Secure HttpOnly Cookie
//   cookieStore.set("customerAccessToken", tokenResult.accessToken, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//     expires: new Date(tokenResult.expiresAt),
//     path: "/",
//   });

//   return NextResponse.json({ success: true });
// }
