import { Droplets, Thermometer, Shield, Clock, type LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  thermometer: Thermometer,
  shield: Shield,
  clock: Clock,
}

interface BenefitCardProps {
  icon: string
  title: string
  text: string
}

export function BenefitCard({ icon, title, text }: BenefitCardProps) {
  const IconComponent = iconMap[icon]

  return (
    <Card className="border-0 shadow-sm bg-white p-8">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-anna-cement-100 rounded-full flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-6 h-6 text-anna-cement-600" />
        </div>
        <div>
          <h4 className="text-lg font-light text-stone-800 mb-3">{title}</h4>
          <p className="text-stone-600 leading-relaxed">{text}</p>
        </div>
      </div>
    </Card>
  )
}
