import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { shippingReturnsContent } from "./_data"
import { DeliverySection } from "./_components/delivery-section"
import { ReturnsSection } from "./_components/returns-section"
import { HelpSection } from "./_components/help-section"
import { PageNav } from "./_components/page-nav"

export const metadata: Metadata = pageMeta.shippingReturns

export default function ShippingReturnsPage() {
  const { hero } = shippingReturnsContent

  return (
    <>
      <header className="border-b border-border">
        <div className="container-site py-12 lg:py-16">
          <div className="mx-auto flex max-w-[var(--content-narrow)] flex-col gap-field text-center">
            <h1 className="text-heading-lg font-light text-balance mb-0">{hero.title}</h1>
            <p className="text-heading-sm font-light text-foreground">{hero.subtitle}</p>
            <p className="text-muted-foreground">{hero.description}</p>
          </div>
        </div>
      </header>

      <div className="container-site grid grid-cols-1 gap-[var(--section-padding)] py-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 lg:py-16">
        {/* On mobile the FAQ shortcut comes last; the section list is desktop-only */}
        <div className="order-2 lg:order-1">
          <PageNav />
        </div>
        <div className="order-1 flex max-w-3xl flex-col gap-[var(--section-padding)] lg:order-2">
          <DeliverySection />
          <ReturnsSection />
          <HelpSection />
        </div>
      </div>
    </>
  )
}
