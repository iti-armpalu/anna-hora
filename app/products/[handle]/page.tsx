import { getProductByHandle } from "@/lib/shopify/product";
import ProductPageClient from "./product-page-client";
import { notFound } from "next/navigation";
import { getAvailableCountries } from "@/lib/shopify/queries/localization";
import { cookies } from "next/headers";

export const revalidate = 60; // ISR every 60 seconds
export const dynamicParams = true;    // allow dynamic slugs
const DEFAULT_COUNTRY = "CZ";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ handle: string }>;
}) {
    const { handle } = await params;

    const cookieStore = await cookies();
    const shippingCountry =
        cookieStore.get("shippingCountry")?.value || DEFAULT_COUNTRY;

    const [product, availableCountries] = await Promise.all([
        getProductByHandle(handle),
        getAvailableCountries(),
    ]);

    if (!product) {
        notFound();
    }

    const canShip = availableCountries.includes(shippingCountry);

    return (
        <ProductPageClient
            product={product}
            shippingCountry={shippingCountry}
            canShip={canShip}
        />
    );
}
