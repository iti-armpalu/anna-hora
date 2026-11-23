import type { Metadata } from "next"
import Link from "next/link"
import { pageMeta } from "@/lib/config/metadata"
import { slugify } from "@/lib/utils/slugify"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"
import { OnThisPage } from "@/components/common/on-this-page"
import { InfoSection } from "@/components/common/info-section"
import { DashList } from "@/components/common/dash-list"
import { DetailList, DetailRow } from "@/components/common/detail-list"
import { careGuideContent } from "./_data"

export const metadata: Metadata = pageMeta.careGuide

export default function CareGuidePage() {
  const { hero, navTitle, steps, storage, avoid, issues, help } = careGuideContent
  const sectionLinks = [...steps.map((s) => s.title), storage.title, avoid.title, issues.title].map((label) => ({
    id: slugify(label),
    label,
  }))

  return (
    <>
      <PageHeader title={hero.title} subtitle={hero.subtitle} description={hero.description} />

      <div className="container-site grid grid-cols-1 gap-[var(--section-padding)] py-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 lg:py-16">
        {/* On mobile the help block comes last; the section list is desktop-only */}
        <div className="order-2 lg:order-1">
          <OnThisPage title={navTitle} links={sectionLinks}>
            <span className="text-small text-foreground">{help.title}</span>
            <p className="text-small">{help.text}</p>
            <Button asChild variant="outline" className="w-fit">
              <Link href={help.cta.href}>{help.cta.label}</Link>
            </Button>
          </OnThisPage>
        </div>

        <div className="order-1 flex max-w-3xl flex-col gap-[var(--section-padding)] lg:order-2">
          {steps.map((step) => (
            <InfoSection key={step.title} id={slugify(step.title)} title={step.title} description={step.description}>
              <DashList items={step.details} />
            </InfoSection>
          ))}

          <InfoSection id={slugify(storage.title)} title={storage.title} description={storage.description}>
            <DetailList>
              {storage.tips.map((tip) => (
                <DetailRow key={tip.title} label={tip.title}>
                  <span className="text-muted-foreground">{tip.text}</span>
                </DetailRow>
              ))}
            </DetailList>
          </InfoSection>

          <InfoSection id={slugify(avoid.title)} title={avoid.title}>
            <div className="bg-secondary p-6">
              <DashList items={avoid.items} />
            </div>
          </InfoSection>

          {/* Shown open, not as an accordion — short fixes are faster to scan than to click through */}
          <InfoSection id={slugify(issues.title)} title={issues.title} description={issues.description}>
            <DetailList>
              {issues.items.map((issue) => (
                <DetailRow key={issue.title} label={issue.title}>
                  <span className="text-muted-foreground">{issue.text}</span>
                </DetailRow>
              ))}
            </DetailList>
          </InfoSection>
        </div>
      </div>
    </>
  )
}
