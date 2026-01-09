import { careGuideContent } from "./_data"

import { HeroSection } from "./_components/hero-section"
import { IntroSection } from "./_components/intro-section"
import { CareInstructionsGrid } from "./_components/care-instructions-grid"
import { CommonIssues } from "./_components/common-issues"
import { StorageTipsGrid } from "./_components/storage-tips-grid"
import { AvoidList } from "./_components/avoid-list"
import { DownloadCTA } from "./_components/download-cta"
import { FinalCTA } from "./_components/final-cta"

export default function CareGuidePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <HeroSection hero={careGuideContent.hero} />

      <IntroSection introduction={careGuideContent.introduction} />

      <CareInstructionsGrid careInstructions={careGuideContent.careInstructions} />

      <CommonIssues commonIssues={careGuideContent.commonIssues} />

      <StorageTipsGrid storage={careGuideContent.storage} />

      <AvoidList avoidSection={careGuideContent.avoidSection} />

      <DownloadCTA downloadSection={careGuideContent.downloadSection} />

      <FinalCTA />
    </main>
  )
}
