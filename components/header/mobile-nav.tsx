"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import { Separator } from "@radix-ui/react-separator"

type Item = { label: string; href: string }

export function MobileNav({ items }: { items: readonly Item[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>


      <SheetContent side="right" className="w-full sm:w-[480px] bg-stone-50 p-0">
        <div className="flex flex-col h-full">

          {/* Header */}
          <SheetHeader className="px-4 py-3 border-b border-stone-200 bg-white">
            {/* <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200"> */}
            <SheetTitle>
              <Link
                href="/"
                className="relative block h-10 w-32 sm:h-12 sm:w-40 lg:h-16 lg:w-60"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src="/anna-hora-logo-black.png"
                  alt="ANNA HORA"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 128px,
           (max-width: 1024px) 160px,
           192px"
                />
              </Link>
            </SheetTitle>

            {/* </div> */}
          </SheetHeader>




          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className="flex flex-col space-y-1 p-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-light text-stone-800 hover:text-stone-600 transition-colors py-3 px-2 hover:bg-stone-100 rounded-md"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Separator className="my-2" />

            {/* Customer Care */}
            {/* <div className="px-4 py-4">
              <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-3">Customer Care</p>
              <div className="space-y-2">
                {siteContent.navigation.footer.customerCare.slice(0, 4).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-2 text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div> */}
          </nav>

          {/* Footer */}
          <div className="border-t border-stone-200 p-4 bg-white">
            <p className="text-xs text-stone-500 text-center">© 2025 Anna Hora</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
