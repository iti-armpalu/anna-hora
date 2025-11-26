import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("shopify_customer_token")?.value;

    if (!token) {
        return NextResponse.json({ authenticated: false, customer: null });
    }

    const decoded = jwt.decode(token) as jwt.JwtPayload;

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
}
