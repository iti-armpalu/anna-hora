import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/lib/config/site"
import { footerNavigation } from "@/lib/config/footer"
import { footerSections } from "./sections"
import Year from "./year"
import InstagramGrid from "./instagram-grid"

type FooterColumnProps = {
  section: (typeof footerSections)[number]
}

function FooterColumn({ section }: FooterColumnProps) {
  const items = footerNavigation[section.key]

  return (
    <nav aria-labelledby={section.key} className="lg:col-span-1">
      <h4 id={section.key} className="mb-4 text-white">
        {section.title}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={`${section.key}-${item.href}`}>
            <Link
              href={item.href}
              prefetch={false}
              className="text-xs transition-colors text-stone-100 hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  return (
    <footer
      data-mobile-filter-footer
      className="bg-forest-800 py-12 text-stone-50"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* TODO: replace with white logo variant when available */}
              <Image
                src="/anna-hora-logo-2026-04.png"
                alt={siteConfig.displayName}
                width={120}
                height={40}
                className="mb-4 brightness-0 invert"
              />
              <p className="text-stone-100">{siteConfig.tagline}</p>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.key} className="lg:col-span-2">
              <FooterColumn section={section} />
            </div>
          ))}

          <div className="lg:col-span-12">
            <InstagramGrid />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-forest-700 pt-8 md:flex-row">
          <p className="text-xs transition-colors text-stone-100 hover:text-white">
            © <Year /> {siteConfig.displayName}. All rights reserved.
          </p>

          <div className="mt-4 flex space-x-6 md:mt-0">
            {footerNavigation.legal.map((item) => (
              <Link
                key={`legal-${item.href}`}
                href={item.href}
                prefetch={false}
                className="text-xs transition-colors text-stone-100 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}