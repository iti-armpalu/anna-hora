import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. If user already chose a country (DevCurrencyTester), keep it
  const existing = request.cookies.get("country")?.value;

  // 2. Otherwise, try geo; fallback to GB
  const geoCountry = request.headers.get("x-vercel-ip-country");
//   const geoCountry = request.geo?.country;

  const country = existing || geoCountry || "GB";

  const response = NextResponse.next();

  // 3. Persist resolved country
  response.cookies.set("country", country, {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
