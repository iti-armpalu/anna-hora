// app/components/footer/Footer.tsx
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { footerNavigation } from "@/lib/config/footer";
import { footerSections } from "./sections";
import Year from "./year";
import InstagramGrid from "./instagram-grid";
import PaymentMethods from "./payment-methods";

type FooterColumnProps = {
  section: typeof footerSections[number];
};

function FooterColumn({ section }: FooterColumnProps) {
  const items = footerNavigation[section.key];

  return (
    <nav aria-labelledby={section.key} className="lg:col-span-1">
      <h4 id={section.key} className="font-medium mb-4">
        {section.title}
      </h4>

      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={`${section.key}-${item.href}`}>
            <Link
              href={item.href}
              prefetch={false}
              className="text-anna-cement-200 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-anna-green-900 text-anna-cement-50">
      <div className="container mx-auto">
        {/* Top: Brand + 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl mb-4">{siteConfig.name}</h3>
              <p className="text-sm leading-relaxed text-anna-cement-100">
                {siteConfig.tagline}
              </p>
            </div>
            <PaymentMethods />


          </div>

          {footerSections.map((section) => (
            <div key={section.key} className="lg:col-span-2">
              <FooterColumn section={section} />
            </div>
          ))}

          <InstagramGrid />
        </div>



        {/* Bottom: Legal + Copyright */}
        <div className="border-t border-anna-green-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-anna-cement-300 text-sm">
            © <Year /> {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerNavigation.legal.map((item) => (
              <Link
                key={`legal-${item.href}`}
                href={item.href}
                prefetch={false}
                className="text-anna-cement-300 hover:text-anna-cement-100 text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
