import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { homeContent } from "@/components/home/_data"

export default function GiftingSection() {
  const { gifting } = homeContent

  return (
    <section className="section bg-stone-100">
      <div className="container-site">
        <div className="section-header">
          <h2>{gifting.heading}</h2>
          <p>{gifting.description}</p>
          <p>{gifting.subDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Gift Card */}
          <Card
            className="group border-0 py-0 shadow-sm bg-white overflow-hidden flex flex-col h-full transition-shadow"
            style={{ transitionDuration: "var(--transition-base)" }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={gifting.giftCard.image.src}
                alt={gifting.giftCard.image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <CardContent className="p-6 flex flex-col flex-1">
              <h3>{gifting.giftCard.heading}</h3>
              <p className="mb-4 flex-1">{gifting.giftCard.description}</p>
              <div className="flex items-center justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href={gifting.giftCard.cta.href}>
                    {gifting.giftCard.cta.label}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Signature Packaging */}
          <Card
            className="group border-0 py-0 shadow-sm bg-white overflow-hidden flex flex-col h-full transition-shadow"
            style={{ transitionDuration: "var(--transition-base)" }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={gifting.packaging.image.src}
                alt={gifting.packaging.image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <CardContent className="p-6 flex flex-col flex-1">
              <h3>{gifting.packaging.heading}</h3>
              <p className="mb-4 flex-1">{gifting.packaging.description}</p>
              <div className="flex items-center justify-between">
                {/*
                  badge uses foreground colour and medium weight —
                  it's a price/status callout, not body copy.
                */}
                <span className="text-[length:var(--text-heading-sm)] font-medium text-foreground">
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