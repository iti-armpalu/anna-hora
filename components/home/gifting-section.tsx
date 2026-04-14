import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { homeContent } from "@/components/home/_data"

export default function GiftingSection() {
  const { gifting } = homeContent

  return (
    <section className="py-16 lg:py-24 bg-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
            {gifting.heading}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">{gifting.description}</p>
          <p className="text-stone-600 max-w-2xl mx-auto">{gifting.subDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gift Card */}
          <Card className="group border-0 py-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={gifting.giftCard.image.src}
                alt={gifting.giftCard.image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-light text-stone-800 mb-2">
                {gifting.giftCard.heading}
              </h3>
              <p className="text-stone-600 mb-4">{gifting.giftCard.description}</p>
              <Badge variant="secondary" className="text-stone-800">
                {gifting.giftCard.badge}
              </Badge>
            </CardContent>
          </Card>

          {/* Signature Packaging */}
          <Card className="group border-0 py-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={gifting.packaging.image.src}
                alt={gifting.packaging.image.alt}
                fill
                className="object-cover object-bottom group-hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-light text-stone-800 mb-3">
                {gifting.packaging.heading}
              </h3>
              <p className="text-stone-600 mb-4">{gifting.packaging.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-stone-800">
                  {gifting.packaging.badge}
                </span>
                <Button asChild variant="outline" size="sm">
                  <Link href={gifting.packaging.cta.href}>
                    {gifting.packaging.cta.label}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}