"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/config/site"
import { footerNavigation } from "@/lib/config/footer"

type Item = { label: string; href: string }

export function MobileNav({ items }: { items: readonly Item[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const close = () => setIsOpen(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(`${href}/`) || pathname === href

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full p-0 bg-stone-50 border-0 [&>button]:hidden"
      >
        <VisuallyHidden.Root>
          <SheetTitle>Navigation menu</SheetTitle>
        </VisuallyHidden.Root>

        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-100">
            <Link href="/" onClick={close} aria-label="ANNA HORA - Return to homepage">
              <Image
                src="/anna-hora-logo-2026-04.png"
                alt="ANNA HORA"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={close}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Primary Navigation */}
          <nav aria-label="Mobile primary" className="px-6 pt-8 pb-6">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={`flex items-center justify-between py-3 text-2xl font-light transition-colors border-b border-stone-100 ${isActive(item.href)
                      ? "text-anna-green-900"
                      : "text-stone-800 hover:text-anna-green-900"
                      }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-anna-green-900" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Secondary Navigation */}
          <div className="px-6 py-6 border-t border-stone-200">
            <p className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-4">
              Customer Care
            </p>
            <ul className="space-y-3">
              {footerNavigation.customerCare.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-auto px-6 py-6 border-t border-stone-200 bg-white">
            <div className="flex items-center justify-between">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@{siteConfig.social.instagram.handle}</span>
                </a>
              )}
              <p className="text-xs text-stone-400">
                © {new Date().getFullYear()} {siteConfig.name.toUpperCase()}
              </p>
            </div>
          </div>

        </div>
      </SheetContent>
    </Sheet >
  )
}