import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import Link from "next/link"
import { FAQ_CONTENT, HEADER, UI_TEXTS } from "./_data"
import { FAQSearchAndContent } from "./_components/faq-search-and-content"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = pageMeta.faq

function FAQStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CONTENT.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default function FAQPage() {
  return (
    <>
      <FAQStructuredData />

      <div className="bg-stone-50">

        {/* Header */}
        <section className="bg-white border-b border-stone-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto py-16 text-center">
              <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 text-balance">
                {HEADER.title}
              </h1>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed text-pretty">
                {HEADER.subtitle}
              </p>
            </div>
          </div>
        </section>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <FAQSearchAndContent
              faqs={FAQ_CONTENT}
              header={HEADER}
              uiTexts={UI_TEXTS}
            />

            {/* Contact Prompt */}
            <section className="mt-16 bg-white border border-stone-200 p-8 text-center">
              <h2 className="text-2xl font-serif text-stone-900 mb-4">
                {UI_TEXTS.contactPromptTitle}
              </h2>
              <p className="text-stone-600 mb-6 leading-relaxed text-pretty">
                {UI_TEXTS.contactPromptText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href={UI_TEXTS.contactCtas.primary.href}>
                    {UI_TEXTS.contactCtas.primary.label}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={UI_TEXTS.contactCtas.secondary.href}>
                    {UI_TEXTS.contactCtas.secondary.label}
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}