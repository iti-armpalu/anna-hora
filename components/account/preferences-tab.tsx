import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Mail, MessageSquare } from "lucide-react"

interface PreferencesTabProps {
  emailNotifications: boolean
  setEmailNotifications: (value: boolean) => void
  smsNotifications: boolean
  setSmsNotifications: (value: boolean) => void
  marketingEmails: boolean
  setMarketingEmails: (value: boolean) => void
}

export function PreferencesTab({
  emailNotifications,
  setEmailNotifications,
  smsNotifications,
  setSmsNotifications,
  marketingEmails,
  setMarketingEmails,
}: PreferencesTabProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-serif text-stone-800">Notification Preferences</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-sm font-medium">
                Order updates and shipping notifications
              </Label>
              <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing-emails" className="text-sm font-medium">
                Marketing emails and promotions
              </Label>
              <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              SMS Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications" className="text-sm font-medium">
                Order updates via SMS
              </Label>
              <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
            </div>
            <p className="text-xs text-stone-500">Standard messaging rates may apply</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Communication Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-stone-600 mb-4">
            {`Choose how you'd like to receive updates about your orders, new products, and exclusive offers.`}
          </p>
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  )
}
