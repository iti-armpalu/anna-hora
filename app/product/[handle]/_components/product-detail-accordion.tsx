import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ProductDetailsAccordionProps {
  product: any
}

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="details" className="border-stone-200">
        <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
            Product Details
        </AccordionTrigger>
        <AccordionContent className="space-y-3 text-stone-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-medium text-stone-800 mb-2">Fabric & Construction</h4>
                    {/* <ul className="space-y-1 text-sm">
                        <li>• {product.specifications.fabric}</li>
                        <li>• {product.specifications.weight} weight</li>
                        <li>• {product.specifications.origin}</li>
                    </ul> */}
                </div>
                <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care & Sustainability</h4>
                    {/* <ul className="space-y-1 text-sm">
                        <li>• {product.specifications.care}</li>
                        <li>• {product.specifications.sustainability}</li>
                        <li>
                            •{" "}
                            <Link href="/our-silk" className="text-stone-700 hover:text-stone-900 underline">
                                Learn about our silk
                            </Link>
                        </li>
                    </ul> */}
                </div>
            </div>
        </AccordionContent>
    </AccordionItem>

    <AccordionItem value="fit" className="border-stone-200">
        <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
            Fit & Sizing
        </AccordionTrigger>
        <AccordionContent className="space-y-3 text-stone-600">
            {/* <div className="space-y-2 text-sm">
                <p>• {product.fit.type}</p>
                <p>• {product.fit.modelInfo}</p>
                <p>• {product.fit.notes}</p>
            </div> */}
        </AccordionContent>
    </AccordionItem>

    <AccordionItem value="shipping" className="border-stone-200">
        <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
            Shipping & Returns
        </AccordionTrigger>
        <AccordionContent className="space-y-3 text-stone-600">
            <div className="space-y-2 text-sm">
                <p>• Free shipping on orders over $200</p>
                <p>• Standard delivery: 3-5 business days</p>
                <p>• Express delivery: 1-2 business days</p>
                <p>• 30-day returns for unworn items</p>
                <p>• Signature eco-friendly packaging with every order (recyclable materials)</p>
                <p>
                    • Premium gift wrapping available (includes silk ribbon, handwritten note on recycled paper, and
                    sustainable tissue wrap)
                </p>
            </div>
        </AccordionContent>
    </AccordionItem>
</Accordion>
  )
}
