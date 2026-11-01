import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import type { ProductNormalized } from "@/lib/shopify/types/product-normalized"

const ITEM_CLASS = "border-border"
const TRIGGER_CLASS = "label-uppercase text-foreground hover:text-muted-foreground hover:no-underline"
// Size/colour are set on each <p> too: the global `p` rule in globals.css sets its own
// font-size and colour, so paragraphs don't inherit them from this container
const CONTENT_CLASS = "text-small text-muted-foreground [&_p]:text-small [&_p]:text-muted-foreground"
const SUBHEADING_CLASS = "font-medium !text-foreground mb-1"
const INLINE_LINK_CLASS = "underline underline-offset-2 hover:text-foreground transition-colors"

export function ProductDetailsAccordion({ product }: { product: ProductNormalized }) {
    const { metafields } = product

    return (
        <Accordion type="single" collapsible defaultValue="details" className="w-full">

            <AccordionItem value="details" className={ITEM_CLASS}>
                <AccordionTrigger className={TRIGGER_CLASS}>
                    Product Details
                </AccordionTrigger>
                <AccordionContent className={`space-y-2 ${CONTENT_CLASS}`}>
                    {metafields.descriptionCore && <p>{metafields.descriptionCore}</p>}
                    {metafields.descriptionStyle && <p>{metafields.descriptionStyle}</p>}
                    {metafields.descriptionSensory && <p>{metafields.descriptionSensory}</p>}
                    {metafields.descriptionLifestyle && <p>{metafields.descriptionLifestyle}</p>}
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fabric" className={ITEM_CLASS}>
                <AccordionTrigger className={TRIGGER_CLASS}>
                    Fabric & Care
                </AccordionTrigger>
                <AccordionContent className={`space-y-4 ${CONTENT_CLASS}`}>
                    <div>
                        <p className={SUBHEADING_CLASS}>Fabric & Construction</p>
                        <ul className="list-disc pl-4 space-y-1">
                            {metafields.fabricFull && <li>{metafields.fabricFull}</li>}
                            {metafields.madeIn && <li>Made in {metafields.madeIn}</li>}
                        </ul>
                    </div>
                    {metafields.fabricCertifications && (
                        <div>
                            <p className={SUBHEADING_CLASS}>Certifications</p>
                            <Badge variant="secondary">{metafields.fabricCertifications}</Badge>
                        </div>
                    )}
                    <div>
                        <p className={SUBHEADING_CLASS}>Care</p>
                        <ul className="list-disc pl-4 space-y-1">
                            {metafields.careInstructions && (
                                <li>
                                    {metafields.careInstructions}{" "}
                                    <Link href="/care-guide" className={INLINE_LINK_CLASS}>
                                        Care guide
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link href="/our-silk" className={INLINE_LINK_CLASS}>
                                    Learn about our materials
                                </Link>
                            </li>
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fit" className={ITEM_CLASS}>
                <AccordionTrigger className={TRIGGER_CLASS}>
                    Fit & Sizing
                </AccordionTrigger>
                <AccordionContent className={CONTENT_CLASS}>
                    {metafields.fitNotes && (
                        <ul className="list-disc pl-4 space-y-1">
                            <li>{metafields.fitNotes}</li>
                        </ul>
                    )}
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className={ITEM_CLASS}>
                <AccordionTrigger className={TRIGGER_CLASS}>
                    Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className={CONTENT_CLASS}>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>14-day returns for unworn items</li>
                        {metafields.ethicalNotes && <li>{metafields.ethicalNotes}</li>}
                        <li>
                            <Link href="/shipping-returns" className={INLINE_LINK_CLASS}>
                                Full shipping & returns policy
                            </Link>
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}