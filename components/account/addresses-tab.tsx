import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Edit, Trash2 } from "lucide-react"

interface Address {
  id: string
  type: "shipping" | "billing"
  isDefault: boolean
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

interface AddressesTabProps {
  addresses: Address[]
}

export function AddressesTab({ addresses }: AddressesTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif text-stone-800">Your Addresses</h3>
        <Button>
          <MapPin className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-stone-800 mb-2">No addresses saved</h4>
            <p className="text-stone-600 mb-4">Add an address to make checkout faster</p>
            <Button>Add Address</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <Badge variant={address.type === "shipping" ? "default" : "secondary"}>{address.type}</Badge>
                    {address.isDefault && <Badge variant="outline">Default</Badge>}
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-stone-600">
                  <p className="font-medium text-stone-800">
                    {address.firstName} {address.lastName}
                  </p>
                  {address.company && <p>{address.company}</p>}
                  <p>{address.address1}</p>
                  {address.address2 && <p>{address.address2}</p>}
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                  {address.phone && <p>{address.phone}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
