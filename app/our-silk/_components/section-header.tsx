interface SectionHeaderProps {
    titleTop: string
    titleEm: string
    subtitle?: string
  }
  
  export function SectionHeader({ titleTop, titleEm, subtitle }: SectionHeaderProps) {
    return (
      <div className="text-center mb-16">
        <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
          {titleTop}
          <br />
          <em className="font-serif italic">{titleEm}</em>
        </h3>
        {subtitle && <p className="text-lg text-stone-600 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    )
  }
  