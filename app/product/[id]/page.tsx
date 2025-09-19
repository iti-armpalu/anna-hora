"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  Plus,
  Minus,
  Share2,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Eye,
  Play,
  Pause,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("midnight")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  // Sample product data - in real app, this would be fetched based on ID
  const product = {
    id: 1,
    name: "Midnight Silk Robe",
    shortDescription: "A robe that moves like water across your skin",
    price: 298,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 127,
    colors: [
      { id: "midnight", name: "Midnight Navy", hex: "#1a1a2e" },
      { id: "champagne", name: "Champagne", hex: "#f7e7ce" },
      { id: "sage", name: "Sage", hex: "#9caf88" },
      { id: "ivory", name: "Ivory", hex: "#faf0e6" },
    ],
    sizes: [
      { id: "xs", name: "XS", inStock: true },
      { id: "s", name: "S", inStock: true },
      { id: "m", name: "M", inStock: true },
      { id: "l", name: "L", inStock: false },
      { id: "xl", name: "XL", inStock: true },
    ],
    images: [
      "/placeholder.svg?height=600&width=500&text=Midnight robe front view",
      "/placeholder.svg?height=600&width=500&text=Midnight robe back view",
      "/placeholder.svg?height=600&width=500&text=Midnight robe side angle",
      "/placeholder.svg?height=600&width=500&text=Close-up silk texture detail",
      "/placeholder.svg?height=600&width=500&text=Lifestyle shot in bedroom",
      "/placeholder.svg?height=600&width=500&text=Macro silk weave texture",
      "/placeholder.svg?height=600&width=500&text=Model wearing robe naturally",
    ],
    video: "/placeholder.mp4",
    description: {
      sensory:
        "There&apos;s something almost ceremonial about slipping into this robe—the way the silk settles against your skin like a gentle embrace, the subtle weight that speaks of quality without ever feeling heavy. This is the piece you reach for when the day demands softness, when you need to wrap yourself in something that understands the art of quiet luxury.",
      lifestyle:
        "Perfect for those stolen moments between day and night, when the world slows down and you can finally breathe. Whether it&apos;s your morning coffee ritual or the gentle transition into evening, this robe transforms ordinary moments into something sacred.",
      style:
        "The relaxed silhouette drapes beautifully without overwhelming, while the classic lapel collar adds a touch of timeless elegance. It&apos;s sophisticated enough for unexpected guests, yet intimate enough for your most private moments.",
    },
    specifications: {
      fabric: "100% Grade 6A Mulberry Silk Charmeuse",
      weight: "22 Momme",
      care: "Dry clean recommended or gentle hand wash",
      sustainability: "Ethically sourced from certified sustainable silk farms",
      origin: "Crafted by skilled artisans in partnership with traditional silk makers",
    },
    fit: {
      type: "Relaxed fit, true to size",
      modelInfo: "Model is 5&apos;8\" wearing size S",
      notes: "Designed for comfortable layering with a graceful drape",
    },
  }

  const complementaryProducts = [
    {
      id: 2,
      name: "Silk Camisole",
      price: 125,
      image: "/placeholder.svg?height=300&width=240&text=Matching camisole",
    },
    {
      id: 3,
      name: "Silk Sleep Shorts",
      price: 95,
      image: "/placeholder.svg?height=300&width=240&text=Silk shorts",
    },
    {
      id: 4,
      name: "Cashmere Slippers",
      price: 85,
      image: "/placeholder.svg?height=300&width=240&text=Luxury slippers",
    },
    {
      id: 5,
      name: "Silk Eye Mask",
      price: 45,
      image: "/placeholder.svg?height=300&width=240&text=Sleep mask",
    },
  ]

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      size: "M",
      verified: true,
      text: "This robe is everything I hoped for and more. The silk is incredibly soft and the fit is perfect. I feel so elegant wearing it.",
      helpful: 12,
    },
    {
      id: 2,
      name: "Emma L.",
      rating: 5,
      date: "1 month ago",
      size: "S",
      verified: true,
      text: "Worth every penny. The quality is exceptional and it&apos;s become part of my daily routine. Highly recommend!",
      helpful: 8,
    },
    {
      id: 3,
      name: "Jessica R.",
      rating: 4,
      date: "3 weeks ago",
      size: "L",
      verified: true,
      text: "Beautiful robe, though I wish it came in more colors. The midnight navy is gorgeous though.",
      helpful: 5,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    // Add to bag logic here
    console.log("Added to bag:", { product: product.id, color: selectedColor, size: selectedSize, quantity })
  }

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Breadcrumb */}
      <div className="hidden lg:block py-4 border-b border-stone-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-stone-800">
              Shop
            </Link>
            <span>/</span>
            <span className="text-stone-800">Robes</span>
            <span>/</span>
            <span className="text-stone-800">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {selectedImage === 0 && (
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
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${selectedImage === index ? "border-stone-800" : "border-stone-200 hover:border-stone-400"
                    }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Additional Images Button */}
            {product.images.length > 4 && (
              <Button
                variant="outline"
                className="w-full border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
              >
                <Eye className="w-4 h-4 mr-2" />
                View All {product.images.length} Images
              </Button>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-light text-stone-800 font-serif">{product.name}</h1>
              <p className="text-lg text-stone-600 italic">{product.shortDescription}</p>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-light text-stone-800">${product.price}</span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-stone-400 text-stone-400" : "text-stone-300"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-stone-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-stone-800">
                Color: {product.colors.find((c) => c.id === selectedColor)?.name}
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${selectedColor === color.id ? "border-stone-800" : "border-stone-300"
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-stone-800">Size</h3>
                <Dialog open={showSizeGuide} onOpenChange={setShowSizeGuide}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800 p-0">
                      Size Guide
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Size Guide</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-stone-600">Our robes are designed for a relaxed, comfortable fit.</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-stone-200">
                              <th className="text-left py-2">Size</th>
                              <th className="text-left py-2">Bust</th>
                              <th className="text-left py-2">Length</th>
                              <th className="text-left py-2">Sleeve</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-stone-100">
                              <td className="py-2">XS</td>
                              <td className="py-2">32-34"</td>
                              <td className="py-2">48"</td>
                              <td className="py-2">23"</td>
                            </tr>
                            <tr className="border-b border-stone-100">
                              <td className="py-2">S</td>
                              <td className="py-2">34-36"</td>
                              <td className="py-2">49"</td>
                              <td className="py-2">23.5"</td>
                            </tr>
                            <tr className="border-b border-stone-100">
                              <td className="py-2">M</td>
                              <td className="py-2">36-38"</td>
                              <td className="py-2">50"</td>
                              <td className="py-2">24"</td>
                            </tr>
                            <tr className="border-b border-stone-100">
                              <td className="py-2">L</td>
                              <td className="py-2">38-40"</td>
                              <td className="py-2">51"</td>
                              <td className="py-2">24.5"</td>
                            </tr>
                            <tr>
                              <td className="py-2">XL</td>
                              <td className="py-2">40-42"</td>
                              <td className="py-2">52"</td>
                              <td className="py-2">25"</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size.id}
                    variant={selectedSize === size.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => size.inStock && setSelectedSize(size.id)}
                    disabled={!size.inStock}
                    className={`${selectedSize === size.id
                        ? "bg-stone-800 hover:bg-stone-700 text-white"
                        : size.inStock
                          ? "border-stone-300 text-stone-700 hover:bg-stone-100"
                          : "border-stone-200 text-stone-400 cursor-not-allowed"
                      }`}
                  >
                    {size.name}
                  </Button>
                ))}
              </div>
              {!product.sizes.find((s) => s.id === "l")?.inStock && (
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
                  Add to Bag - ${product.price * quantity}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-full border-stone-300 text-stone-700 hover:bg-stone-100"
                >
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  {isWishlisted ? "Remove from" : "Add to"} Wishlist
                </Button>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center space-x-4 pt-4 border-t border-stone-200">
              <span className="text-sm text-stone-600">Share:</span>
              <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Add to Bag (Mobile) */}
      {isSticky && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 p-4">
          <Button size="lg" onClick={handleAddToBag} className="w-full bg-stone-800 hover:bg-stone-700 text-white">
            Add to Bag - ${product.price * quantity}
          </Button>
        </div>
      )}

      {/* Product Details Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Sensory Description */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-light text-stone-800 font-serif">
              For mornings when the world can wait
            </h2>
            <div className="space-y-4 text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto">
              <p>{product.description.sensory}</p>
              <p>{product.description.lifestyle}</p>
              <p>{product.description.style}</p>
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
                      <ul className="space-y-1 text-sm">
                        <li>• {product.specifications.fabric}</li>
                        <li>• {product.specifications.weight} weight</li>
                        <li>• {product.specifications.origin}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-800 mb-2">Care & Sustainability</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• {product.specifications.care}</li>
                        <li>• {product.specifications.sustainability}</li>
                        <li>
                          •{" "}
                          <Link href="/our-silk" className="text-stone-700 hover:text-stone-900 underline">
                            Learn about our silk
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fit" className="border-stone-200">
                <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
                  Fit & Sizing
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-stone-600">
                  <div className="space-y-2 text-sm">
                    <p>• {product.fit.type}</p>
                    <p>• {product.fit.modelInfo}</p>
                    <p>• {product.fit.notes}</p>
                  </div>
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
                    <p>• Complimentary gift wrapping available</p>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {complementaryProducts.map((item) => (
                <Card
                  key={item.id}
                  className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-light text-stone-800 mb-2 group-hover:text-stone-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-stone-800">${item.price}</span>
                      <Button size="sm" className="bg-stone-800 hover:bg-stone-700 text-white">
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl lg:text-3xl font-light text-stone-800">What Our Customers Say</h2>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-stone-400 text-stone-400" : "text-stone-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-lg text-stone-600">
                  {product.rating} out of 5 ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="border-0 shadow-sm bg-white p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "fill-stone-400 text-stone-400" : "text-stone-300"
                                  }`}
                              />
                            ))}
                          </div>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                              <Check className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-stone-600">
                          <span className="font-medium">{review.name}</span>
                          <span>Size {review.size}</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-stone-700 leading-relaxed">{review.text}</p>
                    <div className="flex items-center justify-between text-sm text-stone-500">
                      <span>Was this helpful? ({review.helpful})</span>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800">
                          Yes
                        </Button>
                        <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800">
                          No
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
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
  )
}
