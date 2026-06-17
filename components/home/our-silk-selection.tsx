import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { homeContent } from "@/components/home/_data"

export default function OurSilkSection() {
  const { ourSilk } = homeContent

  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <Image
              src={ourSilk.image.src}
              alt={ourSilk.image.alt}
              width={500}
              height={600}
              className="rounded-lg"
              sizes="(min-width: 1024px) 500px, 90vw"
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <h2>
              {ourSilk.heading}{" "}
              <em>{ourSilk.headingEm}</em>
            </h2>

            {ourSilk.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}

            <Button asChild variant="outline">
              <Link href={ourSilk.cta.href}>{ourSilk.cta.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}