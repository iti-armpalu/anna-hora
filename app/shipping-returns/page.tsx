"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Truck,
  Package,
  RotateCcw,
  Headphones,
  Clock,
  Mail,
  Phone,
} from "lucide-react"
import { shippingReturnsContent } from "@/data/shipping-returns-content"

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
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">{shippingReturnsContent.hero.title}</h1>
          <p className="text-xl text-stone-600 mb-4">{shippingReturnsContent.hero.subtitle}</p>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {shippingReturnsContent.hero.description}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Shipping Section */}
          <div className="lg:col-span-2 space-y-12">
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Truck className="w-6 h-6 text-stone-600" />
                  <h2 className="font-serif text-2xl text-stone-900">{shippingReturnsContent.shipping.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {shippingReturnsContent.shipping.options.map((option, index) => (
                    <div key={index} className="border border-stone-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-stone-900">{option.name}</h3>
                        <span className="text-stone-900 font-medium">{option.cost}</span>
                      </div>
                      <p className="text-stone-600 text-sm mb-1">{option.deliveryTime}</p>
                      {option.description && <p className="text-stone-500 text-sm">{option.description}</p>}
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <h3 className="font-medium text-stone-900 mb-3">{shippingReturnsContent.shipping.dispatch.title}</h3>
                  <div className="space-y-2 text-stone-600">
                    <p className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{shippingReturnsContent.shipping.dispatch.cutoffTime}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Package className="w-4 h-4" />
                      <span>{shippingReturnsContent.shipping.dispatch.trackingInfo}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-stone-50 rounded-lg">
                  <p className="text-stone-700 italic text-center">{shippingReturnsContent.shipping.reassurance}</p>
                </div>
              </CardContent>
            </Card>

            {/* Returns Section */}
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <RotateCcw className="w-6 h-6 text-stone-600" />
                  <h2 className="font-serif text-2xl text-stone-900">{shippingReturnsContent.returns.title}</h2>
                </div>

                <p className="text-stone-600 mb-8 leading-relaxed">{shippingReturnsContent.returns.description}</p>

                {/* Return Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {shippingReturnsContent.returns.steps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-medium">
                        {step.step}
                      </div>
                      <h3 className="font-medium text-stone-900 mb-2">{step.title}</h3>
                      <p className="text-stone-600 text-sm">{step.description}</p>
                    </div>
                  ))}
                </div>

                {/* Return Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild className="bg-stone-900 hover:bg-stone-800 text-white flex-1">
                    <Link href="/account">{shippingReturnsContent.returns.buttons.loggedIn}</Link>
                  </Button>

                  <Dialog open={isGuestReturnOpen} onOpenChange={setIsGuestReturnOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-stone-300 text-stone-700 hover:bg-stone-100 flex-1 bg-transparent"
                      >
                        {shippingReturnsContent.returns.buttons.guest}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Guest Return</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleGuestReturn} className="space-y-4">
                        <div>
                          <label htmlFor="orderNumber" className="block text-sm font-medium text-stone-700 mb-2">
                            Order Number
                          </label>
                          <Input
                            id="orderNumber"
                            type="text"
                            required
                            value={guestReturnData.orderNumber}
                            onChange={(e) => setGuestReturnData((prev) => ({ ...prev, orderNumber: e.target.value }))}
                            placeholder="AH-12345"
                            className="border-stone-300"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={guestReturnData.email}
                            onChange={(e) => setGuestReturnData((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="your@email.com"
                            className="border-stone-300"
                          />
                        </div>
                        <Button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white">
                          Submit Return Request
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Return Policy Details */}
                <div className="border-t border-stone-200 pt-6">
                  <h3 className="font-medium text-stone-900 mb-4">Return Policy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-medium text-stone-900 mb-2">Return Window</h4>
                      <p className="text-stone-600">{shippingReturnsContent.returns.policy.window}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-900 mb-2">Item Condition</h4>
                      <ul className="text-stone-600 space-y-1">
                        {shippingReturnsContent.returns.policy.condition.map((condition, index) => (
                          <li key={index}>• {condition}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-900 mb-2">Refund Timeline</h4>
                      <p className="text-stone-600">{shippingReturnsContent.returns.policy.refundTimeline}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-900 mb-2">Exceptions</h4>
                      <ul className="text-stone-600 space-y-1">
                        {shippingReturnsContent.returns.policy.exceptions.map((exception, index) => (
                          <li key={index}>• {exception}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Complaints Section */}
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Headphones className="w-6 h-6 text-stone-600" />
                  <h2 className="font-serif text-2xl text-stone-900">{shippingReturnsContent.complaints.title}</h2>
                </div>

                <p className="text-stone-600 mb-6 leading-relaxed">{shippingReturnsContent.complaints.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {shippingReturnsContent.complaints.contacts.map((contact, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 border border-stone-200 rounded-lg">
                      {contact.type === "phone" ? (
                        <Phone className="w-5 h-5 text-stone-600" />
                      ) : (
                        <Mail className="w-5 h-5 text-stone-600" />
                      )}
                      <div>
                        <p className="text-sm text-stone-600 mb-1">{contact.label}</p>
                        <a
                          href={contact.href}
                          className="text-stone-900 hover:text-stone-700 transition-colors font-medium"
                        >
                          {contact.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button asChild className="bg-stone-900 hover:bg-stone-800 text-white">
                    <Link href="/contact">Contact Form</Link>
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-stone-50 rounded-lg">
                  <p className="text-stone-700 text-center">{shippingReturnsContent.complaints.resolution}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-4">Need Quick Answers?</h3>
                <p className="text-stone-600 text-sm mb-4">{shippingReturnsContent.support.description}</p>
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                  >
                    <Link href="/faq">{shippingReturnsContent.support.links.faq}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                  >
                    <Link href="/our-silk">{shippingReturnsContent.support.links.careInstructions}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-4">Track Your Order</h3>
                <p className="text-stone-600 text-sm mb-4">Enter your order number to track your shipment.</p>
                <div className="space-y-3">
                  <Input placeholder="Order number (AH-12345)" className="border-stone-300" />
                  <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white">Track Order</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-2">Customer Care Hours</h3>
                <div className="text-stone-600 text-sm space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM GMT</p>
                  <p>Saturday: 10:00 AM - 4:00 PM GMT</p>
                  <p className="text-stone-500 mt-2">Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
