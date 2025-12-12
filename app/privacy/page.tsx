import Link from "next/link"
import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import PRIVACY_DATA from "./_data"
import type { PrivacySection } from "./_data"

// Helper to safely get icon component
function getIcon(iconName: string, fallback: LucideIcon = Icons.Shield): LucideIcon {
  return (Icons[iconName as keyof typeof Icons] as LucideIcon) ?? fallback
}

// Hero Section Component
function PrivacyHero() {
  const { hero } = PRIVACY_DATA
  const HeroIcon = getIcon(hero.icon)

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <HeroIcon className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl lg:text-5xl font-light text-foreground">{hero.title}</h1>
          </div>

          {hero.intro.map((paragraph, idx) => (
            <p key={idx} className="text-lg text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}

          <p className="text-sm text-muted-foreground mt-4">Last updated: {hero.lastUpdated}</p>
        </div>
      </div>
    </section>
  )
}

// Section Header Component
function SectionHeader({ icon, title }: { icon: string; title: string }) {
  const Icon = getIcon(icon)

  return (
    <div className="flex items-center mb-6">
      <Icon className="h-6 w-6 text-primary mr-3" />
      <h2 className="text-2xl font-light text-card-foreground">{title}</h2>
    </div>
  )
}

// Content Components
function SectionParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-card-foreground">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

function SectionItems({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-card-foreground">
      {items.map((item, i) => (
        <li key={i} className="flex items-start">
          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SectionSubsections({ subsections }: { subsections: PrivacySection["subsections"] }) {
  if (!subsections) return null

  return (
    <div className="space-y-3 mt-4 text-card-foreground">
      {subsections.map((sub, i) => (
        <div key={i}>
          <h3 className="text-lg font-medium mb-2">{sub.heading}</h3>
          <p className={`leading-relaxed ${sub.small ? "text-sm text-muted-foreground" : ""}`}>{sub.text}</p>
        </div>
      ))}
    </div>
  )
}

function SectionRights({ rights }: { rights: PrivacySection["rights"] }) {
  if (!rights) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-card-foreground">
      {rights.map((right, i) => (
        <div key={i} className="space-y-1">
          <h3 className="font-medium">{right.title}</h3>
          <p className="text-sm text-muted-foreground">{right.description}</p>
        </div>
      ))}
    </div>
  )
}

// Main Section Component
function ContentSection({ section }: { section: PrivacySection }) {
  const wrapperClass =
    section.emphasis === "primary"
      ? "bg-primary/5 rounded-lg p-8 border border-primary/20"
      : "bg-card rounded-lg p-8 border border-border"

  return (
    <div className={wrapperClass}>
      <SectionHeader icon={section.icon} title={section.title} />

      {section.intro && <p className="leading-relaxed text-card-foreground mb-4">{section.intro}</p>}

      {section.paragraphs && <SectionParagraphs paragraphs={section.paragraphs} />}
      {section.items && <SectionItems items={section.items} />}
      {section.subsections && <SectionSubsections subsections={section.subsections} />}
      {section.rights && <SectionRights rights={section.rights} />}

      {section.note && <p className="leading-relaxed text-sm text-muted-foreground mt-4">{section.note}</p>}
    </div>
  )
}

// Contact Section Component
function ContactSection() {
  const { contact } = PRIVACY_DATA

  return (
    <div className="bg-primary/5 rounded-lg p-8 border border-primary/20">
      <div className="flex items-center mb-6">
        <Icons.Mail className="h-6 w-6 text-primary mr-3" />
        <h2 className="text-2xl font-light text-foreground">Contact Us</h2>
      </div>

      <div className="space-y-4">
        <p className="leading-relaxed text-foreground">{contact.intro}</p>

        <div className="space-y-2 text-foreground">
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Phone:</strong> {contact.phone}
          </p>
        </div>

        <div className="pt-4">
          <Link href={contact.ctaHref}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">{contact.ctaText}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Policy Updates Component
function PolicyUpdatesSection() {
  const { policyUpdates } = PRIVACY_DATA

  return (
    <div className="text-center py-8">
      <h3 className="text-xl font-light text-foreground mb-4">{policyUpdates.title}</h3>
      <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">{policyUpdates.text}</p>
    </div>
  )
}

// Main Page Component
export default function PrivacyPage() {
  return (
    <div>
      <PrivacyHero />

      <section className="py-16 lg:py-24 lg:pt-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {PRIVACY_DATA.sections.map((section) => (
                <ContentSection key={section.key} section={section} />
              ))}

              <ContactSection />
              <PolicyUpdatesSection />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
