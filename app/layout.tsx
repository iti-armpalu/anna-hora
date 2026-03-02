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

import { getCartAction } from "@/lib/actions/cart/get-cart";
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

  // Cart id from cookie
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value ?? null;

  // Cart (server fetch)
  const cartRes = await getCartAction();
  const initialCart = cartRes.ok ? cartRes.cart : null;

  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50">
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
      </body>
    </html>
  );
}
