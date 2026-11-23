import type { Metadata } from "next"
import Link from "next/link"
import { pageMeta } from "@/lib/config/metadata"
import { PageHeader } from "@/components/common/page-header"
import { PageClosing } from "@/components/common/page-closing"
import { DetailList, DetailRow } from "@/components/common/detail-list"
import { getSizeCategoryById, sizeGuideContent } from "./_data"
import { SizeChartExplorer } from "./_components/size-chart-explorer"

export const metadata: Metadata = pageMeta.sizeGuide

const CHART_PARAM = "chart"

export default async function SizeGuidePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { hero, ui, measurementTips, fitNotes, closing, sizeCategories } = sizeGuideContent
  const query = await searchParams
  const requested = query[CHART_PARAM]
  // ?chart=<id> opens a specific chart (linked from the product page); otherwise the first one
  const initialCategory =
    getSizeCategoryById(typeof requested === "string" ? requested : undefined) ?? sizeCategories[0]

  return (
    <>
      <PageHeader title={hero.title} subtitle={hero.subtitle} description={hero.supportingText} />

      <section className="section">
        <div className="container-site grid max-w-6xl grid-cols-1 gap-[var(--section-padding)] lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-block">
            <h2 className="text-heading-md font-light mb-0">{ui.chartsTitle}</h2>
            <SizeChartExplorer initialCategory={initialCategory} />
          </div>

          {/* Compact measuring guide beside the chart, where it's needed */}
          <aside className="flex flex-col gap-field lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
            <h2 className="label-uppercase mb-0">{measurementTips.title}</h2>
            <p className="text-small">{measurementTips.description}</p>
            <DetailList>
              {measurementTips.measurements.map((tip) => (
                <DetailRow key={tip.name} label={tip.name}>
                  <span className="text-muted-foreground">{tip.description}</span>
                </DetailRow>
              ))}
            </DetailList>
          </aside>
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container-site flex max-w-[var(--content-narrow)] flex-col gap-field">
          <h2 className="text-heading-md font-light mb-0">{fitNotes.title}</h2>
          <p>{fitNotes.description}</p>
          <Link
            href={fitNotes.careLink.href}
            className="w-fit text-small text-foreground underline underline-offset-4 decoration-1 hover:text-muted-foreground"
          >
            {fitNotes.careLink.label}
          </Link>
        </div>
      </section>

      <PageClosing closing={closing} />
    </>
  )
}
