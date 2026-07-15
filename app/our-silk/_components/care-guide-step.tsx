interface CareGuideStepProps {
  step: number
  title: string
  description: string
}

export function CareGuideStep({ step, title, description }: CareGuideStepProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl font-serif italic text-stone-600 leading-none translate-y-[-4px]">
          {step}
        </span>
      </div>
      <h4 className="mb-1">{title}</h4>
      <p className="text-small leading-relaxed">{description}</p>
    </div>
  )
}