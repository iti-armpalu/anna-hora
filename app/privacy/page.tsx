import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import privacyData from "@/data/privacy-content";

export default function PrivacyPage() {
  const HeroIcon = (Icons[privacyData.hero.icon] as LucideIcon) ?? Icons.Shield;

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <HeroIcon className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl lg:text-5xl font-light text-foreground">
                {privacyData.hero.title}
              </h1>
            </div>

            {privacyData.hero.intro.map((p, idx) => (
              <p
                key={idx}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                {p}
              </p>
            ))}

            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {privacyData.hero.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 lg:py-24 lg:pt-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {privacyData.sections.map((section) => {
                const Icon =
                  (Icons[section.icon] as LucideIcon) ?? Icons.FileText;

                const wrapperClass =
                  section.emphasis === "primary"
                    ? "bg-primary/5 rounded-lg p-8 border border-primary/20"
                    : "bg-card rounded-lg p-8 border border-border";

                return (
                  <div key={section.key} className={wrapperClass}>
                    <div className="flex items-center mb-6">
                      <Icon className="h-6 w-6 text-primary mr-3" />
                      <h2 className="text-2xl font-light text-card-foreground">
                        {section.title}
                      </h2>
                    </div>

                    {/* intro paragraph */}
                    {section.intro && (
                      <p className="leading-relaxed text-card-foreground mb-4">
                        {section.intro}
                      </p>
                    )}

                    {/* generic paragraphs */}
                    {section.paragraphs?.length ? (
                      <div className="space-y-4 text-card-foreground">
                        {section.paragraphs.map((p, i) => (
                          <p key={i} className="leading-relaxed">
                            {p}
                          </p>
                        ))}
                      </div>
                    ) : null}

                    {/* bullet list */}
                    {section.items?.length ? (
                      <div className="space-y-4 text-card-foreground">
                        <ul className="space-y-3">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {/* subsections */}
                    {section.subsections?.length ? (
                      <div className="space-y-3 mt-4 text-card-foreground">
                        {section.subsections.map((s, i) => (
                          <div key={i}>
                            <h3 className="text-lg font-medium mb-2">
                              {s.heading}
                            </h3>
                            <p
                              className={`leading-relaxed ${s.small ? "text-sm text-muted-foreground" : ""
                                }`}
                            >
                              {s.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {/* rights grid */}
                    {section.rights?.length ? (
                      <div className="space-y-4 text-card-foreground">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {section.rights.map((r, i) => (
                            <div key={i} className="space-y-3">
                              <div>
                                <h3 className="font-medium">{r.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {r.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* small note */}
                    {section.note && (
                      <p className="leading-relaxed text-sm text-muted-foreground mt-4">
                        {section.note}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Contact */}
              <div className="bg-primary/5 rounded-lg p-8 border border-primary/20">
                <div className="flex items-center mb-6">
                  <Icons.Mail className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-light text-foreground">
                    Contact Us
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed text-foreground">
                    {privacyData.contact.intro}
                  </p>
                  <div className="space-y-2 text-foreground">
                    <p>
                      <strong>Email:</strong> {privacyData.contact.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {privacyData.contact.phone}
                    </p>
                    {/* <p>
                      <strong>Address:</strong> {privacyData.contact.addressLines[0]}
                      <br />
                      {privacyData.contact.addressLines[1]}
                      <br />
                      {privacyData.contact.addressLines[2]}
                    </p> */}
                  </div>
                  <div className="pt-4">
                    <Link href={privacyData.contact.ctaHref}>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        {privacyData.contact.ctaText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="text-center py-8">
                <h3 className="text-xl font-light text-foreground mb-4">
                  {privacyData.policyUpdates.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {privacyData.policyUpdates.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

