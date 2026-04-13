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
      <body className="min-h-screen bg-stone-50">
        <CartProvider
          initialCartId={cartId}
          initialCart={initialCart}
        >
          <WishlistProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
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
