"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Calendar, ArrowRight, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { journalArticles, journalCategories } from "@/data/journal"

export default function JournalPage() {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")

    const categories = journalCategories
    const articles = journalArticles

    const filteredArticles = articles.filter((article) => {
        const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
        const matchesSearch =
            searchQuery === "" ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const featuredArticle = articles.find((article) => article.featured)
    const regularArticles = filteredArticles.filter((article) => !article.featured)

    return (
        <div>

            {/* Hero Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6">
                            The ANNA HORA
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
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredArticle && selectedCategory === "all" && (
                <section className="pb-16 lg:pb-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="overflow-hidden border-0 shadow-lg bg-white">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative aspect-[4/3] lg:aspect-auto">
                                    <Image
                                        src={featuredArticle.image || "/placeholder.svg"}
                                        alt={featuredArticle.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-stone-800 text-white">Featured</Badge>
                                </div>
                                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                                    <Badge variant="outline" className="w-fit mb-4 border-stone-300 text-stone-600">
                                        {featuredArticle.categoryName}
                                    </Badge>
                                    <h3 className="text-2xl lg:text-3xl font-light text-stone-800 mb-4 leading-tight">
                                        {featuredArticle.title}
                                    </h3>
                                    <p className="text-stone-600 mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-4 text-sm text-stone-500">
                                            <span>By {featuredArticle.author}</span>
                                            <span>•</span>
                                            <span>{featuredArticle.date}</span>
                                            <span>•</span>
                                            <span>{featuredArticle.readTime}</span>
                                        </div>
                                    </div>
                                    <Button asChild className="bg-stone-800 hover:bg-stone-700 text-white">
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
                            <Card
                                key={article.id}
                                className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={article.image || "/placeholder.svg"}
                                        alt={article.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <CardContent className="p-6">
                                    <Badge variant="outline" className="mb-3 border-stone-300 text-stone-600 text-xs">
                                        {article.categoryName}
                                    </Badge>
                                    <h4 className="text-lg font-light text-stone-800 mb-3 leading-tight group-hover:text-stone-600 transition-colors">
                                        {article.title}
                                    </h4>
                                    <p className="text-stone-600 text-sm mb-4 leading-relaxed">{article.excerpt}</p>
                                    <div className="flex items-center justify-between text-xs text-stone-500">
                                        <span>By {article.author}</span>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-3 h-3" />
                                            <span>{article.date}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-stone-100">
                                        <Button asChild variant="ghost" size="sm" className="text-stone-700 hover:text-stone-900 p-0">
                                            <Link href={`/journal/${article.slug}`}>
                                                Read More
                                                <ArrowRight className="w-3 h-3 ml-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
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
                            <Button className="bg-stone-800 hover:bg-stone-700 text-white px-8">Subscribe</Button>
                        </div>
                        <p className="text-xs text-stone-500 mt-4">Thoughtful stories, no spam. Unsubscribe at any time.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
