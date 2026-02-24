import Link from "next/link"
import { CartButton } from "../../app/cart/_components/cart-button"
import AuthNav from "./auth-nav"
import { Button } from "../ui/button"
import { Heart, Search } from "lucide-react"

export function QuickActions() {
    return (
        <div className="flex items-center md:space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>


            {/* Wishlist */}
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

            {/* Cart + Auth */}
            <CartButton />
            <AuthNav />
        </div>
    )
}
