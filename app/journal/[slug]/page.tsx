"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {

  ArrowLeft,
  Calendar,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  ChevronRight,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ArticlePage({ params }: { params: { slug: string } }) {

  // Sample article data - in a real app, this would be fetched based on the slug
  const article = {
    id: 1,
    slug: "morning-rituals-silk", // Added slug property
    title: "The Art of Morning Rituals: Creating Sacred Space in Silk",
    excerpt:
      "Discover how the simple act of choosing silk can transform your morning routine into a moment of mindful luxury.",
    category: "self-care",
    categoryName: "Self-Care & Rituals",
    author: "Elena Chen",
    date: "December 15, 2024",
    readTime: "5 min read",
    image: "/placeholder.svg?height=600&width=1200&text=Morning ritual with silk robe and coffee",
    content: `
      <p>There's something almost ceremonial about the first moments of morning—that liminal space between sleep and wakefulness where the day's possibilities still shimmer with potential. It's in these precious minutes that we have the opportunity to set the tone for everything that follows.</p>

      <p>For me, this ritual begins with silk. Not because it's luxurious in the traditional sense, but because of how it feels against skin that's still warm from sleep. There's an intimacy to silk that cotton simply cannot match—a whisper rather than a declaration, a gentle embrace rather than a firm handshake.</p>

      <h3>The Psychology of Touch</h3>

      <p>Our skin is our largest organ, and yet we often forget how profoundly touch affects our emotional state. The weight of silk as it settles across your shoulders, the way it moves with your body rather than against it—these sensations send signals to your nervous system that all is well, that you are cared for, that this moment matters.</p>

      <p>When I slip into my favorite silk robe each morning, I'm not just getting dressed. I'm creating a boundary between the vulnerability of sleep and the demands of the day. I'm giving myself permission to move slowly, to breathe deeply, to honor the transition.</p>

      <h3>Creating Your Sacred Morning Space</h3>

      <p>The beauty of a morning ritual isn't in its complexity—it's in its consistency. Here are the elements that transform an ordinary morning into something sacred:</p>

      <ul>
        <li><strong>Intention:</strong> Before your feet touch the floor, take three deep breaths and set an intention for the day.</li>
        <li><strong>Texture:</strong> Choose fabrics that feel good against your skin. Silk, linen, cashmere—materials that remind you that comfort is not a luxury but a necessity.</li>
        <li><strong>Ritual:</strong> Whether it's the way you make your coffee or the order in which you dress, create small ceremonies that anchor you in the present moment.</li>
        <li><strong>Beauty:</strong> Surround yourself with things that please your senses—fresh flowers, natural light, the sound of birds outside your window.</li>
      </ul>

      <h3>The Silk Difference</h3>

      <p>Not all fabrics are created equal when it comes to morning rituals. Silk has unique properties that make it particularly suited to these quiet moments:</p>

      <p>Its natural temperature regulation means you'll never feel too warm or too cool—just perfectly balanced. Its smooth surface is gentle on hair and skin, preventing the friction that can leave you looking disheveled. And its natural sheen catches and reflects light in a way that makes even the simplest garment feel special.</p>

      <p>But perhaps most importantly, silk has a way of making you move differently. You can't rush in silk—it demands a certain grace, a mindfulness of movement that naturally slows you down and brings you into your body.</p>

      <h3>Making It Your Own</h3>

      <p>Your morning ritual doesn't need to look like mine. Perhaps you prefer the structure of a fitted camisole to the flowing lines of a robe. Maybe your sacred time comes with the evening wind-down rather than the morning wake-up. The key is to find what feels authentic to you and to honor it consistently.</p>

      <p>What matters is that you create space—literal and metaphorical—for yourself. That you choose materials and practices that remind you that you are worthy of beauty, of comfort, of care. That you begin each day not with the harsh jolt of an alarm but with the gentle embrace of intention.</p>

      <p>In a world that often feels chaotic and demanding, these small acts of self-care become revolutionary. They remind us that we have agency over our experience, that we can choose beauty over efficiency, presence over productivity, silk over synthetic.</p>

      <p>The morning ritual is not about the robe—it's about the woman wearing it, and her decision to start each day by honoring herself.</p>
    `,
  }

  const relatedArticles = [
    {
      id: 2,
      slug: "evening-wind-down-rituals", // Added slug property
      title: "Evening Wind-Down: Creating Rituals That Restore",
      category: "Self-Care & Rituals",
      image: "/placeholder.svg?height=200&width=300&text=Evening routine",
      readTime: "4 min read",
    },
    {
      id: 3,
      slug: "perfect-gift-curating-joy", // Added slug property
      title: "The Perfect Gift: Curating Moments of Joy",
      category: "Gift Guides",
      image: "/placeholder.svg?height=200&width=300&text=Gift wrapping",
      readTime: "5 min read",
    },
    {
      id: 4,
      slug: "creating-sanctuary-texture-spaces", // Added slug property
      title: "Creating Sanctuary: The Power of Texture in Serene Spaces",
      category: "Home & Atmosphere",
      image: "/placeholder.svg?height=200&width=300&text=Serene bedroom",
      readTime: "6 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Back to Journal - Desktop */}
      <div className="hidden lg:block py-6 border-b border-stone-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/journal"
            className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Journal</span>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-96 lg:h-[500px] overflow-hidden">
        <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Article Content */}
      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              <Badge variant="outline" className="mb-4 border-stone-300 text-stone-600">
                {article.categoryName}
              </Badge>
              <h1 className="text-3xl lg:text-5xl font-light text-stone-800 mb-6 leading-tight">{article.title}</h1>
              <p className="text-xl text-stone-600 mb-8 leading-relaxed">{article.excerpt}</p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4 text-sm text-stone-500">
                  <span>By {article.author}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-stone-500 mr-2">Share:</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>

            <Separator className="mb-12" />

            {/* Article Body */}
            <div
              className="prose prose-lg prose-stone max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75",
                color: "#57534e",
              }}
            />

            {/* Shop the Look CTA */}
            <div className="mt-16 p-8 bg-stone-100 rounded-lg">
              <div className="text-center">
                <h3 className="text-2xl font-light text-stone-800 mb-4">Create Your Own Morning Ritual</h3>
                <p className="text-stone-600 mb-6">
                  Discover the silk pieces that will transform your daily routine into moments of mindful luxury.
                </p>
                <Button className="bg-stone-800 hover:bg-stone-700 text-white">
                  Shop Silk Robes
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-light text-stone-800 mb-12 text-center">Continue Reading</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Card
                  key={relatedArticle.id}
                  className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
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
