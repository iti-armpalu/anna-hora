import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Remove Shopify customer token
  cookieStore.set("customerAccessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  return NextResponse.json({ success: true });
}
