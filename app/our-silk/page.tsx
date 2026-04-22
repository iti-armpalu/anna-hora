import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { HeroSection } from "./_components/hero-section"
import { FeelSection } from "./_components/feel-section"
import { CraftsmanshipSection } from "./_components/craftsmanship-section"
import { BenefitsSection } from "./_components/benefits-section"
import { SourcingSection } from "./_components/sourcing-section"
import { CareGuideSection } from "./_components/care-guide-section"
import { SilkClosingSection } from "./_components/closing-secton"


export const metadata: Metadata = pageMeta.ourSilk

export default function OurSilkPage() {
  return (
    <>
      <HeroSection />
      <FeelSection />
      <CraftsmanshipSection />
      <BenefitsSection />
      <SourcingSection />
      <CareGuideSection />
      <SilkClosingSection />
    </>
  )
}