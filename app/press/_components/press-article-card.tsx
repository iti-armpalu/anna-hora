import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { PressArticle } from "@/data/press-content"

interface PressArticleCardProps {
  article: PressArticle
}

export function PressArticleCard({ article }: PressArticleCardProps) {
  return (
    <Card className="group cursor-pointer border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-all duration-300">
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
        <blockquote className="text-sm text-stone-600 mb-4 leading-relaxed italic">{article.quote}</blockquote>
        <div className="text-xs text-stone-500 mb-4">{article.date}</div>
        <Button asChild variant="ghost" size="sm" className="text-stone-700 hover:text-stone-900 p-0 h-auto">
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            Read Feature
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
