"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Facebook, Twitter, Instagram, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import type { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import type { JournalArticle, RelatedArticle } from "../_data"
import { ProductCard } from "@/components/shop/product-card"

export default function ArticlePageClient({
    article,
    relatedArticles,
    featuredProducts,
}: {
    article: JournalArticle
    relatedArticles: RelatedArticle[]
    featuredProducts: ProductNormalized[]
}) {
    const featured = featuredProducts[0] // show one next to hero; you can render many if you want
    
    return (
        <div className="min-h-screen bg-stone-50">
            {/* Back to Journal - Desktop */}
            <div className="block py-6 border-b border-stone-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/journal" className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back to Journal</span>
                    </Link>
                </div>
            </div>

            <section>
                <div className="container mx-auto px-0 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex lg:flex-row justify-center gap-8 items-end mb-12">
                            <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden">
                                <Image src={article.image} alt={article.title} fill className="object-cover" priority />
                            </div>

                            {/* Featured Product Card (links to PDP) */}
                            {featured ?
                                <div className="hidden md:block space-y-2">
                                    <p className="text-xs uppercase tracking-wider text-stone-500 font-light">Featured product in the article</p>
                                    <div className="px-3 bg-stone-100 rounded-md">
                                        <ProductCard product={featured} className="w-[220px] py-0 pt-4" />
                                    </div>
                                </div>
                                : null}

                        </div>

                        {/* Article Content */}
                        <article className="py-2 lg:py-4">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="max-w-3xl mx-auto">
                                    <header className="mb-12">
                                        <Badge variant="outline" className="mb-4 border-stone-300 text-stone-600">
                                            {article.categoryName}
                                        </Badge>
                                        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-stone-800 mb-4 sm:mb-6 leading-tight">
                                            {article.title}
                                        </h1>
                                        <p className="text-base sm:text-lg lg:text-xl text-stone-600 mb-6 sm:mb-8 leading-relaxed">
                                            {article.excerpt}
                                        </p>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col gap-2 text-sm text-stone-500">
                                                    <span>By {article.author}</span>
                                                    <div className="flex items-center space-x-4 text-sm text-stone-500">
                                                        <span>{article.date}</span>
                                                        <span>•</span>
                                                        <span>{article.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-stone-500 mr-2">Share:</span>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><Facebook className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><Twitter className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><Instagram className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    </header>

                                    {featured ? (
                                        <div className="flex flex-col items-center md:hidden mb-6 space-y-2">
                                            <p className="text-xs uppercase tracking-wider text-stone-500 font-light text-center">
                                                Featured product in the article
                                            </p>

                                            <div className="px-3 bg-stone-100 rounded-md">
                                                <ProductCard
                                                    product={featured}
                                                    className="w-[220px] py-0 pt-4"
                                                />
                                            </div>
                                        </div>
                                    ) : null}


                                    <Separator className="mb-12" />

                                    <div
                                        className="prose prose-sm sm:prose-base lg:prose-lg prose-stone max-w-none mb-8 sm:mb-12
                                        prose-headings:font-light prose-headings:text-stone-800 prose-headings:mt-6 sm:prose-headings:mt-8 prose-headings:mb-3 sm:prose-headings:mb-4
                                        prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 sm:prose-h3:mt-12
                                        prose-p:text-stone-600 prose-p:leading-relaxed prose-p:mb-4 sm:prose-p:mb-6
                                        prose-ul:my-4 sm:prose-ul:my-6 prose-ul:space-y-2 sm:prose-ul:space-y-3
                                        prose-li:text-stone-600 prose-li:leading-relaxed
                                        prose-strong:text-stone-800 prose-strong:font-medium"
                                        dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
                                    />
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Related Articles */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <h3 className="text-3xl font-light text-stone-800 mb-12 text-center">Continue Reading</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArticles.map((relatedArticle) => (
                                <Card key={relatedArticle.id} className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={relatedArticle.image || "/placeholder.svg"}
                                            alt={relatedArticle.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <Badge variant="outline" className="mb-3 border-stone-300 text-stone-600 text-xs">
                                            {relatedArticle.category}
                                        </Badge>
                                        <h4 className="text-lg font-light text-stone-800 mb-3 leading-tight group-hover:text-stone-600 transition-colors">
                                            {relatedArticle.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-xs text-stone-500">
                                            <span>{relatedArticle.readTime}</span>
                                            <Link href={`/journal/${relatedArticle.slug}`}>
                                                <Button variant="ghost" size="sm" className="text-stone-700 hover:text-stone-900 p-0">
                                                    Read More
                                                    <ArrowRight className="w-3 h-3 ml-1" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
