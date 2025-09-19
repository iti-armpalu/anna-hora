import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CTA {
  label: string
  href: string
  variant?: "default" | "outline"
}

interface CTAGroupProps {
  ctas: CTA[]
}

export function CTAGroup({ ctas }: CTAGroupProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {ctas.map((cta, idx) => (
        <Link key={idx} href={cta.href}>
          <Button
            size="lg"
            variant={cta.variant ?? "default"}
            className={
              cta.variant === "outline"
                ? "border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-3 bg-transparent"
                : "bg-stone-800 hover:bg-stone-700 text-white px-8 py-3"
            }
          >
            {cta.label}
          </Button>
        </Link>
      ))}
    </div>
  )
}
