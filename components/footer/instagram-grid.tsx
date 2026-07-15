"use client"

import Link from "next/link"
import Script from "next/script"
import { Instagram } from "lucide-react"
import { siteConfig } from "@/lib/config/site"

const EMBED_SOCIAL_REF = "ed5f0124a26c086321a572430e09a3d6b22015f2"

export default function InstagramGrid() {
  const instagram = siteConfig.social.instagram
  if (!instagram) return null

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <h4 className="font-medium text-white">Follow Us</h4>
        <Link
          href={instagram.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-stone-100 transition-colors hover:text-white"
        >
          <Instagram className="h-4 w-4" />
          @{instagram.handle}
        </Link>
      </div>

      <div className="overflow-hidden">
        <div
          className="embedsocial-hashtag"
          data-ref={EMBED_SOCIAL_REF}
        />
      </div>

      <Script
        id="embedsocial-hashtag-script"
        src="https://embedsocial.com/cdn/ht.js"
        strategy="lazyOnload"
      />
    </>
  )
}