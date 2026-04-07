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
import { defaultMetadata } from "@/lib/config/metadata";


export const metadata: Metadata = defaultMetadata;

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
            <Header />

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
