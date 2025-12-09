import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Safely read Shopify customer token
 */
function getCustomerToken(req: NextRequest) {
  return req.cookies.get("customerAccessToken")?.value ?? null;
}

function isTokenExpired(cookie: string | null): boolean {
  if (!cookie) return true;
  return false;
}

function resolveCountry(req: NextRequest): string {
  const existing = req.cookies.get("country")?.value;
  const geoCountry = req.headers.get("x-vercel-ip-country");
  return existing || geoCountry || "GB";
}

function applyCountryCookie(res: NextResponse, country: string) {
  res.cookies.set("country", country, {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
  });
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ------------------------------
  // 1. AUTH PROTECTION
  // ------------------------------
  const token = getCustomerToken(req);
  const expired = isTokenExpired(token);
  const isProtected = pathname.startsWith("/account");

  if (!token || expired) {
    if (isProtected) {
      const signinUrl = new URL("/signin", req.url);
      signinUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // ------------------------------
  // 2. COUNTRY LOGIC
  // ------------------------------
  const country = resolveCountry(req);

  // ------------------------------
  // 3. CONTINUE
  // ------------------------------
  const res = NextResponse.next();
  applyCountryCookie(res, country);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};



// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// /**
//  * Helper: Safely read the customer's Shopify access token.
//  * This token is stored in an HttpOnly cookie and can ONLY be read on the server.
//  */
// function getCustomerToken(req: NextRequest) {
//   return req.cookies.get("customerAccessToken")?.value ?? null;
// }

// /**
//  * Helper: Parse Shopify token expiration.
//  * Shopify returns "expiresAt" in the cookie expiration.
//  * If the token is expired, we treat the user as logged out.
//  */
// function isTokenExpired(cookie: string | null): boolean {
//   if (!cookie) return true; // no token = expired/not logged in

//   // The cookie itself contains expiry, but NextRequest doesn't expose it directly.
//   // So for simplicity: let server pages handle expiration validation.
//   // Middleware only checks existence.
//   return false;
// }

// /**
//  * Helper: Get the user's country.
//  * Priority:
//  * 1. Country cookie (user already selected)
//  * 2. Vercel Geo header
//  * 3. Fallback "GB"
//  */
// function resolveCountry(req: NextRequest): string {
//   const existing = req.cookies.get("country")?.value;
//   const geoCountry = req.headers.get("x-vercel-ip-country");
//   return existing || geoCountry || "GB";
// }

// /**
//  * Helper: Apply country cookie for client-side UX
//  * (Needed for showing prices, currency switcher, etc.)
//  */
// function applyCountryCookie(res: NextResponse, country: string) {
//   res.cookies.set("country", country, {
//     path: "/",
//     httpOnly: false, // must be readable by the client for UI purposes
//     maxAge: 60 * 60 * 24 * 365, // 1 year
//   });
// }

// /**
//  * MAIN MIDDLEWARE
//  */
// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // ------------------------------
//   // 1. AUTH PROTECTION FOR /account
//   // ------------------------------

//   const token = getCustomerToken(req);
//   const expired = isTokenExpired(token);
//   const isProtected = pathname.startsWith("/account");

//   if (!token || expired) {
//     if (isProtected) {
//       // Smart redirect: return user to original destination after login
//       const signinUrl = new URL("/signin", req.url);
//       signinUrl.searchParams.set("redirect", pathname);
//       return NextResponse.redirect(signinUrl);
//     }
//   }

//   // ------------------------------
//   // 2. COUNTRY LOGIC
//   // ------------------------------

//   const country = resolveCountry(req);

//   // ------------------------------
//   // 3. CONTINUE THE REQUEST
//   // ------------------------------

//   const res = NextResponse.next();

//   // Persist country cookie (for UI and currency selectors)
//   applyCountryCookie(res, country);

//   return res;
// }

// /**
//  * MIDDLEWARE MATCHER
//  * 
//  * Matches all routes EXCEPT:
//  * - Next.js static assets
//  * - next/image loader
//  * - favicon
//  * - image files (.png, .jpg, .svg, etc.)
//  */
// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico).*)"
//   ]
// };

