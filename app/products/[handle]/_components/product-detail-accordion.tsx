
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import Link from "next/link"

interface ProductDetailsAccordionProps {
    product: ProductNormalized
}

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
    return (
        <Accordion type="single" collapsible defaultValue="details" className="w-full">

            <AccordionItem value="details" className="border-stone-200">
                <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
                    Product Details
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-stone-600">
                    <p>{product.metafields.descriptionCore}</p>
                    <p>{product.metafields.descriptionStyle}</p>
                    <p>{product.metafields.descriptionSensory}</p>
                    <p>{product.metafields.descriptionLifestyle}</p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fabric" className="border-stone-200">
                <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
                    Fabric & Care
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-stone-600">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <h4 className="font-medium text-stone-800 mb-2">Fabric & Construction</h4>
                            <ul className="list-disc pl-4 space-y-1 text-sm">
                                <li>{product.metafields.fabricFull}</li>
                                <li>Made in {product.metafields.madeIn}</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-stone-800 mb-2">Fabric Certifications</h4>
                            <Badge variant="secondary">
                                {product.metafields.fabricCertifications}
                            </Badge>

                        </div>
                        <div>
                            <h4 className="font-medium text-stone-800 mb-2">Care & Sustainability</h4>
                            <ul className="list-disc pl-4 space-y-1 text-sm">
                                <li>
                                    {product.metafields.careInstructions}{" "}
                                    <Link href="/care-guide" className="text-stone-700 hover:text-stone-900 underline">
                                        Care guide
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/our-silk" className="text-stone-700 hover:text-stone-900 underline">
                                        Learn about our silk
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fit" className="border-stone-200">
                <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
                    Fit & Sizing
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-stone-600">
                    <div>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                            <li>{product.metafields.fitNotes}</li>
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className="border-stone-200">
                <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
                    Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-stone-600">
                    <div>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                            <li>30-day returns for unworn items</li>
                            <li>{product.metafields.ethicalNotes}</li>
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
