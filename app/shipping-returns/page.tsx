import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { shippingReturnsContent } from "./_data"
import { DeliverySection } from "./_components/delivery-section"
import { ReturnsSection } from "./_components/returns-section"
import { ComplaintsSection } from "./_components/complaints-section"
import { SupportSidebar } from "./_components/support-sidebar"

export const metadata: Metadata = pageMeta.shippingReturns

export default function ShippingReturnsPage() {
  const { hero } = shippingReturnsContent

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-stone-600 mb-4">{hero.subtitle}</p>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <DeliverySection />
                <ReturnsSection />
                <ComplaintsSection />
              </div>
              <aside>
                <SupportSidebar />
              </aside>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}