"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Filter, Grid3X3, List, Eye, Plus, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CartDrawer } from "@/components/cart/cart-drawer"

export default function ShopPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSort, setSelectedSort] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  // const [quickViewProduct, setQuickViewProduct] = useState<any>(null)
  const [wishlist, setWishlist] = useState<number[]>([])
  // const [filters, setFilters] = useState({
  //   size: [] as string[],
  //   color: [] as string[],
  //   price: [] as string[],
  //   fabric: [] as string[],
  // })

  const categories = [
    { id: "all", name: "All Products" },
    { id: "loungewear", name: "Loungewear" },
    { id: "sleepwear", name: "Sleepwear" },
    { id: "robes", name: "Robes" },
    { id: "accessories", name: "Accessories" },
  ]

  const sortOptions = [
    { id: "newest", name: "Newest" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "bestsellers", name: "Bestsellers" },
  ]

  const filterOptions = {
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Ivory", "Champagne", "Sage", "Midnight", "Pearl Grey", "Warm Beige"],
    price: ["Under $100", "$100-$200", "$200-$300", "$300+"],
    fabric: ["Mulberry Silk", "Silk Charmeuse", "Silk Satin", "Cotton Blend"],
  }

  const products = [
    {
      id: 1,
      name: "Midnight Silk Robe",
      description: "100% Mulberry Silk Charmeuse Robe",
      price: 298,
      originalPrice: null,
      category: "robes",
      color: "Midnight Navy",
      fabric: "Mulberry Silk",
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "/placeholder.svg?height=400&width=300&text=Midnight silk robe on model",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Midnight robe detail shot",
      isNew: true,
      isBestseller: false,
      isLimited: false,
      rating: 4.9,
      reviews: 127,
      stock: 8,
    },
    {
      id: 2,
      name: "Morning Mist Camisole Set",
      description: "Silk Camisole & Short Set",
      price: 189,
      originalPrice: null,
      category: "sleepwear",
      color: "Pearl Grey",
      fabric: "Silk Charmeuse",
      sizes: ["XS", "S", "M", "L"],
      image: "/placeholder.svg?height=400&width=300&text=Pearl grey camisole set",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Camisole set lifestyle",
      isNew: false,
      isBestseller: true,
      isLimited: false,
      rating: 4.8,
      reviews: 89,
      stock: 12,
    },
    {
      id: 3,
      name: "Champagne Dreams Lounge Set",
      description: "Silk Lounge Top & Wide Leg Pants",
      price: 245,
      originalPrice: 295,
      category: "loungewear",
      color: "Champagne",
      fabric: "Mulberry Silk",
      sizes: ["S", "M", "L", "XL"],
      image: "/placeholder.svg?height=400&width=300&text=Champagne lounge set",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Lounge set styled",
      isNew: false,
      isBestseller: false,
      isLimited: false,
      rating: 4.9,
      reviews: 203,
      stock: 5,
    },
    {
      id: 4,
      name: "Sage Serenity Short Set",
      description: "Silk Button-Up Pajama Set",
      price: 165,
      originalPrice: null,
      category: "sleepwear",
      color: "Muted Sage",
      fabric: "Silk Satin",
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "/placeholder.svg?height=400&width=300&text=Sage green pajama set",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Sage pajamas detail",
      isNew: true,
      isBestseller: false,
      isLimited: false,
      rating: 4.7,
      reviews: 56,
      stock: 15,
    },
    {
      id: 5,
      name: "Ivory Elegance Slip Dress",
      description: "Bias-Cut Silk Slip Dress",
      price: 225,
      originalPrice: null,
      category: "sleepwear",
      color: "Soft Ivory",
      fabric: "Silk Charmeuse",
      sizes: ["XS", "S", "M", "L"],
      image: "/placeholder.svg?height=400&width=300&text=Ivory silk slip dress",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Slip dress movement",
      isNew: false,
      isBestseller: true,
      isLimited: false,
      rating: 4.8,
      reviews: 142,
      stock: 7,
    },
    {
      id: 6,
      name: "Cashmere Touch Eye Mask",
      description: "Silk Sleep Mask with Elastic Band",
      price: 45,
      originalPrice: null,
      category: "accessories",
      color: "Warm Beige",
      fabric: "Mulberry Silk",
      sizes: ["One Size"],
      image: "/placeholder.svg?height=400&width=300&text=Silk eye mask",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Eye mask lifestyle",
      isNew: false,
      isBestseller: false,
      isLimited: true,
      rating: 4.9,
      reviews: 78,
      stock: 3,
    },
    {
      id: 7,
      name: "Moonlight Kimono Robe",
      description: "Oversized Silk Kimono with Belt",
      price: 325,
      originalPrice: null,
      category: "robes",
      color: "Midnight Navy",
      fabric: "Silk Charmeuse",
      sizes: ["S/M", "L/XL"],
      image: "/placeholder.svg?height=400&width=300&text=Navy kimono robe",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Kimono robe flowing",
      isNew: true,
      isBestseller: false,
      isLimited: true,
      rating: 4.9,
      reviews: 34,
      stock: 4,
    },
    {
      id: 8,
      name: "Classic Pajama Set",
      description: "Long Sleeve Silk Pajama Set",
      price: 285,
      originalPrice: null,
      category: "sleepwear",
      color: "Champagne",
      fabric: "Mulberry Silk",
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "/placeholder.svg?height=400&width=300&text=Champagne pajama set",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Pajama set detail",
      isNew: false,
      isBestseller: true,
      isLimited: false,
      rating: 4.8,
      reviews: 156,
      stock: 11,
    },
  ]

  const editorialInserts = [
    {
      position: 3,
      title: "The Art of Layering",
      subtitle: "Discover how our pieces work together",
      image: "/placeholder.svg?height=300&width=600&text=Layered silk pieces lifestyle shot",
      cta: "Shop the Look",
    },
    {
      position: 6,
      title: "Customer Favorites",
      subtitle: "The pieces our community can't live without",
      image: "/placeholder.svg?height=300&width=600&text=Bestselling silk pieces arranged beautifully",
      cta: "See Bestsellers",
    },
  ]

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) return false
    // Add more filter logic here
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "bestsellers":
        return b.isBestseller ? 1 : -1
      default:
        return b.isNew ? 1 : -1
    }
  })

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">The Collection</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Discover pieces crafted from the finest mulberry silk, designed to elevate your most intimate moments with
              unparalleled comfort and timeless elegance.
            </p>
          </div>

          <div className="relative aspect-[21/9] overflow-hidden rounded-lg mb-8">
            <Image
              src="/placeholder.svg?height=400&width=1200&text=Silk fabric in motion with soft lighting"
              alt="Silk collection hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="sticky top-16 lg:top-20 z-40 bg-white border-b border-stone-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden border-stone-300 bg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-white">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">{/* Mobile filter content would go here */}</div>
                </SheetContent>
              </Sheet>

              {/* Desktop Categories */}
              <div className="hidden lg:flex items-center space-x-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-sm transition-colors ${
                      selectedCategory === category.id
                        ? "text-stone-900 font-medium border-b border-stone-300"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-stone-600 hidden sm:block">{sortedProducts.length} products</span>

              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-40 border-stone-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="hidden sm:flex items-center space-x-1 border border-stone-300 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-stone-800 mb-3">Size</h3>
                <div className="space-y-2">
                  {filterOptions.size.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox id={`size-${size}`} />
                      <label htmlFor={`size-${size}`} className="text-sm text-stone-600">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-stone-800 mb-3">Color</h3>
                <div className="space-y-2">
                  {filterOptions.color.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox id={`color-${color}`} />
                      <label htmlFor={`color-${color}`} className="text-sm text-stone-600">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-stone-800 mb-3">Price</h3>
                <div className="space-y-2">
                  {filterOptions.price.map((price) => (
                    <div key={price} className="flex items-center space-x-2">
                      <Checkbox id={`price-${price}`} />
                      <label htmlFor={`price-${price}`} className="text-sm text-stone-600">
                        {price}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-stone-800 mb-3">Fabric</h3>
                <div className="space-y-2">
                  {filterOptions.fabric.map((fabric) => (
                    <div key={fabric} className="flex items-center space-x-2">
                      <Checkbox id={`fabric-${fabric}`} />
                      <label htmlFor={`fabric-${fabric}`} className="text-sm text-stone-600">
                        {fabric}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div
              className={`grid gap-8 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {sortedProducts.map((product, index) => {
                // Insert editorial content
                const editorialInsert = editorialInserts.find((insert) => insert.position === index)

                return (
                  <div key={product.id} className="space-y-8">
                    {editorialInsert && (
                      <Card className="col-span-full border-0 shadow-sm bg-white overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={editorialInsert.image || "/placeholder.svg"}
                              alt={editorialInsert.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-6 flex flex-col justify-center">
                            <h3 className="text-2xl font-light text-stone-800 mb-2">{editorialInsert.title}</h3>
                            <p className="text-stone-600 mb-4">{editorialInsert.subtitle}</p>
                            <Button
                              variant="outline"
                              className="w-fit border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                            >
                              {editorialInsert.cta}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}

                    <Link href={`/product/${product.id}`} key={product.id}>
                      <Card className="group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden">
                        <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-105"
                          />
                          <Image
                            src={product.hoverImage || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-500 opacity-0 group-hover:opacity-100"
                          />

                          {/* Badges */}
                          <div className="absolute top-4 left-4 space-y-2">
                            {product.isNew && <Badge className="bg-stone-800 text-white">New</Badge>}
                            {product.isBestseller && <Badge className="bg-amber-600 text-white">Bestseller</Badge>}
                            {product.isLimited && <Badge className="bg-red-600 text-white">Limited</Badge>}
                            {product.originalPrice && <Badge variant="destructive">Sale</Badge>}
                          </div>

                          {/* Action Buttons */}
                          <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="icon"
                              variant="secondary"
                              onClick={(e) => {
                                e.preventDefault()
                                toggleWishlist(product.id)
                              }}
                              className="bg-white/90 hover:bg-white"
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-stone-600"
                                }`}
                              />
                            </Button>
                            <Button
                              size="icon"
                              variant="secondary"
                              // onClick={(e) => {
                              //   e.preventDefault()
                              //   setQuickViewProduct(product)
                              // }}
                              className="bg-white/90 hover:bg-white"
                            >
                              <Eye className="w-4 h-4 text-stone-600" />
                            </Button>
                          </div>

                          {/* Quick Add Button */}
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button className="w-full bg-stone-800 hover:bg-stone-700 text-white">
                              <Plus className="w-4 h-4 mr-2" />
                              Quick Add
                            </Button>
                          </div>

                          {/* Stock Indicator */}
                          {product.stock <= 5 && (
                            <div className="absolute bottom-4 left-4">
                              <Badge variant="outline" className="bg-white/90 text-stone-600 border-stone-300">
                                Only {product.stock} left
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-0">
                          <div className="space-y-2">
                            <h3 className="font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-stone-600">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {product.originalPrice && (
                                  <span className="text-sm text-stone-400 line-through">${product.originalPrice}</span>
                                )}
                                <span className="font-medium text-stone-800">${product.price}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(product.rating)
                                          ? "fill-stone-400 text-stone-400"
                                          : "text-stone-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-stone-500">({product.reviews})</span>
                              </div>
                            </div>
                            <p className="text-xs text-stone-500">
                              {product.color} • {product.fabric}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                )
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
              >
                Load More Products
              </Button>
            </div>
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      {/* <Dialog open={!!quickViewProduct} onOpenChange={() => setQuickViewProduct(null)}>
        <DialogContent className="max-w-4xl">
          {quickViewProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={quickViewProduct.image || "/placeholder.svg"}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-light text-stone-800 mb-2">{quickViewProduct.name}</h2>
                  <p className="text-stone-600 mb-4">{quickViewProduct.description}</p>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-2xl font-medium text-stone-800">${quickViewProduct.price}</span>
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 mr-2 ${
                              i < Math.floor(quickViewProduct.rating) ? "fill-red-500 text-red-500" : "text-stone-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-stone-500">({quickViewProduct.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-stone-800 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size: string) => (
                      <Button
                        key={size}
                        variant="outline"
                        size="sm"
                        className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-stone-800 hover:bg-stone-700 text-white">
                    Add to Bag - ${quickViewProduct.price}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${
                        wishlist.includes(quickViewProduct.id) ? "fill-red-500 text-red-500" : "text-stone-600"
                      }`}
                    />
                    {wishlist.includes(quickViewProduct.id) ? "Remove from" : "Add to"} Wishlist
                  </Button>
                </div>

                <div className="text-sm text-stone-600 space-y-1">
                  <p>• {quickViewProduct.fabric}</p>
                  <p>• Free shipping on orders over $200</p>
                  <p>• 30-day returns</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog> */}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
