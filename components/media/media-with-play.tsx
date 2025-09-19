"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MediaWithPlayProps {
  src: string
  alt: string
  aspectRatio?: string // e.g. "4/5"
  className?: string
}

export function MediaWithPlay({ src, alt, aspectRatio = "4/5", className }: MediaWithPlayProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleToggle = () => {
    setIsPlaying((prev) => !prev)
    // TODO: trigger video modal or inline playback here
  }

  return (
    <div className={`relative aspect-[${aspectRatio}] overflow-hidden rounded-lg ${className ?? ""}`}>
      <Image src={src} alt={alt} fill className="object-cover" />
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 hover:bg-white shadow-lg"
        onClick={handleToggle}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-stone-800" />
        ) : (
          <Play className="w-6 h-6 text-stone-800 ml-1" />
        )}
      </Button>
    </div>
  )
}
