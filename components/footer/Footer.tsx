import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { footerNavigation } from "@/lib/config/footer";
import { footerSections } from "./sections";
import Year from "./year";
import InstagramGrid from "./instagram-grid";

type FooterColumnProps = {
  section: (typeof footerSections)[number];
};

function FooterColumn({ section }: FooterColumnProps) {
  const items = footerNavigation[section.key];

  return (
    <nav aria-labelledby={section.key} className="lg:col-span-1">
      <h4 id={section.key} className="mb-4 font-medium">
        {section.title}
      </h4>

      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={`${section.key}-${item.href}`}>
            <Link
              href={item.href}
              prefetch={false}
              className="text-anna-cement-200 transition-colors hover:text-white"
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
    <footer
      data-mobile-filter-footer
      className="bg-anna-green-900 py-12 text-anna-cement-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="mb-4 text-xl">{siteConfig.name.toUpperCase()}</h3>
              <p className="text-sm leading-relaxed text-anna-cement-100">
                {siteConfig.tagline}
              </p>
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

        <div className="mt-8 flex flex-col items-center justify-between border-t border-anna-green-800 pt-8 md:flex-row">
          <p className="text-sm text-anna-cement-300">
            © <Year />{" "}{siteConfig.name.toUpperCase()}. All rights reserved.
          </p>

          <div className="mt-4 flex space-x-6 md:mt-0">
            {footerNavigation.legal.map((item) => (
              <Link
                key={`legal-${item.href}`}
                href={item.href}
                prefetch={false}
                className="text-sm text-anna-cement-300 transition-colors hover:text-anna-cement-100"
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