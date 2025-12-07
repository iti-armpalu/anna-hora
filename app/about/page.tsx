import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { SEO, formatTitle } from "../../config/seo"
import { aboutContent as c } from "../../data/about-content"
import { Button } from "../../components/ui/button"

export const metadata: Metadata = {
  title: formatTitle("About"),
  description: SEO.description,
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 leading-tight">
              {c.hero.titleLines.map((line, i) =>
                typeof line === "string" ? (
                  <span key={i}>
                    {line}
                    {i < c.hero.titleLines.length - 1 && <><br /></>}
                  </span>
                ) : (
                  <span key={i}>
                    <em className="font-serif italic">{line.italic}</em>
                    {i < c.hero.titleLines.length - 1 && <><br /></>}
                  </span>
                )
              )}
            </h2>

            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl md:text-2xl font-light text-stone-700 leading-relaxed mb-8">
                {c.hero.introLead}
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">{c.hero.introText}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src={c.founder.image.src}
                alt={c.founder.image.alt}
                width={c.founder.image.width}
                height={c.founder.image.height}
                className="rounded-lg"
                sizes="(min-width:1024px) 500px, 90vw"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800 leading-tight">
                {c.founder.titleLines.map((line, i) =>
                  typeof line === "string" ? (
                    <span key={i}>
                      {line}
                      {i < c.founder.titleLines.length - 1 && <><br /></>}
                    </span>
                  ) : (
                    <span key={i}>
                      <em className="font-serif italic">{line.italic}</em>
                      {i < c.founder.titleLines.length - 1 && <><br /></>}
                    </span>
                  )
                )}
              </h3>

              {c.founder.paragraphs.map((p, i) => (
                <p key={i} className="text-stone-600 leading-relaxed">
                  {p}
                </p>
              ))}

              <footer className="text-stone-500">
                With love, {c.founder.signature}
              </footer>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6 leading-tight">
              {c.philosophy.titleLines.map((line, i) =>
                typeof line === "string" ? (
                  <span key={i}>
                    {line}
                    {i < c.philosophy.titleLines.length - 1 && <><br /></>}
                  </span>
                ) : (
                  <span key={i}>
                    <em className="font-serif italic">{line.italic}</em>
                    {i < c.philosophy.titleLines.length - 1 && <><br /></>}
                  </span>
                )
              )}
            </h3>
            <p className="text-lg text-stone-600 leading-relaxed">{c.philosophy.text}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {c.philosophy.pillars.map((p) => (
              <div key={p.title} className="text-center">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-stone-400 rounded-full" />
                </div>
                <h4 className="text-xl font-light text-stone-800 mb-4">{p.title}</h4>
                <p className="text-stone-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800 leading-tight">
                {c.experience.titleLines.map((line, i) =>
                  typeof line === "string" ? (
                    <span key={i}>
                      {line}
                      {i < c.experience.titleLines.length - 1 && <><br /></>}
                    </span>
                  ) : (
                    <span key={i}>
                      <em className="font-serif italic">{line.italic}</em>
                      {i < c.experience.titleLines.length - 1 && <><br /></>}
                    </span>
                  )
                )}
              </h3>

              {c.experience.paragraphs.map((p, i) => (
                <p key={i} className="text-stone-600 leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="pt-4">
                <h4 className="font-medium text-stone-800 mb-3">The ANNA HORA Promise</h4>
                <ul className="space-y-2 text-stone-600">
                  {c.experience.promises.map((t, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src={c.experience.mediaImage.src}
                  alt={c.experience.mediaImage.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 480px, 90vw"
                />
              </div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-stone-200 rounded-full opacity-30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-16 lg:py-24 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6 leading-tight">
              {c.commitments.introTitle}
            </h3>
            <p className="text-lg text-stone-600 leading-relaxed">{c.commitments.introText}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.commitments.cards.map((card) => (
              <div key={card.title} className="bg-white p-8 rounded-lg">
                <h4 className="text-xl font-light text-stone-800 mb-4">{card.title}</h4>
                <p className="text-stone-600 leading-relaxed mb-4">{card.body}</p>
                <p className="text-sm text-stone-500">{card.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-5xl font-light text-stone-800 mb-8 leading-tight">
              {c.closing.titleLines.map((line, i) =>
                typeof line === "string" ? (
                  <span key={i}>
                    {line}
                    {i < c.closing.titleLines.length - 1 && <><br /></>}
                  </span>
                ) : (
                  <span key={i}>
                    <em className="font-serif italic">{line.italic}</em>
                    {i < c.closing.titleLines.length - 1 && <><br /></>}
                  </span>
                )
              )}
            </h3>

            <p className="text-xl text-stone-600 leading-relaxed mb-12">{c.closing.text}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {c.closing.ctas.map((cta) => (
                <Button
                  key={cta.label} // ✅ key is applied to Button
                  asChild
                  size="lg"
                  variant={cta.variant === "outline" ? "outline" : "default"}
                  className={
                    cta.variant === "outline"
                      ? "border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-3 bg-transparent"
                      : "bg-stone-800 hover:bg-stone-700 text-white px-8 py-3"
                  }
                >
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>

              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
