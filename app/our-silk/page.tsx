"use client";

import { useState } from "react";
import Image from "next/image";
import * as Icons from "lucide-react";
import {
  Droplets,
  Thermometer,
  Shield,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import silkData from "@/data/silk-content";

export default function OurSilkPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const getIcon = (iconName: string) => {
    const icons = {
      droplets: <Droplets className="w-6 h-6" />,
      thermometer: <Thermometer className="w-6 h-6" />,
      shield: <Shield className="w-6 h-6" />,
      clock: <Clock className="w-6 h-6" />,
    };
    return icons[iconName as keyof typeof icons] || <Clock className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-200"
        >
          <Image
            src={silkData.hero.bgImage}
            alt="Silk texture in natural light"
            fill
            className="object-cover opacity-70"
            priority
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-800 mb-6 leading-tight">
            {silkData.hero.titleTop}
            <br />
            <em className="font-serif italic">{silkData.hero.titleEm}</em>
          </h2>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            {silkData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* The Feel Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
                {silkData.feel.headingTop}
                <br />
                <em className="font-serif italic">{silkData.feel.headingEm}</em>
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                {silkData.feel.paragraphs.map((p, i) => (
                  <p key={i} className="text-lg text-stone-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src={silkData.feel.media.image}
                    alt={silkData.feel.media.alt}
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
                      <Icons.Pause className="w-6 h-6 text-stone-800" />
                    ) : (
                      <Icons.Play className="w-6 h-6 text-stone-800 ml-1" />
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
                {silkData.craftsmanship.headingTop}
                <br />
                <em className="font-serif italic">
                  {silkData.craftsmanship.headingEm}
                </em>
              </h3>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                {silkData.craftsmanship.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {silkData.craftsmanship.cards.map((c, i) => (
                <div key={i} className="text-center">
                  <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                    <Image src={c.image} alt={c.alt} fill className="object-cover" />
                  </div>
                  <h4 className="text-xl font-light text-stone-800 mb-4">{c.title}</h4>
                  <p className="text-stone-600 leading-relaxed">{c.text}</p>
                </div>
              ))}
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
                {silkData.benefits.headingTop}
                <br />
                <em className="font-serif italic">{silkData.benefits.headingEm}</em>
              </h3>
              <p className="text-lg text-stone-600">{silkData.benefits.intro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {silkData.benefits.items.map((b, i) => (
                <Card key={i} className="border-0 shadow-sm bg-white p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
                      {getIcon(b.icon)}
                    </div>
                    <div>
                      <h4 className="text-lg font-light text-stone-800 mb-3">
                        {b.title}
                      </h4>
                      <p className="text-stone-600 leading-relaxed">{b.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
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
                  {silkData.sourcing.headingTop}
                  <br />
                  <em className="font-serif italic">
                    {silkData.sourcing.headingEm}
                  </em>
                </h3>

                {silkData.sourcing.paragraphs.map((p, i) => (
                  <p key={i} className="text-lg text-stone-600 leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="pt-4">
                  <h4 className="font-medium text-stone-800 mb-3">
                    {silkData.sourcing.commitmentsTitle}
                  </h4>
                  <ul className="space-y-2 text-stone-600">
                    {silkData.sourcing.commitments.map((c, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={silkData.sourcing.image}
                  alt={silkData.sourcing.imageAlt}
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
                {silkData.careGuide.headingTop}
                <br />
                <em className="font-serif italic">{silkData.careGuide.headingEm}</em>
              </h3>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
                {silkData.careGuide.intro}
              </p>
              <Button
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
              >
                <Icons.Download className="w-4 h-4 mr-2" />
                {silkData.careGuide.ctaDownload.text}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {silkData.careGuide.steps.map((step) => (
                <Card
                  key={step.step}
                  className="border-0 shadow-sm bg-stone-50 p-6 text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <div className="text-stone-600">{getIcon(step.icon)}</div>
                  </div>
                  <Badge
                    variant="outline"
                    className="mb-3 border-stone-300 text-stone-600"
                  >
                    Step {step.step}
                  </Badge>
                  <h4 className="text-lg font-light text-stone-800 mb-3">
                    {step.title}
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>

            <div className="mt-16 p-8 bg-stone-100 rounded-lg text-center">
              <h4 className="text-xl font-light text-stone-800 mb-4">
                {silkData.careGuide.expert.title}
              </h4>
              <p className="text-stone-600 mb-6">{silkData.careGuide.expert.text}</p>
              <Button
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
              >
                {silkData.careGuide.expert.ctaText}
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
              {silkData.closing.headingTop}
              <br />
              <em className="font-serif italic">{silkData.closing.headingEm}</em>
            </h3>
            <p className="text-xl text-stone-600 leading-relaxed mb-12">
              {silkData.closing.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary CTA */}


              <Button href={silkData.closing.primaryCta.href} data-slot="button" size="lg" className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3">
                Show Now
                <Icons.ChevronRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Secondary CTA */}
              <Button
                variant="outline"
                size="lg"
                className="border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-3 bg-transparent"
              >
                {silkData.closing.secondaryCta.text}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
