import type React from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthLayoutProps {
    title: string
    description: string
    children: React.ReactNode
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
    return (
        <div className="min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-80px)] flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-stone-100">
                <div className="absolute inset-0">
                    <Image
                        src="/anna-hora-white-silk.png"
                        alt="Elegant silk loungewear"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                {/* Overlay with brand message */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <h2 className="text-4xl font-light mb-4">Experience Luxury</h2>
                    <p className="text-lg font-light text-white/90">
                        Discover the finest silk loungewear crafted for those who appreciate timeless elegance.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md mx-auto py-4 px-4">
                    {/* Form Card */}
                    <Card className="border-stone-200 shadow-sm">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-light text-stone-900">{title}</CardTitle>
                            <CardDescription className="text-stone-600">{description}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">{children}</CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
