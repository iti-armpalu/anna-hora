import Image from "next/image"
import { Download, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SILK_CONTENT } from "./_data"
import { SectionHeader } from "./_components/section-header"
import { BenefitCard } from "./_components/benefit-card"
import { CraftsmanshipCard } from "./_components/craftmanship-card"
import { CareGuideStep } from "./_components/care-guide-step"


export default function OurSilkPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-200">
          <Image
            src={SILK_CONTENT.hero.bgImage || "/placeholder.svg"}
            alt="Silk texture in natural light"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-anna-cement-100 mb-6 leading-tight">
            {SILK_CONTENT.hero.titleTop}
            <br />
            <em className="font-serif italic">{SILK_CONTENT.hero.titleEm}</em>
          </h2>
          <p className="text-lg md:text-xl text-anna-cement-300 max-w-2xl mx-auto font-light leading-relaxed">
            {SILK_CONTENT.hero.subtitle}
          </p>
        </div>
      </section>

      {/* The Feel Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeader titleTop={SILK_CONTENT.feel.headingTop} titleEm={SILK_CONTENT.feel.headingEm} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                {SILK_CONTENT.feel.paragraphs.map((p, i) => (
                  <p key={i} className="text-lg text-stone-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src={SILK_CONTENT.feel.media.image || "/placeholder.svg"}
                    alt={SILK_CONTENT.feel.media.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-stone-200 rounded-full opacity-30 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Craftsmanship Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              titleTop={SILK_CONTENT.craftsmanship.headingTop}
              titleEm={SILK_CONTENT.craftsmanship.headingEm}
              subtitle={SILK_CONTENT.craftsmanship.intro}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {SILK_CONTENT.craftsmanship.cards.map((card, i) => (
                <CraftsmanshipCard key={i} {...card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              titleTop={SILK_CONTENT.benefits.headingTop}
              titleEm={SILK_CONTENT.benefits.headingEm}
              subtitle={SILK_CONTENT.benefits.intro}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SILK_CONTENT.benefits.items.map((benefit, i) => (
                <BenefitCard key={i} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Sourcing Section */}
      <section className="py-16 lg:py-24 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl lg:text-4xl font-light text-stone-800">
                  {SILK_CONTENT.sourcing.headingTop}
                  <br />
                  <em className="font-serif italic">{SILK_CONTENT.sourcing.headingEm}</em>
                </h3>

                {SILK_CONTENT.sourcing.paragraphs.map((p, i) => (
                  <p key={i} className="text-lg text-stone-600 leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="pt-4">
                  <h4 className="font-medium text-stone-800 mb-3">{SILK_CONTENT.sourcing.commitmentsTitle}</h4>
                  <ul className="space-y-2 text-stone-600">
                    {SILK_CONTENT.sourcing.commitments.map((c, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={SILK_CONTENT.sourcing.image || "/placeholder.svg"}
                  alt={SILK_CONTENT.sourcing.imageAlt}
                  width={500}
                  height={600}
                  className="rounded-lg"
                />
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-stone-200 rounded-full opacity-30 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Silk Care Guide */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <SectionHeader
                titleTop={SILK_CONTENT.careGuide.headingTop}
                titleEm={SILK_CONTENT.careGuide.headingEm}
                subtitle={SILK_CONTENT.careGuide.intro}
              />
              <Button
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent mt-8"
              >
                <Download className="w-4 h-4 mr-2" />
                {SILK_CONTENT.careGuide.ctaDownload.text}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SILK_CONTENT.careGuide.steps.map((step) => (
                <CareGuideStep key={step.step} {...step} />
              ))}
            </div>

            <div className="mt-16 p-8 bg-stone-100 rounded-lg text-center">
              <h4 className="text-xl font-light text-stone-800 mb-4">{SILK_CONTENT.careGuide.expert.title}</h4>
              <p className="text-stone-600 mb-6">{SILK_CONTENT.careGuide.expert.text}</p>
              <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent">
                {SILK_CONTENT.careGuide.expert.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-5xl font-light text-stone-800 mb-8 leading-tight">
              {SILK_CONTENT.closing.headingTop}
              <br />
              <em className="font-serif italic">{SILK_CONTENT.closing.headingEm}</em>
            </h3>
            <p className="text-xl text-stone-600 leading-relaxed mb-12">{SILK_CONTENT.closing.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                data-slot="button"
                size="lg"
                className="bg-anna-green-950 hover:bg-stone-700 text-white px-8 py-3"
              >
                <Link href={SILK_CONTENT.closing.primaryCta.href}>
                  Shop Now
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
