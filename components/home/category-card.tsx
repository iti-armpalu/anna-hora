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
    <Link href={href} aria-label={`Explore the ${title} collection`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        <Image
          src={image || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="pt-6">
        <h3 className="mb-2">{title}</h3>
        <p className="mb-4">{description}</p>
        <span className="inline-flex items-center gap-3 text-small font-medium text-forest-800">
          Explore collection
          <span
            aria-hidden="true"
            className="h-px w-6 bg-forest-800 transition-[width] duration-300 group-hover:w-10"
          />
        </span>
      </div>
    </Link>
  )
}