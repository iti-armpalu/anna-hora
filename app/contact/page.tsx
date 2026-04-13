import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { contactContent } from "./_data"
import { ContactInfoCard } from "./_components/contact-info-card"
import { FAQCard } from "./_components/faq-card"
import { FollowUsCard } from "./_components/follow-us-card"

export const metadata: Metadata = pageMeta.contact

export default function ContactPage() {
    return (
        <div className="py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <header className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
                        {contactContent.header.title}
                    </h1>
                    <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
                        {contactContent.header.description}
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ContactInfoCard />
                    <div className="grid grid-rows-2 gap-6">
                        <FAQCard />
                        <FollowUsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}