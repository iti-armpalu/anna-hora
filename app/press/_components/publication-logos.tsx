import Image from "next/image"
import { PUBLICATIONS } from "../_data"

export function PublicationLogos() {
  return (
    <div className="mt-12 flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
      {PUBLICATIONS.map((publication) => (
        <div key={publication} className="grayscale hover:grayscale-0 transition-all duration-300">
          {/* <Image
            src={`/.jpg?height=40&width=120&query=${publication.toLowerCase()}+logo`}
            alt={publication}
            width={120}
            height={40}
            className="object-contain"
          /> */}
        </div>
      ))}
    </div>
  )
}
