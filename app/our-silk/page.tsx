"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Download,
  Play,
  Pause,
  ChevronRight,
  Droplets,
  Thermometer,
  Shield,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function OurSilkPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const careSteps = [
    {
      step: 1,
      title: "Gentle Cleansing",
      description:
        "Hand wash in cool water with silk-specific detergent, or choose professional dry cleaning for best results.",
      icon: <Droplets className="w-6 h-6" />,
    },
    {
      step: 2,
      title: "Careful Drying",
      description: "Lay flat on a clean towel, away from direct sunlight. Never wring or twist the delicate fibers.",
      icon: <Thermometer className="w-6 h-6" />,
    },
    {
      step: 3,
      title: "Proper Storage",
      description: "Store in a breathable garment bag, away from direct light. Cedar sachets help maintain freshness.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      step: 4,
      title: "Mindful Wearing",
      description:
        "Allow silk to breathe between wears. The natural fibers will maintain their beauty with proper rest.",
      icon: <Clock className="w-6 h-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-200"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Macro shot of silk fibers in golden light"
            alt="Silk texture in natural light"
            fill
            className="object-cover opacity-70"
            priority
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-800 mb-6 leading-tight">
            The Language of
            <br />
            <em className="font-serif italic">Silk</em>
          </h2>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            More than fabric, silk is poetry written in fiber—a whispered promise of luxury that speaks to the skin
            before it touches the soul.
          </p>
        </div>
      </section>

      {/* The Feel Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                Like Water
                <br />
                <em className="font-serif italic">Against the Skin</em>
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-lg text-stone-600 leading-relaxed">
                  Imagine the first touch of morning air, cool and gentle against your skin. This is silk—a fabric that
                  doesn&apos;t merely cover, but caresses. Each thread is spun from the cocoon of the mulberry silkworm,
                  creating a material so fine it seems to float rather than rest.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed">
                  The weight is perfect—substantial enough to drape beautifully, yet light enough to move with your body
                  like a second skin. As you slip into silk, you feel the day&apos;s tensions dissolve, replaced by a sense
                  of being held, cherished, understood.
                </p>
                <blockquote className="border-l-2 border-stone-300 pl-6 italic text-stone-700 text-xl">
                  "Silk doesn&apos;t just touch the body—it speaks to it in a language older than words."
                </blockquote>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=600&width=480&text=Close-up of silk draping over skin in soft light"
                    alt="Silk draping naturally"
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 hover:bg-white shadow-lg"
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-6 h-6 text-stone-800" />
                    ) : (
                      <Play className="w-6 h-6 text-stone-800 ml-1" />
                    )}
                  </Button>
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-stone-200 rounded-full opacity-30 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Craftsmanship Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                The Art of
                <br />
                <em className="font-serif italic">Perfection</em>
              </h3>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Every thread tells a story of ancient wisdom and modern precision, woven together to create something
                truly extraordinary.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300&text=Mulberry silkworms on leaves"
                    alt="Mulberry silkworms"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-light text-stone-800 mb-4">Grade 6A Mulberry Silk</h4>
                <p className="text-stone-600 leading-relaxed">
                  Sourced from silkworms fed exclusively on mulberry leaves, creating the finest, most lustrous fibers
                  nature can provide.
                </p>
              </div>

              <div className="text-center">
                <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300&text=Silk weaving loom in action"
                    alt="Silk weaving process"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-light text-stone-800 mb-4">22 Momme Weight</h4>
                <p className="text-stone-600 leading-relaxed">
                  The perfect balance of durability and drape, heavy enough for structure yet light enough for the most
                  delicate touch.
                </p>
              </div>

              <div className="text-center">
                <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300&text=Artisan hands finishing silk fabric"
                    alt="Artisan craftsmanship"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-light text-stone-800 mb-4">Artisan Finished</h4>
                <p className="text-stone-600 leading-relaxed">
                  Each piece is carefully inspected and finished by skilled artisans who understand that true luxury
                  lies in the details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                Beauty That
                <br />
                <em className="font-serif italic">Serves You</em>
              </h3>
              <p className="text-lg text-stone-600">
                Silk&apos;s elegance is matched only by its intelligence—a fabric that adapts, protects, and enhances your
                natural beauty.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-sm bg-white p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Thermometer className="w-6 h-6 text-stone-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-light text-stone-800 mb-3">Temperature Regulation</h4>
                    <p className="text-stone-600 leading-relaxed">
                      Silk&apos;s natural protein fibers adjust to your body temperature, keeping you cool in summer and warm
                      in winter—the perfect companion for every season.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-sm bg-white p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-stone-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-light text-stone-800 mb-3">Naturally Hypoallergenic</h4>
                    <p className="text-stone-600 leading-relaxed">
                      Silk&apos;s smooth surface and natural properties resist dust mites, mold, and allergens, making it
                      ideal for sensitive skin.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-sm bg-white p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-6 h-6 text-stone-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-light text-stone-800 mb-3">Skin & Hair Care</h4>
                    <p className="text-stone-600 leading-relaxed">
                      The smooth surface reduces friction, preventing hair tangles and skin irritation while you
                      sleep—beauty rest, literally.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-sm bg-white p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-stone-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-light text-stone-800 mb-3">Timeless Durability</h4>
                    <p className="text-stone-600 leading-relaxed">
                      With proper care, silk becomes more beautiful with age, developing a unique patina that tells the
                      story of cherished moments.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Sourcing Section */}
      <section className="py-16 lg:py-24 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl lg:text-4xl font-light text-stone-800">
                  Ethical
                  <br />
                  <em className="font-serif italic">by Design</em>
                </h3>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Our silk is sourced from family-owned farms that have perfected their craft over generations. These
                  artisans understand that true luxury cannot exist without respect—for the silkworms, for the
                  environment, and for the people who bring this ancient art to life.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed">
                  We believe in the philosophy of "slow luxury"—creating pieces that are meant to be treasured for
                  years, not seasons. Every purchase supports sustainable practices and fair wages, ensuring that beauty
                  and ethics walk hand in hand.
                </p>
                <div className="pt-4">
                  <h4 className="font-medium text-stone-800 mb-3">Our Commitments</h4>
                  <ul className="space-y-2 text-stone-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      Partnership with certified sustainable silk farms
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      Fair wages and working conditions for all artisans
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      Minimal environmental impact through traditional methods
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      Long-term relationships built on mutual respect
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=500&text=Silk farm with mulberry trees and traditional buildings"
                  alt="Sustainable silk farm"
                  width={500}
                  height={600}
                  className="rounded-lg"
                />
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-stone-200 rounded-full opacity-30 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Silk Care Guide */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                Caring for Your
                <br />
                <em className="font-serif italic">Silk Treasures</em>
              </h3>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
                With gentle care, your silk pieces will remain beautiful for years, becoming more precious with each
                wear.
              </p>
              <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download Care Guide
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {careSteps.map((step) => (
                <Card key={step.step} className="border-0 shadow-sm bg-stone-50 p-6 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <div className="text-stone-600">{step.icon}</div>
                  </div>
                  <Badge variant="outline" className="mb-3 border-stone-300 text-stone-600">
                    Step {step.step}
                  </Badge>
                  <h4 className="text-lg font-light text-stone-800 mb-3">{step.title}</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">{step.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-16 p-8 bg-stone-100 rounded-lg text-center">
              <h4 className="text-xl font-light text-stone-800 mb-4">Need Expert Care?</h4>
              <p className="text-stone-600 mb-6">
                We partner with specialist silk cleaners who understand the delicate nature of our fabrics. Contact us
                for recommendations in your area.
              </p>
              <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent">
                Find a Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-5xl font-light text-stone-800 mb-8 leading-tight">
              Experience the
              <br />
              <em className="font-serif italic">Difference</em>
            </h3>
            <p className="text-xl text-stone-600 leading-relaxed mb-12">
              Now that you understand the story behind our silk, we invite you to feel it for yourself. Discover how
              this ancient luxury can transform your daily rituals into moments of pure indulgence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3">
                Shop Silk Collection
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-3 bg-transparent"
              >
                Request Fabric Samples
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
