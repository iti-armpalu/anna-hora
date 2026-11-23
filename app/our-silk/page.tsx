import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { PageClosing } from "@/components/common/page-closing"
import { silkContent } from "./_data"
import { HeroSection } from "./_components/hero-section"
import { FeelSection } from "./_components/feel-section"
import { CraftsmanshipSection } from "./_components/craftsmanship-section"
import { BenefitsSection } from "./_components/benefits-section"
import { EthicalSection } from "./_components/ethical-section"
import { CareGuideSection } from "./_components/care-guide-section"

export const metadata: Metadata = pageMeta.ourSilk

export default function OurSilkPage() {
  return (
    <>
      <HeroSection />
      <FeelSection />
      <CraftsmanshipSection />
      <BenefitsSection />
      <EthicalSection />
      <CareGuideSection />
      <PageClosing closing={silkContent.closing} />
    </>
  )
}
