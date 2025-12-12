import { HeroSection } from "./_components/hero-section"
import { FounderSection } from "./_components/founder-section"
import { PhilosophySection } from "./_components/philosophy-section"
import { ExperienceSection } from "./_components/experience-section"
import { CommitmentsSection } from "./_components/commitments-section"
import { ClosingSection } from "./_components/closing-section"

export default function AboutPage() {
  return (
    <div>
      <HeroSection />
      <FounderSection />
      <PhilosophySection />
      <ExperienceSection />
      <CommitmentsSection />
      <ClosingSection />
    </div>
  )
}
