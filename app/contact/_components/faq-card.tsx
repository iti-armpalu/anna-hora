import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { contactContent } from "../_data"

export function FAQCard() {
    const { faq } = contactContent

    return (
        <Card className="border-stone-200 shadow-sm py-0">
            <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-2">{faq.title}</h3>
                <p className="text-stone-600 text-sm mb-4">{faq.description}</p>
                <Button asChild variant="outline">
                    <Link href={faq.ctaHref}>{faq.ctaText}</Link>
                </Button>
            </CardContent>
        </Card>
    )
}