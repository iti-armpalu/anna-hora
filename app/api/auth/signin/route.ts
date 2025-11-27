import { NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { storefrontFetch } from "@/lib/shopify/storefront";
import { TokenCreateResponse } from "@/lib/types/order";
import { CREATE_CUSTOMER_TOKEN } from "@/lib/queries/order";


// 1. Validate incoming form data
const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type SigninInput = z.infer<typeof SigninSchema>;

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

  // 2. Request a new customer access token from Shopify
  const response = await storefrontFetch<TokenCreateResponse>(
    CREATE_CUSTOMER_TOKEN,
    { input: { email, password } }
  );

  const tokenResult =
    response.data.customerAccessTokenCreate.customerAccessToken;

  const userErrors =
    response.data.customerAccessTokenCreate.customerUserErrors;

  if (!tokenResult) {
    return NextResponse.json(
      {
        errors:
          userErrors.length > 0
            ? userErrors.map((e) => e.message)
            : ["Invalid email or password."],
      },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  // 3. Store token in Secure HttpOnly Cookie
  cookieStore.set("customerAccessToken", tokenResult.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(tokenResult.expiresAt),
    path: "/",
  });

  return NextResponse.json({ success: true });
}
