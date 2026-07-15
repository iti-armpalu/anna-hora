interface BenefitCardProps {
  title: string
  text: string
}

export function BenefitCard({ title, text }: BenefitCardProps) {
  return (
    <div>
      <h4 className="mb-3">{title}</h4>
      <p className="leading-relaxed">{text}</p>
    </div>
  )
}