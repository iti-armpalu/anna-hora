import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <Spinner className="w-12 h-12 mx-auto mb-4 text-stone-800" />
        <p className="text-stone-600 font-light">Loading press coverage...</p>
      </div>
    </div>
  )
}
