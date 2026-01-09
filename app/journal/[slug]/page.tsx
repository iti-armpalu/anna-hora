import { notFound } from "next/navigation"
import { getArticleBySlug, getRelatedArticles } from "../_data"
import { getProductByHandle } from "@/lib/shopify/product"
import ArticlePageClient from "./article-page-client"

export const revalidate = 60
export const dynamicParams = true

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const relatedArticles = getRelatedArticles(article.id)

  const handles = article.featuredProductHandles ?? []
  const featuredProducts = (
    await Promise.all(handles.map((h) => getProductByHandle(h)))
  ).filter(Boolean)

  return (
    <ArticlePageClient
      article={article}
      relatedArticles={relatedArticles}
      featuredProducts={featuredProducts}
    />
  )
}
