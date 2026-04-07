import { notFound } from "next/navigation"
import { getArticleByHandle, getAllArticles } from "@/lib/shopify/blog"
import { getProductByHandle } from "@/lib/shopify/product"
import ArticlePageClient from "./article-page-client"

import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleByHandle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.excerpt ?? `Read ${article.title} on the ANNA HORA Journal.`,
    openGraph: {
      title: `${article.seo?.title ?? article.title} | ${siteConfig.name}`,
      description: article.seo?.description ?? article.excerpt,
      url: `/journal/${slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.image
        ? [
            {
              url: article.image,
              width: 1200,
              height: 630,
              alt: article.imageAlt || article.title,
            },
          ]
        : undefined,
    },
  };
}

export const revalidate = 3600
export const dynamicParams = true

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [article, allArticles] = await Promise.all([
    getArticleByHandle(slug),
    getAllArticles(),
  ])

  if (!article) notFound()

  // Related articles — same category, exclude current
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3)

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