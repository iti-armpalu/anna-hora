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
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h3 className="text-2xl font-light mb-2">{title}</h3>
          <p className="text-sm opacity-90 mb-4">{description}</p>
          {/* Light button intentional — sits over dark image overlay */}
          <Button asChild className="bg-stone-200 hover:bg-stone-300 text-black">
            <Link href={href}>Explore {title} Collection</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}