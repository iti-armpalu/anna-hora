import { SIZE_GUIDE_CONTENT } from "../_data";


export function HeroSection() {
  return (
    <div className="text-center mb-16">
      <h1 className="font-serif text-5xl text-stone-900 mb-6 text-balance">{SIZE_GUIDE_CONTENT.hero.title}</h1>
      <p className="text-xl text-stone-600 mb-6 leading-relaxed max-w-3xl mx-auto text-pretty">
        {SIZE_GUIDE_CONTENT.hero.subtitle}
      </p>
      <p className="text-stone-500 leading-relaxed max-w-2xl mx-auto">{SIZE_GUIDE_CONTENT.hero.supportingText}</p>
    </div>
  )
}
