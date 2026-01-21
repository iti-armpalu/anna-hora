import { Card } from "@/components/ui/card"

interface CareGuideStepProps {
  step: number
  title: string
  description: string
}

export function CareGuideStep({ step, title, description }: CareGuideStepProps) {
  return (
    <Card className="border-0 shadow-sm bg-stone-50 p-6 text-center items-center">
      <div className="w-16 h-16 bg-anna-cement-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
        <span className="text-7xl font-serif italic text-anna-cement-600 leading-none translate-y-[-8px]">
          {step}
        </span>
      </div>
      <h4 className="text-lg font-light text-stone-800 mb-1">{title}</h4>
      <p className="text-sm text-stone-600 leading-relaxed">{description}</p>
    </Card>
  )
}
