import { pageMeta } from "@/lib/config/metadata"
import { Metadata } from "next"

import { HeroSection } from "./_components/hero-section"
import { IntroSection } from "./_components/intro-section"
import { CareInstructionsGrid } from "./_components/care-instructions-grid"
import { CommonIssues } from "./_components/common-issues"
import { StorageTipsGrid } from "./_components/storage-tips-grid"
import { AvoidList } from "./_components/avoid-list"


export const metadata: Metadata = pageMeta.careGuide;

export default function CareGuidePage() {
  return (
    <div className="bg-stone-50">
      <HeroSection />
      <IntroSection />  
      <CareInstructionsGrid />
      <CommonIssues />
      <StorageTipsGrid />
      <AvoidList />
    </div>
  )
}
