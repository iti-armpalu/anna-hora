import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { PageHeader } from "@/components/common/page-header"
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
      <PageHeader title={hero.title} subtitle={hero.subtitle} description={hero.description} />

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
