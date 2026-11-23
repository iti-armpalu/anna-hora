import Image from "next/image"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/common/section-header"
import type { Heading, ImageData } from "../_data"

type Props = Heading & {
  paragraphs: string[]
  image: ImageData
  /** Desktop only — on mobile the image always comes first */
  imageSide?: "left" | "right"
  className?: string
}

/** Image beside a heading + paragraphs. Shared by the founder and team chapters. */
export function StorySplit({ titleTop, titleEm, paragraphs, image, imageSide = "left", className }: Props) {
  return (
    <section className={cn("section", className)}>
      <div className="container-site grid max-w-5xl grid-cols-1 items-center gap-block lg:grid-cols-2 lg:gap-16">
        <div className={cn("relative aspect-[4/5] overflow-hidden bg-secondary", imageSide === "right" && "lg:order-2")}>
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-field">
          <SectionHeader titleTop={titleTop} titleEm={titleEm} align="left" />
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
