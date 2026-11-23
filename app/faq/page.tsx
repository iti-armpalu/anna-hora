import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { PageHeader } from "@/components/common/page-header"
import { FAQ_CONTENT, HEADER } from "./_data"
import { FAQSearchAndContent } from "./_components/faq-search-and-content"

export const metadata: Metadata = pageMeta.faq

function FAQStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CONTENT.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export default function FAQPage() {
  return (
    <>
      <FAQStructuredData />
      <PageHeader title={HEADER.title} description={HEADER.subtitle} />
      <FAQSearchAndContent />
    </>
  )
}
