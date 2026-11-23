import type { Metadata } from "next"
import Link from "next/link"
import { pageMeta } from "@/lib/config/metadata"
import { PageHeader } from "@/components/common/page-header"
import { PageClosing } from "@/components/common/page-closing"
import { getSizeCategoryById, sizeGuideContent } from "./_data"
import { SizeChartExplorer } from "./_components/size-chart-explorer"
import { SizeGuideTabs } from "./_components/size-guide-tabs"

export const metadata: Metadata = pageMeta.sizeGuide

const CHART_PARAM = "chart"

export default async function SizeGuidePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { hero, fitNotes, closing, sizeCategories } = sizeGuideContent
  const query = await searchParams
  const requested = query[CHART_PARAM]
  // ?chart=<id> opens a specific chart (linked from the product page); otherwise the first one
  const initialCategory =
    getSizeCategoryById(typeof requested === "string" ? requested : undefined) ?? sizeCategories[0]

  return (
    <>
      <PageHeader title={hero.title} subtitle={hero.subtitle} description={hero.supportingText} />

      <section className="section">
        <div className="container-site max-w-4xl">
          <SizeGuideTabs chart={<SizeChartExplorer initialCategory={initialCategory} />} />
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
