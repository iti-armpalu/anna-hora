import Script from "next/script"
import { siteConfig } from "@/lib/config/site"
import { FOOTER_COPY } from "@/lib/config/footer"

const EMBED_SOCIAL_REF = "ed5f0124a26c086321a572430e09a3d6b22015f2"

type Props = {
  eyebrowClassName: string
  linkClassName: string
}

/**
 * Instagram feed via EmbedSocial.
 * ⚠️ Loads a third-party script and Instagram images on every page, without going through Klaro consent.
 * Planned replacement: a curated, self-hosted grid (see review notes).
 */
export default function InstagramGrid({ eyebrowClassName, linkClassName }: Props) {
  const instagram = siteConfig.social.instagram
  if (!instagram) return null

  return (
    <section aria-label={FOOTER_COPY.instagramTitle} className="flex flex-col gap-field">
      <div className="flex items-baseline gap-4">
        <h2 className={eyebrowClassName}>{FOOTER_COPY.instagramTitle}</h2>
        <a href={instagram.link} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          @{instagram.handle}
        </a>
      </div>
      <div className="overflow-hidden">
        <div className="embedsocial-hashtag" data-ref={EMBED_SOCIAL_REF} />
      </div>
      <Script id="embedsocial-hashtag-script" src="https://embedsocial.com/cdn/ht.js" strategy="lazyOnload" />
    </section>
  )
}
