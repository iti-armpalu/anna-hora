"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Clock } from "lucide-react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        orderNumber: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsSubmitted(true)
        setIsSubmitting(false)

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({
                name: "",
                email: "",
                orderNumber: "",
                subject: "",
                message: "",
            })
        }, 3000)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-stone-50">
                <div className="py-12 px-4">
                    <div className="container mx-auto max-w-2xl">
                        <div className="text-center py-20">
                            <h1 className="font-serif text-4xl text-stone-900 mb-6">Thank You</h1>
                            <p className="text-stone-600 text-lg leading-relaxed">
                                Thank you for getting in touch. We–ll respond within 1–2 business days.
                            </p>
                            <div className="mt-8">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                                >
                                    <Link href="/">Return to Home</Link>
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-stone-50">

            <div className="py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">We-d Love to Hear from You</h1>
                        <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
                            Whether you have a question about your order, need styling advice, or simply wish to say hello, our team
                            is here to help.
                        </p>
                    </div>

                    {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-12"> */}
                    <div className="grid grid-cols-1">

                        <div className="lg:col-span-2">
                            <Card className="border-stone-200 shadow-sm">
                                <CardContent className="p-8">
                                    <h2 className="font-serif text-2xl text-stone-900 mb-6">Send us a Message</h2>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                                                    Name *
                                                </label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                                    className="border-stone-300 focus:border-stone-500 focus:ring-stone-500"
                                                    placeholder="Your full name"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    className="border-stone-300 focus:border-stone-500 focus:ring-stone-500"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="orderNumber" className="block text-sm font-medium text-stone-700 mb-2">
                                                    Order Number (Optional)
                                                </label>
                                                <Input
                                                    id="orderNumber"
                                                    type="text"
                                                    value={formData.orderNumber}
                                                    onChange={(e) => handleInputChange("orderNumber", e.target.value)}
                                                    className="border-stone-300 focus:border-stone-500 focus:ring-stone-500"
                                                    placeholder="AH-12345"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                                                    Subject *
                                                </label>
                                                <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                                                    <SelectTrigger className="border-stone-300 focus:border-stone-500 focus:ring-stone-500">
                                                        <SelectValue placeholder="Select a topic" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="orders">Orders</SelectItem>
                                                        <SelectItem value="returns">Returns & Exchanges</SelectItem>
                                                        <SelectItem value="products">Product Questions</SelectItem>
                                                        <SelectItem value="styling">Styling Advice</SelectItem>
                                                        <SelectItem value="collaborations">Collaborations</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                                                Message *
                                            </label>
                                            <Textarea
                                                id="message"
                                                required
                                                rows={6}
                                                value={formData.message}
                                                onChange={(e) => handleInputChange("message", e.target.value)}
                                                className="border-stone-300 focus:border-stone-500 focus:ring-stone-500 resize-none"
                                                placeholder="Tell us how we can help you..."
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3 text-base font-medium"
                                        >
                                            {isSubmitting ? "Sending Message..." : "Send Message"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <Card className="border-stone-200 shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-serif text-xl text-stone-900 mb-4">Get in Touch</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <Mail className="w-5 h-5 text-stone-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-stone-600 mb-1">Email us directly</p>
                                                <a
                                                    href="mailto:hello@annahora.com"
                                                    className="text-stone-900 hover:text-stone-700 transition-colors"
                                                >
                                                    hello@annahora.com
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Phone className="w-5 h-5 text-stone-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-stone-600 mb-1">Call us</p>
                                                <a href="tel:+442071234567" className="text-stone-900 hover:text-stone-700 transition-colors">
                                                    +44 (0) 20 7123 4567
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Clock className="w-5 h-5 text-stone-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-stone-600 mb-1">Customer Care Hours</p>
                                                <p className="text-stone-900 text-sm">
                                                    Monday - Friday: 9:00 AM - 6:00 PM GMT
                                                    <br />
                                                    Saturday: 10:00 AM - 4:00 PM GMT
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-stone-200 shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-serif text-xl text-stone-900 mb-2">Need Quick Answers?</h3>
                                    <p className="text-stone-600 text-sm mb-4">
                                        Visit our FAQ page for immediate answers to common questions.
                                    </p>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                                    >
                                        <Link href="/faq">View FAQ</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
