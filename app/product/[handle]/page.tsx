import { getProductByHandle } from "@/lib/shopify/product";
import ProductPageClient from "./product-page-client";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR every 60 seconds
export const dynamicParams = true;    // allow dynamic slugs
export const dynamic = "force-dynamic";


export default async function ProductPage({
    params,
}: {
    params: { handle: string } | Promise<{ handle: string }>;
}) {
    const { handle } = await params;          // access safely
    const product = await getProductByHandle(handle);

    // ⭐ DEBUG LOG HERE ⭐
    console.log(
        "📦 PRODUCT DATA:",
        JSON.stringify(product, null, 2)
      );
  

    if (!product) {
        notFound(); // automatically shows app/not-found.tsx
    }

    return (
        <ProductPageClient product={product} />
    );
}
