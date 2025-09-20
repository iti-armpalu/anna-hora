"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ChevronRight, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CartDrawer } from "@/components/cart/cart-drawer"

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const products = [
    {
      id: 1,
      name: "Midnight Silk Robe",
      price: 298,
      originalPrice: null,
      category: "robes",
      color: "Midnight Navy",
      image: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
      isNew: true,
      rating: 4.9,
      reviews: 127,
    },
    {
      id: 2,
      name: "Morning Mist Camisole Set",
      price: 189,
      originalPrice: null,
      category: "sleepwear",
      color: "Pearl Grey",
      image: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
      isNew: false,
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      name: "Champagne Dreams Lounge Set",
      price: 245,
      originalPrice: 295,
      category: "lounge",
      color: "Champagne",
      image: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
      isNew: false,
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 4,
      name: "Sage Serenity Short Set",
      price: 165,
      originalPrice: null,
      category: "sleepwear",
      color: "Muted Sage",
      image: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
      isNew: true,
      rating: 4.7,
      reviews: 56,
    },
    {
      id: 5,
      name: "Ivory Elegance Slip Dress",
      price: 225,
      originalPrice: null,
      category: "sleepwear",
      color: "Soft Ivory",
      image: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
      isNew: false,
      rating: 4.8,
      reviews: 142,
    },
    {
      id: 6,
      name: "Cashmere Touch Eye Mask",
      price: 45,
      originalPrice: null,
      category: "accessories",
      color: "Warm Beige",
      image: "/placeholder.svg?height=400&width=300",
      hoverImage: "/placeholder.svg?height=400&width=300",
      isNew: false,
      rating: 4.9,
      reviews: 78,
    },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const categories = [
    { id: "all", name: "All" },
    { id: "robes", name: "Robes" },
    { id: "sleepwear", name: "Sleepwear" },
    { id: "lounge", name: "Lounge Sets" },
    { id: "accessories", name: "Accessories" },
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
        {/* <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-800 mb-6 leading-tight">
            For the moments
            <br />
            <em className="font-serif italic">you keep to yourself</em>
          </h2>
          <p className="text-lg md:text-xl text-stone-600 mb-8 max-w-2xl mx-auto font-light">
            Discover our collection of premium silk loungewear, crafted for those who understand that true luxury lies
            in the quiet moments of self-care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3">
              Explore Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-3 bg-transparent"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Our Story
            </Button>
          </div>
        </div> */}


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
            {/* <Button href="/shop" size="lg" className="bg-stone-200 hover:bg-stone-300 text-black px-8 py-3">
              Explore Collection
            </Button> */}
            <Button asChild size="lg" className="bg-stone-200 hover:bg-stone-300 text-black px-8 py-3">
              <Link href="/shop">Explore Collection</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-stone-300 text-stone-300 hover:bg-stone-100 px-8 py-3 bg-transparent"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Our Story
            </Button>
          </div>
        </div>




      </section>

      {/* Featured Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Curated for Comfort</h3>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Each piece is thoughtfully designed to elevate your most intimate moments, crafted from the finest
              mulberry silk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=500&width=375"
                  alt="Robes Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-light mb-2">Robes</h4>
                  <p className="text-sm opacity-90">Wrap yourself in luxury</p>
                </div>
              </div>
            </Card>

            <Card className="group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=500&width=375"
                  alt="Sleepwear Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-light mb-2">Sleepwear</h4>
                  <p className="text-sm opacity-90">Dreams in silk</p>
                </div>
              </div>
            </Card>

            <Card className="group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=500&width=375"
                  alt="Lounge Sets Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-light mb-2">Lounge Sets</h4>
                  <p className="text-sm opacity-90">Effortless elegance</p>
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
                The Art of <em className="font-serif italic">Mulberry Silk</em>
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Our silk is sourced from the finest mulberry trees, where silkworms are nurtured in pristine conditions.
                Each thread is carefully selected for its lustrous sheen, incredible softness, and natural
                temperature-regulating properties.
              </p>
              <p className="text-stone-600 leading-relaxed">
                The result is fabric that feels like a gentle caress against your skin, naturally hypoallergenic and
                breathable, perfect for those precious moments of rest and reflection.
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
              {/* <Button href="our-silk" variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent">
                Learn More About Our Silk
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button> */}
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
            <div className="flex items-center space-x-4 mt-6 sm:mt-0">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 border-stone-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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
              variant="outline"
              size="lg"
              className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
            >
              View All Products
              <ChevronRight className="w-4 h-4 ml-2" />
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
              Give the gift of quiet luxury. Each piece arrives beautifully packaged, ready to create moments of joy and
              self-care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Luxury Gift Set"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-light text-stone-800 mb-2">The Self-Care Collection</h4>
                <p className="text-stone-600 mb-4">
                  A curated selection of our most beloved pieces, perfect for creating a complete ritual of relaxation.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-stone-800">From $395</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                  >
                    Shop Collection
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Gift Wrapping"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-light text-stone-800 mb-2">Complimentary Gift Wrapping</h4>
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

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Me-Time Letters</h3>
            <p className="text-stone-600 mb-8">
              Join our community and receive thoughtful notes about self-care, styling tips, and exclusive access to new
              collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1 border-stone-300 focus:border-stone-500"
              />
              <Button className="bg-stone-800 hover:bg-stone-700 text-white px-8">Subscribe</Button>
            </div>
            <p className="text-xs text-stone-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
