import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { HeroSection } from "./_components/hero-section"
import { MeasurementTips } from "./_components/measurement-tips"
import { SizeTablesSection } from "./_components/size-tables-section"
import { GeneralNotesSection } from "./_components/general-notes-section"
import { SizeGuideClosingSection } from "./closing-section"

export const metadata: Metadata = pageMeta.sizeGuide

export default function SizeGuidePage() {
  return (
    <>
      <HeroSection />
      <MeasurementTips />
      <SizeTablesSection />
      <GeneralNotesSection />
      <SizeGuideClosingSection />
    </>
  )
}