import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Me-Time Letters</h3>
          <p className="text-stone-600 mb-8">
            Join our community and receive thoughtful notes about self-care, styling tips, and exclusive access to new
            collections. Sent occasionally, always with intention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-1 border-stone-300 focus:border-stone-500"
            />
            <Button className="bg-anna-green-950 hover:bg-stone-700 text-white px-8">Subscribe</Button>
          </div>
          <p className="text-xs text-stone-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
