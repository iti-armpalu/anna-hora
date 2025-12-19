import Link from "next/link"
import { navigation } from "@/lib/config/navigation"
import { MobileNav } from "./mobile-nav"
import { DesktopNav } from "./desktop-nav"

import Image from "next/image"
import { QuickActions } from "./quick-actions"


export default function Header() {


  return (
    <header className="sticky top-0 z-50 bg-neutral-50/95 backdrop-blur-sm border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link
            href="/"
            className="relative block h-10 w-32 sm:h-12 sm:w-40 lg:h-16 lg:w-60"
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

          {/* Desktop navigation (server markup + tiny client links for active state) */}
          <nav aria-label="Primary" className="hidden lg:block">
            <DesktopNav items={navigation} />
          </nav>

          <div className="flex items-center">
            <QuickActions />
            <div className="lg:hidden">
              <MobileNav items={navigation} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
