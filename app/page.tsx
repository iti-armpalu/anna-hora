"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CartDrawer } from "@/components/cart/cart-drawer"
import AsSeenIn from "@/components/press/as-seen-in"

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const products = [
    {
      id: 1,
      name: "Off White Pure Silk Lounge Shirt",
      price: 298,
      originalPrice: null,
      category: "robes",
      color: "Midnight Navy",
      image: "/off-white-pure-silk-lounge-shirt.webp",
      hoverImage: "/off-white-pure-silk-lounge-shirt.webp",
      isNew: true,
      rating: 4.9,
      reviews: 127,
    },
    {
      id: 2,
      name: "Verdant Panther Pure Silk Lounge Shirt",
      price: 189,
      originalPrice: null,
      category: "sleepwear",
      color: "Pearl Grey",
      image: "/verdant-panther-pure-silk-lounge-shirt.webp",
      hoverImage: "/verdant-panther-pure-silk-lounge-shirt.webp",
      isNew: false,
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      name: "Pure Silk Lounge",
      price: 245,
      originalPrice: 295,
      category: "lounge",
      color: "Champagne",
      image: "/pure-silk-lounge-shorts.webp",
      hoverImage: "/pure-silk-lounge-shorts.webp",
      isNew: false,
      rating: 4.9,
      reviews: 203,
    },
  ]

  return (
    <div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-200">
          <Image
            src="/anna-hora-hero-1.webp"
            alt="Silk loungewear hero"
            fill
            className="object-cover opacity-100"
            priority
          />
        </div>


        <div className="relative z-10 w-full text-left px-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-200 mb-6 leading-tight text-left">
            For the moments
            <br />
            <em className="font-serif italic">you keep to yourself</em>
          </h2>

          <p className="text-lg md:text-xl text-stone-400 mb-8 max-w-2xl font-light text-left">
            Discover our collection of premium silk loungewear, crafted for those who understand that true luxury lies
            in the quiet moments of self-care.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <Button asChild size="lg" className="bg-stone-200 hover:bg-stone-300 text-black px-8 py-3">
              <Link href="/shop">Explore Collection</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-stone-300 text-stone-300 hover:bg-stone-100 px-8 py-3 bg-transparent"
            >
              <Link href="/about">About ANNA</Link>
            </Button>
          </div>
        </div>




      </section>

      {/* Featured Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Curated for <em className="font-serif italic">Uncomplicated Happiness</em></h3>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Each piece is thoughtfully designed to elevate your most intimate moments, a dialogue between texture, form, and feeling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group border-0 shadow-none bg-transparent overflow-hidden">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/velvet-trousers.webp"
                  alt="Velvet Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-light mb-2">Indulgent Velvet</h4>
                  <p className="text-sm opacity-90">Soft depth, warm touch. Sumptuous textures for unhurried evenings</p>
                  <div className="flex justify-start mt-8">
                    <Button
                      asChild
                      className="bg-stone-200 hover:bg-stone-300 text-black px-8 py-3"
                    >
                      <Link href="/collections/velvet">Explore Velvet Collection</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/silk-trousers.webp"
                  alt="Sleepwear Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-light mb-2">Pure Silk Moments</h4>
                  <p className="text-sm opacity-90">Light, fluid, and timeless. Breathable luxury crafted from the finest mulberry silk.</p>
                  <div className="flex justify-start mt-8">
                    <Button
                      asChild
                      className="bg-stone-200 hover:bg-stone-300 text-black px-8 py-3"
                    >
                      <Link href="/collections/velvet">Explore Silk Collection</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/silk-set.webp"
                  alt="Lounge Sets Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-light mb-2">Effortless Pairings</h4>
                  <p className="text-sm opacity-90">Wear them together or apart. Separate pieces designed to move in harmony.</p>
                  <div className="flex justify-start mt-8">
                    <Button
                      asChild
                      className="bg-stone-200 hover:bg-stone-300 text-black px-8 py-3"
                    >
                      <Link href="/collections/velvet">Explore Sets Collection</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Silk Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <Image
                src="/anna-hora-silk.webp"
                alt="Premium silk texture"
                width={500}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800">
                The art of <em className="font-serif italic">Mulberry Silk</em>
              </h3>
              {/* <p className="text-stone-600 leading-relaxed">
                Our silk is sourced from the finest mulberry trees, where silkworms are nurtured in pristine conditions.
                Each thread is carefully selected for its lustrous sheen, incredible softness, and natural
                temperature-regulating properties.
              </p>
              <p className="text-stone-600 leading-relaxed">
                The result is fabric that feels like a gentle caress against your skin, naturally hypoallergenic and
                breathable, perfect for those precious moments of rest and reflection.
              </p> */
              }
              <p className="text-stone-600 leading-relaxed">
                Our silk reflects everything ANNA HORA stands for: timeless elegance, integrity, 
                and a devotion to quality that can be felt in every detail. We work with skilled artisans who honour time-honoured techniques, transforming this natural wonder into pieces that embody refinement and ease.
              </p>
              <p className="text-stone-600 leading-relaxed">
                It took us 18 months to find the silk we truly believed in, one that met our standards for beauty, 
                comfort, and sustainability. The result is a fabric that feels effortlessly luxurious against the skin, 
                created for moments of calm, confidence, and uncomplicated happiness, a quiet expression of the ANNA HORA 
                way of living.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="font-medium text-stone-800 mb-2">22 Momme Weight</h4>
                  <p className="text-sm text-stone-600">The perfect balance of durability and drape</p>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800 mb-2">Grade 6A Quality</h4>
                  <p className="text-sm text-stone-600">The highest grade of mulberry silk</p>
                </div>
              </div>
              <Button asChild variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent">
                <Link href="/our-silk"> Learn More About Our Silk</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Featured Pieces</h3>
              <p className="text-stone-600">Handpicked selections for your most cherished moments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <Card
                  className="group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={hoveredProduct === product.id ? product.hoverImage : product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-500"
                    />
                    {product.isNew && <Badge className="absolute top-4 left-4 bg-stone-800 text-white">New</Badge>}
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={(e) => {
                        e.preventDefault()
                        // Add wishlist logic here
                      }}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    {product.originalPrice && (
                      <Badge variant="destructive" className="absolute bottom-4 left-4">
                        Sale
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {product.originalPrice && (
                          <span className="text-sm text-stone-400 line-through">${product.originalPrice}</span>
                        )}
                        <span className="font-medium text-stone-800">${product.price}</span>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 mb-2">{product.color}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-stone-400 text-stone-400" : "text-stone-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-stone-500">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
            >
              <Link href="/shop">
                View All Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gift Guide Section */}
      <section className="py-16 lg:py-24 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Thoughtful Gifting</h3>
            <p className="text-stone-600 max-w-2xl mx-auto">
              A gesture of grace and intention. Each ANNA HORA piece is beautifully presented, crafted to bring a sense of calm, warmth, and quiet joy to the moments that matter most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/anna-hora-giftcard-2.webp?height=300&width=400"
                  alt="Luxury Gift Set"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-light text-stone-800 mb-2">Gift Cards</h4>
                <p className="text-stone-600 mb-4">
                  Let them choose their perfect piece. Our digital gift cards arrive instantly and never expire, making them the perfect last-minute gift.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-stone-800">From $50</span>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                  >
                    <Link href="/gift-guide">
                      View Gift Guide
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/gift-wrapping.webp?height=300&width=400"
                  alt="Gift Wrapping"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <h4 className="text-xl font-light text-stone-800">Complimentary Gift Wrapping</h4>
                  <Badge variant="secondary" className="bg-stone-100 text-stone-700 hover:bg-stone-300 font-normal">
                    FSC-certified recycled paper
                  </Badge>
                </div>
                <p className="text-stone-600 mb-4">
                  Every gift is wrapped in our signature packaging with a handwritten note, making each delivery a
                  moment to treasure.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-stone-800">Always Included</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <AsSeenIn />

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Me-Time Letters</h3>
            <p className="text-stone-600 mb-8">
              Join our community and receive thoughtful notes about self-care, styling tips, and exclusive access to new
              collections. Sent occasionally, always with intention.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1 border-stone-300 focus:border-stone-500"
              />
              <Button className="bg-anna-green-950 hover:bg-stone-700 text-white px-8">Subscribe</Button>
            </div>
            <p className="text-xs text-stone-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
