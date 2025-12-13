import Link from "next/link"
import { Instagram } from "lucide-react"
import { siteConfig } from "@/lib/config/site"

const instagramPosts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

export default function InstagramGrid() {
  return (
    <div className="lg:col-span-4">
      <div className="flex items-center gap-2 mb-4">
        <h4 className="font-medium">Follow Us</h4>
        <Link
          href={`https://instagram.com/${siteConfig.social.instagram.link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-anna-cement-200 hover:text-white transition-colors text-sm flex items-center gap-1"
        >
          <Instagram className="w-4 h-4" />@{siteConfig.social.instagram.handle}
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {instagramPosts.map((post) => (
          <Link
            key={post.id}
            href={`https://instagram.com/${siteConfig.social.instagram.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square relative overflow-hidden group"
          >
            <img
              src="/silk-set.webp"
              alt={`Instagram post ${post.id}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
