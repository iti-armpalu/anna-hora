import { Spinner } from "@/components/ui/spinner"
import { siteConfig } from "@/lib/config/site"

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" className="mb-4" />
        <p className="text-stone-600 text-sm">Loading {siteConfig.name.toUpperCase()}</p>
      </div>
    </div>
  )
}