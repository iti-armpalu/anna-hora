import type { Metadata } from "next";
import "./globals.css";

import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/next"

import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner"
import { DevCurrencyTester } from "@/components/dev-currency-tester";
import { GlobalCartDrawer } from "@/app/cart/global-cart-drawer";

import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { AuthProvider } from "@/context/auth-context";

import { getCustomer } from "@/lib/shopify/customer";
import { getCartAction } from "@/lib/actions/cart/get-cart";
import Header from "@/components/header/Header";
import { siteConfig } from "@/lib/config/site";
import { CartShippingProvider } from "@/context/cart-shipping-context";
import { getFreeShippingThreshold } from "@/lib/geo/get-free-shipping-treshold";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: "A luxury lifestyle concept",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { threshold, currencyCode } =
    await getFreeShippingThreshold();

  const cookieStore = await cookies()
  const cartId = cookieStore.get("cartId")?.value || null;

  // // Customer token
  // const rawToken = cookieStore.get("customerAccessToken")?.value ?? null;
  // console.log("[RootLayout] token from cookies:", rawToken);

  // // Only fetch customer if token exists
  // let customer = null;
  // if (rawToken) {
  //   customer = await getCustomer();  // safe now
  // }

  // 1. UPDATE: Change the cookie name to the new one
  const rawToken = cookieStore.get("customer_session")?.value ?? null;
  console.log("[RootLayout] New token from cookies:", rawToken);

  let customer = null;
  if (rawToken) {
    // 2. IMPORTANT: getCustomer() needs to be updated for the new API
    customer = await getCustomer(rawToken);
  }

  console.log("[RootLayout] customer:", customer);

  const isAuthenticated = Boolean(customer);

  // Fetch normalized cart (or null)
  const cartRes = await getCartAction();
  const initialCart = cartRes.ok ? cartRes.cart : null;

  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50">
        <CartShippingProvider
          threshold={threshold}
          currencyCode={currencyCode}
        >

          <CartProvider
            initialCartId={cartId}
            initialCart={initialCart}
            initialCustomer={customer}
          >
            <AuthProvider initialAuth={isAuthenticated}>
              <WishlistProvider>
                <Header />
                {children}
                <Analytics />
                {/* <DevCurrencyTester /> */}
                <Toaster position="top-center" />
                <Footer />
                <GlobalCartDrawer />
              </WishlistProvider>
            </AuthProvider>
          </CartProvider>
        </CartShippingProvider>
      </body>
    </html>
  );
}
