import { Spinner } from "@/components/ui/spinner"
import { siteConfig } from "@/lib/config/site"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" className="mb-4" />
        <p className="text-muted-foreground text-small">
          Loading {siteConfig.displayName}
        </p>
      </div>
    </div>
  )
}