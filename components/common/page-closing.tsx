import Link from "next/link"
import { Button } from "@/components/ui/button"

export type TitleLine = string | { italic: string }

export interface CTA {
    label: string
    href: string
    variant: "primary" | "outline"
}

export interface ClosingContent {
    titleLines: TitleLine[]
    description?: string
    ctas: CTA[]
}

function renderTitleLines(titleLines: TitleLine[]) {
    return titleLines.map((line, i) => (
        <span key={i}>
            {typeof line === "string"
                ? line
                : <em className="font-serif italic">{line.italic}</em>}
            {i < titleLines.length - 1 && <br />}
        </span>
    ))
}

export function PageClosing({ closing }: { closing: ClosingContent }) {
    return (
        <section className="py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl lg:text-5xl font-light text-stone-800 mb-8 leading-tight">
                        {renderTitleLines(closing.titleLines)}
                    </h2>

                    {closing.description && (
                        <p className="text-xl text-stone-600 leading-relaxed mb-12">
                            {closing.description}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {closing.ctas.map((cta) => (
                            <Button key={cta.label} asChild variant={cta.variant === "outline" ? "outline" : "default"}>
                                <Link href={cta.href}>{cta.label}</Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}