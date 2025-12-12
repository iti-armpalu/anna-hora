import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Clock, Instagram } from "lucide-react"
import { siteConfig } from "@/lib/config/site";


import type { Metadata } from "next"
import { ContactForm } from "./_components/contact-form"

export const metadata: Metadata = {
    title: "Contact Us - We'd Love to Hear from You",
    description: "Get in touch with our team for questions about orders, styling advice, or collaborations.",
}

const HEADER_TITLE = "We'd Love to Hear from You"
const HEADER_DESCRIPTION =
    "Whether you have a question about your order, need styling advice, or simply wish to say hello, our team is here to help."

function ContactInfoCard() {
    return (
        <Card className="border-stone-200 shadow-sm">
            <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-4">Get in Touch</h3>
                <div className="space-y-4">
                    <ContactInfo
                        icon={<Mail className="w-5 h-5 text-stone-600 mt-0.5" />}
                        label="Email us directly"
                        content={
                            <a href="mailto:hello@annahora.com" className="text-stone-900 hover:text-stone-700 transition-colors">
                                {siteConfig.supportEmail}
                            </a>
                        }
                    />
                    <ContactInfo
                        icon={<Phone className="w-5 h-5 text-stone-600 mt-0.5" />}
                        label="Call us"
                        content={
                            <a href="tel:+442071234567" className="text-stone-900 hover:text-stone-700 transition-colors">
                                 {siteConfig.phone}
                            </a>
                        }
                    />
                    <ContactInfo
                        icon={<Clock className="w-5 h-5 text-stone-600 mt-0.5" />}
                        label="Customer Care Hours"
                        content={
                            <p className="text-stone-900 text-sm">
                                Monday - Friday: 9:00 AM - 6:00 PM GMT
                                <br />
                                Saturday: 10:00 AM - 4:00 PM GMT
                            </p>
                        }
                    />
                </div>
            </CardContent>
        </Card>
    )
}

function ContactInfo({
    icon,
    label,
    content,
}: {
    icon: React.ReactNode
    label: string
    content: React.ReactNode
}) {
    return (
        <div className="flex items-start space-x-3">
            {icon}
            <div>
                <p className="text-sm text-stone-600 mb-1">{label}</p>
                {content}
            </div>
        </div>
    )
}

function FAQCard() {
    return (
        <Card className="border-stone-200 shadow-sm">
            <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-2">Need Quick Answers?</h3>
                <p className="text-stone-600 text-sm mb-4">Visit our FAQ page for immediate answers to common questions.</p>
                <Button asChild variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent">
                    <Link href="/faq">View FAQ</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

function FollowUsCard() {
    return (
        <Card className="border-stone-200 shadow-sm">
            <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-4">Follow Us</h3>

                <div className="flex space-x-4">
                    <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors"
                    >
                        <Instagram className="w-5 h-5" />
                        <span className="text-sm">@anna_hora_collection</span>
                    </a>
                </div>
            </CardContent>
        </Card>
    )
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-stone-50">
            <div className="py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <header className="text-center mb-12">
                        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">{HEADER_TITLE}</h1>
                        <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">{HEADER_DESCRIPTION}</p>
                    </header>

                    <div className="grid grid-cols-1 space-y-6">
                        <div className="lg:col-span-2">
                            <ContactForm />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ContactInfoCard />
                            <div className="space-y-6">
                                <FAQCard />
                                <FollowUsCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
