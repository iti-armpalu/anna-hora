// app/care-guide/_components/download-cta.tsx
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, SectionInner } from "./section"

export function DownloadCTA({
  downloadSection,
}: {
  downloadSection: { title: string; description: string; buttonText: string; href: string }
}) {
  return (
    <Section className="bg-anna-cement-600 py-16 lg:py-24">
      <SectionInner max="max-w-4xl">
        <div className="text-center">
          <h2 className="mb-6 text-3xl font-light text-white lg:text-4xl">{downloadSection.title}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-stone-300">
            {downloadSection.description}
          </p>

          <Button asChild size="lg" className="bg-white px-8 py-3 text-stone-900 hover:bg-stone-100">
            <a href={downloadSection.href} download>
              <Download className="mr-2 h-5 w-5" aria-hidden="true" />
              {downloadSection.buttonText}
            </a>
          </Button>
        </div>
      </SectionInner>
    </Section>
  )
}
