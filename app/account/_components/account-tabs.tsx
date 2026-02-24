"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { AccountVM } from "../page";

import { OrdersTab } from "./orders-tab";
import { ProfileTab } from "./profile-tab";

export default function AccountTabs({ customer }: { customer: AccountVM }) {
  return (
    <Tabs defaultValue="orders" className="mt-8">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="orders" className="py-6">
        <OrdersTab orders={customer.orders} />
      </TabsContent>

      <TabsContent value="profile" className="py-6">
        <ProfileTab customer={customer} />
      </TabsContent>

      <TabsContent value="settings" className="py-6">
        {/* later */}
      </TabsContent>
    </Tabs>
  );
}
