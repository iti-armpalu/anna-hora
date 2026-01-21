"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

import { useWishlist } from "@/context/wishlist-context";
import { formatPrice } from "@/hooks/use-price";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export default function WishlistClient() {
    const { items, remove, clear } = useWishlist();
    const hasItems = items.length > 0;

    return (
        <div className="min-h-screen bg-stone-50">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* --------------------------------------------------- */}
                {/* 14-DAY GUEST WISHLIST NOTICE */}
                {/* --------------------------------------------------- */}
                {/* {!isLoggedIn && ( */}
                <div className="mb-8">
                    <div className="bg-stone-100 border border-stone-200 rounded-lg p-4 text-center">
                        <p className="text-stone-700 text-sm">
                            We will keep your saved items for 14 days. Sign in or register to ensure your saved items are always available.
                        </p>
                    </div>
                </div>
                {/* )} */}



                {/* Header */}
                <div className="text-center mb-8 lg:mb-12">
                    <h1 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
                        Your Wishlist
                    </h1>
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                        Save your favorite ANNA HORA pieces — create an account to keep them safe across all devices.
                    </p>
                </div>

                {/* Empty State */}
                {!hasItems && (
                    <div className="text-center py-24">

                        <h2 className="text-2xl font-light text-stone-800 mb-4">
                            Your wishlist is empty
                        </h2>

                        <p className="text-stone-600 mb-8 max-w-md mx-auto">
                            Explore our collection of silk loungewear and add pieces you love.
                        </p>

                        <Link href="/shop">
                            <Button className="bg-anna-green-950 hover:bg-stone-700 text-white">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Wishlist Items */}
                {hasItems && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-medium text-stone-800">
                                {items.length} {items.length === 1 ? "item" : "items"} saved
                            </h2>

                            <Button
                                variant="ghost"
                                onClick={() => confirm("Clear your wishlist?") && clear()}
                                className="text-stone-500 hover:text-stone-800"
                            >
                                Clear All
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {items.map((item) => {
                                
                                const formattedPrice = formatPrice({
                                    amount: item.price,
                                    currencyCode: item.currencyCode,
                                });

                                return (
                                    <Card
                                        key={item.id}
                                        className="group border-stone-200 hover:shadow-md transition-shadow bg-white"
                                    >
                                        <CardContent className="p-4">

                                            {/* Image */}
                                            <div className="relative mb-4">
                                                <Link href={`/products/${item.id}`}>
                                                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer">
                                                        <Image
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.title}
                                                            fill
                                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    </div>
                                                </Link>

                                                {/* Remove button */}
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => remove(item.id)}
                                                    className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-sm"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>

                                                {/* Size */}
                                                {item.size && (
                                                    <Badge className="absolute bottom-2 left-2 bg-stone-800 text-white text-[10px]">
                                                        Size: {item.size}
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="space-y-3">
                                                <Link href={`/products/${item.id}`}>
                                                    <h3 className="font-medium text-stone-800 hover:text-stone-600 transition-colors cursor-pointer">
                                                        {item.title}
                                                    </h3>
                                                </Link>

                                                <div className="font-medium text-stone-800 text-sm">
                                                    {formattedPrice}
                                                </div>

                                                <Link href={`/products/${item.id}`}>
                                                    <Button className="w-full bg-stone-800 hover:bg-stone-700 text-white">
                                                        View Product
                                                    </Button>
                                                </Link>
                                            </div>

                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
