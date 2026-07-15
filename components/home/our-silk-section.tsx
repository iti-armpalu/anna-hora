import Image from "next/image"
import Link from "next/link"
import { homeContent } from "@/components/home/_data"

export default function OurSilkSection() {
  const { ourSilk } = homeContent

  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[5/6]">
            <Image
              src={ourSilk.image.src}
              alt={ourSilk.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          <div className="space-y-6">
            <h2>
              {ourSilk.heading}{" "}
              <em>{ourSilk.headingEm}</em>
            </h2>

            {ourSilk.paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}

            <Link
              href={ourSilk.cta.href}
              className="inline-flex items-center gap-3 text-small font-medium text-forest-800"
            >
              {ourSilk.cta.label}
              <span
                aria-hidden="true"
                className="h-px w-6 bg-forest-800 transition-[width] duration-300 hover:w-10"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}