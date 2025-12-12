import { ABOUT_CONTENT } from "../_data"
import type { CommitmentCard } from "../_data"

function CommitmentCardItem({ title, body, note }: CommitmentCard) {
  return (
    <div className="bg-white p-8 rounded-lg">
      <h4 className="text-xl font-light text-stone-800 mb-4">{title}</h4>
      <p className="text-stone-600 leading-relaxed mb-4">{body}</p>
      <p className="text-sm text-stone-500">{note}</p>
    </div>
  )
}

export function CommitmentsSection() {
  const { commitments } = ABOUT_CONTENT

  return (
    <section className="py-16 lg:py-24 bg-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6 leading-tight">
            {commitments.introTitle}
          </h3>
          <p className="text-lg text-stone-600 leading-relaxed">{commitments.introText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {commitments.cards.map((card) => (
            <CommitmentCardItem key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
