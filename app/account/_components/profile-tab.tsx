"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "lucide-react"

import { useRouter } from "next/navigation"
import { toast } from "sonner";
import { Customer } from "@/lib/shopify/types/customer-normalized"


export function ProfileTab({ customer }: { customer: Customer }) {
    const router = useRouter();

    // State fields
    const [firstName, setFirstName] = useState(customer.firstName ?? "");
    const [lastName, setLastName] = useState(customer.lastName ?? "");
    const [email, setEmail] = useState(customer.email);
    const [phone, setPhone] = useState(customer.phone ?? "");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSave() {

        if (password !== confirm) {
            toast.error("Passwords do not match", {
                description: "Please re-enter your password.",
            });
            return;
        }

        setLoading(true);

        const res = await fetch("/api/account/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                password,
                passwordConfirm: confirm,
            }),
        });

        const data = await res.json();

        if (data.ok) {
            router.refresh(); // re-fetch updated customer data
        } else {
            console.error("Update errors:", data.errors);
        }

        setLoading(false);

        toast.success("Profile updated", {
            description: "Your personal information has been saved.",
        });
    }

    return (
        <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
                <CardTitle className="font-serif text-xl text-stone-800">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* FIRST NAME */}
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border-stone-300"
                        />
                    </div>

                    {/* LAST NAME */}
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border-stone-300"
                        />
                    </div>
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-stone-300"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        placeholder="+44 7700 900123"
                        onChange={(e) => setPhone(e.target.value)}
                        className="border-stone-300"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="birthday">Birthday (Optional)</Label>
                        <div className="relative">
                            {/* <Input
                                id="birthday"
                                type="date"
                                value={userProfile.birthday}
                                onChange={(e) => onUpdateProfile({ ...userProfile, birthday: e.target.value })}
                                className="border-stone-300"
                            /> */}
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
                        </div>
                        {/* <p className="text-xs text-stone-500">{profile.birthdayNote}</p> */}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="preferredSize">Preferred Size</Label>
                        {/* <Select
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
                        </Select> */}
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="font-medium text-stone-800">Password & Security</h3>
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                            {/* <Input
                                id="currentPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter current password"
                                className="border-stone-300 pr-10"
                            /> */}
                            {/* <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button> */}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-stone-300"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirm"
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="border-stone-300"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-stone-800 hover:bg-stone-700 text-white"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
