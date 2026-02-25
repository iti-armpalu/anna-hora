import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SIZE_GUIDE_CONTENT } from "./_data"
import { HeroSection } from "./_components/hero-section"
import { MeasurementTips } from "./_components/measurement-tips"
import { SizeTable } from "./_components/size-table"


export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <HeroSection />
        <MeasurementTips />

        {/* Size Tables */}
        <div className="space-y-16">
          {SIZE_GUIDE_CONTENT.sizeCategories.map((category, index) => (
            <SizeTable key={index} category={category} />
          ))}
        </div>

        {/* General Notes */}
        <div className="mt-16 text-center">
          <h2 className="font-serif text-3xl text-stone-900 mb-6">{SIZE_GUIDE_CONTENT.generalNotes.title}</h2>
          <p className="text-stone-600 leading-relaxed max-w-3xl mx-auto text-pretty">
            {SIZE_GUIDE_CONTENT.generalNotes.content}
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button asChild className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3">
            <Link href="/shop">Shop Collection</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
