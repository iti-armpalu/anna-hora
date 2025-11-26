import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.set("customerAccessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0), // delete
    path: "/",
  });

  return NextResponse.redirect("/");
}
