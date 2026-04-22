import { getProductByHandle } from "@/lib/shopify/product";
import ProductPageClient from "./product-page-client";
import { notFound } from "next/navigation";
import { getAvailableCountries } from "@/lib/shopify/queries/localization";
import { cookies } from "next/headers";

import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";
import { ProductNormalized } from "@/lib/shopify/types/product-normalized";

function ProductStructuredData({
    product,
    handle,
}: {
    product: ProductNormalized;
    handle: string;
}) {
    const firstVariant = product.variants?.[0];
    const availableForSale = product.variants?.some((v) => v.availableForSale);

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.images.map((img) => img.url),
        brand: {
            "@type": "Brand",
            name: siteConfig.name,
        },
        url: `${siteConfig.url}/products/${handle}`,
        offers: {
            "@type": "Offer",
            price: firstVariant?.price.amount ?? product.minPrice,
            priceCurrency: firstVariant?.price.currencyCode ?? product.currencyCode,
            availability: availableForSale
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            url: `${siteConfig.url}/products/${handle}`,
            seller: {
                "@type": "Organization",
                name: siteConfig.name,
            },
            shippingDetails: {
                "@type": "OfferShippingDetails",
                deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                        "@type": "QuantitativeValue",
                        minValue: 1,
                        maxValue: 2,
                        unitCode: "DAY",
                    },
                    transitTime: {
                        "@type": "QuantitativeValue",
                        minValue: 3,
                        maxValue: 7,
                        unitCode: "DAY",
                    },
                },
            },
            hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 14,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/ReturnShippingFees",
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

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
        alternates: {
            canonical: `${siteConfig.url}/products/${handle}`,
          },
        openGraph: {
            title: `${product.title} | ${siteConfig.name}`,
            description: product.description,
            url: `${siteConfig.url}/products/${handle}`,
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
        <>
            <ProductStructuredData product={product} handle={handle} />
            <ProductPageClient
                product={product}
                shippingCountry={shippingCountry}
                canShip={canShip}
            />
        </>
    );
}
