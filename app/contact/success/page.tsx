import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thank You - Message Sent Successfully",
  description: "Thank you for contacting us. We'll respond within 1-2 business days.",
}

const SUCCESS_TITLE = "Thank You"
const SUCCESS_DESCRIPTION = "Thank you for getting in touch. We'll respond within 1–2 business days."

export default function ContactSuccessPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center py-20">
            <h1 className="font-serif text-4xl text-stone-900 mb-6">{SUCCESS_TITLE}</h1>
            <p className="text-stone-600 text-lg leading-relaxed">{SUCCESS_DESCRIPTION}</p>
            <div className="mt-8">
              <Button
                asChild
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
              >
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
