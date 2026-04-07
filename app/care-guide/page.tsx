import { careGuideContent } from "./_data"

import { pageMeta } from "@/lib/config/metadata"
import { Metadata } from "next"

import { HeroSection } from "./_components/hero-section"
import { IntroSection } from "./_components/intro-section"
import { CareInstructionsGrid } from "./_components/care-instructions-grid"
import { CommonIssues } from "./_components/common-issues"
import { StorageTipsGrid } from "./_components/storage-tips-grid"
import { AvoidList } from "./_components/avoid-list"
import { FinalCTA } from "./_components/final-cta"

export const metadata: Metadata = pageMeta.careGuide;

export default function CareGuidePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <HeroSection hero={careGuideContent.hero} />
      <IntroSection introduction={careGuideContent.introduction} />
      <CareInstructionsGrid careInstructions={careGuideContent.careInstructions} />
      <CommonIssues commonIssues={careGuideContent.commonIssues} />
      <StorageTipsGrid storage={careGuideContent.storage} />
      <AvoidList avoidSection={careGuideContent.avoidSection} />
      <FinalCTA />
    </main>
  )
}
