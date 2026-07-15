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
      <div className="relative aspect-square mb-6 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <h4 className="mb-4">{title}</h4>
      <p className="leading-relaxed">{text}</p>
    </div>
  )
}