import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { shippingReturnsContent } from "../_data"

export function ReturnsSection() {
    const { returns } = shippingReturnsContent

    return (
        <Card className="border-stone-200 shadow-sm py-0">
            <CardContent className="p-8">
                <h2 className="font-serif text-2xl text-stone-900 mb-6">{returns.title}</h2>
                <p className="text-stone-600 mb-8 leading-relaxed">{returns.description}</p>

                {/* Return Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {returns.steps.map((step) => (
                        <div key={step.step} className="text-center">
                            <div className="w-12 h-12 bg-forest-950 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-medium">
                                {step.step}
                            </div>
                            <h3 className="font-medium text-stone-900 mb-2">{step.title}</h3>
                            <p className="text-stone-600 text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mb-8">
                    <Button asChild>
                        <Link href="/account">Initiate a Return</Link>
                    </Button>
                </div>

                {/* Return Policy */}
                <div className="border-t border-stone-200 pt-6 mb-6">
                    <h3 className="font-medium text-stone-900 mb-4">Return Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {returns.policy.map((block) => (
                            <div key={block.name} className="border border-stone-200 p-4">
                                <h3 className="font-medium text-stone-900 mb-2">{block.name}</h3>
                                <ul className="list-disc ml-4 flex flex-col gap-1.5 text-sm text-muted-foreground">
                                    {block.conditions.map((condition) => (
                                        <li key={condition}>{condition}</li>
                                    ))}
                                </ul>

                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-border pt-6">
                    <Link
                        href={returns.ctaHref}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
                    >
                        {returns.ctaText}
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}