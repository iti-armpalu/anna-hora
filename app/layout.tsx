import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { Analytics } from "@vercel/analytics/next"

import Header from "@/components/header/header"
import Footer from "@/components/footer/Footer"
import { Toaster } from "@/components/ui/sonner"
import { GlobalCartDrawer } from "@/app/cart/global-cart-drawer"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { getCartAction } from "@/lib/actions/cart/get-cart"
import { defaultMetadata } from "@/lib/config/metadata"
import { KlaroInit } from "@/components/klaro/klaro-init"

export const dynamic = "force-dynamic"
export const metadata: Metadata = defaultMetadata

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/*
          Consent Mode v2 — must run before GTM loads.
          Sets all consent signals to denied by default so Google
          honours the consent state from the first request onwards.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                functionality_storage: 'denied',
                personalization_storage: 'denied',
                security_storage: 'granted',
                wait_for_update: 2000
              });
            `,
          }}
        />
        {/* Klaro CSS */}
        {/* Klaro base styles — provides positioning and layout */}
        <link rel="stylesheet" href="https://cdn.kiprotect.com/klaro/v0.7/klaro.min.css" />
        {/* ANNA HORA overrides — colours, typography, border-radius */}
        <link rel="stylesheet" href="/klaro.css" />
      </head>
      <body className="min-h-screen bg-background flex flex-col">

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

        {GTM_ID && <KlaroInit gtmId={GTM_ID} />}

      </body>
    </html>
  )
}