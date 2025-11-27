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
import { cookies } from "next/headers";


export const metadata: Metadata = {
  title: "Anna Hora",
  description: "A luxury lifestyle concept",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const token = cookieStore.get("customerAccessToken")?.value;
  const isAuthenticated = Boolean(token);

  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50">
        <AuthProvider initialAuth={isAuthenticated}>
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
