"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Clock,
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { SHIPPING_RETURNS_CONTENT } from "./_data"
import { siteConfig } from "@/lib/config/site"
import { CopyButton } from "@/components/ui/copy-button"

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


export default function ShippingReturnsPage() {
  const [guestReturnData, setGuestReturnData] = useState({
    orderNumber: "",
    email: "",
  })
  const [isGuestReturnOpen, setIsGuestReturnOpen] = useState(false)

  const handleGuestReturn = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle guest return logic here
    console.log("Guest return:", guestReturnData)
    setIsGuestReturnOpen(false)
    // Show success message or redirect
  }

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero Section */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">{SHIPPING_RETURNS_CONTENT.hero.title}</h1>
          <p className="text-xl text-stone-600 mb-4">{SHIPPING_RETURNS_CONTENT.hero.subtitle}</p>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {SHIPPING_RETURNS_CONTENT.hero.description}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Shipping Section */}
          <div className="lg:col-span-2 space-y-12">
            <Card className="border-stone-200 shadow-sm py-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <h2 className="font-serif text-2xl text-stone-900">Delivery</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {SHIPPING_RETURNS_CONTENT.delivery.info.map((block, index) => (
                    <div key={index} className="border border-stone-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-stone-900">{block.name}</h3>
                      </div>
                      <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/60" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  ))}
                </div>

                {/* Important Notes */}
                <div className="bg-secondary/60 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Important Notes
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                    {SHIPPING_RETURNS_CONTENT.delivery.importantNotes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>

                {/* Support + CTA */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <Link
                    href={SHIPPING_RETURNS_CONTENT.delivery.ctaHref}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
                  >
                    {SHIPPING_RETURNS_CONTENT.delivery.ctaText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>


              </CardContent>
            </Card>

            {/* Returns Section */}
            <Card className="border-stone-200 shadow-sm py-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <h2 className="font-serif text-2xl text-stone-900">{SHIPPING_RETURNS_CONTENT.returns.title}</h2>
                </div>

                <p className="text-stone-600 mb-8 leading-relaxed">{SHIPPING_RETURNS_CONTENT.returns.description}</p>

                {/* Return Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {SHIPPING_RETURNS_CONTENT.returns.steps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-medium">
                        {step.step}
                      </div>
                      <h3 className="font-medium text-stone-900 mb-2">{step.title}</h3>
                      <p className="text-stone-600 text-sm">{step.description}</p>
                    </div>
                  ))}
                </div>

                {/* Return Button */}
                <div className="flex justify-center gap-4 mb-8">
                  <Button asChild className="bg-anna-green-900 hover:bg-stone-800 text-white">
                    <Link href="/account">Initiate a Return</Link>
                  </Button>
                </div>

                {/* Return Policy Details */}
                <div className="border-t border-stone-200 pt-6 mb-6">
                  <h3 className="font-medium text-stone-900 mb-4">Return Policy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

                    {SHIPPING_RETURNS_CONTENT.returns.policy.map((block, index) => (
                      <div key={index} className="border border-stone-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-stone-900">{block.name}</h3>
                        </div>
                        <ul className="list-disc ml-4 flex flex-col gap-1.5 text-sm text-muted-foreground">
                          {block.conditions.map((item, i) => (
                            <li key={i} className="list-item flex items-start gap-2">
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                      </div>
                    ))}

                  </div>
                </div>
                {/* Support + CTA */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <Link
                    href={SHIPPING_RETURNS_CONTENT.returns.ctaHref}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
                  >
                    {SHIPPING_RETURNS_CONTENT.returns.ctaText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Complaints Section */}
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center space-x-3">
                  <h2 className="font-serif text-2xl text-stone-900">
                    {SHIPPING_RETURNS_CONTENT.complaints.title}
                  </h2>
                </div>

                <p className="mb-6 leading-relaxed text-stone-600">
                  {SHIPPING_RETURNS_CONTENT.complaints.description}
                </p>
                <div className="space-y-4">
                  <ContactInfo
                    icon={<Mail className="w-5 h-5 text-stone-600 mt-0.5" />}
                    label="Email us directly"
                    content={
                      <CopyButton value={siteConfig.supportEmail} />
                    }
                  />

                  <ContactInfo
                    icon={<Phone className="w-5 h-5 text-stone-600 mt-0.5" />}
                    label="Call us"
                    content={
                      <CopyButton value={siteConfig.phone} />
                    }
                  />

                  <ContactInfo
                    icon={<Clock className="w-5 h-5 text-stone-600 mt-0.5" />}
                    label="Customer Care Hours"
                    content={
                      <>
                        <p className="text-stone-900">
                          Monday – Friday: {siteConfig.customerCareHours.mondayFriday}
                        </p>

                        <p className="text-sm text-stone-500">
                          Saturday: {siteConfig.customerCareHours.saturday}
                        </p>

                        <p className="text-sm text-stone-500">
                          Sunday: {siteConfig.customerCareHours.sunday}
                        </p>
                      </>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-4">Need Quick Answers?</h3>
                <p className="text-stone-600 text-sm mb-4">{SHIPPING_RETURNS_CONTENT.support.description}</p>
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                  >
                    <Link href="/faq">{SHIPPING_RETURNS_CONTENT.support.links.faq}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                  >
                    <Link href="/our-silk">{SHIPPING_RETURNS_CONTENT.support.links.careInstructions}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
