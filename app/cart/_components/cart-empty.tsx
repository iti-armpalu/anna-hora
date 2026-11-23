import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cartContent } from "../_data"

type Props = {
  /** In the drawer, "continue shopping" just closes it; on the bag page it links to the shop */
  onContinue?: () => void
}

export function CartEmpty({ onContinue }: Props) {
  const { empty } = cartContent

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-field px-6 py-16 text-center">
      <h2 className="text-heading-md font-light mb-0">{empty.title}</h2>
      <p className="text-small">{empty.text}</p>
      {onContinue ? (
        <Button variant="outline" className="mt-tight" onClick={onContinue}>
          {empty.cta}
        </Button>
      ) : (
        <Button asChild variant="outline" className="mt-tight">
          <Link href="/shop">{empty.cta}</Link>
        </Button>
      )}
    </div>
  )
}
