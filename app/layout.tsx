import type { Metadata } from "next";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/sonner";
import { GlobalCartDrawer } from "@/app/cart/global-cart-drawer";

import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";

import { getCartAction } from "@/lib/actions/cart/get-cart";
import { defaultMetadata } from "@/lib/config/metadata";
import Script from "next/script";


export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cartRes = await getCartAction();
  const initialCart = cartRes.ok ? cartRes.cart : null;
  const cartId = initialCart?.id ?? null; // derive from cart, not a separate cookie read

  return (
    <html lang="en">
      <head>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="dafbf68a-3e6a-4673-bc69-511150fb7d11"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen bg-stone-50">
        <CartProvider
          initialCartId={cartId}
          initialCart={initialCart}
        >
          <WishlistProvider>
            <Header />
            <main>{children}</main>
            <Analytics />
            <Toaster position="top-center" />
            <Footer />
            <GlobalCartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
