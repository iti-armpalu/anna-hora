"use client"

import Link from "next/link"
import { CartButton } from "../../app/cart/_components/cart-button"
import AuthNav from "./auth-nav"
import { Button } from "../ui/button"
import { Heart, Search } from "lucide-react"

type QuickActionsProps = {
    showSearch?: boolean
    showWishlist?: boolean
}

export function QuickActions({
    showSearch = false,
    showWishlist = true,
}: QuickActionsProps) {
    return (
        <div className="flex items-center md:space-x-4">
            {/* Search */}
            {showSearch && (
                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </Button>
            )}

            {/* Wishlist */}
            {showWishlist && (
                <Button asChild variant="ghost" size="icon">
                    <Link
                        href="/wishlist"
                        aria-label="Wishlist"
                        prefetch={false}
                    >
                        <Heart className="h-5 w-5" />
                        <span className="sr-only">Wishlist</span>
                    </Link>
                </Button>
            )}

            {/* Cart + Auth */}
            <CartButton />
            <AuthNav />
        </div>
    )
}
