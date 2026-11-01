import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { siteConfig } from "@/lib/config/site"
import { getProductByHandle, getColorSiblings } from "@/lib/shopify/product"
import { getAvailableCountries } from "@/lib/shopify/queries/localization"
import type {
    ProductNormalized,
    ColorSiblingNormalized,
} from "@/lib/shopify/types/product-normalized"
import { SIZE_SEARCH_PARAM } from "@/lib/config/color-group"
import ProductPageClient from "./product-page-client"

export const revalidate = 60
export const dynamicParams = true

const DEFAULT_COUNTRY = "CZ"

// ------------------------------------
// Structured Data
// ------------------------------------
const SCHEMA_AVAILABILITY = {
    inStock: "https://schema.org/InStock",
    preOrder: "https://schema.org/PreOrder",
    outOfStock: "https://schema.org/OutOfStock",
} as const

function getSchemaAvailability(product: ProductNormalized): string {
    const statuses = product.variants.map((v) => v.stockStatus)
    if (statuses.includes("in_stock")) return SCHEMA_AVAILABILITY.inStock
    if (statuses.includes("preorder")) return SCHEMA_AVAILABILITY.preOrder
    return SCHEMA_AVAILABILITY.outOfStock
}

function ProductStructuredData({
    product,
    handle,
}: {
    product: ProductNormalized
    handle: string
}) {
    const firstVariant = product.variants?.[0]
    const availability = getSchemaAvailability(product)

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.images.map((img) => img.url),
        brand: {
            "@type": "Brand",
            name: siteConfig.displayName,
        },
        url: `${siteConfig.url}/products/${handle}`,
        offers: {
            "@type": "Offer",
            price: firstVariant?.price.amount ?? product.minPrice,
            priceCurrency: firstVariant?.price.currencyCode ?? product.currencyCode,
            availability,
            url: `${siteConfig.url}/products/${handle}`,
            seller: {
                "@type": "Organization",
                name: siteConfig.displayName,
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
                returnPolicyCategory:
                    "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 14,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/ReturnShippingFees",
            },
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}

// ------------------------------------
// Metadata
// ------------------------------------
export async function generateMetadata({
    params,
}: {
    params: Promise<{ handle: string }>
}): Promise<Metadata> {
    const { handle } = await params
    const product = await getProductByHandle(handle)

    if (!product) {
        return {
            title: "Product Not Found",
            robots: { index: false, follow: false },
        }
    }

    const firstImage = product.images?.[0]

    return {
        title: product.title,
        description:
            product.description ||
            `Shop ${product.title} — premium mulberry silk loungewear by ${siteConfig.displayName}.`,
        alternates: {
            canonical: `${siteConfig.url}/products/${handle}`,
        },
        openGraph: {
            title: `${product.title} | ${siteConfig.displayName}`,
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
    }
}

// ------------------------------------
// Data
// ------------------------------------

/** Colour swatches are an enhancement — if they fail, the page still renders without them. */
async function getColorSiblingsSafe(
    product: ProductNormalized | null
): Promise<ColorSiblingNormalized[]> {
    if (!product?.colorGroup) return []
    try {
        return await getColorSiblings(product.colorGroup)
    } catch (err: unknown) {
        console.error("getColorSiblings failed:", err instanceof Error ? err.message : err)
        return []
    }
}

// ------------------------------------
// Page
// ------------------------------------
export default async function ProductPage({
    params,
    searchParams,
}: {
    params: Promise<{ handle: string }>
    searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
    const [{ handle }, query, cookieStore] = await Promise.all([params, searchParams, cookies()])

    const shippingCountry =
        cookieStore.get("shippingCountry")?.value || DEFAULT_COUNTRY

    const sizeParam = query[SIZE_SEARCH_PARAM]
    const initialSize = typeof sizeParam === "string" ? sizeParam : null

    // Siblings depend on the product's group tag, so they chain off the product fetch;
    // countries are independent and run alongside both.
    const [{ product, colorSiblings }, availableCountries] = await Promise.all([
        getProductByHandle(handle).then(async (product) => ({
            product,
            colorSiblings: await getColorSiblingsSafe(product),
        })),
        getAvailableCountries(),
    ])

    if (!product) notFound()

    const canShip = availableCountries.includes(shippingCountry)

    return (
        <>
            <ProductStructuredData product={product} handle={handle} />
            {/* key: guarantees fresh state (selected size, gallery) when switching colours */}
            <ProductPageClient
                key={product.handle}
                product={product}
                colorSiblings={colorSiblings}
                initialSize={initialSize}
                shippingCountry={shippingCountry}
                canShip={canShip}
            />
        </>
    )
}