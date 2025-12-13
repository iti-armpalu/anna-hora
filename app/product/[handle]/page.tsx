import { getProductByHandle } from "@/lib/shopify/product";
import ProductPageClient from "./product-page-client";
import { notFound } from "next/navigation";
import { getFreeShippingThreshold } from "@/lib/geo/get-free-shipping-treshold";

export const revalidate = 60; // ISR every 60 seconds
export const dynamicParams = true;    // allow dynamic slugs


export default async function ProductPage({
    params,
}: {
    params: Promise<{ handle: string }>;
}) {
    const { handle } = await params;

    const [product, shipping] = await Promise.all([
        getProductByHandle(handle),
        getFreeShippingThreshold(),
    ]);


    if (!product) {
        notFound();
    }

    return (
        <ProductPageClient
            product={product}
            freeShipping={shipping}
        />
    );
}
