import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <Spinner size="lg" className="mb-4" />
        <p className="text-stone-600 text-sm">Loading your account...</p>
      </div>
    </div>
  )
}
