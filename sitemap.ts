// app/sitemap.ts
import { MetadataRoute } from "next"
import { getProducts } from "@/lib/shopify"
import { getAllArticles } from "@/lib/shopify/blog"
import { getCollections } from "@/lib/shopify"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.annahora.com"

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
        { url: `${baseUrl}/our-silk`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/gift-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/shipping-returns`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/size-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/care-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
        { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ]

    // Dynamic product pages
    const productsResult = await getProducts(250)
    const productPages: MetadataRoute.Sitemap = productsResult.products.map((product) => ({
        url: `${baseUrl}/products/${product.handle}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }))

    // Dynamic collection pages
    const collections = await getCollections()
    const collectionPages: MetadataRoute.Sitemap = collections.map((collection) => ({
        url: `${baseUrl}/collections/${collection.handle}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
    }))

    // Dynamic journal pages
    const articles = await getAllArticles()
    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/journal/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
    }))

    return [
        ...staticPages,
        ...productPages,
        ...collectionPages,
        ...articlePages,
    ]
}