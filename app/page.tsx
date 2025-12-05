import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import AsSeenIn from "@/components/press/as-seen-in"
import { getCollectionByHandle } from "@/lib/shopify"
import { ProductCard } from "@/components/shop/product-card"

export default async function HomePage() {

  const featuredCollection = await getCollectionByHandle("Featured");
  const featuredProducts = featuredCollection?.products ?? [];

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
            Not just silk. A ritual. A feeling. A way to come home to yourself..
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
              <Link href="/about">About ANNA HORA</Link>
            </Button>
          </div>
        </div>




      </section>

      {/* Featured Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Designed for <em className="font-serif italic">Moments That Are Yours Alone</em></h3>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Velvet, silk, and effortless sets — each made to move with you. Comfortable, confident, and always intentional.
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
                <div className="absolute bottom-6 left-6 mr-6 text-white">
                  <h4 className="text-2xl font-light mb-2">Velvet, Rewritten</h4>
                  <p className="text-sm opacity-90">Plush. Confident. Unrushed. Our signature velvet brings softness with weight — made for nights in, slow mornings, and everything in between.</p>
                  <div className="flex justify-start mt-4">
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
                <div className="absolute bottom-6 left-6 mr-6 text-white">
                  <h4 className="text-2xl font-light mb-2">Pure Silk Moments</h4>
                  <p className="text-sm opacity-90">Light, breathable, and quietly powerful — each piece is crafted from 100% mulberry silk. Designed to feel effortless, look elevated, and last for years.</p>
                  <div className="flex justify-start mt-4">
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
                <div className="absolute bottom-6 left-6 mr-6 text-white">
                  <h4 className="text-2xl font-light mb-2">Put Together, without the Effort</h4>
                  <p className="text-sm opacity-90">Designed in pairs. Worn your way. Our silk sets are made to flow together — or stand strong apart. Always easy. Always elevated.</p>
                  <div className="flex justify-start mt-4">
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
                Our silk reflects everything ANNA HORA stands for — quiet luxury, integrity, and thoughtful design.
                It’s chosen with care, crafted with intention, and worn with ease. We only partner with skilled artisans
                who honour tradition while designing for those who value beauty with purpose.
              </p>
              <p className="text-stone-600 leading-relaxed">
                It took 18 months to find a silk that felt right — not just to the touch, but in principle. It had to meet
                our standards for comfort, quality, and consciousness. The result? A fabric that moves like water, wears like
                second skin, and elevates the everyday. It’s silk that speaks to confidence, calm, and the freedom
                to feel — the ANNA HORA way of living.
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
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
              Because the best gifts feel personal.
            </p>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Each piece is carefully wrapped and ready to honour her rituals, her milestones, or simply, Her.
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
                  Instant. Effortless. Always right. The easiest way to gift her something she’ll love — in her own time, in her own style.
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
                  Every order arrives in our signature packaging, complete with a handwritten note— because the unboxing should feel as special as what’s inside.
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
    </div>
  )
}
