import { Spinner } from "@/components/ui/spinner"
import { siteConfig } from "@/lib/config/site"

// min-h-screen is load-bearing: Next.js only scrolls to the top on navigation if this
// loading UI starts *outside* the viewport. A short loading UI collapses the page,
// lands in view, and the scroll-to-top is skipped — leaving the product page opened mid-way.
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" className="mb-4" />
        <p className="text-stone-600 text-sm">
          Loading {siteConfig.displayName}
        </p>
      </div>
    </div>
  )
}
