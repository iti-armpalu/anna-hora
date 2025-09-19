"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, Upload, CheckCircle, X, Mail, QrCode, RotateCcw } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export default function ProductExperiencePage() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [showNameForm, setShowNameForm] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const [showReturnForm, setShowReturnForm] = useState(false)
  const [returnSubmitted, setReturnSubmitted] = useState(false)

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFeedbackSubmitted(true)
    toast.success("Thank you for your feedback! We appreciate you sharing your experience.", {
      position: "top-right",
      duration: 6000,
      style: {
        marginTop: "60px",
        fontSize: "14px",
        fontWeight: "normal",
      },
      icon: "",
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(files)
      if (files.length > 0) {
        setShowNameForm(true)
      }
    }
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    if (newFiles.length === 0) {
      setShowNameForm(false)
    }
  }

  const handleEmailQRCode = () => {
    if (!emailAddress) {
      toast.error("Please enter your email address")
      return
    }

    // In a real app, this would send an API request
    toast.success("QR code sent to your email!", {
      position: "top-right",
      duration: 4000,
    })
    setEmailAddress("")
  }

  const handleEmailContent = () => {
    if (!emailAddress) {
      toast.error("Please enter your email address")
      return
    }

    // In a real app, this would send an API request
    toast.success("Care guide and playlist sent to your email!", {
      position: "top-right",
      duration: 4000,
    })
    setEmailAddress("")
  }

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setReturnSubmitted(true)
    toast.success("Return request submitted. We&apos;ll email you a return label within 24 hours.", {
      position: "top-right",
      duration: 6000,
      style: {
        marginTop: "60px",
        fontSize: "14px",
        fontWeight: "normal",
      },
      icon: "",
    })
  }

  const careSteps = [
    {
      title: "Hand Wash Gently",
      description: "Use cool water with silk-specific detergent. Gently swirl for 3-5 minutes.",
    },
    {
      title: "Air Dry Flat",
      description: "Lay flat on a clean towel away from direct sunlight. Never wring or twist.",
    },
    {
      title: "Iron with Care",
      description: "Iron on reverse side while damp, using silk setting or low heat.",
    },
    {
      title: "Store Properly",
      description: "Hang or fold with tissue paper in a breathable garment bag.",
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Shop Section */}
        <div className="text-center mb-16">
          <Card className="bg-white border-stone-200 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-light text-stone-800 mb-4">Discover More Silk</h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Explore our complete collection of premium silk loungewear and accessories
              </p>
              <Button
                onClick={() => (window.location.href = "/shop")}
                className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3"
              >
                Shop Collection
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">Your Silk Care Guide</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Thank you for choosing ANNA HORA. Here&apos;s everything you need to keep your silk looking beautiful.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Order Management */}
          <section>
            <h2 className="text-2xl font-light text-stone-800 mb-8 text-center">Order Management</h2>
            <div className="max-w-md mx-auto">
              <Card className="bg-white border-stone-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <RotateCcw className="h-12 w-12 text-stone-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-stone-900 mb-2">Return Item</h3>
                    <p className="text-stone-600 mb-6 leading-relaxed">
                      Not completely satisfied? Start your return process here
                    </p>
                    <Button
                      onClick={() => setShowReturnForm(true)}
                      variant="outline"
                      className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 bg-transparent"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Start Return
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Return Form Modal */}
            {showReturnForm && !returnSubmitted && (
              <Card className="bg-white border-stone-200 mt-6">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium text-stone-900">Return Request</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowReturnForm(false)}
                      className="text-stone-500 hover:text-stone-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <form onSubmit={handleReturnSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="return-name" className="text-stone-700">
                          Full Name
                        </Label>
                        <Input id="return-name" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="return-email" className="text-stone-700">
                          Email Address
                        </Label>
                        <Input id="return-email" type="email" required className="mt-1" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="return-reason" className="text-stone-700">
                        Reason for Return
                      </Label>
                      <select
                        id="return-reason"
                        required
                        className="w-full mt-1 p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                      >
                        <option value="">Select a reason</option>
                        <option value="size">Size doesn&apos;t fit</option>
                        <option value="quality">Quality issue</option>
                        <option value="color">Color not as expected</option>
                        <option value="damaged">Item arrived damaged</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="return-details" className="text-stone-700">
                        Additional Details (Optional)
                      </Label>
                      <Textarea
                        id="return-details"
                        placeholder="Please provide any additional information about your return..."
                        className="min-h-[80px] mt-1"
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="return-consent" required className="mt-1" />
                      <Label htmlFor="return-consent" className="text-sm text-stone-600 leading-relaxed">
                        I understand the return policy and confirm this item is in original condition
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-stone-800 hover:bg-stone-700 text-white">
                      Submit Return Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Return Confirmation */}
            {returnSubmitted && (
              <Card className="bg-white border-stone-200 mt-6">
                <CardContent className="p-8">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-stone-600 mx-auto mb-4" />
                    <h3 className="text-xl font-light text-stone-900 mb-2">Return Request Submitted</h3>
                    <p className="text-stone-600 leading-relaxed">
                      We&apos;ve received your return request. You&apos;ll receive an email with return instructions and a prepaid
                      shipping label within 24 hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Care Guide */}
          <section>
            <h2 className="text-2xl font-light text-stone-800 mb-8 text-center">Care Instructions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {careSteps.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-stone-200">
                  <h3 className="font-medium text-stone-900 mb-2">{step.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-stone-100 rounded-lg">
              <p className="text-stone-700">
                <strong>Note:</strong> Wash silk pieces separately and avoid fabric softeners to preserve the fibers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-light text-stone-800 mb-8 text-center">Curated Playlist</h2>
            <Card className="bg-white border-stone-200">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=200&width=200&text=Silk & Serenity Playlist Cover"
                      alt="Silk & Serenity Playlist"
                      className="w-48 h-48 rounded-lg shadow-md mx-auto md:mx-0"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-stone-900 mb-2">Silk & Serenity</h3>
                    <p className="text-stone-600 mb-4">24 songs • 1 hr 32 min</p>
                    <p className="text-stone-600 leading-relaxed mb-6">
                      Ambient and soothing tracks perfect for your silk loungewear moments. Curated for relaxation,
                      self-care, and quiet luxury.
                    </p>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-medium text-stone-900 text-sm">Featured Tracks:</h4>
                      <div className="text-sm text-stone-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Weightless - Marconi Union</span>
                          <span>8:10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Spiegel im Spiegel - Arvo Pärt</span>
                          <span>8:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>On Earth as It Is in Heaven - Ólafur Arnalds</span>
                          <span>5:31</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avril 14th - Aphex Twin</span>
                          <span>2:05</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Metamorphosis Two - Philip Glass</span>
                          <span>5:27</span>
                        </div>
                        <div className="text-stone-500 text-xs mt-2">+ 19 more tracks</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Music className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-stone-900">Available on Spotify</span>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm mb-4">
                    Sync this playlist to your Spotify account to enjoy these carefully selected tracks anytime.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                    onClick={() => window.open("https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0", "_blank")}
                  >
                    <Music className="h-4 w-4 mr-2" />
                    Open in Spotify
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-light text-stone-800 mb-8 text-center">Share Your Experience</h2>
            <Card className="bg-white border-stone-200">
              <CardContent className="p-8">
                <p className="text-stone-600 mb-8 text-center leading-relaxed">
                  We&apos;d love to see how you style your silk pieces. Share photos or videos for a chance to be featured.
                </p>

                {!feedbackSubmitted ? (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-stone-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-stone-900 mb-2">Upload Your Photos or Videos</h3>
                      <p className="text-stone-600 mb-4">Share your silk styling moments with us</p>
                      <Input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="media-upload"
                      />
                      <Label
                        htmlFor="media-upload"
                        className="inline-flex items-center px-6 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-700 cursor-pointer"
                      >
                        Choose Files
                      </Label>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-stone-900">Uploaded Files:</h4>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                            <span className="text-stone-700 truncate">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-stone-500 hover:text-stone-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {showNameForm && (
                      <form onSubmit={handleFeedbackSubmit} className="space-y-6 pt-6 border-t border-stone-200">
                        <div>
                          <Label htmlFor="name" className="text-stone-700">
                            Your Name
                          </Label>
                          <Input id="name" placeholder="Enter your name" required className="mt-1" />
                        </div>

                        <div>
                          <Label htmlFor="feedback" className="text-stone-700">
                            Tell us about your experience (optional)
                          </Label>
                          <Textarea
                            id="feedback"
                            placeholder="How do you love wearing your silk pieces?"
                            className="min-h-[80px] mt-1"
                          />
                        </div>

                        <div className="flex items-start gap-2">
                          <input type="checkbox" id="consent" required className="mt-1" />
                          <Label htmlFor="consent" className="text-sm text-stone-600 leading-relaxed">
                            I consent to ANNA HORA using my content for marketing purposes
                          </Label>
                        </div>

                        <Button type="submit" className="w-full bg-stone-800 hover:bg-stone-700 text-white">
                          Share My Experience
                        </Button>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-stone-600 mx-auto mb-4" />
                    <h3 className="text-xl font-light text-stone-900 mb-2">Thank You</h3>
                    <p className="text-stone-600">
                      Your feedback has been submitted. We&apos;ll review your content and may feature it on our channels.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="bg-white border-stone-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-light text-stone-800 mb-2">Save This Experience</h3>
                  <p className="text-stone-600">Email yourself the QR code or this care guide for future reference</p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-stone-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      onClick={handleEmailQRCode}
                      variant="outline"
                      className="border-stone-300 text-stone-700 hover:bg-stone-50 bg-transparent"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Email QR Code
                    </Button>
                    <Button
                      onClick={handleEmailContent}
                      variant="outline"
                      className="border-stone-300 text-stone-700 hover:bg-stone-50 bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email Care Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="text-center mt-16">
          <p className="text-stone-600">
            Questions about silk care?{" "}
            <a href="/contact" className="text-stone-800 hover:text-stone-600 underline">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
