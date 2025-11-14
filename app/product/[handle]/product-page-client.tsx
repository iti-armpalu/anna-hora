'use client'

import { Button } from "@/components/ui/button";
// import { WishlistButton } from "@/components/wishlist-button";
import { Product } from "@/lib/types/product";
import { Eye, Minus, Plus, RotateCcw, Shield, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const revalidate = 60; // ISR every 60 seconds


export default function ProductPageClient({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)


    const sizeOption = product.options?.find(opt => opt.name.toLowerCase() === "size");

    const sizes = sizeOption
        ? sizeOption.values.map((size) => {
            const variantForSize = product.variants?.edges.find((v) =>
                v.node.selectedOptions.some(
                    (opt) => opt.name.toLowerCase() === "size" && opt.value === size
                )
            );

            return {
                size,
                inStock: variantForSize?.node.availableForSale ?? false,
                variantId: variantForSize?.node.id,
            };
        })
        : [];

    const handleAddToBag = () => {
        if (!selectedSize) {
            alert("Please select a size")
            return
        }
        // Add to bag logic here
        console.log("Added to bag:", { product: product.id, size: selectedSize, quantity })
    }

    // function formatPrice(amount: string, currency: string) {
    //     return new Intl.NumberFormat("en-US", {
    //         style: "currency",
    //         currency,
    //         minimumFractionDigits: 2,
    //     }).format(parseFloat(amount));
    // }

    const price = product.priceRange.minVariantPrice;

    const unitPrice = Number(price.amount);

    const images = product.images?.edges.map(e => e.node) || [];






    return (
        <div className="min-h-screen bg-stone-50">

            {/* Main Product Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Gallery */}
                    {/* Product Gallery */}
                    <div className="space-y-4">

                        {/* Main Image */}
                        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white">
                            <Image
                                src={images[selectedImage]?.url || "/placeholder.svg"}
                                alt={images[selectedImage]?.altText || product.title}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* {selectedImage === 0 && (
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 hover:bg-white shadow-lg"
                                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                                >
                                    {isVideoPlaying ? (
                                        <Pause className="w-6 h-6 text-stone-800" />
                                    ) : (
                                        <Play className="w-6 h-6 text-stone-800 ml-1" />
                                    )}
                                </Button>
                            )} */}
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-2">
                            {images.slice(0, 4).map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${selectedImage === index
                                        ? "border-stone-800"
                                        : "border-stone-200 hover:border-stone-400"
                                        }`}
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.altText || `${product.title} view ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Additional Images Button */}
                        {images.length > 4 && (
                            <Button
                                variant="outline"
                                className="w-full border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                View All {images.length} Images
                            </Button>
                        )}
                    </div>


                    {/* Product Info */}
                    <div className="space-y-8">
                        {/* Product Header */}
                        <div className="space-y-4">
                            <h1 className="text-3xl lg:text-4xl font-light text-stone-800 font-serif">{product.title}</h1>
                            <p className="text-lg text-stone-600 italic">{product.description}</p>
                            <div className="flex items-center space-x-4">
                                {/* <span className="text-3xl font-light text-stone-800">${product.price}</span> */}
                                <p className="text-xl font-medium text-stone-800">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: product.priceRange.minVariantPrice.currencyCode,
                                    }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
                                </p>
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-stone-800">Size</h3>

                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {sizes.map(({ size, inStock, variantId }) => (
                                    <Button
                                        key={variantId}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (inStock) {
                                                setSelectedSize(size);
                                            }
                                        }}
                                        variant={selectedSize === variantId ? "default" : "outline"}
                                        disabled={!inStock}
                                        className={`${selectedSize === size
                                            ? "bg-stone-800 text-white"
                                            : inStock
                                                ? "bg-white text-stone-800 border-stone-300"
                                                : "bg-stone-100 text-stone-400 border-stone-200 line-through cursor-not-allowed opacity-60"
                                            }
                                        `}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                            {!sizes.find((s) => s.variantId === "l")?.inStock && (
                                <p className="text-sm text-stone-500">
                                    Size L is currently out of stock.
                                    <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800 p-0 ml-1">
                                        Get notified when available
                                    </Button>
                                </p>
                            )}
                        </div>

                        {/* Quantity & Add to Bag */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-stone-800">Quantity:</span>
                                <div className="flex items-center border border-stone-300 rounded-md">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="px-4 py-2 text-sm">{quantity}</span>
                                    <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    size="lg"
                                    onClick={handleAddToBag}
                                    className="w-full bg-stone-800 hover:bg-stone-700 text-white py-4"
                                >
                                    Add to Bag – ${unitPrice * quantity}
                                </Button>
                                {/* <WishlistButton
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        originalPrice: product.originalPrice,
                                        image: product.images[0],
                                        color: product.colors.find((c) => c.id === selectedColor)?.name || "Default",
                                        size: selectedSize,
                                        stock: 10,
                                        category: "robes",
                                    }}
                                    variant="full"
                                    size="lg"
                                    className="w-full"
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Sections */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Sensory Description */}
                    <section className="text-center space-y-6">
                        <h2 className="text-3xl lg:text-4xl font-light text-stone-800 font-serif">
                            For mornings when the world can wait
                        </h2>

                    </section>

                    {/* Technical Details */}
                    <section>

                    </section>

                    {/* Customer Assurance */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-stone-200">
                        <div className="text-center space-y-2">
                            <Truck className="w-8 h-8 text-stone-600 mx-auto" />
                            <h3 className="font-medium text-stone-800">Free Shipping</h3>
                            <p className="text-sm text-stone-600">On orders over $200</p>
                        </div>
                        <div className="text-center space-y-2">
                            <RotateCcw className="w-8 h-8 text-stone-600 mx-auto" />
                            <h3 className="font-medium text-stone-800">Easy Returns</h3>
                            <p className="text-sm text-stone-600">30-day return policy</p>
                        </div>
                        <div className="text-center space-y-2">
                            <Shield className="w-8 h-8 text-stone-600 mx-auto" />
                            <h3 className="font-medium text-stone-800">Secure Payment</h3>
                            <p className="text-sm text-stone-600">Your data is protected</p>
                        </div>
                    </section>

                    {/* Complementary Products */}
                    <section className="space-y-8">
                        <h2 className="text-2xl lg:text-3xl font-light text-stone-800 text-center">Complete the Look</h2>

                    </section>

                    {/* Reviews */}
                    <section className="space-y-8">
                        <div className="text-center space-y-4">
                            <h2 className="text-2xl lg:text-3xl font-light text-stone-800">What Our Customers Say</h2>

                        </div>

                        <div className="text-center">
                            <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent">
                                View All Reviews
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>

    );
}
