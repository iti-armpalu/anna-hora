import { Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/config/site"
import { contactContent } from "../_data"

export function FollowUsCard() {
    const { followUs } = contactContent

    return (
        <Card className="border-stone-200 shadow-sm py-0">
            <CardContent className="p-6">
                <h3 className="font-serif text-xl text-stone-900 mb-4">{followUs.title}</h3>
                <div className="flex space-x-4">
                    {siteConfig.social.instagram && (
                        <a
                            href={siteConfig.social.instagram.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors"
                        >
                            <Instagram className="w-5 h-5" />
                            <span className="text-sm">@{siteConfig.social.instagram.handle}</span>
                        </a>
                    )}
                </div>
            </CardContent>
        </Card >
    )
}