import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ABOUT_CONTENT } from "../_data"
import { SectionTitle } from "./section-title"

export function ClosingSection() {
  const { closing } = ABOUT_CONTENT

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle
            titleLines={closing.titleLines}
            className="text-3xl lg:text-5xl font-light text-stone-800 mb-8 leading-tight"
          />

          <p className="text-xl text-stone-600 leading-relaxed mb-12">{closing.text}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {closing.ctas.map((cta) => (
              <Button
                key={cta.label}
                asChild
                size="lg"
                variant={cta.variant === "outline" ? "outline" : "default"}
                className={
                  cta.variant === "outline"
                    ? "border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-3 bg-transparent"
                    : "bg-anna-green-950 hover:bg-anna-green-800 text-white px-8 py-3"
                }
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
