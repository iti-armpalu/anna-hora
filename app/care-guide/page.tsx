"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Droplets,
  Sun,
  Wind,
  AlertCircle,
  Package,
  Home,
  Shield,
  Archive,
  Download,
  Phone,
  Mail,
} from "lucide-react"
import { careGuideContent } from "@/data/care-guide-content"


const getIcon = (iconName: string) => {
  const icons = {
    droplets: <Droplets className="w-6 h-6" />,
    sun: <Sun className="w-6 h-6" />,
    wind: <Wind className="w-6 h-6" />,
    alertCircle: <AlertCircle className="w-6 h-6" />,
    package: <Package className="w-6 h-6" />,
    home: <Home className="w-6 h-6" />,
    shield: <Shield className="w-6 h-6" />,
    archive: <Archive className="w-6 h-6" />,
  }
  return icons[iconName as keyof typeof icons] || <Droplets className="w-6 h-6" />
}

export default function CareGuidePage() {

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero Section */}
      <section className="relative bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 mb-6 leading-tight">
            {careGuideContent.hero.title}
            <br />
            <em className="font-serif italic">{careGuideContent.hero.subtitle}</em>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            {careGuideContent.hero.description}
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                {careGuideContent.introduction.title}
                <br />
                <em className="font-serif italic">{careGuideContent.introduction.subtitle}</em>
              </h2>
            </div>
            <div className="space-y-6">
              {careGuideContent.introduction.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-stone-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Care Instructions Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                {careGuideContent.careInstructions.title}
                <br />
                <em className="font-serif italic">{careGuideContent.careInstructions.subtitle}</em>
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                {careGuideContent.careInstructions.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {careGuideContent.careInstructions.instructions.map((instruction) => (
                <Card key={instruction.step} className="border-0 shadow-sm bg-stone-50">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <div className="text-stone-600">{getIcon(instruction.icon)}</div>
                      </div>
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2 border-stone-300 text-stone-600">
                          Step {instruction.step}
                        </Badge>
                        <h3 className="text-xl font-light text-stone-800 mb-2">{instruction.title}</h3>
                        <p className="text-stone-600 text-sm mb-4">{instruction.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-stone-600">
                      {instruction.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                {careGuideContent.commonIssues.title}
                <br />
                <em className="font-serif italic">{careGuideContent.commonIssues.subtitle}</em>
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {careGuideContent.commonIssues.issues.map((issue, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-stone-200 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-light text-stone-800 hover:text-stone-600">
                    {issue.issue}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 leading-relaxed pt-2 pb-4">
                    {issue.solution}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Storage Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                {careGuideContent.storage.title}
                <br />
                <em className="font-serif italic">{careGuideContent.storage.subtitle}</em>
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">{careGuideContent.storage.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {careGuideContent.storage.tips.map((tip, index) => (
                <Card key={index} className="border-0 shadow-sm bg-stone-50 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <div className="text-stone-600">{getIcon(tip.icon)}</div>
                    </div>
                    <h3 className="text-lg font-light text-stone-800 mb-3">{tip.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to Avoid Section */}
      <section className="py-16 lg:py-24 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-8 text-center">
              {careGuideContent.avoidSection.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careGuideContent.avoidSection.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg">
                  <AlertCircle className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" />
                  <p className="text-stone-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 lg:py-24 bg-anna-cement-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">
              {careGuideContent.downloadSection.title}
            </h2>
            <p className="text-lg text-stone-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              {careGuideContent.downloadSection.description}
            </p>
            <Button size="lg" className="bg-white text-stone-900 hover:bg-stone-100 px-8 py-3">
              <Download className="w-5 h-5 mr-2" />
              {careGuideContent.downloadSection.buttonText}
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-8">
              Ready to Experience
              <br />
              <em className="font-serif italic">Pure Silk Luxury?</em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-anna-green-950 hover:bg-stone-700 text-white px-8 py-3" asChild>
                <Link href="/shop">Shop Collection</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-3 bg-transparent"
                asChild
              >
                <Link href="/our-silk">Learn About Our Silk</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
