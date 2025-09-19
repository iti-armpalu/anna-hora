"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Gift, Star, ChevronRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GiftGuidePage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [giftCardAmount, setGiftCardAmount] = useState("100")
  const [giftCardType, setGiftCardType] = useState("digital")

  const giftCollections = {
    occasion: [
      {
        id: "birthday",
        name: "Birthday Bliss",
        description: "Celebrate another year of beautiful moments",
        image: "/placeholder.svg?height=400&width=600&text=Birthday gift with silk robe and flowers",
        products: [
          { id: 1, name: "Champagne Dreams Robe", price: 298, image: "/placeholder.svg?height=300&width=240" },
          { id: 2, name: "Birthday Silk Set", price: 245, image: "/placeholder.svg?height=300&width=240" },
          { id: 3, name: "Celebration Camisole", price: 165, image: "/placeholder.svg?height=300&width=240" },
        ],
      },
      {
        id: "bridal",
        name: "Bridal Elegance",
        description: "For the bride who deserves the finest",
        image: "/placeholder.svg?height=400&width=600&text=Bridal silk pieces in ivory and champagne",
        products: [
          { id: 4, name: "Ivory Bridal Robe", price: 345, image: "/placeholder.svg?height=300&width=240" },
          { id: 5, name: "Wedding Morning Set", price: 425, image: "/placeholder.svg?height=300&width=240" },
          { id: 6, name: "Honeymoon Slip", price: 225, image: "/placeholder.svg?height=300&width=240" },
        ],
      },
      {
        id: "mothers-day",
        name: "Mother's Day",
        description: "Honor the woman who gave you everything",
        image: "/placeholder.svg?height=400&width=600&text=Mother's Day gift with silk pajamas and tea",
        products: [
          { id: 7, name: "Mom's Comfort Set", price: 285, image: "/placeholder.svg?height=300&width=240" },
          { id: 8, name: "Maternal Grace Robe", price: 325, image: "/placeholder.svg?height=300&width=240" },
          { id: 9, name: "Morning Ritual Set", price: 195, image: "/placeholder.svg?height=300&width=240" },
        ],
      },
    ],
    mood: [
      {
        id: "self-care",
        name: "Self-Care Rituals",
        description: "For moments of pure indulgence",
        image: "/placeholder.svg?height=400&width=600&text=Self-care setup with silk robe and bath items",
        products: [
          { id: 10, name: "Ritual Robe", price: 298, image: "/placeholder.svg?height=300&width=240" },
          { id: 11, name: "Meditation Set", price: 245, image: "/placeholder.svg?height=300&width=240" },
          { id: 12, name: "Serenity Slip", price: 185, image: "/placeholder.svg?height=300&width=240" },
        ],
      },
      {
        id: "elegant-evenings",
        name: "Elegant Evenings",
        description: "For sophisticated nights at home",
        image: "/placeholder.svg?height=400&width=600&text=Evening silk wear with candles and wine",
        products: [
          { id: 13, name: "Evening Elegance Set", price: 365, image: "/placeholder.svg?height=300&width=240" },
          { id: 14, name: "Midnight Slip Dress", price: 275, image: "/placeholder.svg?height=300&width=240" },
          { id: 15, name: "Sophisticated Robe", price: 325, image: "/placeholder.svg?height=300&width=240" },
        ],
      },
      {
        id: "weekend-comfort",
        name: "Weekend Comfort",
        description: "For lazy mornings and peaceful afternoons",
        image: "/placeholder.svg?height=400&width=600&text=Weekend comfort with silk pajamas and coffee",
        products: [
          { id: 16, name: "Weekend Warrior Set", price: 225, image: "/placeholder.svg?height=300&width=240" },
          { id: 17, name: "Comfort Camisole", price: 145, image: "/placeholder.svg?height=300&width=240" },
          { id: 18, name: "Lazy Sunday Robe", price: 265, image: "/placeholder.svg?height=300&width=240" },
        ],
      },
    ],
    price: [
      {
        id: "under-150",
        name: "Under $150",
        description: "Thoughtful gifts that don't break the bank",
        image: "/placeholder.svg?height=400&width=600&text=Affordable silk accessories and small pieces",
        products: [
          { id: 19, name: "Silk Eye Mask", price: 45, image: "/placeholder.svg?height=300&width=240" },
          { id: 20, name: "Camisole Top", price: 125, image: "/placeholder.svg?height=300&width=240" },
          { id: 21, name: "Silk Scrunchie Set", price: 35, image: "/placeholder.svg?height=300&width=240" },
        ],
      },
      {
        id: "under-300",
        name: "Under $300",
        description: "Premium pieces for special occasions",
        image: "/placeholder.svg?height=400&width=600&text=Mid-range silk pieces beautifully presented",
        products: [
          { id: 22, name: "Classic Pajama Set", price: 245, image: "/placeholder.svg?height=300&width=240" },
          { id: 23, name: "Elegant Slip Dress", price: 225, image: "/placeholder.svg?height=300&width=240" },
          { id: 24, name: "Lounge Set", price: 285, image: "/placeholder.svg?height=300&width=240" },
        ],
      },
      {
        id: "luxe-indulgences",
        name: "Luxe Indulgences",
        description: "The ultimate in silk luxury",
        image: "/placeholder.svg?height=400&width=600&text=Luxury silk pieces in premium packaging",
        products: [
          { id: 25, name: "Luxury Robe Collection", price: 425, image: "/placeholder.svg?height=300&width=240" },
          { id: 26, name: "Complete Silk Wardrobe", price: 650, image: "/placeholder.svg?height=300&width=240" },
          { id: 27, name: "Signature Set", price: 385, image: "/placeholder.svg?height=300&width=240" },
        ],
      },
    ],
  }

  const giftCardAmounts = ["50", "100", "150", "200", "300", "500"]

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-light text-stone-800 leading-tight">
                The Art of
                <br />
                <em className="font-serif italic">Giving</em>
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                Some gifts are forgotten within days. Others become treasured rituals, woven into the fabric of daily
                life. When you give Anna Hora, you're not just giving a beautiful piece—you're giving moments of quiet
                luxury, mornings made more beautiful, and the daily reminder that she deserves the finest.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Each piece arrives wrapped in our signature packaging, ready to create a moment of pure joy for someone
                special.
              </p>
              <Button className="bg-stone-800 hover:bg-stone-700 text-white">
                <Gift className="w-4 h-4 mr-2" />
                Start Gifting
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=500&text=Beautifully wrapped silk gift with ribbon"
                alt="Elegant gift wrapping"
                width={500}
                height={600}
                className="rounded-lg"
              />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-stone-200 rounded-full opacity-30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Gift Collections */}
      {/* <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">Curated Gift Collections</h3>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Thoughtfully curated selections to help you find the perfect gift, whether you're celebrating a special
              occasion or simply showing you care.
            </p>
          </div>

          <Tabs defaultValue="occasion" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-stone-100">
              <TabsTrigger value="occasion" className="text-stone-700 data-[state=active]:bg-white">
                By Occasion
              </TabsTrigger>
              <TabsTrigger value="mood" className="text-stone-700 data-[state=active]:bg-white">
                By Mood
              </TabsTrigger>
              <TabsTrigger value="price" className="text-stone-700 data-[state=active]:bg-white">
                By Price
              </TabsTrigger>
            </TabsList>

            {Object.entries(giftCollections).map(([category, collections]) => (
              <TabsContent key={category} value={category} className="space-y-16">
                {collections.map((collection) => (
                  <div key={collection.id} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <h4 className="text-2xl lg:text-3xl font-light text-stone-800">{collection.name}</h4>
                        <p className="text-lg text-stone-600 leading-relaxed">{collection.description}</p>
                        <Button
                          variant="outline"
                          className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                        >
                          Shop Collection
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                        <Image
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {collection.products.map((product) => (
                        <Card
                          key={product.id}
                          className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <Button
                              size="icon"
                              variant="secondary"
                              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                          <CardContent className="p-6">
                            <h5 className="text-lg font-light text-stone-800 mb-2 group-hover:text-stone-600 transition-colors">
                              {product.name}
                            </h5>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-medium text-stone-800">${product.price}</span>
                              <Button size="sm" className="bg-stone-800 hover:bg-stone-700 text-white">
                                <Plus className="w-4 h-4 mr-1" />
                                Add to Bag
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section> */}

      {/* Gift Card Section */}
      <section className="py-16 lg:py-24 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                The ANNA HORA
                <br />
                <em className="font-serif italic">Gift Card</em>
              </h3>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                When you can't decide, let her choose. Our gift card — wrapped in silk, delivered
                with care.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=500&text=Elegant gift card with silk ribbon"
                  alt=" Gift Card"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>

              <Card className="border-0 shadow-lg bg-white p-8">
                <div className="space-y-6">
                  <h4 className="text-2xl font-light text-stone-800">Create Your Gift Card</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Gift Card Amount</label>
                      <div className="grid grid-cols-3 gap-2">
                        {giftCardAmounts.map((amount) => (
                          <Button
                            key={amount}
                            variant={giftCardAmount === amount ? "default" : "outline"}
                            size="sm"
                            onClick={() => setGiftCardAmount(amount)}
                            className={
                              giftCardAmount === amount
                                ? "bg-stone-800 hover:bg-stone-700 text-white"
                                : "border-stone-300 text-stone-700 hover:bg-stone-100"
                            }
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Delivery Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={giftCardType === "digital" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setGiftCardType("digital")}
                          className={
                            giftCardType === "digital"
                              ? "bg-stone-800 hover:bg-stone-700 text-white"
                              : "border-stone-300 text-stone-700 hover:bg-stone-100"
                          }
                        >
                          Digital
                        </Button>
                        <Button
                          variant={giftCardType === "physical" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setGiftCardType("physical")}
                          className={
                            giftCardType === "physical"
                              ? "bg-stone-800 hover:bg-stone-700 text-white"
                              : "border-stone-300 text-stone-700 hover:bg-stone-100"
                          }
                        >
                          Physical
                        </Button>
                      </div>
                      <p className="text-xs text-stone-500 mt-2">
                        {giftCardType === "digital"
                          ? "Delivered instantly via email with a personalized message"
                          : "Beautiful card posted in premium gift packaging"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Personal Message (Optional)
                      </label>
                      <textarea
                        className="w-full p-3 border border-stone-300 rounded-md focus:border-stone-500 focus:outline-none resize-none"
                        rows={3}
                        placeholder="Add a personal touch to your gift..."
                      />
                    </div>
                  </div>

                  <Button size="lg" className="w-full bg-stone-800 hover:bg-stone-700 text-white">
                    <Gift className="w-4 h-4 mr-2" />
                    Send Gift Card - ${giftCardAmount}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Experience Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-8">
              More Than a Gift,
              <br />
              <em className="font-serif italic">A Daily Ritual</em>
            </h3>
            <p className="text-xl text-stone-600 leading-relaxed mb-12">
              When you give Anna Hora, you're giving more than beautiful loungewear. You're giving the ritual of
              slipping into something exquisite, the daily reminder to slow down and savor quiet moments, and the
              confidence that comes from wearing something truly special—even when no one else will see it.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-stone-600" />
                </div>
                <h4 className="text-lg font-light text-stone-800 mb-2">Premium Packaging</h4>
                <p className="text-stone-600 text-sm">
                  Every gift arrives in our signature packaging with handwritten notes
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-stone-600" />
                </div>
                <h4 className="text-lg font-light text-stone-800 mb-2">Thoughtful Curation</h4>
                <p className="text-stone-600 text-sm">Each piece is chosen for its ability to create moments of joy</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-stone-600" />
                </div>
                <h4 className="text-lg font-light text-stone-800 mb-2">Lasting Beauty</h4>
                <p className="text-stone-600 text-sm">
                  Gifts that become more precious with time, not forgotten with trends
                </p>
              </div>
            </div>

            {/* <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3">
              Explore All Gifts
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button> */}
          </div>
        </div>
      </section>

      {/* Seasonal Highlight */}
      {/* <section className="py-16 lg:py-24 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-stone-800 text-white">Limited Time</Badge>
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">Holiday Collection</h3>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Discover our specially curated holiday pieces, available for a limited time. Perfect for making this
                season's gifts truly unforgettable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400&text=Holiday silk collection in festive setting"
                    alt="Holiday Collection"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-light text-stone-800 mb-2">The Holiday Edit</h4>
                  <p className="text-stone-600 mb-4">
                    Luxurious pieces in festive champagne and deep midnight hues, perfect for holiday mornings and New
                    Year's Eve.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-stone-800">From $195</span>
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
                    src="/placeholder.svg?height=300&width=400&text=Gift bundles with premium packaging"
                    alt="Gift Bundles"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-light text-stone-800 mb-2">Curated Gift Bundles</h4>
                  <p className="text-stone-600 mb-4">
                    Pre-selected combinations of our most beloved pieces, beautifully packaged and ready to give.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-stone-800">From $285</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                    >
                      View Bundles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}
