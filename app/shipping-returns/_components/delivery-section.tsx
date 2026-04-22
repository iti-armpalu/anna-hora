import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { shippingReturnsContent } from "../_data"

export function DeliverySection() {
    const { delivery } = shippingReturnsContent

    return (
        <Card className="border-stone-200 shadow-sm py-0">
            <CardContent className="p-8">
                <h2 className="font-serif text-2xl text-stone-900 mb-6">{delivery.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {delivery.info.map((block) => (
                        <div key={block.name} className="border border-stone-200 rounded-lg p-4">
                            <h3 className="font-medium text-stone-900 mb-2">{block.name}</h3>
                            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                                {block.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/60" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="bg-secondary/60 rounded-lg p-4 mb-6">
                    <span className="text-sm font-medium text-foreground">Important Notes</span>
                    <ul className="flex flex-col gap-1 text-sm text-muted-foreground mt-2">
                        {delivery.importantNotes.map((note) => (
                            <li key={note}>{note}</li>
                        ))}
                    </ul>
                </div>

                <div className="border-t border-border pt-6">
                    <Link
                        href={delivery.ctaHref}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
                    >
                        {delivery.ctaText}
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}