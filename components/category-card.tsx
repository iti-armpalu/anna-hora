import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CategoryCardProps {
  image: string
  title: string
  description: string
  href: string
  alt: string
}

export default function CategoryCard({ image, title, description, href, alt }: CategoryCardProps) {
  return (
    <Card className="group border-0 shadow-none bg-transparent overflow-hidden">
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
        <Image
          src={image || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute bottom-6 left-6 mr-6 text-white">
          <h4 className="text-2xl font-light mb-2">{title}</h4>
          <p className="text-sm opacity-90">{description}</p>
          <div className="flex justify-start mt-4">
            <Button asChild className="bg-stone-200 hover:bg-stone-300 text-black px-8 py-3">
              <Link href={href}>Explore {title.split(",")[0]} Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
