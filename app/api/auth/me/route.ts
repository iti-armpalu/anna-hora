import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface ShopifyIdTokenPayload extends JwtPayload {
  email: string;
  email_verified: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  sub: string; // Shopify customer ID
}
const cookieStore = await cookies();

export async function GET() {
  const token = cookieStore.get("shopify_customer_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false, customer: null });
  }

  try {
    const decoded = jwt.decode(token) as ShopifyIdTokenPayload;

    return NextResponse.json({
      authenticated: true,
      customer: {
        id: decoded.sub,
        email: decoded.email,
        verified: decoded.email_verified,
        name: decoded.name,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid token", detail: String(err) },
      { status: 400 }
    );
  }
}
