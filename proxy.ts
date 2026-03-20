import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEFAULT_MARKET_COUNTRY = "CZ";

function resolveShippingCountry(req: NextRequest): string {
  const existing = req.cookies.get("shippingCountry")?.value;
  if (existing) return existing;

  return req.headers.get("x-vercel-ip-country") || DEFAULT_MARKET_COUNTRY;
}

function resolveMarketCountry(req: NextRequest): string {
  const existing = req.cookies.get("marketCountry")?.value;
  if (existing) return existing;

  return DEFAULT_MARKET_COUNTRY;
}

export function proxy(req: NextRequest) {
  const shippingCountry = resolveShippingCountry(req);
  const marketCountry = resolveMarketCountry(req);

  const res = NextResponse.next();

  res.cookies.set("shippingCountry", shippingCountry, {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
  });

  res.cookies.set("marketCountry", marketCountry, {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};