import { getProductByHandle } from "@/lib/shopify/product";
import ProductPageClient from "./product-page-client";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR every 60 seconds
export const dynamicParams = true;    // allow dynamic slugs
export const dynamic = "force-dynamic";


export default async function ProductPage({
    params,
}: {
    params: Promise<{ handle: string }>;
}) {
    const { handle } = await params;
    const product = await getProductByHandle(handle);

    if (!product) {
        notFound();
    }

    return (
        <ProductPageClient product={product} />
    );
}
