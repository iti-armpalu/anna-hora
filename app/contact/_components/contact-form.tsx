"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

import { toast } from "sonner"

// Constants
const SUBJECT_OPTIONS = [
  { value: "orders", label: "Orders" },
  { value: "returns", label: "Returns & Exchanges" },
  { value: "products", label: "Product Questions" },
  { value: "styling", label: "Styling Advice" },
  { value: "collaborations", label: "Collaborations" },
  { value: "other", label: "Other" },
] as const

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  orderNumber: "",
  subject: "",
  message: "",
}

type FormData = typeof INITIAL_FORM_STATE

function FormField({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-700 mb-2">
        {label} {required && "*"}
      </label>
      {children}
    </div>
  )
}

export function ContactForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // try {
    //   const result = await submitContactForm(formData)

    //   if (result.success) {
    //     // Reset form
    //     setFormData(INITIAL_FORM_STATE)
    //     // Redirect to success page
    //     router.push("/contact/success")
    //   } else {
    //     toast.error(result.error || "Failed to send message. Please try again.")
    //   }
    // } catch (error) {
    //   console.error("[v0] Contact form submission error:", error)
    //   toast.error("An unexpected error occurred. Please try again.")
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  const inputClassName = "border-stone-300 focus:border-stone-500 focus:ring-stone-500"

  return (
    <Card className="border-stone-200 shadow-sm">
      <CardContent className="p-8">
        <h2 className="font-serif text-2xl text-stone-900 mb-6">Send us a Message</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField id="name" label="Name" required>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={inputClassName}
                placeholder="Your full name"
              />
            </FormField>

            <FormField id="email" label="Email Address" required>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={inputClassName}
                placeholder="your@email.com"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField id="orderNumber" label="Order Number (Optional)">
              <Input
                id="orderNumber"
                type="text"
                value={formData.orderNumber}
                onChange={(e) => handleChange("orderNumber", e.target.value)}
                className={inputClassName}
                placeholder="AH-12345"
              />
            </FormField>

            <FormField id="subject" label="Subject" required>
              <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)} required>
                <SelectTrigger className={inputClassName}>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <FormField id="message" label="Message" required>
            <Textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`${inputClassName} resize-none`}
              placeholder="Tell us how we can help you..."
            />
          </FormField>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-anna-green-900 hover:bg-stone-800 text-white py-3 text-base font-medium"
          >
            {isSubmitting ? "Sending Message..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
