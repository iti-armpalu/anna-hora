"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Package, Heart, Settings } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { Avatar, AvatarFallback } from "../ui/avatar"

export function AuthNav() {
    const { user, isAuthenticated, logout } = useAuth()

    if (!isAuthenticated) {
        return (
            <Button asChild variant="ghost" className="relative h-8 w-8 rounded-full">
                <Link href="/signin">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-stone-200 text-stone-600">
                            <User className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="w-[200px] truncate text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Account</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/account?tab=orders" className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/account?tab=wishlist" className="flex items-center">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Wishlist</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/account?tab=preferences" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
