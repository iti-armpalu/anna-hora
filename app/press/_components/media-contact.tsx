import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PRESS_CONTENT } from "../_data"

export function MediaContact() {
  const { mediaContact } = PRESS_CONTENT

  return (
    <section className="py-16 lg:py-24 bg-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-light text-stone-800 mb-4">{mediaContact.title}</h3>
              <p className="text-stone-600 leading-relaxed mb-8">{mediaContact.description}</p>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-stone-500 mb-1">Email</p>
                  <a
                    href={`mailto:${mediaContact.email}`}
                    className="text-stone-800 hover:text-stone-600 transition-colors"
                  >
                    {mediaContact.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-stone-500 mb-1">Phone</p>
                  <a
                    href={`tel:${mediaContact.phone}`}
                    className="text-stone-800 hover:text-stone-600 transition-colors"
                  >
                    {mediaContact.phone}
                  </a>
                </div>
              </div>

              <Button className="bg-anna-green-950 hover:bg-stone-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Press Kit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
