import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { homeContent } from "@/components/home/_data"

interface GiftingCardProps {
  image: { src: string; alt: string }
  heading: string
  description: string
  ctaHref: string
  ctaLabel: string
  badge?: string
  ctaVariant: "primary" | "text"
}

function GiftingCard({
  image,
  heading,
  description,
  ctaHref,
  ctaLabel,
  badge,
  ctaVariant,
}: GiftingCardProps) {
  return (
    <Card className="group overflow-hidden border-0 py-0 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-6">
        <h3>{heading}</h3>
        <p className="mb-4 flex-1">{description}</p>
        <div className={`flex items-center ${badge ? "justify-between" : "justify-start"}`}>
          {badge && <span className="text-heading-sm font-medium text-foreground">{badge}</span>}
          {ctaVariant === "primary" ? (
            <Button asChild size="sm">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          ) : (
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-3 text-small font-medium text-forest-800"
            >
              {ctaLabel}
              <span
                aria-hidden="true"
                className="h-px w-6 bg-forest-800 transition-[width] duration-300 group-hover:w-10"
              />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function GiftingSection() {
  const { gifting } = homeContent

  return (
    <section className="section bg-stone-100">
      <div className="container-site">
        <div className="section-header">
          <h2>{gifting.heading}</h2>
          <p>{gifting.description}</p>
          <p className="mt-2">{gifting.subDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buy a Gift Card — a direct purchase path, so it gets the filled primary button */}
          <GiftingCard
            image={gifting.giftCard.image}
            heading={gifting.giftCard.heading}
            description={gifting.giftCard.description}
            ctaHref={gifting.giftCard.cta.href}
            ctaLabel={gifting.giftCard.cta.label}
            ctaVariant="primary"
          />

          {/* Signature Packaging — informational, so it matches CategoryCard's quiet text-link CTA */}
          <GiftingCard
            image={gifting.packaging.image}
            heading={gifting.packaging.heading}
            description={gifting.packaging.description}
            ctaHref={gifting.packaging.cta.href}
            ctaLabel={gifting.packaging.cta.label}
            badge={gifting.packaging.badge}
            ctaVariant="text"
          />
        </div>
      </div>
    </section>
  )
}