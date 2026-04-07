import { getProductByHandle } from "@/lib/shopify/product";
import ProductPageClient from "./product-page-client";
import { notFound } from "next/navigation";
import { getAvailableCountries } from "@/lib/shopify/queries/localization";
import { cookies } from "next/headers";

import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const firstImage = product.images?.[0];

  return {
    title: product.title,
    description: product.description || `Shop ${product.title} — premium mulberry silk loungewear by ANNA HORA.`,
    openGraph: {
      title: `${product.title} | ${siteConfig.name}`,
      description: product.description,
      url: `/products/${handle}`,
      type: "website",
      images: firstImage
        ? [
            {
              url: firstImage.url,
              width: 1200,
              height: 630,
              alt: firstImage.altText || product.title,
            },
          ]
        : undefined,
    },
  };
}

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
