import type { Metadata } from "next";
import { pageMeta } from "@/lib/config/metadata"

import { HeroSection } from "./_components/hero-section"
import { FounderSection } from "./_components/founder-section"
import { PhilosophySection } from "./_components/philosophy-section"
import { TeamSection } from "./_components/team-section"
import { OurWhySection } from "./_components/our-why-section"
import { AboutClosingSection } from "./_components/closing-section";

export const metadata: Metadata = pageMeta.about;

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <FounderSection />
      <PhilosophySection />
      <TeamSection />
      <OurWhySection />
      <AboutClosingSection />
    </>
  )
}
