import { ABOUT_CONTENT } from "../_data"
import { SectionTitle } from "./section-title"


export function OurWhySection() {
  const { why } = ABOUT_CONTENT

  return (
    <section className="py-16 lg:py-24 bg-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionTitle
            titleLines={why.titleLines}
            className="text-3xl lg:text-4xl font-light text-stone-800 mb-6 leading-tight"
          />
          <div className="flex flex-col gap-8">
            <p className="text-xl md:text-2xl font-light text-stone-700 leading-relaxed text-center">
              We don{"'"}t believe empowerment is a slogan.
              <br />
              We believe in its infrastructure.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed text-center">
              ANNA HORA exists to create a world where women are supported not
              only in how they look or feel — but in how they build, lead, and
              grow. Where softness is strategic. Where intelligence is elegant.
              Where success doesn{"'"}t require burnout.
            </p>
            <div className="w-12 h-px bg-stone-300 mx-auto" />
            <p className="text-xl md:text-2xl font-light text-stone-700 leading-relaxed text-center">
              We are still a fashion brand.

              <br />
              But we are also a business ecosystem.
              <br />
              A platform for collaboration.
              <br />
              A quiet vote of confidence in women who build.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
