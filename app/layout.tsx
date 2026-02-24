import type { Metadata } from "next";
import "./globals.css";

import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/next";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/sonner";
import { GlobalCartDrawer } from "@/app/cart/global-cart-drawer";

import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { CartShippingProvider } from "@/context/cart-shipping-context";

import { getCartAction } from "@/lib/actions/cart/get-cart";
import { getFreeShippingThreshold } from "@/lib/geo/get-free-shipping-treshold";
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
  // Geo / shipping threshold
  const { threshold, currencyCode } = await getFreeShippingThreshold();

  // Cart id from cookie
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value ?? null;

  // Cart (server fetch)
  const cartRes = await getCartAction();
  const initialCart = cartRes.ok ? cartRes.cart : null;

  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50">
        <CartShippingProvider threshold={threshold} currencyCode={currencyCode}>
          <CartProvider
            initialCartId={cartId}
            initialCart={initialCart}
          >
            <WishlistProvider>
              {/* Option A: Let Header read auth itself via getAuthSession() */}
              <Header />

              {/* Option B (if your Header needs prop): <Header isAuthenticated={isAuthenticated} /> */}
              {children}

              <Analytics />
              <Toaster position="top-center" />
              <Footer />
              <GlobalCartDrawer />
            </WishlistProvider>
          </CartProvider>
        </CartShippingProvider>
      </body>
    </html>
  );
}
