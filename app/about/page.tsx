import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { PageClosing } from "@/components/common/page-closing"
import { aboutContent } from "./_data"
import { HeroSection } from "./_components/hero-section"
import { StorySplit } from "./_components/story-split"
import { PhilosophySection } from "./_components/philosophy-section"
import { OurWhySection } from "./_components/our-why-section"

export const metadata: Metadata = pageMeta.about

export default function AboutPage() {
  const { founder, team, closing } = aboutContent

  return (
    <>
      <HeroSection />
      <StorySplit {...founder} />
      <PhilosophySection />
      <StorySplit {...team} imageSide="right" />
      <OurWhySection />
      <PageClosing closing={closing} />
    </>
  )
}
