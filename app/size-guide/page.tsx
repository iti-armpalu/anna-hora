"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MessageCircle } from "lucide-react"
import { sizeGuideContent } from "@/data/size-guide-content"

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-white">

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl text-stone-900 mb-6 text-balance">{sizeGuideContent.hero.title}</h1>
          <p className="text-xl text-stone-600 mb-6 leading-relaxed max-w-3xl mx-auto text-pretty">
            {sizeGuideContent.hero.subtitle}
          </p>
          <p className="text-stone-500 leading-relaxed max-w-2xl mx-auto">{sizeGuideContent.hero.supportingText}</p>
        </div>

        {/* Contact Section */}
        <Card className="mb-16 border-stone-200 bg-stone-50">
          <CardContent className="p-8">
            <h2 className="font-serif text-2xl text-stone-900 mb-4 text-center">{sizeGuideContent.contact.title}</h2>
            <p className="text-stone-600 text-center mb-6 leading-relaxed">{sizeGuideContent.contact.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                asChild
              >
                <a href={`tel:${sizeGuideContent.contact.phone}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  {sizeGuideContent.contact.phone}
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                asChild
              >
                <a href={`mailto:${sizeGuideContent.contact.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  {sizeGuideContent.contact.email}
                </a>
              </Button>
              {sizeGuideContent.contact.chatButton && (
                <Button className="bg-stone-900 hover:bg-stone-800 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {sizeGuideContent.contact.chatButton}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Measurement Tips */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl text-stone-900 mb-6 text-center">
            {sizeGuideContent.measurementTips.title}
          </h2>
          <p className="text-stone-600 text-center mb-8 leading-relaxed">
            {sizeGuideContent.measurementTips.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sizeGuideContent.measurementTips.measurements.map((measurement, index) => (
              <Card key={index} className="border-stone-200">
                <CardContent className="p-6">
                  <h3 className="font-medium text-stone-900 mb-2">{measurement.name}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{measurement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Size Tables */}
        <div className="space-y-16">
          {sizeGuideContent.sizeCategories.map((category, index) => (
            <div key={index}>
              <div className="mb-8">
                <h2 className="font-serif text-3xl text-stone-900 mb-3">{category.category}</h2>
                {category.description && <p className="text-stone-600 mb-4 leading-relaxed">{category.description}</p>}
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      {category.table.headers.map((header, headerIndex) => (
                        <th key={headerIndex} className="text-left py-4 px-4 font-medium text-stone-900 bg-stone-50">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {category.table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-stone-100 hover:bg-stone-50/50">
                        <td className="py-3 px-4 font-medium text-stone-900">{row.measurement}</td>
                        {row.xs && <td className="py-3 px-4 text-stone-600">{row.xs}</td>}
                        {row.s && <td className="py-3 px-4 text-stone-600">{row.s}</td>}
                        {row.m && <td className="py-3 px-4 text-stone-600">{row.m}</td>}
                        {row.l && <td className="py-3 px-4 text-stone-600">{row.l}</td>}
                        {row.xl && <td className="py-3 px-4 text-stone-600">{row.xl}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {category.fitNotes && (
                <Card className="border-stone-200 bg-stone-50">
                  <CardContent className="p-6">
                    <p className="text-stone-600 leading-relaxed italic">{category.fitNotes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>

        {/* General Notes */}
        <div className="mt-16 text-center">
          <h2 className="font-serif text-3xl text-stone-900 mb-6">{sizeGuideContent.generalNotes.title}</h2>
          <p className="text-stone-600 leading-relaxed max-w-3xl mx-auto text-pretty">
            {sizeGuideContent.generalNotes.content}
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button asChild className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3">
            <Link href="/shop">Shop Collection</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
