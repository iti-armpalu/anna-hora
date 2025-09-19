"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Shield, Lock, Eye, FileText, Mail } from "lucide-react"
import Loading from "@/components/loading"

import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl lg:text-5xl font-light text-foreground">Privacy Policy</h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your privacy is fundamental to our relationship. We are committed to protecting your personal information
              and being transparent about how we collect, use, and safeguard your data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Last updated: December 2024</p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Information We Collect */}
              <div className="bg-card rounded-lg p-8 border border-border">
                <div className="flex items-center mb-6">
                  <FileText className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-light text-card-foreground">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-card-foreground">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                    <p className="leading-relaxed">
                      When you create an account, make a purchase, or contact us, we collect information such as your
                      name, email address, shipping address, phone number, and payment information. This information is
                      necessary to provide you with our services and fulfill your orders.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Usage Information</h3>
                    <p className="leading-relaxed">
                      We automatically collect information about how you interact with our website, including pages
                      visited, time spent on our site, and your preferences. This helps us improve your shopping
                      experience and personalize our offerings.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Device Information</h3>
                    <p className="leading-relaxed">
                      We collect information about the device you use to access our website, including IP address,
                      browser type, and operating system. This information helps us ensure our website functions
                      properly across different devices.
                    </p>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="bg-card rounded-lg p-8 border border-border">
                <div className="flex items-center mb-6">
                  <Eye className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-light text-card-foreground">How We Use Your Information</h2>
                </div>
                <div className="space-y-4 text-card-foreground">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>Process and fulfill your orders, including shipping and customer service</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>Communicate with you about your orders, account, and our products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>Personalize your shopping experience and recommend products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>Send you marketing communications (with your consent)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>Improve our website, products, and services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>Comply with legal obligations and protect our rights</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="bg-card rounded-lg p-8 border border-border">
                <div className="flex items-center mb-6">
                  <Lock className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-light text-card-foreground">Information Sharing</h2>
                </div>
                <div className="space-y-4 text-card-foreground">
                  <p className="leading-relaxed">
                    We do not sell, trade, or rent your personal information to third parties. We may share your
                    information only in the following circumstances:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Service Providers</h3>
                      <p className="leading-relaxed">
                        We work with trusted third-party service providers who help us operate our business, such as
                        payment processors, shipping companies, and email service providers. These partners are
                        contractually obligated to protect your information.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Legal Requirements</h3>
                      <p className="leading-relaxed">
                        We may disclose your information if required by law, court order, or government regulation, or
                        to protect our rights, property, or safety.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Business Transfers</h3>
                      <p className="leading-relaxed">
                        In the event of a merger, acquisition, or sale of our business, your information may be
                        transferred to the new owner, subject to the same privacy protections.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="bg-card rounded-lg p-8 border border-border">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-light text-card-foreground">Data Security</h2>
                </div>
                <div className="space-y-4 text-card-foreground">
                  <p className="leading-relaxed">
                    We implement industry-standard security measures to protect your personal information, including:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>SSL encryption for all data transmission</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>Secure servers and databases with restricted access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>Regular security audits and updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>Employee training on data protection practices</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed text-sm text-muted-foreground mt-4">
                    While we strive to protect your information, no method of transmission over the internet is 100%
                    secure. We encourage you to use strong passwords and keep your account information confidential.
                  </p>
                </div>
              </div>

              {/* Your Rights */}
              <div className="bg-card rounded-lg p-8 border border-border">
                <div className="flex items-center mb-6">
                  <User className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-light text-card-foreground">Your Rights</h2>
                </div>
                <div className="space-y-4 text-card-foreground">
                  <p className="leading-relaxed">You have the following rights regarding your personal information:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">Access</h3>
                        <p className="text-sm text-muted-foreground">Request a copy of your personal data</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Correction</h3>
                        <p className="text-sm text-muted-foreground">Update or correct inaccurate information</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Deletion</h3>
                        <p className="text-sm text-muted-foreground">Request deletion of your personal data</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">Portability</h3>
                        <p className="text-sm text-muted-foreground">Receive your data in a portable format</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Opt-out</h3>
                        <p className="text-sm text-muted-foreground">Unsubscribe from marketing communications</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Restriction</h3>
                        <p className="text-sm text-muted-foreground">Limit how we process your information</p>
                      </div>
                    </div>
                  </div>
                  <p className="leading-relaxed text-sm">
                    To exercise any of these rights, please contact us using the information provided below. We will
                    respond to your request within 30 days.
                  </p>
                </div>
              </div>

              {/* Cookies and Tracking */}
              <div className="bg-card rounded-lg p-8 border border-border">
                <div className="flex items-center mb-6">
                  <Eye className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-light text-card-foreground">Cookies and Tracking</h2>
                </div>
                <div className="space-y-4 text-card-foreground">
                  <p className="leading-relaxed">
                    We use cookies and similar technologies to enhance your browsing experience, analyze website
                    traffic, and personalize content. You can manage your cookie preferences through your browser
                    settings.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
                      <p className="leading-relaxed text-sm">
                        Required for the website to function properly, including shopping cart and checkout
                        functionality.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Analytics Cookies</h3>
                      <p className="leading-relaxed text-sm">
                        Help us understand how visitors interact with our website to improve user experience.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Marketing Cookies</h3>
                      <p className="leading-relaxed text-sm">
                        Used to deliver personalized advertisements and track the effectiveness of our marketing
                        campaigns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-primary/5 rounded-lg p-8 border border-primary/20">
                <div className="flex items-center mb-6">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-light text-foreground">Contact Us</h2>
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed text-foreground">
                    {`If you have any questions about this Privacy Policy or how we handle your personal information,
                    please don't hesitate to contact us:`}
                  </p>
                  <div className="space-y-2 text-foreground">
                    <p>
                      <strong>Email:</strong> privacy@annahora.com
                    </p>
                    <p>
                      <strong>Phone:</strong> 1-800-SILK-LUXURY
                    </p>
                    <p>
                      <strong>Address:</strong> ANNA HORA Privacy Team
                      <br />
                      123 Silk Avenue, Suite 100
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                  <div className="pt-4">
                    <Link href="/contact">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Contact Customer Service
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="text-center py-8">
                <h3 className="text-xl font-light text-foreground mb-4">Policy Updates</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                  requirements. We will notify you of any material changes by email or through a notice on our website.
                  Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
