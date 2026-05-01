import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import type { ProductNormalized } from "@/lib/shopify/types/product-normalized"

export function ProductDetailsAccordion({ product }: { product: ProductNormalized }) {
    const { metafields } = product

    return (
        <Accordion type="single" collapsible defaultValue="details" className="w-full">

            <AccordionItem value="details" className="border-stone-100">
                <AccordionTrigger className="text-sm font-medium text-stone-800 hover:text-stone-600">
                    Product Details
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-stone-600 leading-relaxed">
                    {metafields.descriptionCore && <p>{metafields.descriptionCore}</p>}
                    {metafields.descriptionStyle && <p>{metafields.descriptionStyle}</p>}
                    {metafields.descriptionSensory && <p>{metafields.descriptionSensory}</p>}
                    {metafields.descriptionLifestyle && <p>{metafields.descriptionLifestyle}</p>}
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fabric" className="border-stone-100">
                <AccordionTrigger className="text-sm font-medium text-stone-800 hover:text-stone-600">
                    Fabric & Care
                </AccordionTrigger>
                <AccordionContent className="space-y-4 text-sm text-stone-600">
                    <div>
                        <p className="font-medium text-stone-800 mb-1">Fabric & Construction</p>
                        <ul className="list-disc pl-4 space-y-1">
                            {metafields.fabricFull && <li>{metafields.fabricFull}</li>}
                            {metafields.madeIn && <li>Made in {metafields.madeIn}</li>}
                        </ul>
                    </div>
                    {metafields.fabricCertifications && (
                        <div>
                            <p className="font-medium text-stone-800 mb-1">Certifications</p>
                            <Badge variant="secondary">{metafields.fabricCertifications}</Badge>
                        </div>
                    )}
                    <div>
                        <p className="font-medium text-stone-800 mb-1">Care</p>
                        <ul className="list-disc pl-4 space-y-1">
                            {metafields.careInstructions && (
                                <li>
                                    {metafields.careInstructions}{" "}
                                    <Link href="/care-guide" className="underline underline-offset-2 hover:text-stone-900 transition-colors">
                                        Care guide
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link href="/our-silk" className="underline underline-offset-2 hover:text-stone-900 transition-colors">
                                    Learn about our silk
                                </Link>
                            </li>
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fit" className="border-stone-100">
                <AccordionTrigger className="text-sm font-medium text-stone-800 hover:text-stone-600">
                    Fit & Sizing
                </AccordionTrigger>
                <AccordionContent className="text-sm text-stone-600">
                    {metafields.fitNotes && (
                        <ul className="list-disc pl-4 space-y-1">
                            <li>{metafields.fitNotes}</li>
                        </ul>
                    )}
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className="border-stone-100">
                <AccordionTrigger className="text-sm font-medium text-stone-800 hover:text-stone-600">
                    Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-sm text-stone-600">
                    <ul className="list-disc pl-4 space-y-1">
                        <li>14-day returns for unworn items</li>
                        {metafields.ethicalNotes && <li>{metafields.ethicalNotes}</li>}
                        <li>
                            <Link href="/shipping-returns" className="underline underline-offset-2 hover:text-stone-900 transition-colors">
                                Full shipping & returns policy
                            </Link>
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}