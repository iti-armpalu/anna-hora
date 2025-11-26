"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { siteContent } from "@/data/content"
import { accountData } from "@/data/account"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package, Heart, MapPin, Bell } from "lucide-react"
import { AccountHeader } from "@/components/account/account-header"
import { ProfileTab } from "@/components/account/profile-tab"
import { OrdersTab } from "@/components/account/orders-tab"
import { WishlistTab } from "@/components/account/wishlist-tab"
import { AddressesTab } from "@/components/account/addresses-tab"
import { PreferencesTab } from "@/components/account/preferences-tab"

export default function AccountPageClient() {
  const [userProfile, setUserProfile] = useState(accountData.userProfile)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(true)
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userProfile")
    localStorage.removeItem("userPreferences")
    sessionStorage.clear()
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <AccountHeader firstName={userProfile.firstName} onSignOut={handleSignOut} />

      <div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-white border border-stone-200">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{siteContent.account.tabs[0].label}</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">{siteContent.account.tabs[1].label}</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">{siteContent.account.tabs[2].label}</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">{siteContent.account.tabs[3].label}</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">{siteContent.account.tabs[4].label}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab userProfile={userProfile} onUpdateProfile={setUserProfile} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab orders={accountData.orders} />
          </TabsContent>

          <TabsContent value="wishlist">
            <WishlistTab wishlistItems={accountData.wishlistItems} />
          </TabsContent>

          <TabsContent value="addresses">
            <AddressesTab addresses={accountData.addresses} />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferencesTab
              emailNotifications={emailNotifications}
              setEmailNotifications={setEmailNotifications}
              smsNotifications={smsNotifications}
              setSmsNotifications={setSmsNotifications}
              marketingEmails={marketingEmails}
              setMarketingEmails={setMarketingEmails}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
