import type { Metadata } from "next"
import "./globals.css"

import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

import Header from "@/components/header/header"
import Footer from "@/components/footer/Footer"
import { Toaster } from "@/components/ui/sonner"
import { GlobalCartDrawer } from "@/app/cart/global-cart-drawer"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { getCartAction } from "@/lib/actions/cart/get-cart"
import { defaultMetadata } from "@/lib/config/metadata"

export const metadata: Metadata = defaultMetadata

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

  const cartRes = await getCartAction()
  const initialCart = cartRes.ok ? cartRes.cart : null
  const cartId = initialCart?.id ?? null

  return (
    <html lang="en">
      <head>
        {/* Cookiebot — must load first to block other scripts until consent */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="dafbf68a-3e6a-4673-bc69-511150fb7d11"
          data-blockingmode="auto"
          async
        />
      </head>
      <body className="min-h-screen bg-stone-50 flex flex-col">

        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <CartProvider initialCartId={cartId} initialCart={initialCart}>
          <WishlistProvider>
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <Analytics />
            <Toaster position="top-center" />
            <GlobalCartDrawer />
          </WishlistProvider>
        </CartProvider>

        {/* GTM — afterInteractive keeps it outside React hydration cycle */}
        {GTM_ID && (
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}

      </body>
    </html>
  )
}