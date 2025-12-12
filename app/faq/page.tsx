import Link from "next/link"
import { FAQ_CONTENT, HEADER, UI_TEXTS } from "./_data"
import { FAQSearchAndContent } from "./_components/faq-search-and-content"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 text-balance">{HEADER.title}</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed text-pretty">{HEADER.subtitle}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <FAQSearchAndContent faqs={FAQ_CONTENT} header={HEADER} uiTexts={UI_TEXTS} />

        {/* Contact Prompt */}
        <section className="mt-16 bg-white rounded-lg shadow-sm border border-stone-200 p-8 text-center">
          <h3 className="text-2xl font-serif text-stone-900 mb-4">{UI_TEXTS.contactPromptTitle}</h3>
          <p className="text-stone-600 mb-6 leading-relaxed text-pretty">{UI_TEXTS.contactPromptText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={UI_TEXTS.contactCtas.primary.href}
              className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-md inline-flex items-center justify-center font-medium transition-colors"
            >
              {UI_TEXTS.contactCtas.primary.label}
            </Link>
            <Link
              href={UI_TEXTS.contactCtas.secondary.href}
              className="border border-stone-300 text-stone-700 hover:bg-stone-50 bg-transparent px-4 py-2 rounded-md inline-flex items-center justify-center font-medium transition-colors"
            >
              {UI_TEXTS.contactCtas.secondary.label}
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
