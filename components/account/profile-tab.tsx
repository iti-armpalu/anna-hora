"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Calendar } from "lucide-react"
import type { UserProfile } from "@/data/account"
import { siteContent } from "@/data/content"

interface ProfileTabProps {
  userProfile: UserProfile
  onUpdateProfile: (profile: UserProfile) => void
}

export function ProfileTab({ userProfile, onUpdateProfile }: ProfileTabProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { profile } = siteContent.account

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-stone-800">{profile.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={userProfile.firstName}
              onChange={(e) => onUpdateProfile({ ...userProfile, firstName: e.target.value })}
              className="border-stone-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={userProfile.lastName}
              onChange={(e) => onUpdateProfile({ ...userProfile, lastName: e.target.value })}
              className="border-stone-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={userProfile.email}
            onChange={(e) => onUpdateProfile({ ...userProfile, email: e.target.value })}
            className="border-stone-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={userProfile.phone}
            onChange={(e) => onUpdateProfile({ ...userProfile, phone: e.target.value })}
            className="border-stone-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="birthday">Birthday (Optional)</Label>
            <div className="relative">
              <Input
                id="birthday"
                type="date"
                value={userProfile.birthday}
                onChange={(e) => onUpdateProfile({ ...userProfile, birthday: e.target.value })}
                className="border-stone-300"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
            </div>
            <p className="text-xs text-stone-500">{profile.birthdayNote}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferredSize">Preferred Size</Label>
            <Select
              value={userProfile.preferredSize}
              onValueChange={(value) => onUpdateProfile({ ...userProfile, preferredSize: value })}
            >
              <SelectTrigger className="border-stone-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {profile.sizeOptions.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium text-stone-800">{profile.passwordSection}</h3>
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="border-stone-300 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" className="border-stone-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="border-stone-300"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-stone-800 hover:bg-stone-700 text-white">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
