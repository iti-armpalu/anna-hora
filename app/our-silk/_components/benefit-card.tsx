type Props = {
  title: string
  text: string
}

export function BenefitCard({ title, text }: Props) {
  return (
    <div className="flex flex-col gap-tight">
      <h3 className="text-heading-sm mb-0">{title}</h3>
      <p className="text-small">{text}</p>
    </div>
  )
}
