// app/care-guide/_components/common-issues.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Section, SectionInner, SectionTitle } from "./section"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

export function CommonIssues({
  commonIssues,
}: {
  commonIssues: {
    title: string
    subtitle: string
    issues: Array<{ issue: string; solution: string }>
  }
}) {
  return (
    <Section className="py-16 lg:py-24">
      <SectionInner max="max-w-4xl">
        <div className="mb-12">
          <SectionTitle title={commonIssues.title} subtitle={commonIssues.subtitle} />
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {commonIssues.issues.map((item) => {
            const value = slugify(item.issue)
            return (
              <AccordionItem key={value} value={value} className="rounded-lg border border-stone-200 px-6">
                <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
                  {item.issue}
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 leading-relaxed text-stone-600">
                  {item.solution}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </SectionInner>
    </Section>
  )
}
