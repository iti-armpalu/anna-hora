import { DetailList, DetailRow } from "@/components/common/detail-list"
import { sizeGuideContent } from "../_data"

/** Numbered measuring tips — the numbers are ready to match a future illustration. */
export function MeasuringGuide() {
  const { measurementTips } = sizeGuideContent

  return (
    <div className="flex flex-col gap-field">
      <p className="text-small">{measurementTips.description}</p>
      <DetailList>
        {measurementTips.measurements.map((tip, index) => (
          <DetailRow key={tip.name} label={`${index + 1} · ${tip.name}`}>
            <span className="text-muted-foreground">{tip.description}</span>
          </DetailRow>
        ))}
      </DetailList>
    </div>
  )
}
