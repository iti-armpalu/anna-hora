import type { Metadata } from "next";
import "./globals.css";

import { cookies } from "next/headers";


import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner"
import { DevCurrencyTester } from "@/components/dev-currency-tester";
import { GlobalCartDrawer } from "@/components/cart/global-cart-drawer";

import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { AuthProvider } from "@/context/auth-context";

import { getCustomer } from "@/lib/shopify/customer";
import { getCartAction } from "@/lib/actions/cart/get-cart";
import Header from "@/components/header/Header";
import { siteConfig } from "@/lib/config/site";


export const metadata: Metadata = {
  title: siteConfig.name,
  description: "A luxury lifestyle concept",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const cartId = cookieStore.get("cartId")?.value || null;

  // Customer token
  const rawToken = cookieStore.get("customerAccessToken")?.value ?? null;
  console.log("[RootLayout] token from cookies:", rawToken);

  // Only fetch customer if token exists
  let customer = null;
  if (rawToken) {
    customer = await getCustomer();  // safe now
  }
  console.log("[RootLayout] customer:", customer);

  const isAuthenticated = Boolean(customer);

  // Fetch normalized cart (or null)
  const cartRes = await getCartAction();
  const initialCart = cartRes.ok ? cartRes.cart : null;

  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50">

        <CartProvider
          initialCartId={cartId}
          initialCart={initialCart}
          initialCustomer={customer}
        >
          <AuthProvider initialAuth={isAuthenticated}>
            <WishlistProvider>
              <Header />
              {children}
              <DevCurrencyTester /> {/* 👈 Always available in dev */}
              <Toaster />
              <Footer />
              <GlobalCartDrawer />
            </WishlistProvider>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
