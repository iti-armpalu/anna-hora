import Link from "next/link"
import { headerContent } from "@/data/header-content" // or { siteContent } if you prefer
import { MobileMenu } from "./mobile-menu"
import { NavDesktop } from "./nav-desktop"
import { AuthNav } from "../navigation/auth-nav" // remains client
import { CartButton } from "../cart/cart-button"

export default function Header() {
  const { brand, navigation } = headerContent // or siteContent.navigation.main

  return (
    <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu trigger + panel (client island) */}
          <MobileMenu items={navigation} />

          {/* Logo */}
          <Link href="/" className="flex-1 lg:flex-none">
            <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-stone-800">
              {brand.name}
            </h1>
          </Link>

          {/* Desktop navigation (server markup + tiny client links for active state) */}
          <NavDesktop items={navigation} />

          {/* Right actions (client islands are scoped) */}
          <div className="flex items-center space-x-4">
            {/* Search can stay a button for now; wire up later */}
            <button
              type="button"
              aria-label="Search"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-stone-100"
            >
              {/* Keep your icon */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {/* Wishlist can remain a plain link/button; add logic later */}
            <Link
              href="/wishlist"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-stone-100"
              aria-label="Wishlist"
              prefetch={false}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Link>

            {/* Cart button + drawer (client island) */}
            <CartButton />
            <AuthNav />
          </div>
        </div>
      </div>
    </header>
  )
}
