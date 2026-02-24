import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function resolveCountry(req: NextRequest): string {
  const existing = req.cookies.get("country")?.value;
  if (existing) return existing;

  const geoCountry = req.headers.get("x-vercel-ip-country");
  const PRIMARY = "CZ";
  return geoCountry || PRIMARY;
}

export function proxy(req: NextRequest) {
  const country = resolveCountry(req);

  const res = NextResponse.next();
  res.cookies.set("country", country, {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
