// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEFAULT_COUNTRY = "CZ";

function resolveShippingCountry(req: NextRequest): string {
  const existing = req.cookies.get("shippingCountry")?.value;
  if (existing) return existing;

  const geoCountry = req.headers.get("x-vercel-ip-country");
  return geoCountry || DEFAULT_COUNTRY;
}

export function proxy(req: NextRequest) {
  const shippingCountry = resolveShippingCountry(req);

  const res = NextResponse.next();

  res.cookies.set("shippingCountry", shippingCountry, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};