"use client"

import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SizeTable } from "@/app/size-guide/_components/size-table"
import { resolveSizeCategory } from "@/app/size-guide/_data"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sizeGuideId: string | null
}

export function SizeGuideDialog({ open, onOpenChange, sizeGuideId }: Props) {
  const category = resolveSizeCategory(sizeGuideId)

  if (!category) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-stone-500 hover:text-stone-800 underline underline-offset-4 p-0 h-auto font-normal text-xs"
        >
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-light text-stone-800">
            Size Guide — {category.category}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <SizeTable category={category} />
          <div className="mt-8 border-t border-stone-200 pt-4">
            <Link
              href="/size-guide"
              className="text-sm text-stone-600 underline underline-offset-4 hover:text-stone-900 transition-colors"
            >
              View full size guide
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}