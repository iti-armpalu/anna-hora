import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MessageCircle } from "lucide-react"
import { SIZE_GUIDE_CONTENT } from "../_data"


export function ContactSection() {
  const { title, description, phone, email, chatButton } = SIZE_GUIDE_CONTENT.contact

  return (
    <Card className="mb-16 border-stone-200 bg-stone-50">
      <CardContent className="p-8">
        <h2 className="font-serif text-2xl text-stone-900 mb-4 text-center">{title}</h2>
        <p className="text-stone-600 text-center mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="outline"
            className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
            asChild
          >
            <a href={`tel:${phone}`}>
              <Phone className="w-4 h-4 mr-2" />
              {phone}
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
            asChild
          >
            <a href={`mailto:${email}`}>
              <Mail className="w-4 h-4 mr-2" />
              {email}
            </a>
          </Button>
          {chatButton && (
            <Button className="bg-stone-900 hover:bg-stone-800 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              {chatButton}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
