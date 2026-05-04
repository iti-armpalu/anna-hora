import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Page Not Found",
    robots: {
        index: false,
        follow: false,
    },
}

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <p className="text-xs tracking-widest text-stone-400 uppercase mb-6">
                404
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-light text-stone-900 mb-4">
                This page doesn't exist
            </h1>
            <p className="text-stone-500 max-w-md leading-relaxed mb-10">
                The page you're looking for may have moved or no longer exists.
                Let us guide you back to something beautiful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                    <Link href="/shop">Explore the Collection</Link>
                </Button>
                <Button asChild variant="outline" >
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        </div>
    )
}