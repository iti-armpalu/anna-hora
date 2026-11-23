import { NewsletterForm } from "./newsletter-form"

/** Newsletter signup band — on the home page and the journal. */
export function NewsletterSection() {
  return (
    <section className="section bg-secondary">
      <div className="container-site">
        <NewsletterForm />
      </div>
    </section>
  )
}
