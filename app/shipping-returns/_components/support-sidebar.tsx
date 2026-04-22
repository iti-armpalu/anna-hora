import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { shippingReturnsContent } from "../_data"

export function SupportSidebar() {
    const { support } = shippingReturnsContent

    return (
        <Card className="border-stone-200 shadow-sm">
            <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-4">{support.title}</h3>
                <p className="text-stone-600 text-sm mb-4">{support.description}</p>
                <div className="space-y-3">
                    <Button asChild variant="outline" className="w-full">
                        <Link href={support.links.faq.href}>{support.links.faq.label}</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href={support.links.care.href}>{support.links.care.label}</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}