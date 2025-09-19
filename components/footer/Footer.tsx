// components/footer/Footer.tsx (server component)
import Link from "next/link"
import { footerContent } from "@/data/footer-content"
import { SEO } from "@/config/seo"

type SectionKey = keyof typeof footerContent.navigation
const sections: { id: string; title: string; key: SectionKey }[] = [
  { id: "shop", title: "Shop", key: "shop" },
  { id: "customer-care", title: "Customer Care", key: "customerCare" },
  { id: "about", title: "About", key: "about" },
]

function FooterColumn({ id, title, keyName }: { id: string; title: string; keyName: SectionKey }) {
  const items = footerContent.navigation[keyName]
  return (
    <nav aria-labelledby={id} className="lg:col-span-1">
      <h4 id={id} className="font-medium mb-4">{title}</h4>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={`${id}-${item.href}`}>
            <Link href={item.href} prefetch={false} className="text-stone-300 hover:text-white transition-colors">
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
    <footer className="bg-stone-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-xl mb-4">{SEO.siteName}</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              {SEO.description}
            </p>
          </div>

          {sections.map((s) => (
            <FooterColumn key={s.id} id={s.id} title={s.title} keyName={s.key} />
          ))}
        </div>

        <div className="border-t border-stone-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-400 text-sm">© {new Date().getFullYear()} {SEO.siteName}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerContent.navigation.legal.map((item) => (
              <Link key={`legal-${item.href}`} href={item.href} prefetch={false}
                className="text-stone-400 hover:text-white text-sm transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
