'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/hooks/use-price"

interface GiftingSectionProps {
  startingAmount: number | null
  currencyCode?: string
}

export default function GiftingSection({ startingAmount, currencyCode }: GiftingSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Thoughtful Gifting</h3>
          <p className="text-stone-600 max-w-2xl mx-auto">Because the best gifts feel personal.</p>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Each piece is carefully wrapped and ready to honour her rituals, her milestones, or simply, Her.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/anna-hora-giftcard-2.webp"
                alt="Luxury Gift Set"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <CardContent className="p-6">
              <h4 className="text-xl font-light text-stone-800 mb-2">Gift Cards</h4>
              <p className="text-stone-600 mb-4">
                Instant. Effortless. Always right. The easiest way to gift her something she'll love — in her own time,
                in her own style.
              </p>
              <div className="flex items-center justify-between">
                {startingAmount && (
                  <span className="text-lg font-medium text-stone-800">
                    From {formatPrice({ amount: startingAmount, currencyCode })}
                  </span>
                )}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                >
                  <Link href="/gift-guide">View Gift Guide</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/gift-wrapping.webp"
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
                Every order arrives in our signature packaging, complete with a handwritten note— because the unboxing
                should feel as special as what's inside.
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
  )
}
