"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { siteConfig } from "@/lib/config/site"
import type { NormalizedArticle } from "@/lib/shopify/blog"

// ------------------------------------
// Props
// ------------------------------------
interface JournalPageClientProps {
    articles: NormalizedArticle[];
    categories: string[];
}

export default function JournalPageClient({ articles, categories }: JournalPageClientProps) {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredArticles = articles.filter((article) => {
        const matchesCategory =
            selectedCategory === "All" ||
            article.category === selectedCategory // use metafield category
        const matchesSearch =
            searchQuery === "" ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const featuredArticle = articles.find((a) => a.tags.includes("featured"))
    const regularArticles = filteredArticles.filter((a) => !a.tags.includes("featured"))

    return (
        <div>
            {/* Hero Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6">
                            The {siteConfig.name.toUpperCase()}
                            <br />
                            <em className="font-serif italic">Journal</em>
                        </h2>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            {`Stories of slow living, mindful luxury, and the art of finding beauty in life's quietest moments. Discover
              inspiration for creating your own rituals of serenity.`}
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-16">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                            <Input
                                type="text"
                                placeholder="Search stories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 border-stone-300 focus:border-stone-500"
                            />
                        </div>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full sm:w-48 border-stone-300">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredArticle && selectedCategory === "All" && (
                <section className="pb-16 lg:pb-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="py-0 gap-0 overflow-hidden border-0 shadow-lg bg-white">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative aspect-[4/3] lg:aspect-auto">
                                    <Image
                                        src={featuredArticle.image}
                                        alt={featuredArticle.imageAlt || featuredArticle.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-stone-800 text-white">Featured</Badge>
                                </div>
                                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                                    {/* category metafield badge, falls back to first tag */}
                                    <Badge variant="outline" className="w-fit mb-4 border-stone-300 text-stone-600">
                                        {featuredArticle.category ?? featuredArticle.tags[0]}
                                    </Badge>
                                    <h3 className="text-2xl lg:text-3xl font-light text-stone-800 mb-4 leading-tight">
                                        {featuredArticle.title}
                                    </h3>
                                    <p className="text-stone-600 mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                                    <div className="flex items-center gap-2 text-sm text-stone-500 mb-6">
                                        <span>By {featuredArticle.author}</span>
                                        <span>·</span>
                                        <span>{featuredArticle.date}</span>
                                        {featuredArticle.readTime && (
                                            <>
                                                <span>·</span>
                                                <span>{featuredArticle.readTime}</span>
                                            </>
                                        )}
                                    </div>
                                    <Button asChild>
                                        <Link href={`/journal/${featuredArticle.slug}`}>Read Story</Link>
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Articles Grid */}
            <section className="pb-16 lg:pb-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularArticles.map((article) => (
                            <Link href={`/journal/${article.slug}`} key={article.id}>
                                <Card className="pt-0 group cursor-pointer border-0 bg-transparent overflow-hidden">
                                    {/* Image */}
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <Image
                                            src={article.image}
                                            alt={article.imageAlt || article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Content */}
                                    <CardContent>
                                        <span className="text-xs text-stone-400 tracking-wide mb-2 block">
                                            {article.category ?? article.tags[0]}
                                        </span>
                                        <h4 className="text-base font-light text-stone-800 mb-2 leading-snug group-hover:text-stone-500 transition-colors duration-300">
                                            {article.title}
                                        </h4>
                                        <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-3">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-stone-400">
                                            <span>{article.date}</span>
                                            {article.readTime && (
                                                <>
                                                    <span>·</span>
                                                    <span>{article.readTime}</span>
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-stone-600 text-lg">
                                No stories found matching your search. Try adjusting your filters.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Never Miss a Story</h3>
                        <p className="text-stone-600 mb-8">
                            Subscribe to receive our latest Journal stories, delivered thoughtfully to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 border-stone-300 focus:border-stone-500"
                            />
                            <Button>Subscribe</Button>
                        </div>
                        <p className="text-xs text-stone-500 mt-4">Thoughtful stories, no spam. Unsubscribe at any time.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}