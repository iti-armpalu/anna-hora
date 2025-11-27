"use client"

import { ShopifyCustomer } from "@/lib/types/order";
import LogoutButton from "@/components/header/logout-button";

export default function AccountHeader({ customer }: { customer: ShopifyCustomer }) {
    const name = customer.firstName || "Customer";

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
                <h2 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-2">
                    Welcome back, {name}
                </h2>
                <p className="text-stone-600">Manage your account and track your orders</p>
            </div>
           <LogoutButton />
        </div>
    )
}