import Image from "next/image"

type Props = {
  image: string
  alt: string
  title: string
  text: string
}

export function CraftsmanshipCard({ image, alt, title, text }: Props) {
  return (
    <div className="flex flex-col gap-tight text-center">
      <div className="relative mb-field aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <h3 className="text-heading-sm mb-0">{title}</h3>
      <p className="text-small">{text}</p>
    </div>
  )
}
