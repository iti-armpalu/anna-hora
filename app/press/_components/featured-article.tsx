import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PressArticle } from "@/data/press-content"

interface FeaturedArticleProps {
  article: PressArticle
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-0 shadow-lg bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image src="/magazine-editorial-fashion.jpg" alt={article.title} fill className="object-cover" />
              <Badge className="absolute top-4 left-4 bg-stone-800 text-white">Featured</Badge>
            </div>
            <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-4">
                <Image
                  src={article.publicationLogo || "/placeholder.svg"}
                  alt={article.publication}
                  width={120}
                  height={40}
                  className="object-contain grayscale"
                />
              </div>
              <h3 className="text-2xl lg:text-3xl font-light text-stone-800 mb-4 leading-tight">{article.title}</h3>
              <blockquote className="text-lg text-stone-600 mb-6 leading-relaxed italic border-l-2 border-stone-300 pl-6">
                {article.quote}
              </blockquote>
              <div className="text-sm text-stone-500 mb-6">{article.date}</div>
              <Button asChild className="bg-anna-green-950 hover:bg-stone-700 text-white">
                <Link href={article.url} target="_blank" rel="noopener noreferrer">
                  Read Feature
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
