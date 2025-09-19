"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Pause } from "lucide-react"


import { Button } from "@/components/ui/button"
import Loading from "@/components/loading"

export default function AboutPage() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000) // 3 second delay to see the loading spinner

        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return <Loading /> // This will trigger the loading.tsx component
    }


    return (
        <div>

            {/* Hero Section */}
            {/* <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-200"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Morning light through silk"
            fill
            className="object-cover opacity-70"
            priority
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-800 mb-6 leading-tight">
            The Art of
            <br />
            <em className="font-serif italic">Quiet Living</em>
          </h2>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Where luxury meets intimacy, and every thread tells a story of mindful craftsmanship
          </p>
        </div>
      </section> */}

            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <h2 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6">
                            The ANNA HORA
                            <br />
                            <em className="font-serif italic">Journey</em>
                        </h2>
                        {/* <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
                            Where luxury meets intimacy, and every thread tells a story of mindful craftsmanship
                        </p> */}
                        <div className="max-w-4xl mx-auto text-center">
                            <p className="text-xl md:text-2xl font-light text-stone-700 leading-relaxed mb-8">
                                ANNA HORA was born from a simple belief: that the most profound luxury is found not in what the world
                                sees, but in how we feel when no one is watching.
                            </p>
                            <p className="text-lg text-stone-600 leading-relaxed">
                                In those quiet moments—the first sip of morning coffee, the gentle embrace of silk against skin, the pause
                                between day and night—we discover who we truly are.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Introduction */}
            {/* <section className="py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xl md:text-2xl font-light text-stone-700 leading-relaxed mb-8">
                            ANNA HORA was born from a simple belief: that the most profound luxury is found not in what the world
                            sees, but in how we feel when no one is watching.
                        </p>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            In those quiet moments—the first sip of morning coffee, the gentle embrace of silk against skin, the pause
                            between day and night—we discover who we truly are.
                        </p>
                    </div>
                </div>
            </section> */}

            {/* Founder Story */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <Image
                                src="/placeholder.svg?height=600&width=500&text=Portrait of founder in natural light"
                                alt="Founder portrait"
                                width={500}
                                height={600}
                                className="rounded-lg"
                            />
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-stone-200 rounded-full opacity-50 -z-10" />
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-3xl lg:text-4xl font-light text-stone-800">
                                A Vision Born from
                                <br />
                                <em className="font-serif italic">Sisterhood</em>
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                Our careers have taken us around the world during which
                                time we’ve both come to understand that sometimes in life,
                                it’s all too easy to lose oneself in the pace of life and
                                neglect the things that count. ANNA is our vision for a better way of living,
                                where self-care and simply being kind to oneself are always at the forefront
                                of everything we do.
                            </p>
                            <p className="text-stone-600 leading-relaxed">
                                We envisaged ANNA as a brand through which we could share those things
                                we’ve come to learn, discover and value on our journey so far. The products
                                we ourselves have come to rely on, the experiences that inspire us, the fundamental
                                values on which we’ve based our lives.
                            </p>
                            <p className="text-stone-600 leading-relaxed">
                                Named after Barbora’s first born, ANNA is a brand we intend to be our future.
                            </p>
                            <footer className="text-stone-500 mt-2 not-italic">
                                <p>With love,</p>
                                <p>Katerina Bazalova & Barbora Bazalova, Sisters and Founders</p>
                            </footer>

                            {/* <blockquote className="border-l-2 border-stone-300 pl-6 italic text-stone-700">
                                "We wanted to create pieces that make women feel like the most elegant version of themselves, especially
                                in their most private moments."
                                <footer className="text-sm text-stone-500 mt-2 not-italic">— Katerina Bazalova, Co-Founder</footer>
                            </blockquote> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                            More Than Fabric,
                            <br />
                            <em className="font-serif italic">A Philosophy</em>
                        </h3>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            ANNA HORA represents a return to intentional living—where quality supersedes quantity, where comfort and
                            elegance coexist, and where the ritual of dressing becomes an act of self-love.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <div className="w-8 h-8 bg-stone-400 rounded-full" />
                            </div>
                            <h4 className="text-xl font-light text-stone-800 mb-4">Timeless Over Trendy</h4>
                            <p className="text-stone-600 leading-relaxed">
                                We create pieces that transcend seasons and years, becoming more cherished with each wear.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <div className="w-8 h-8 bg-stone-400 rounded-full" />
                            </div>
                            <h4 className="text-xl font-light text-stone-800 mb-4">Mindful Craftsmanship</h4>
                            <p className="text-stone-600 leading-relaxed">
                                Every piece is thoughtfully designed and ethically made, honoring both the artisan and the wearer.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <div className="w-8 h-8 bg-stone-400 rounded-full" />
                            </div>
                            <h4 className="text-xl font-light text-stone-800 mb-4">Intimate Luxury</h4>
                            <p className="text-stone-600 leading-relaxed">
                                True luxury is personal—felt in the drape of silk, the softness of touch, the confidence it brings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Experience */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6 order-2 lg:order-1">
                            <h3 className="text-3xl lg:text-4xl font-light text-stone-800">
                                Designed for
                                <br />
                                <em className="font-serif italic">How You Feel</em>
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                {`Each ANNA HORA piece is chosen not just for how it looks, but for how it makes you feel. The weight of
                                silk as it settles against your skin. The way morning light catches the subtle sheen. The confidence
                                that comes from knowing you're wearing something truly special.`}
                            </p>
                            <p className="text-stone-600 leading-relaxed">
                                Our pieces become part of your personal rituals—the robe you reach for after a long day, the camisole
                                that makes you feel beautiful even when no one else will see it, the pajama set that transforms bedtime
                                into a ceremony of self-care.
                            </p>
                            <div className="pt-4">
                                <h4 className="font-medium text-stone-800 mb-3">The ANNA HORA Promise</h4>
                                <ul className="space-y-2 text-stone-600">
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                                        Grade 6A mulberry silk, the finest available
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                                        Ethically sourced and sustainably produced
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                                        Designed to last and become more beautiful with time
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="relative order-1 lg:order-2">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                                <Image
                                    src="/placeholder.svg?height=600&width=480&text=Close-up of silk texture and drape"
                                    alt="Silk texture detail"
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
                            <div className="absolute -top-8 -left-8 w-24 h-24 bg-stone-200 rounded-full opacity-30 -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-16 lg:py-24 bg-stone-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">Our Commitments</h3>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            Every decision we make is guided by our commitment to quality, sustainability, and the women who wear our
                            pieces.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg">
                            <h4 className="text-xl font-light text-stone-800 mb-4">Sustainable Luxury</h4>
                            <p className="text-stone-600 leading-relaxed mb-4">
                                {`We partner with silk farms that practice regenerative agriculture, ensuring our luxury doesn't come at
                                the earth's expense.`}
                            </p>
                            <p className="text-sm text-stone-500">
                                Our packaging is fully recyclable, and we offer a take-back program for pieces at the end of their
                                lifecycle.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg">
                            <h4 className="text-xl font-light text-stone-800 mb-4">Artisan Partnership</h4>
                            <p className="text-stone-600 leading-relaxed mb-4">
                                We work directly with skilled artisans, ensuring fair wages and preserving traditional silk-making
                                techniques.
                            </p>
                            <p className="text-sm text-stone-500">
                                Each piece carries the signature of its maker, connecting you to the hands that crafted your garment.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg">
                            <h4 className="text-xl font-light text-stone-800 mb-4">Lifetime Care</h4>
                            <p className="text-stone-600 leading-relaxed mb-4">
                                We provide comprehensive care guides and offer repair services to ensure your pieces remain beautiful
                                for years.
                            </p>
                            <p className="text-sm text-stone-500">
                                Our customer care team includes silk specialists who can advise on everything from storage to stain
                                removal.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg">
                            <h4 className="text-xl font-light text-stone-800 mb-4">Community Connection</h4>
                            <p className="text-stone-600 leading-relaxed mb-4">
                                Through our Journal and events, we foster a community of women who value mindful living and quiet
                                luxury.
                            </p>
                            <p className="text-sm text-stone-500">
                                {`A portion of every purchase supports women's wellness initiatives in our partner communities.`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing Invitation */}
            <section className="py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl lg:text-5xl font-light text-stone-800 mb-8 leading-tight">
                            An Invitation to
                            <br />
                            <em className="font-serif italic">Embrace Serenity</em>
                        </h3>
                        <p className="text-xl text-stone-600 leading-relaxed mb-12">
                            {`We invite you to experience ANNA HORA—not just as clothing, but as a daily reminder that you deserve
                            moments of beauty, comfort, and quiet luxury. Whether you're treating yourself or someone you love, each
                            piece is an investment in the art of living well.`}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/shop">
                                <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3">
                                    Explore Our Collection
                                </Button>
                            </Link>
                            <Link href="/journal">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-3 bg-transparent"
                                >
                                    Read Our Journal
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
