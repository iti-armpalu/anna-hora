import Image from "next/image"

interface CraftsmanshipCardProps {
  image: string
  alt: string
  title: string
  text: string
}

export function CraftsmanshipCard({ image, alt, title, text }: CraftsmanshipCardProps) {
  return (
    <div className="text-center">
      <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
        <Image src={image || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      </div>
      <h4 className="text-xl font-light text-stone-800 mb-4">{title}</h4>
      <p className="text-stone-600 leading-relaxed">{text}</p>
    </div>
  )
}
