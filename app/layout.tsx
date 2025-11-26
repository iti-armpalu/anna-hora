import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/header/Header";
import { WishlistProvider } from "@/context/wishlist-context";
import { DevCurrencyTester } from "@/components/dev-currency-tester";
import { GlobalCartDrawer } from "@/components/cart/global-cart-drawer";
import { AuthProvider } from "@/context/auth-context";


export const metadata: Metadata = {
  title: "Anna Hora",
  description: "A luxury lifestyle concept",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              {children}
              <DevCurrencyTester /> {/* 👈 Always available in dev */}
              <Toaster />
              <Footer />
              <GlobalCartDrawer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
