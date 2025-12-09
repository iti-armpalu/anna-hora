"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Download, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { pressContent, getPressFeaturedArticle, getPressArticles } from "@/data/press-content"

export default function PressPage() {
    const featuredArticle = getPressFeaturedArticle()
    const articles = getPressArticles()

    return (
        <div className="min-h-screen bg-stone-50">

            {/* Hero Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-4xl lg:text-6xl font-light text-stone-800 mb-6">{pressContent.hero.title}</h2>
                        <p className="text-lg lg:text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
                            {pressContent.hero.subtitle}
                        </p>

                        {/* Publication Logos */}
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
                            {["Vogue", "Harper's Bazaar", "Elle", "Marie Claire", "Porter"].map((publication) => (
                                <div key={publication} className="grayscale hover:grayscale-0 transition-all duration-300">
                                    <Image
                                        src={``}
                                        alt={publication}
                                        width={120}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredArticle && (
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="overflow-hidden border-0 shadow-lg bg-white">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative aspect-[4/3] lg:aspect-auto">
                                    <Image
                                        src=""
                                        alt="Featured press article"
                                        fill
                                        className="object-cover"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-stone-800 text-white">Featured</Badge>
                                </div>
                                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="mb-4">
                                        <Image
                                            src={featuredArticle.publicationLogo || "/placeholder.svg"}
                                            alt={featuredArticle.publication}
                                            width={120}
                                            height={40}
                                            className="object-contain grayscale"
                                        />
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-light text-stone-800 mb-4 leading-tight">
                                        {featuredArticle.title}
                                    </h3>
                                    <blockquote className="text-lg text-stone-600 mb-6 leading-relaxed italic border-l-2 border-stone-300 pl-6">
                                        -{featuredArticle.quote}-
                                    </blockquote>
                                    <div className="text-sm text-stone-500 mb-6">{featuredArticle.date}</div>
                                    <Button asChild className="bg-stone-800 hover:bg-stone-700 text-white">
                                        <Link href={featuredArticle.url} target="_blank" rel="noopener noreferrer">
                                            Read Feature
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Press Articles Grid */}
            <section className="py-16 lg:py-24 bg-stone-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Recent Features</h3>
                        <p className="text-stone-600">Discover what the press is saying about ANNA HORA</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Card
                                key={article.id}
                                className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-all duration-300"
                            >
                                <CardContent className="p-6">
                                    <div className="mb-4 h-10 flex items-center">
                                        <Image
                                            src={article.publicationLogo || "/placeholder.svg"}
                                            alt={article.publication}
                                            width={100}
                                            height={30}
                                            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                    <h4 className="text-lg font-light text-stone-800 mb-3 leading-tight group-hover:text-stone-600 transition-colors">
                                        {article.title}
                                    </h4>
                                    <blockquote className="text-sm text-stone-600 mb-4 leading-relaxed italic">
                                        -{article.quote}-
                                    </blockquote>
                                    <div className="text-xs text-stone-500 mb-4">{article.date}</div>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="text-stone-700 hover:text-stone-900 p-0 h-auto"
                                    >
                                        <Link href={article.url} target="_blank" rel="noopener noreferrer">
                                            Read Feature
                                            <ArrowRight className="w-3 h-3 ml-1" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Highlights */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
                                Moments of <em className="font-serif italic">Recognition</em>
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                ANNA HORA continues to inspire conversations in design, craftsmanship, and the art of refined living —
                                featured by leading publications around the world.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {pressContent.highlights.map((highlight) => (
                                <div key={highlight.id} className="border-l-2 border-stone-300 pl-6 py-2">
                                    <p className="text-lg text-stone-700 leading-relaxed">
                                        {highlight.text}
                                        <span className="text-stone-500 italic ml-2">— {highlight.publication}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Media Contact Section */}
            <section className="py-16 lg:py-24 bg-stone-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <Card className="border-0 shadow-sm bg-white">
                            <CardContent className="p-8 lg:p-12">
                                <h3 className="text-2xl lg:text-3xl font-light text-stone-800 mb-4">
                                    {pressContent.mediaContact.title}
                                </h3>
                                <p className="text-stone-600 leading-relaxed mb-8">{pressContent.mediaContact.description}</p>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <p className="text-sm text-stone-500 mb-1">Email</p>
                                        <a
                                            href={`mailto:${pressContent.mediaContact.email}`}
                                            className="text-stone-800 hover:text-stone-600 transition-colors"
                                        >
                                            {pressContent.mediaContact.email}
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500 mb-1">Phone</p>
                                        <a
                                            href={`tel:${pressContent.mediaContact.phone}`}
                                            className="text-stone-800 hover:text-stone-600 transition-colors"
                                        >
                                            {pressContent.mediaContact.phone}
                                        </a>
                                    </div>
                                </div>

                                <Button className="bg-stone-800 hover:bg-stone-700 text-white">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Press Kit
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Explore More Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">{pressContent.exploreMore.title}</h3>
                        <p className="text-lg text-stone-600 leading-relaxed mb-8">{pressContent.exploreMore.description}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild className="bg-stone-800 hover:bg-stone-700 text-white">
                                <Link href="/journal">{pressContent.exploreMore.journalCta}</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                            >
                                <Link href="/about">{pressContent.exploreMore.aboutCta}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
