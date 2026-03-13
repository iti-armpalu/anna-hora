"use client";

import Link from "next/link";
import Script from "next/script";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

const EMBED_SOCIAL_REF = "0f0ff820ac2c5e517d8e2bbc5377ee0fddac811b";

export default function InstagramGrid() {
  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <h4 className="font-medium">Follow Us</h4>
        <Link
          href={siteConfig.social.instagram.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-anna-cement-200 transition-colors hover:text-white"
        >
          <Instagram className="h-4 w-4" />
          @{siteConfig.social.instagram.handle}
        </Link>
      </div>

      <div className=" md:h-[310px] overflow-hidden">
        <div
          className="embedsocial-hashtag -mt-55"
          data-ref={EMBED_SOCIAL_REF}
        />
      </div>

      <Script
        id="embedsocial-hashtag-script"
        src="https://embedsocial.com/cdn/ht.js"
        strategy="lazyOnload"
      />
    </>
  );
}