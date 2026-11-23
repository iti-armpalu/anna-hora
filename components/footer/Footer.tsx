import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/lib/config/site"
import { FOOTER_COPY, footerColumns, footerLegalLinks, type FooterColumn } from "@/lib/config/footer"
import InstagramGrid from "./instagram-grid"

// The footer sits on the brand green, so text uses primary-foreground at a few strengths
const LINK_CLASS = "text-small text-primary-foreground/80 transition-colors hover:text-primary-foreground"
const EYEBROW_CLASS = "text-xs font-medium uppercase tracking-widest text-primary-foreground/60 mb-0"

function FooterNav({ column }: { column: FooterColumn }) {
  return (
    <nav aria-label={column.title} className="flex flex-col gap-field">
      <h2 className={EYEBROW_CLASS}>{column.title}</h2>
      <ul className="flex flex-col gap-tight">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} prefetch={false} className={LINK_CLASS}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  // Server-rendered per request (root layout is dynamic), so this is always the current year
  const year = new Date().getFullYear()

  return (
    // data-mobile-filter-footer: the shop's floating filter button hides when this comes into view
    <footer data-mobile-filter-footer className="bg-primary text-primary-foreground">
      <div className="container-site flex flex-col gap-[var(--section-padding)] py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-block sm:grid-cols-2 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-field sm:col-span-2 lg:col-span-6">
            {/* TODO: swap for an SVG white logo when available — invert is a stopgap */}
            <Image
              src="/anna-hora-logo-2026-04.png"
              alt={siteConfig.displayName}
              width={120}
              height={40}
              className="brightness-0 invert"
            />
            <p className="max-w-sm text-small text-primary-foreground/80">{siteConfig.tagline}</p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title} className="lg:col-span-3">
              <FooterNav column={column} />
            </div>
          ))}
        </div>

        <InstagramGrid eyebrowClassName={EYEBROW_CLASS} linkClassName={LINK_CLASS} />

        <div className="flex flex-col gap-field border-t border-primary-foreground/15 pt-block text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-primary-foreground/60">
            © {year} {siteConfig.displayName}. {FOOTER_COPY.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} prefetch={false} className="transition-colors hover:text-primary-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
