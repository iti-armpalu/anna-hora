'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { usePrice } from "@/hooks/use-price";
// import { WishlistButton } from "@/components/wishlist-button";
import { Product } from "@/lib/types/product";
import { Eye, Minus, Plus, RotateCcw, Shield, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export const revalidate = 60; // ISR every 60 seconds

export default function ProductPageClient({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)


    // --- Add to Bag handler ---
    async function handleAddToBag() {
        console.log("🔥 Add to Bag clicked");

        if (!selectedSize) {
            toast.error("Please select a size before adding to bag.");
            return;
        }

        const selected = sizes.find((s) => s.size === selectedSize);

        if (!selected?.variantId) {
            toast.error("Selected size is not available.");
            return;
        }

        await addToCart(selected.variantId, quantity); // 💡 talk to Context ONLY

        toast.success(
            `${product.title} (Size: ${selectedSize}, Qty: ${quantity}) added to bag!`
        );
    }

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

    // Get the price from the selected variant:
    const selectedVariant = product.variants?.edges.find(v =>
        v.node.selectedOptions.some(
            opt => opt.name.toLowerCase() === "size" && opt.value === selectedSize
        )
    );

    const basePrice =
        selectedVariant?.node.price?.amount ??
        product.priceRange.minVariantPrice?.amount ??
        "0";

    const currency =
        selectedVariant?.node.price?.currencyCode ??
        product.priceRange.minVariantPrice?.currencyCode ??
        "GBP";

    const formattedPrice = usePrice({
        amount: basePrice,
        currencyCode: currency,
    });

    const total = Number(basePrice) * quantity;

    const formattedTotal = usePrice({
        amount: total,
        currencyCode: currency
    });

    const images = product.images?.edges.map(e => e.node) || [];

    const sensoryDescription = product.metafields?.find(
        (mf) => mf.key === "sensory_description"
    )?.value;

    const lifestyleDescription = product.metafields?.find(
        (mf) => mf.key === "lifestyle_description"
    )?.value;

    const styleDescription = product.metafields?.find(
        (mf) => mf.key === "style_description"
    )?.value;

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
                                    {formattedPrice}
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
                                    Add to Bag – {formattedTotal}
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
                        <div className="space-y-4 text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
                            <p>{sensoryDescription}</p>
                            <p>{lifestyleDescription}</p>
                            <p>{styleDescription}</p>
                        </div>

                    </section>

                    {/* Technical Details */}
                    <section>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="details" className="border-stone-200">
                                <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
                                    Product Details
                                </AccordionTrigger>
                                <AccordionContent className="space-y-3 text-stone-600">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-medium text-stone-800 mb-2">Fabric & Construction</h4>
                                            {/* <ul className="space-y-1 text-sm">
                                                <li>• {product.specifications.fabric}</li>
                                                <li>• {product.specifications.weight} weight</li>
                                                <li>• {product.specifications.origin}</li>
                                            </ul> */}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-stone-800 mb-2">Care & Sustainability</h4>
                                            {/* <ul className="space-y-1 text-sm">
                                                <li>• {product.specifications.care}</li>
                                                <li>• {product.specifications.sustainability}</li>
                                                <li>
                                                    •{" "}
                                                    <Link href="/our-silk" className="text-stone-700 hover:text-stone-900 underline">
                                                        Learn about our silk
                                                    </Link>
                                                </li>
                                            </ul> */}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="fit" className="border-stone-200">
                                <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
                                    Fit & Sizing
                                </AccordionTrigger>
                                <AccordionContent className="space-y-3 text-stone-600">
                                    {/* <div className="space-y-2 text-sm">
                                        <p>• {product.fit.type}</p>
                                        <p>• {product.fit.modelInfo}</p>
                                        <p>• {product.fit.notes}</p>
                                    </div> */}
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="shipping" className="border-stone-200">
                                <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
                                    Shipping & Returns
                                </AccordionTrigger>
                                <AccordionContent className="space-y-3 text-stone-600">
                                    <div className="space-y-2 text-sm">
                                        <p>• Free shipping on orders over $200</p>
                                        <p>• Standard delivery: 3-5 business days</p>
                                        <p>• Express delivery: 1-2 business days</p>
                                        <p>• 30-day returns for unworn items</p>
                                        <p>• Signature eco-friendly packaging with every order (recyclable materials)</p>
                                        <p>
                                            • Premium gift wrapping available (includes silk ribbon, handwritten note on recycled paper, and
                                            sustainable tissue wrap)
                                        </p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>


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
